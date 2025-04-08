# `OpenFeign`

`OpenFeign`客户端是一个web声明式http远程调用工具，直接可以根据服务名称去注册中心拿到指定的服务`IP`集合，提供了接口和注解方式进行调用，内嵌集成了Ribbon本地负载均衡器。

## `feign`和`OpenFeign`的区别

1、底层都是内置了Ribbon，去调用注册中心的服务。
2、Feign是`Netflix`公司写的，是SpringCloud组件中的一个轻量级RESTful的HTTP服务客户端，是SpringCloud中的第一代负载均衡客户端。
3、OpenFeign是SpringCloud自己研发的，在Feign的基础上支持了Spring MVC的注解，如@RequesMapping等等。是SpringCloud中的第二代负载均衡客户端。
4、Feign本身不支持Spring MVC的注解，使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务
5、OpenFeign的@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

## `Springcloud alibaba集成OpenFeign`

### 业务API

1. 在`service`下引入依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-openfeign</artifactId>
   </dependency>
   ```

2. 在`service-order`下类

   ```java
   package com.lazy.cloud.feign;
   
   @FeignClient("service-product")
   public interface OrderOpenFeignClient {
       @GetMapping("/product/{productId}")
       public Product getProduct(@PathVariable("productId") Integer productId);
   }
   ```

3. `serviceImpl`层，其他的不变

   ```java
   package com.lazy.cloud.service.impl;
   
   @Service
   public class OrderServiceImpl implements OrderService {
   
       @Resource
       private OrderOpenFeignClient orderOpenFeignClient;
   
       @Override
       public Order addOrder(Long userId, Long productId) {
           Product product = orderOpenFeignClient.getProduct(productId);
           BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));
   
           return new Order(userId, price, productId, "河北", List.of(product));
       }
   }
   ```

4. 主启动类上添加`@EnableFeignClients`

5. 启动`service-order`服务和`service-product`，测试一下

   ![image-20250329124113893](/alibabaImage/image-20250329124113893.png)

### 远程调用-业务API（第三方API）

1. 引入`OpenFeign`依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-openfeign</artifactId>
   </dependency>
   ```

2. 编写`feignClient`接口

   ```java
   package com.lazy.cloud.feign;
   
   /**
    * url 为请求的网址
    * value 因为不是本底的，随便起的名
    */
   @FeignClient(value = "hot-client",url = "https://whyta.cn")
   public interface HotOpenFeignClient {
   
       /**
        *
        * @param key 网址需要请求的参数
        * @return 返回今日头条热搜榜
        */
       @GetMapping("/api/toutiao")
       public String getTou(@RequestParam("key") String key);
   
   }
   ```

3. 在主启动类上添加`@EnableFeignClients`注解

4. 在测试类上测试

   ```java
   package com.lazy.cloud;
   
   @SpringBootTest
   public class HotOpenFeignClientTest {
       @Autowired
       private HotOpenFeignClient hotOpenFeignClient;
       @Test
       public void test() {
           System.out.println(hotOpenFeignClient.getTou("36de5db81215"));
       }
   }
   ```

5. 结果

   ![image-20250329132341658](/alibabaImage/image-20250329132341658.png)

## 客户端负载均衡和服务端负载均衡的区别

![image-20250329133059782](/alibabaImage/image-20250329133059782.jpeg)

服务端的负载均衡是一个url先经过一个代理服务器（这里是nginx），然后通过这个代理服务器通过算法（轮询，随机，权重等等）反向代理你的服务，来完成负载均衡。
而客户端的负载均衡则是一个请求在客户端的时候已经通过eureka获取了要调用服务的集群信息，然后通过具体的负载均衡算法来完成调用具体某个服务。
简而言之，服务端负载均衡需要先经过nginx代理服务器才能知道调用服务的集群信息。而客户端负载均衡请求在客户端的时候就已经知道了调用服务的集群信息。

### **关键对比总结**

| **维度**       | **客户端负载均衡**                | **服务端负载均衡**               |
| :------------- | :-------------------------------- | :------------------------------- |
| **决策位置**   | 客户端                            | 独立的负载均衡器（代理层）       |
| **性能**       | 更优（无中间跳转）                | 略低（需经过代理）               |
| **复杂度**     | 客户端逻辑复杂                    | 客户端无需感知负载逻辑           |
| **服务发现**   | 强依赖（如Eureka）                | 可选（如Nginx手动配置或结合DNS） |
| **多语言支持** | 差（需各语言实现）                | 好（客户端透明）                 |
| **典型工具**   | Ribbon、Spring Cloud LoadBalancer | Nginx、HAProxy、AWS ELB          |

## OpenFeign日志

![image-20250329134927000](/alibabaImage/image-20250329134927000.png)

如何开启日志

1. 添加配置文件，配置日志

   ```yaml
   logging:
     level:
       com.lazy.cloud.feign: debug # com.lazy.cloud.feign包名，可以精确到类名，debug级别
   ```

2. 添加`@Bean`

   ```java
   @Configuration
   public class FooConfiguration {
   	@Bean
   	Logger.Level feignLoggerLevel() { //Logger一定要导入 feign包下的
   		return Logger.Level.FULL;
   	}
   }
   ```

   ![image-20250329135316724](/alibabaImage/image-20250329135316724.png)

3. 测试

   ![image-20250329135518987](/alibabaImage/image-20250329135518987.png)

## 超时控制

如果商品服务一直连接不上，或`API`读取慢，或读不到，有可能会造成服务雪崩的问题，针对这个问题我们要使用超时控制来解决！

我们引入超时控制，来解决这个问题，我们设置上请求多少秒，为超时，如果超时，会返回“网络繁忙”，或者“兜底数据”，兜底数据，需要结合`Sentinel `来实现，以我们现在的技术只能返回"网络繁忙"

超时分两种`connectTimeout(超时控制，默认为10秒)`和`readTimeout(读取超时，默认为60秒)`我们可以通过配置修改它的超时时间

![image-20250329142157162](/alibabaImage/image-20250329142157162.png)

`application.yml`

```yaml
server:
  port: 8000
spring:
  profiles:
    active: dev # 激活那个环境
    include: feign # 包含feign
  application:
    name: service-order
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848 # nacos 服务地址和端口号
logging:
  level:
    com.lazy.cloud.feign: debug
```

`application-feign.yaml`

```yaml
spring:
  cloud:
    openfeign:
      client:
        config:
          default: # 默认配置
            read-timeout: 3000 # 读取时间为3秒
            connect-timeout: 2000 # 连接时间
          service-product:
            read-timeout: 5000
            connect-timeout: 5000
```

修改`service-product`项目的`controller`类，让他睡上20秒

```yaml
package com.lazy.cloud.controller;

@RestController
public class ProductController {

    @Resource
    private ProductService productService;

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId) throws InterruptedException {
        TimeUnit.SECONDS.sleep(20);
        System.out.println("productController");
        return productService.addProduct(productId);
    }
}

```

启动测试一下

![image-20250329142655489](/alibabaImage/image-20250329142655489.png)

使用默认配置再试试

![image-20250329142747168](/alibabaImage/image-20250329142747168.png)

## 重试机制

远程调用超时失败后，还可以进行多次尝试，如果某次返回ok，如果多次依然失败则结束调用，返回错误

但是`OpenFeign`,默认没有使用重试机制

![image-20250329143126800](/alibabaImage/image-20250329143126800.png)

默认重试器，间隔100毫秒，最大间隔1秒，默认重试5次

因为第一次重试是100毫秒，第二次间隔100*1.5毫秒，第三次间隔100\*1.5\*1.5毫秒，依次类推，最大间隔1秒

![image-20250329143627640](/alibabaImage/image-20250329143627640.png)

添加重试

```java
package com.lazy.cloud.config;

@Configuration
public class OrderServiceConfig {

    @Bean
    public Retryer retryer() {
        return new Retryer.Default();
    }
}
```

运行测试，发现打印了五次`productController`,重试了五次

![image-20250329144613068](/alibabaImage/image-20250329144613068.png)

>这个重试机制，是加上设置的超时时间，再加上延迟等待时间

## `OpenFeign`拦截器

请求拦截器`RequestInterceptor`

​	发送请求时，由请求拦截器进行最后拦截，可以对请求进行定制修改

响应拦截器`ResponseInterceptor`

​	可以对响应的数据进行预处理

需求，`service-order`定义`XTokenInterceptor`拦截器，向`service-product`发送请求的时候带上`x-token`：

### 第一种方式

```java
package com.lazy.cloud.interceptor;

/**
 * 请求拦截器
 */
@Component 
public class XTokenInterceptor implements RequestInterceptor { //如果是响应拦截器的话就实现ResponseInterceptor
    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("x-token", UUID.randomUUID().toString());
    }
}
```

`service-product`

```java
package com.lazy.cloud.controller;

@RestController
public class ProductController {

    @Resource
    private ProductService productService;

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId, HttpServletRequest request) throws InterruptedException {
        System.out.println("productController===="+request.getHeader("x-token"));
        return productService.addProduct(productId);
    }
}
```

发起`http://localhost:8000/addOrder?userId=1&productId=100`

![image-20250329151745802](/alibabaImage/image-20250329151745802.png)

### 第二种方式

```java
package com.lazy.cloud.interceptor;

/**
 * 请求拦截器
 */
public class XTokenInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("x-token", UUID.randomUUID().toString());
    }
}
```

`yaml`

```yaml
spring:
  cloud:
    openfeign:
      client:
        config:
          default: # 默认配置
            read-timeout: 3000 # 读取时间为3秒
            connect-timeout: 2000 # 连接时间
          service-product:
            read-timeout: 5000
            connect-timeout: 5000
            request-interceptors: # 只在 service-product 服务下生效
              - com.lazy.cloud.interceptor.XTokenInterceptor 
```

`service-product`不变

![image-20250329152119166](/alibabaImage/image-20250329152119166.png)

## FallBack

`FallBack`：兜底返回

>注意：
>
>​	此功能需要整合`sentienl`才能实现

整合`FallBack`

1. 添加`sentienl`依赖

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
   </dependency>
   ```

2. 编写`OrderOpenFeignFallBack`实现`OrderOpenFeign`接口

   ```java
   package com.lazy.cloud.feign.fallback;
   
   @Component
   public class OrderOpenFeignClientFallBack implements OrderOpenFeignClient {
       @Override
       public Product getProduct(Long productId) {
           Product product = new Product(productId,new BigDecimal("0"),"未知商品",0);
           return product;
       }
   }
   ```

3. 在`OrderOpenFeignClient`类配置，兜底返回

   ```java
   package com.lazy.cloud.feign;
   
   @FeignClient(value = "service-product",fallback = OrderOpenFeignClientFallBack.class) //fallback 配置兜底返回
   public interface OrderOpenFeignClient {
       @GetMapping("/product/{productId}")
       public Product getProduct(@PathVariable("productId") Long productId);
   }
   
   ```

4. 开启熔断功能

   ```yaml
   feign:
     sentinel:
       enabled: true
   ```

5. 先启动`service-order`，不启动`service-product`，看看能不能实现兜底返回

   ![image-20250329155150900](/alibabaImage/image-20250329155150900.png)

6. 在启动`service-product`

   ![image-20250329155245335](/alibabaImage/image-20250329155245335.png)