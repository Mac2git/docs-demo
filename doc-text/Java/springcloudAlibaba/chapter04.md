1. 

# Gateway网关

## 什么是 API 网关（API Gateway）

分布式服务架构、微服务架构与 API 网关
在微服务架构里，服务的粒度被进一步细分，各个业务服务可以被独立的设计、开发、测试、部署和管理。这时，各个独立部署单元可以用不同的开发测试团队维护，可以使用不同的编程语言和技术平台进行设计，这就要求必须使用一种语言和平 台无关的服务协议作为各个单元间的通讯方式。

![](/alibabaImage/bfe1c817e46b633913dc86072ab4b6ef.png)

## API 网关的定义

网关的角色是作为一个 API 架构，用来保护、增强和控制对于 API 服务的访问。

API 网关是一个处于应用程序或服务（提供 REST API 接口服务）之前的系统，用来管理授权、访问控制和流量限制等，这样 REST API 接口服务就被 API 网关保护起来，对所有的调用者透明。因此，隐藏在 API 网关后面的业务系统就可以专注于创建和管理服务，而不用去处理这些策略性的基础设施。

#### API 网关的职能

![](/alibabaImage/e247852980e91800361cc3091b859ff7.png)

#### API 网关的分类与功能

![](/alibabaImage/d9e426dfc06dc8f3b35b9dfc4149e0a8.png)

## Gateway是什么

​	Spring Cloud Gateway是Spring官方基于Spring 5.0，Spring Boot 2.0和Project Reactor等技术开发的网关，Spring Cloud Gateway旨在为微服务架构提供一种简单而有效的统一的API路由管理方式。Spring Cloud Gateway作为Spring Cloud生态系中的网关，目标是替代ZUUL，其不仅提供统一的路由方式，并且基于Filter链的方式提供了网关基本的功能，例如：安全，监控/埋点，和限流等。

### 功能

![img](/alibabaImage/1736142205023-039f6819-e615-4756-8f86-70421c54210d.png)



### helloworld

1. 创建`gateway`项目

   ![image-20250330175919459](/alibabaImage/image-20250330175919459.png)

2. 引入依赖

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-gateway</artifactId>
       </dependency>
       <dependency>
           <groupId>com.alibaba.cloud</groupId>
           <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
       </dependency>
   </dependencies>
   ```

3. 编写启动类

   ```java
   package com.lazy.gateway;
   
   @EnableDiscoveryClient
   @SpringBootApplication
   public class MainApplication {
       public static void main(String[] args) {
           SpringApplication.run(MainApplication.class, args);
       }
   }
   ```

4. 配置文件

   ```yaml
   spring:
     application:
       name: gateway
     cloud:
       nacos:
         server-addr: localhost:8848
   server:
     port: 80
   ```

### 配置网关

新建`application-route.yaml`

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - Path=/api/order/** # 只要断言是这个请求才会转
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
```

`application.yaml`

```yaml
spring:
  profiles:
    include: route
  application:
    name: gateway
  cloud:
    nacos:
      server-addr: localhost:8848
server:
  port: 80
```

`service-order`

```java
package com.lazy.cloud.controller;

@RequestMapping("/api/order")
@RestController
public class OrderController {

    @GetMapping("/readDb")
    public String readDb() {
        log.info("readDb");
        return "readDb success...";
    }
}

```

```java
package com.lazy.cloud.feign;

@FeignClient(value = "service-product",fallback = OrderOpenFeignClientFallBack.class)
public interface OrderOpenFeignClient {
    @GetMapping("/api/order//product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId);
}
```

`service-product`

```java
package com.lazy.cloud.controller;

@RequestMapping("/api/product")
@RestController
public class ProductController {

    @Resource
    private ProductService productService;

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId, HttpServletRequest request){
        System.out.println("productController===="+request.getHeader("x-token"));
        return productService.addProduct(productId);
    }
}
```

运行测试一下

![image-20250330182839946](/alibabaImage/image-20250330182839946.png)

发现503，因为我们的`gateway`项目的配置文件添加了，负载均衡，但没有引入负载均衡的依赖，所以显示没有可用服务

我们在`gateway`项目中引入负载均衡的依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

再重启一下试试

![image-20250330183104431](/alibabaImage/image-20250330183104431.png)

刷新了四遍，看看`service-order`两个服务有没有打印

![image-20250330183221114](/alibabaImage/image-20250330183221114.png)

![image-20250330183237592](/alibabaImage/image-20250330183237592.png)

当我们这个设置，他会访问那个？

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - Path=/**
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - Path=/api/order/** # 只要断言是这个请求才会转
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
```

![image-20250330184229135](/alibabaImage/image-20250330184229135.png)

可以看到，他是首先访问的是必应页面，那我们从中得出，他是按照先后顺序来进行访问的，我们也可以通过`order`来修改它的顺序，数字越小，优先级越高

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - Path=/**
          order: 3
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - Path=/api/order/** # 只要断言是这个请求才会转
          order: 0
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          order: 2
```

再重启一下试试

![image-20250330184449020](/alibabaImage/image-20250330184449020.png)

发现它访问的是我们自己写的页面，如果访问别的话，他会跳转到必应页面，因为必应配置的是下面所有请求都可以访问

![image-20250330184550257](/alibabaImage/image-20250330184550257.png)

如果这样写的话，也可以生效

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - Path=/**
          order: 3
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - name: Path # 用什么方式进行断言
              args:   # 断言的参数
               patterns: /api/order/** # 下面的所有请求
               matchTrailingSlash: true # 如果设置为true的话，/api/order/1/ 可以匹配到和 /api/order/1 也可以匹配到
          order: 0
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          order: 2
```

效果

![image-20250402181111283](/alibabaImage/image-20250402181111283.png)

![image-20250402181138395](/alibabaImage/image-20250402181138395.png)

### Predicate - 断言

![image-20250402181700823](/alibabaImage/image-20250402181700823.png)

#### Query示例：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - name: Path  # 路径断言
              args:
                patterns: /search
            - name: Query # 查询断言
              args:
                param: q # 必须满足参数是q
                regexp: haha # 参数值是 haha 才能，跳转到相应的路径
```

启动测试

![image-20250402182204255](/alibabaImage/image-20250402182204255.png)

从上图看出，我们访问`/search`会出现404，当我们带上参数后，且参数值为`haha`再试试

![image-20250402182403457](/alibabaImage/image-20250402182403457.png)

当我们随便换一个参数值后

![image-20250402182425910](/alibabaImage/image-20250402182425910.png)

### 自定义断言工厂

我们想要实现一个基于上面的在加上`vip`指定用户才可以访问，否则不能访问！

1. 编写`VipPredicateFactory`类

   ```java
   package com.lazy.gateway.predicate;
   
   @Component
   public class VipPredicateFactory extends VipPredicateFactory<VipRoutePredicateFactory.Config> {
   
       public VipPredicateFactory() {
           super(Config.class);
       }
   
       @Override
       public List<String> shortcutFieldOrder() {
           return Arrays.asList("param","value");
       }
   
       @Override
       public Predicate<ServerWebExchange> apply(Config config) {
           return (GatewayPredicate) serverWebExchange -> {
               // 获取 request 请求
               ServerHttpRequest request = serverWebExchange.getRequest();
               // 获取第一个请求参数
               String first = request.getQueryParams().getFirst(config.param);
               //判断 param 不为空，并且参数值和配置文件的参数值相等
               return StringUtils.hasText(first) && Objects.equals(first, config.value);
           };
       }
   
       @Validated
       public static class Config {
           private @NotEmpty String param;
           private @NotEmpty String value;
   
           public void setParam(@NotEmpty String param) {
               this.param = param;
           }
   
           public @NotEmpty String getParam() {
               return param;
           }
   
           public void setValue(@NotEmpty String value) {
               this.value = value;
           }
   
           public @NotEmpty String getValue() {
               return value;
           }
       }
   }
   ```

2. 配置文件

   ```yaml
   spring:
     cloud:
       gateway:
         routes:
           - id: biying
             uri: https://cn.bing.com/
             predicates:
               - name: Path  # 路径断言
                 args:
                   patterns: /search
               - name: Query # 查询断言
                 args:
                   param: q # 必须满足参数是q
                   regexp: haha # 参数值是 haha 才能，跳转到相应的路径
               - name: VipPredicateFactory # 这个参数名必须和配置的类名一样
                 args:
                   param: user
                   value: lazy
   ```

3. 测试

​	![image-20250402190044849](/alibabaImage/image-20250402190044849.png)

参数部分顺序，必须这两个条件同时满足才会生效！

>注意：
>
>​	如果类名是以`xxxRoutePredicateFactory`命名的话，到时候配置文件的name属性可以，`xxx`写，不需要写完整名，否则就写完整名

### 过滤器

| 名                               | 参数（个数/类型） | 作用                                              |
| -------------------------------- | ----------------- | ------------------------------------------------- |
| AddRequestHeader                 | 2/string          | 添加请求头                                        |
| AddRequestHeadersIfNotPresent    | 1/List\<string\>  | 如果没有则添加请求头，key:value方式               |
| AddRequestParameter              | 2/string、string  | 添加请求参数                                      |
| AddResponseHeader                | 2/string、string  | 添加响应头                                        |
| CircuitBreaker                   | 1/string          | 仅支持forward:/inCaseOfFailureUseThis方式进行熔断 |
| CacheRequestBody                 | 1/string          | 缓存请求体                                        |
| DedupeResponseHeader             | 1/string          | 移除重复响应头，多个用空格分割                    |
| FallbackHeaders                  | 1/string          | 设置Fallback头                                    |
| JsonToGrpc                       |                   | 请求体Json转为gRPC                                |
| LocalResponseCache               | 2/string          | 响应数据本地缓存                                  |
| MapRequestHeader                 | 2/string          | 把某个请求头名字变为另一个名字                    |
| ModifyRequestBody                | 仅 Java 代码方式  | 修改请求体                                        |
| ModifyResponseBody               | 仅 Java 代码方式  | 修改响应体                                        |
| PrefixPath                       | 1/string          | 自动添加请求前缀路径                              |
| PreserveHostHeader               | 0                 | 保护Host头                                        |
| RedirectTo                       | 3/string          | 重定向到指定位置                                  |
| RemoveJsonAttributesResponseBody | 1/string          | 移除响应体中的某些Json字段，多个用,分割           |
| RemoveRequestHeader              | 1/string          | 移除请求头                                        |
| RemoveRequestParameter           | 1/string          | 移除请求参数                                      |
| RemoveResponseHeader             | 1/string          | 移除响应头                                        |
| RequestHeaderSize                | 2/string          | 设置请求大小，超出则响应431状态码                 |
| RequestRateLimiter               | 1/string          | 请求限流                                          |
| RewriteLocationResponseHeader    | 4/string          | 重写Location响应头                                |
| RewritePath                      | 2/string          | 路径重写                                          |
| RewriteRequestParameter          | 2/string          | 请求参数重写                                      |
| RewriteResponseHeader            | 3/string          | 响应头重写                                        |
| SaveSession                      | 0                 | session保存，配合spring-session框架               |
| SecureHeaders                    | 0                 | 安全头设置                                        |
| SetPath                          | 1/string          | 路径修改                                          |
| SetRequestHeader                 | 2/string          | 请求头修改                                        |
| SetResponseHeader                | 2/string          | 响应头修改                                        |
| SetStatus                        | 1/int             | 设置响应状态码                                    |
| StripPrefix                      | 1/int             | 路径层级拆除                                      |
| Retry                            | 7/string          | 请求重试设置                                      |
| RequestSize                      | 1/string          | 请求大小限定                                      |
| SetRequestHostHeader             | 1/string          | 设置Host请求头                                    |
| TokenRelay                       | 1/string          | OAuth2的token转发                                 |

示例：

​	去除，`controller`的`/api/order`和`/api/product`请求，使用过滤器添加

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - name: Path  # 路径断言
              args:
                patterns: /search
            - name: Query # 查询断言
              args:
                param: q # 必须满足参数是q
                regexp: haha # 参数值是 haha 才能，跳转到相应的路径
            - name: Vip
              args:
                param: user
                value: lazy
          order: 3
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - name: Path # 用什么方式进行断言
              args:   # 断言的参数
               patterns: /api/order/** # 下面的所有请求
               matchTrailingSlash: true # 如果设置为true的话，/api/order/1/ 可以匹配到和 /api/order/1 也可以匹配到
          filters: # 在请求的时候添加/api/order/ab/c路径
            - RewritePath=/api/order/?(?<segment>.*), /$\{segment}
            - AddResponseHeader=X-Response-xxx, 123 # 添加响应头请求头的参数，值为123
          order: 0
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          order: 2
          filters:
            - RewritePath=/api/product/?(?<segment>.*), /$\{segment}
            - AddResponseHeader=X-Response-xxx, 123 # 添加响应头请求头的参数，值为123
```

效果：

![image-20250402202040568](/alibabaImage/image-20250402202040568.png)

### 默认过滤器

添加过滤器并将其应用于所有路由，可以使用 `spring.cloud.gateway.default-filters` 。该属性接受一个过滤器列表。以下列表定义了一组默认过滤器：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - name: Path  # 路径断言
              args:
                patterns: /search
            - name: Query # 查询断言
              args:
                param: q # 必须满足参数是q
                regexp: haha # 参数值是 haha 才能，跳转到相应的路径
            - name: Vip
              args:
                param: user
                value: lazy
          order: 3
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - name: Path # 用什么方式进行断言
              args:   # 断言的参数
               patterns: /api/order/** # 下面的所有请求
               matchTrailingSlash: true # 如果设置为true的话，/api/order/1/ 可以匹配到和 /api/order/1 也可以匹配到
          filters: # 在请求的时候添加/api/order/ab/c路径
            - RewritePath=/api/order/?(?<segment>.*), /$\{segment}
          order: 0
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          order: 2
          filters:
            - RewritePath=/api/product/?(?<segment>.*), /$\{segment}
      default-filters:
          - AddResponseHeader=X-Response-xxx, 123
```

测试：

​	我们访问`/api/order/readDb`会有响应头和`/api/product/product/1`也会有响应头

![image-20250402202708242](/alibabaImage/image-20250402202708242.png)

![image-20250402202809463](/alibabaImage/image-20250402202809463.png)

### 全局过滤器GlobalFilter

我们想记录请求时间和响应时间用了多少毫秒，我们就可以使用`GlobalFilter`来记录

```java
package com.lazy.gateway.filter;

@Slf4j
@Component
public class RtGlobalFilter implements GlobalFilter , Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String uri = request.getURI().toString();
        long start = System.currentTimeMillis();
        log.info("请求[{}] 开始，时间：{}",uri,start);
        //放行，这个方法是一个异步执行的
        return chain.filter(exchange)
                .doFinally((source) -> {
            long end = System.currentTimeMillis();
            log.info("请求[{}] 结束，耗时：{}ms", uri, end - start);
        });
    }
    /**
     * @return 执行顺序，数字越小，执行的顺序越优先执行
     */
    @Override
    public int getOrder() {
        return -1;
    }
}
```

![image-20250402204536360](/alibabaImage/image-20250402204536360.png)

### 自定义过滤器

如果我们想在请求头里面添加token，可以自定义使用过滤器添加，如果写的是uuid我们就生成uuid，如果写的是jwt那我们就生成jwt

```java
package com.lazy.gateway.filter;


@Component
public class OnceTokenFilter extends AbstractNameValueGatewayFilterFactory {
    @Override
    public GatewayFilter apply(NameValueConfig config) {
        return (exchange, chain) -> chain.filter(exchange).then(Mono.fromRunnable(() -> { //开启一个异步任务
            ServerHttpResponse response = exchange.getResponse();
            HttpHeaders headers = response.getHeaders();//获取响应头
            String value = null;
            //判断是否为uuid，不区分大小写
            if ("uuid".equals(config.getValue())) {
                value = UUID.randomUUID().toString();
            }else if("jwt".equals(config.getValue())){
                value = "jwt";
            }
            headers.add(config.getName(), value);
        }));
    }
}
```

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: biying
          uri: https://cn.bing.com/
          predicates:
            - name: Path  # 路径断言
              args:
                patterns: /search
            - name: Query # 查询断言
              args:
                param: q # 必须满足参数是q
                regexp: haha # 参数值是 haha 才能，跳转到相应的路径
            - name: Vip
              args:
                param: user
                value: lazy
          order: 3
        - id: service-order # id
          uri: lb://service-order # 负载均衡 service-order
          predicates: # 断言
            - name: Path # 用什么方式进行断言
              args:   # 断言的参数
               patterns: /api/order/** # 下面的所有请求
               matchTrailingSlash: true # 如果设置为true的话，/api/order/1/ 可以匹配到和 /api/order/1 也可以匹配到
          filters: # 在请求的时候添加/api/order/ab/c路径
            - RewritePath=/api/order/?(?<segment>.*), /$\{segment}
            - OnceTokenFilter=X-Response-token, uuid # OnceTokenFilter 配置的过滤器类名
          order: 0
        - id: service-product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
          order: 2
          filters:
            - RewritePath=/api/product/?(?<segment>.*), /$\{segment}
      default-filters:
          - AddResponseHeader=X-Response-Red, Blue
```

![image-20250402211000691](/alibabaImage/image-20250402211000691.png)

>注意：
>
>​	只要文件后缀名为`XXXGatewayFilterFactory`,配置文件配置的时候就可以写`XXX`,可以省略`GatewayFilterFactory`

### Gateway解决跨域请求

由于我们的项目被月拆分越多，我们不可能在每一个项目都配置解决跨域请求，然而`spring`官网就给我在`Gateway`网关上统一配置解决方案

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]': #允许所有请求可以访问
            allowed-origin-patterns: '*' # 允许所有请求可以被访问
            allowed-headers: '*' # 允许所有的请求头
            allowedMethods: '*' # 允许所有的方法可以被访问
```

也可以单独在某一个请求下面配置跨域

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: cors_route
        uri: https://example.org
        predicates:
        - Path=/service/**
        metadata:
          cors:
            allowedOrigins: '*'
            allowedMethods:
              - GET
              - POST
            allowedHeaders: '*'
            maxAge: 30
```

效果

![image-20250402212525786](/alibabaImage/image-20250402212525786.png)

### 微服务内部调用是否需要走网关

在微服务架构中，**服务网关**通常用于处理外部请求的路由转发、权限校验、限流和监控等功能。然而，对于微服务内部的调用，是否需要经过网关，取决于具体的架构设计和需求。

**服务网关的作用**

服务网关主要用于接收外部请求，并将其转发到后端的微服务上，同时可以在网关中实现一系列的横切功能，如权限校验、限流和监控。通过将这些功能集中在网关中，可以避免在每个微服务中重复实现这些功能，从而减少代码冗余和维护成本。

内部调用是否需要走网关

对于微服务内部的调用，通常不需要经过网关。原因如下：

1. **性能考虑**：增加网关会增加一层转发，可能会导致性能下降。
2. **内部请求的特殊性**：内部服务之间的调用通常不需要进行权限校验和限流等操作。
3. 网关是直接对接前端的。

例外情况

在某些情况下，可能会选择让内部调用也经过网关，例如：

1. **统一监控和日志**：如果希望对所有的服务调用进行统一的监控和日志记录，可以选择让内部调用也经过网关。
2. **简化架构**：在某些复杂的架构中，通过网关可以简化服务间的调用逻辑和管理。