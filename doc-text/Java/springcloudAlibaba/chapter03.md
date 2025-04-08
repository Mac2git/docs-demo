# Sentinel

## Sentinel 介绍

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 是面向分布式、多语言异构化服务架构的流量治理组件，主要以流量为切入点，从流量路由、流量控制、流量整形、熔断降级、系统自适应过载保护、热点流量防护等多个维度来帮助开发者保障微服务的稳定性。

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。[Sentinel](https://sentinelguard.io/) 以流量为切入点，从流量控制、流量路由、熔断降级、系统自适应过载保护、热点流量防护等多个维度保护服务的稳定性。

Sentinel 具有以下特征:

- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。
- **完善的 SPI 扩展机制**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

![image-20250329155245335](/alibabaImage/image.png)

## 架构原理

![img](/alibabaImage/1735526575167-31e5bca5-ba78-48da-b248-ebbeafff8c03.png)





## 工作流程

[Sentinel工作流程](https://sentinelguard.io/zh-cn/docs/basic-implementation.html)

## 资源&规则

定义资源：

- 主流框架自动适配（Web Servlet、Dubbo、Spring Cloud、gRPC、Spring WebFlux、Reactor）；所有Web接口均为资源
- 编程式：SphU API
- 声明式：@SentinelResource

定义规则：

- 流量控制规则
- 熔断降级规则
- 系统保护规则
- 来源访问控制规则
- 热点参数规则

![img](/alibabaImage/1735532694911-6d15ba90-0852-4116-be85-a1bcdaa94d11.png)

## 整合`sentinel`

下载[Sentinel](https://github.com/alibaba/Sentinel)

1. 引入依赖

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
   </dependency>
   ```

2. 配置文件

   ```yaml
   spring:
     cloud:
       sentinel:
         transport:
           dashboard: localhost:8080
         eager: true # sentinel 进行提前加载，不然访问不到 sentinel
   ```

3. 启动下载好的`jar`包

   通过 `java -jar jar包名字`

   ![image-20250329162622483](/alibabaImage/image-20250329162622483.png)

   默认什么也没有

   ![image-20250329162714931](/alibabaImage/image-20250329162714931.png)

4. 启动服务，再刷新一下，发现可以正常访问了！

   ![image-20250329162946630](/alibabaImage/image-20250329162946630.png)

5. 设置流控规则，每秒最多可以发生1个请求

   1. 添加保护资源注解

      ```java
      package com.lazy.cloud.service.impl;
      
      @Slf4j
      @Service
      public class OrderServiceImpl implements OrderService {
          @Resource
          private OrderOpenFeignClient orderOpenFeignClient;
      
          @SentinelResource(value = "createOrder") // 设置addOrder是sentinel的资源
          @Override
          public Order addOrder(Long userId, Long productId) {
              Product product = orderOpenFeignClient.getProduct(productId);
              BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));
              return new Order(userId, price, productId, "河北", List.of(product));
          }
      }
      ```

   2. 我们对`addOrder`设置保护规则，允许一秒只能发送一个请求

      ![image-20250329164924802](/alibabaImage/image-20250329164924802.png)

   3. 如果我们一秒发送了两个请求，会显示

      ![image-20250329164802832](/alibabaImage/image-20250329164802832.png)

如果我们想定义`code,data`那样的数据，需要实现`BlockExceptionHandler`，去重写里面的方法

### 1.实现`BlockExceptionHandler`处理异常

1. 在`model`添加公用返回的格式`R`实体类

   ```java
   package com.lazy.cloud.common;
   
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   public class R {
       private Integer code;
       private String msg;
       private Object data;
   
       public static R ok() {
           return new R(200, "ok", null);
       }
       public static R ok(Object data) {
           return new R(200, "ok", data);
       }
       public static R error(Integer code, String msg) {
           return new R(code, msg, null);
       }
       public static R error(){
           return new R(500, "error", null);
       }
   }
   ```

2. 编写`MyBlockExceptionHandler`去实现`BlockExceptionHandler`

   ```java
   package com.lazy.cloud.exception;
   
   @Component
   public class MyBlockExceptionHandler implements BlockExceptionHandler {
       private final ObjectMapper objectMapper = new ObjectMapper();
       @Override
       public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String s, BlockException e) throws Exception {
           httpServletResponse.setContentType("application/json;charset=utf-8"); //设置响应编码格式，一定要设置在第一行，不然不生效
           PrintWriter writer = httpServletResponse.getWriter();
           R r = new R();
           r.setCode(500);
           r.setMsg(s+"被sentinel限制了，原因"+e.getClass());
           writer.write(objectMapper.writeValueAsString(r));
           writer.flush(); // 刷新数据
           writer.close(); // 关闭 PrintWriter
       }
   }
   ```

3. 运行测试，因为我们的`sentinel`是在内存中存放的，我们重启服务后需要重新去定义流控规则

   ![image-20250329171632965](/alibabaImage/image-20250329171632965.png)

4. 点击新增，再试试

   ![image-20250329171811360](/alibabaImage/image-20250329171811360.png)

### 2、自定义处理异常

![image-20250329173136872](/alibabaImage/image-20250329173136872.png)



如果我们给`createOrder`添加流控规则后

![image-20250329175604173](/alibabaImage/image-20250329175604173.png)

会提示

![image-20250329175637737](/alibabaImage/image-20250329175637737.png)

`springboot`的默认错误，但我们想要使用兜底操作，怎么办？

```java
package com.lazy.cloud.service.impl;

@Service
public class OrderServiceImpl implements OrderService {

    @SentinelResource(value = "createOrder",blockHandler = "addOrderFallBack") // blockHandler 添加兜底操作，兜底操作的方法名
    @Override
    public Order addOrder(Long userId, Long productId) {
//        Product product = getProductFormRemoteWithLoadBalanceAnnotation(productId);
        Product product = orderOpenFeignClient.getProduct(productId);
        BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));

        return new Order(userId, price, productId, "河北", List.of(product));
    }
    public Order addOrderFallBack(Long userId, Long productId, BlockException exception) {
        return new Order(0L, new BigDecimal("0"), productId, "未知地址", null);
    }
}
```

我们在运行测试一下，我们给`createOrder`添加流控规则

![image-20250329180015974](/alibabaImage/image-20250329180015974.png)

![image-20250329180025251](/alibabaImage/image-20250329180025251.png)

官网解释：

![image-20250329172755125](/alibabaImage/image-20250329172755125.png)

### 3、OpenFeign异常

当我们给`GET:http://service-product/product/{productId}`添加异常看看，这个会走那个兜底回调

![image-20250329180715347](/alibabaImage/image-20250329180715347.png)

![image-20250329180909214](/alibabaImage/image-20250329180909214.png)

可以看出他是调用我们的第二个方法(自定义处理异常)，假如第二个没有了，看看他会调用那个

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

![image-20250329181705929](/alibabaImage/image-20250329181705929.png)

## 流量控制（`FlowRule`）

![image-20250329185331021](/alibabaImage/image-20250329185331021.png)

### 阈值类型

QPS：统计每秒请求数

并发线程数：统计并发线程数

### 流控模式

![image-20250329185953573](/alibabaImage/image-20250329185953573.png)

调用关系包括调用方、被调用方，一个方法又可能会调用其他方法，形成一个调用链路的层次关系。有了调用链路的统计信息，我们可以衍生出多种流量控制手段

![img](/alibabaImage/1735966975246-494ea585-e2cc-4ee9-a285-9fc3e0e2de43.png)

#### 链路模式

```java
package com.lazy.cloud.controller;

@RestController
public class OrderController {

    @GetMapping("/seckill")
    public Order seckill(
            @RequestParam("userId") Long userId,
            @RequestParam("productId") Long productId
    ) {
        Order order = orderServiceImpl.addOrder(userId, productId);
        order.setId(Long.MAX_VALUE); // Long的最大值
        return order;
    }
}
```

配置文件

```yaml
server:
  port: 8000
spring:
  profiles:
    active: dev # 激活那个环境
    include: feign # 包含那个
  application:
    name: service-order
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848 # nacos 服务地址和端口号
      config:
        namespace: ${spring.profiles.active:dev} # 要读取 nacos 的配置,默认为dev环境
    sentinel:
      web-context-unify: false # 关闭上下文统一
      transport:
        dashboard: localhost:8080
      eager: true
```

启动测试，正常我们访问`localhost:8000/addOrder?userId=1&productId=100`是可以访问的,我们修改为链路策略再试试

![image-20250329191014773](/alibabaImage/image-20250329191014773.png)

我们新增的规则在`addOrder`新增的链路规则，入口资源为`/seckill`请求

![image-20250329191841473](/alibabaImage/image-20250329191841473.png)

如果一秒两次访问`seckill`请求，会显示，看着对,`order`请求生效，实际上是对`/seckill`请求生效

![image-20250329191937396](/alibabaImage/image-20250329191937396.png)

一秒2次访问`/addOrder`请求不影响

![image-20250329192149155](/alibabaImage/image-20250329192149155.png)



#### 关联模式

​	针对与我们的读写的时候，如果写的访问资源特别大，那么我们的读就被限制了

步骤：

1. 在`controller`类上写两个方法，分别是`writeDb`和`readDb`

   ```java
   @GetMapping("/writeDb")
   public String writeDb() {
       return "writeDb success...";
   }
   
   @GetMapping("/readDb")
   public String readDb() {
       return "readDb success...";
   }
   ```

2. 启动运行一下

   ![image-20250329212932427](/alibabaImage/image-20250329212932427.png)

   然后我们疯狂刷新，`/writeDb`，在刷新一下`/readDb`,就出现

   ![image-20250329213106344](/alibabaImage/image-20250329213106344.png)

   

### 流控效果

![image-20250329215935850](/alibabaImage/image-20250329215935850.png)

>注意：
>
>​	只有快速失败支持流控模式（直接、关联、链路）的设置



![img](/alibabaImage/1735966998917-bd864bb8-eea8-43e8-abe7-f9ea3c21fbb6.png)

#### 快速失败

快速失败，就是如果没有超过阈值就通过，如果超过阈值就抛出异常

官方解释：

![image-20250330151421754](/alibabaImage/image-20250330151421754.png)

#### warm up

比如说设置的是20个，刚开始每秒3个，每秒5个，逐增到设置的峰值20个，让系统逐步的增加处理能力，以适应突然来的高峰请求

官方解释：

![image-20250330151452740](/alibabaImage/image-20250330151452740.png)

示例：

![image-20250330144919022](/alibabaImage/image-20250330144919022.png)

可以看出他是逐渐涨到10个的

![image-20250330145506253](/alibabaImage/image-20250330145506253.png)

#### 排队等待

>注意：
>
>​	QPS=2，每秒2个，则500ms 1个，剩下的就排队等待，如果超出了timeout=20s，就排队失败，排队失败的请求也会被丢弃，不支持QPS>1000 ,如果QPS>1000 精度就失效了

官方解释：

![image-20250330151534868](/alibabaImage/image-20250330151534868.png)

![image-20250330150538661](/alibabaImage/image-20250330150538661.png)

![image-20250330151059864](/alibabaImage/image-20250330151059864.png)

匀速排队在底层还会用到漏桶算法

##### 漏桶算法

漏桶算法，又称 leaky bucket。

为了理解漏桶算法，我们看一下对于该算法的示意图：

![image](/alibabaImage/bVdeApa.png)

从图中我们可以看到，整个算法其实十分简单。首先，我们有一个固定容量的桶，有水流进来，也有水流出去。

对于流进来的水来说，我们无法预计一共有多少水会流进来，也无法预计水流的速度。但是对于流出去的水来说，这个桶可以固定水流出的速率。而且，当桶满了之后，多余的水将会溢出。

我们将算法中的水换成实际应用中的请求，我们可以看到漏桶算法天生就限制了请求的速度。当使用了漏桶算法，我们可以保证接口会以一个常速速率来处理请求。

所以漏桶算法天生**不会出现临界问题**。

漏桶算法可以粗略的认为就是注水漏水过程，往桶中以一定速率流出水，以任意速率流入水，当水超过桶流量则丢弃，因为桶容量是不变的，保证了整体的速率。

#### 总结

只有快速失败，支持直接、关联、链路模式。warm up和排队等待只支持直接模式，不支持关联、链路模式

## 熔断降级(`DegradeRule`)-防止雪崩效应

### 概述

除了流量控制以外，对调用链路中不稳定的资源进行熔断降级也是保障高可用的重要措施之一。一个服务常常会调用别的模块，可能是另外的一个远程服务、数据库，或者第三方 API 等。例如，支付的时候，可能需要远程调用银联提供的 API；查询某个商品的价格，可能需要进行数据库查询。然而，这个被依赖服务的稳定性是不能保证的。如果依赖的服务出现了不稳定的情况，请求的响应时间变长，那么调用服务的方法的响应时间也会变长，线程会产生堆积，最终可能耗尽业务自身的线程池，服务本身也变得不可用。

![chain](/alibabaImage/c618644.png)

现代微服务架构都是分布式的，由非常多的服务组成。不同服务之间相互调用，组成复杂的调用链路。以上的问题在链路调用中会产生放大的效果。复杂链路上的某一环不稳定，就可能会层层级联，最终导致整个链路都不可用。因此我们需要对不稳定的**弱依赖服务调用**进行熔断降级，暂时切断不稳定调用，避免局部不稳定因素导致整体的雪崩。熔断降级作为保护自身的手段，通常在客户端（调用端）进行配置。

### 熔断策略

Sentinel 提供以下几种熔断策略：

- 慢调用比例 (`SLOW_REQUEST_RATIO`)：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。
- 异常比例 (`ERROR_RATIO`)：当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 `[0.0, 1.0]`，代表 0% - 100%。
- 异常数 (`ERROR_COUNT`)：当单位统计时长内的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。

>注意:
>
>​	异常降级**仅针对业务异常**，对 Sentinel 限流降级本身的异常（`BlockException`）不生效。为了统计异常比例或异常数，需要通过 `Tracer.trace(ex)` 记录业务异常。

#### 工作原理

![image-20250330154607283](/alibabaImage/image-20250330154607283.png)

#### 慢调用比例

实例：

`service-order`不变，`service-product`,`controller`添加睡眠时长为2s

```java
package com.lazy.cloud.controller;

@RestController
public class ProductController {

    @Resource
    private ProductService productService;

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable("productId") Long productId, HttpServletRequest request) throws InterruptedException {
        System.out.println("productController===="+request.getHeader("x-token"));
        TimeUnit.SECONDS.sleep(2);
        return productService.addProduct(productId);
    }
}
```

最少请求为5个！

![image-20250330155929585](/alibabaImage/image-20250330155929585.png)

进入熔断机制了

![image-20250330160027142](/alibabaImage/image-20250330160027142.png)

熔断时长为30s，如果过了30s，后就恢复正常了！

![image-20250330160129365](/alibabaImage/image-20250330160129365.png)

#### 异常比例

 异常比例 (ERROR_RATIO)：当单位统计时长（statIntervalMs）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 [0.0, 1.0]，代表 0% - 100%。

有熔断规则和无熔断规则的区别

![image-20250330164243700](/alibabaImage/image-20250330164243700.png)

测试

1. `service-product`的`controller`类

   ```java
   package com.lazy.cloud.controller;
   
   @RestController
   public class ProductController {
   
       @Resource
       private ProductService productService;
   
       @GetMapping("/product/{productId}")
       public Product getProduct(@PathVariable("productId") Long productId, HttpServletRequest request){
           int i = 10/0;//异常
           System.out.println("productController===="+request.getHeader("x-token"));
           return productService.addProduct(productId);
       }
   }
   ```

2. 启动运行

   触发了兜底回调

   ![image-20250330163646534](/alibabaImage/image-20250330163646534.png)

3. 添加异常比例

   ![image-20250330164207732](/alibabaImage/image-20250330164207732.png)

4. 疯狂刷新

   ![image-20250330164522960](/alibabaImage/image-20250330164522960.png)

   直接触发兜底回调，`service-product`和`service-order`不会被打印

   ![image-20250330164624427](/alibabaImage/image-20250330164624427.png)

   ![image-20250330164632562](/alibabaImage/image-20250330164632562.png)

#### 异常数

异常数，就是在N秒内发送的请求，有多少个异常，就触发熔断，前提是有个最小请求次数

![image-20250330164813025](/alibabaImage/image-20250330164813025.png)

基于异常比例的代码，测试。先疯狂刷新10次，再刷新看看是否触发兜底回调

![image-20250330165156682](/alibabaImage/image-20250330165156682.png)

没有打印异常，触发了兜底回调，30s内不会再发请求

## 热点参数限流

### Overview

何为热点？热点即经常访问的数据。很多时候我们希望统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。比如：

- 商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制
- 用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制

热点参数限流会统计传入参数中的热点参数，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。

![Sentinel Parameter Flow Control](/alibabaImage/sentinel-hot-param-overview-1.png)

Sentinel 利用 LRU 策略统计最近最常访问的热点参数，结合令牌桶算法来进行参数级别的流控。

环境搭建`service-order`

```java
package com.lazy.cloud.controller;

@RestController
public class OrderController {

    @Resource
    private OrderServiceImpl orderServiceImpl;

    @GetMapping("/seckill")
    @SentinelResource(value = "seckill-order",fallback = "seckillFallback")
    public Order seckill(
            @RequestParam(value = "userId",defaultValue = "666") Long userId,
            @RequestParam(value = "productId",defaultValue = "888") Long productId
    ) {
        Order order = orderServiceImpl.addOrder(userId, productId);
        order.setId(Long.MAX_VALUE); // Long的最大值
        return order;
    }

    public Order seckillFallback(Long userId, Long productId, BlockException exception) {
        Order order = orderServiceImpl.addOrder(userId, productId);
        order.setId(productId);
        order.setUserId(userId);
        order.setAddress("异常信息："+exception.getClass());
        return order;
    }

}
```

`service-product`去除`int i =10/0`

![image-20250330171613263](/alibabaImage/image-20250330171613263.png)

如果带了`userId`会被限流

![image-20250330172007931](/alibabaImage/image-20250330172007931.png)

如果不带`userId`,不会被限流

```java
@GetMapping("/seckill")
@SentinelResource(value = "seckill-order",fallback = "seckillFallback")
public Order seckill(
        @RequestParam(value = "userId",required = false) Long userId,
        @RequestParam(value = "productId",defaultValue = "888") Long productId
) {
    Order order = orderServiceImpl.addOrder(userId, productId);
    order.setId(Long.MAX_VALUE); // Long的最大值
    return order;
}

public Order seckillFallback(Long userId, Long productId, BlockException exception) {
    Order order = orderServiceImpl.addOrder(userId, productId);
    order.setId(productId);
    order.setUserId(userId);
    order.setAddress("异常信息："+exception.getClass());
    return order;
}
```

![image-20250330172123268](/alibabaImage/image-20250330172123268.png)

假如`userId`为6的是vip用户，不被限流，最后点击添加

![image-20250330172605080](/alibabaImage/image-20250330172605080.png)

然后疯狂刷新，可以看到未被限制

![image-20250330172817597](/alibabaImage/image-20250330172817597.png)

商品666是下架商品，不允许被访问

![image-20250330173040483](/alibabaImage/image-20250330173040483.png)

限制666商品，不允许被访问

![image-20250330173154939](/alibabaImage/image-20250330173154939.png)

![image-20250330173211741](/alibabaImage/image-20250330173211741.png)

上面的是`SpringBoot`默认的错误，我们不使用默认的错误

1. `blockHandler`

   1. 代码

      ```java
      @GetMapping("/seckill")
      @SentinelResource(value = "seckill-order",blockHandler = "seckillFallback")
      public Order seckill(
              @RequestParam(value = "userId",required = false) Long userId,
              @RequestParam(value = "productId",defaultValue = "888") Long productId
      ) {
          Order order = orderServiceImpl.addOrder(userId, productId);
          order.setId(Long.MAX_VALUE); // Long的最大值
          return order;
      }
      
      public Order seckillFallback(Long userId, Long productId, BlockException exception) {
          Order order = orderServiceImpl.addOrder(userId, productId);
          order.setId(productId);
          order.setUserId(userId);
          order.setAddress("异常信息："+exception.getClass());
          return order;
      }
      ```

   2. 省略添加热点规则
      ![](/alibabaImage/image-20250330173625241.png)

2. `fallback`

   1. 代码

      ```java
      @GetMapping("/seckill")
      @SentinelResource(value = "seckill-order",fallback = "seckillFallback")
      public Order seckill(
              @RequestParam(value = "userId",required = false) Long userId,
              @RequestParam(value = "productId",defaultValue = "888") Long productId
      ) {
          Order order = orderServiceImpl.addOrder(userId, productId);
          order.setId(Long.MAX_VALUE); // Long的最大值
          return order;
      }
      public Order seckillFallback(Long userId, Long productId, Throwable exception) {
          Order order = orderServiceImpl.addOrder(userId, productId);
          order.setId(productId);
          order.setUserId(userId);
          order.setAddress("异常信息："+exception.getClass());
          return order;
      }
      ```

   2. 省略添加热点规则
      ![image-20250330173904612](/alibabaImage/image-20250330173904612.png)