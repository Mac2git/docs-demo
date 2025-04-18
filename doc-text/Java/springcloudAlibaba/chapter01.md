# 分布式基础

## **微服务**

微服务架构风格，就像是把一个**单独的应用程序**开发为**一套小服务**，每个**小服务**运行在**自己**的**进程**中，并使用轻量级机制通信，通常是 HTTP API。这些服务围绕业务能力来构建， 并通过完全自动化部署机制来独立部署。这些服务使用不同的编程语言书写，以及不同数据存储技术，并保持最低限度的集中式管理。 

***简而言之：拒绝大型单体应用，基于业务边界进行服务微化拆分，各个服务独立部署运行。***

![img](/alibabaImage/1733297310596-6a264038-d7d3-43b6-9883-c0d70c43d678.png)



## **集群&分布式&节点**

**集群是个物理形态，分布式是个工作方式。** 

只要是一堆机器，就可以叫集群，他们是不是一起协作着干活，这个谁也不知道； 

《分布式系统原理与范型》定义： 

- “分布式系统是若干独立计算机的集合，这些计算机对于用户来说就像单个相关系统” 
- 分布式系统（distributed system）是建立在网络之上的软件系统。 



分布式是指将不同的业务分布在不同的地方。

集群指的是将几台服务器集中在一起，实现同一业务。 



例如：**京东是一个分布式系统，众多业务运行在不同的机器**，所有业务构成一个大型的**业务集群**。每一个小的业务，比如用户系统，访问压力大的时候一台服务器是不够的。我们就应该将用户系统部署到多个服务器，也就是**每一个业务系统也可以做集群化**； 

***分布式中的每一个节点，都可以做集群。 而集群并不一定就是分布式的。*** 

***节点：集群中的一个服务器***

## **服务熔断&服务降级**

在微服务架构中，微服务之间通过网络进行通信，存在相互依赖，当其中一个服务不可用时，有可能会造成雪崩效应。要防止这样的情况，必须要有容错机制来保护服务。

![img](/alibabaImage/52c47f.png)



1）、服务熔断 

设置服务的超时，当被调用的服务经常失败到达某个阈值，我们可以开启断路保护机制，后来的请求不再去调用这个服务。本地直接返回默认的数据 

2）、服务降级 

在运维期间，当系统处于高峰期，系统资源紧张，我们可以让非核心业务降级运行。降级：某些服务不处理，或者简单处理【抛异常、返回 NULL、调用 Mock 数据、调用 Fallback 处理逻辑】



## **API 网关**

在微服务架构中，API Gateway 作为整体架构的重要组件，它***抽象了微服务中都需要的公共功能***，同时提供了客户端**负载均衡**，**服务自动熔断**，**灰度发布**，**统一认证**，**限流流控**，**日志统计**等丰富的功能，帮助我们解决很多 API 管理难题。

![img](/alibabaImage/718a16.png)

## Spring Cloud Alibaba 是什么

Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

此外，[Spring Cloud Alibaba 企业版](https://www.aliyun.com/product/aliware/mse?spm=sca-website.topbar.0.0.0)，包括无侵入服务治理(全链路灰度，无损上下线，离群实例摘除等)，企业级 Nacos 注册配置中心和企业级云原生网关等众多产品。

### Spring Cloud 微服务体系

Spring Cloud 是分布式微服务架构的一站式解决方案，它提供了一套简单易用的编程模型，使我们能在 Spring Boot 的基础上轻松地实现微服务系统的构建。 **Spring Cloud 提供以微服务为核心的分布式系统构建标准。**

![spring-cloud](/alibabaImage/spring-cloud-img.png)

Spring Cloud 本身并不是一个开箱即用的框架，它是一套微服务规范，共有两代实现。

- Spring Cloud Netflix 是 Spring Cloud 的第一代实现，主要由 Eureka、Ribbon、Feign、Hystrix 等组件组成。
- Spring Cloud Alibaba 是 Spring Cloud 的第二代实现，主要由 Nacos、Sentinel、Seata 等组件组成。

### Spring Cloud Alibaba 定位

![spring-cloud](/alibabaImage/spring-cloud-alibaba-img.png)

Spring Cloud Alibaba 是阿里巴巴结合自身丰富的微服务实践而推出的微服务开发的一站式解决方案，是 Spring Cloud 第二代实现的主要组成部分。吸收了 Spring Cloud Netflix 微服务框架的核心架构思想，并进行了高性能改进。自 Spring Cloud Netflix 进入停更维护后，Spring Cloud Alibaba 逐渐代替它成为主流的微服务框架。

同时 Spring Cloud Alibaba 也是国内首个进入 Spring 社区的开源项目。2018 年 7 月，Spring Cloud Alibaba 正式开源，并进入 Spring Cloud 孵化器中孵化；2019 年 7 月，Spring Cloud 官方宣布 Spring Cloud Alibaba 毕业，并将仓库迁移到 Alibaba Github OSS 下。

## 版本发布说明

### 2023.x 分支

适配 Spring Boot 3.2，Spring Cloud 2023.x 版本及以上的 Spring Cloud Alibaba 版本按从新到旧排列如下表（最新版本用*标记）：

| Spring Cloud Alibaba Version | Spring Cloud Version  | Spring Boot Version |
| ---------------------------- | --------------------- | ------------------- |
| 2023.0.1.0*                  | Spring Cloud 2023.0.1 | 3.2.4               |
| 2023.0.0.0-RC1               | Spring Cloud 2023.0.0 | 3.2.0               |

### 组件版本关系

每个 Spring Cloud Alibaba 版本及其自身所适配的各组件对应版本如下表所示：

| Spring Cloud Alibaba Version | Sentinel Version | Nacos Version | RocketMQ Version | Seata Version |
| ---------------------------- | ---------------- | ------------- | ---------------- | ------------- |
| 2023.0.1.0                   | 1.8.6            | 2.3.2         | 5.1.4            | 2.0.0         |
| 2023.0.0.0-RC1               | 1.8.6            | 2.3.0         | 5.1.4            | 2.0.0         |

## `Nacos`

### `Nacos`概述

[Nacos](https://nacos.io/zh-cn/) /nɑ:k əʊs/ 是 Dynamic Naming and Configuration Service 的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

`Nacos` 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。

`Nacos` 帮助您更敏捷和容易地构建、交付和管理微服务平台。Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。

### 什么是 Nacos？

服务（Service）是 Nacos 世界的一等公民。Nacos 支持几乎所有主流类型的“服务”的发现、配置和管理：

[Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/)

[gRPC](https://grpc.io/docs/guides/concepts.html#service-definition) & [Dubbo RPC Service](https://dubbo.apache.org/)

[Spring Cloud RESTful Service](https://spring.io/projects/spring-cloud)

Nacos 的关键特性包括:

- **服务发现和服务健康监测**

  Nacos 支持基于 DNS 和基于 RPC 的服务发现。服务提供者使用 [原生SDK](https://nacos.io/docs/latest/guide/user/sdk/)、[OpenAPI](https://nacos.io/docs/latest/guide/user/open-api/)、或一个[独立的Agent TODO](https://nacos.io/docs/latest/guide/user/other-language/)注册 Service 后，服务消费者可以使用[DNS TODO](https://nacos.io/docs/latest/ecology/use-nacos-with-coredns/) 或[HTTP&API](https://nacos.io/docs/latest/guide/user/open-api/)查找和发现服务。

  Nacos 提供对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求。Nacos 支持传输层 (PING 或 TCP)和应用层 (如 HTTP、MySQL、用户自定义）的健康检查。 对于复杂的云环境和网络拓扑环境中（如 VPC、边缘网络等）服务的健康检查，Nacos 提供了 agent 上报模式和服务端主动检测2种健康检查模式。Nacos 还提供了统一的健康检查仪表盘，帮助您根据健康状态管理服务的可用性及流量。

- **动态配置服务**

  动态配置服务可以让您以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置。

  动态配置消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷。

  配置中心化管理让实现无状态服务变得更简单，让服务按需弹性扩展变得更容易。

  Nacos 提供了一个简洁易用的UI ([控制台样例 Demo](http://console.nacos.io/nacos/index.html)) 帮助您管理所有的服务和应用的配置。Nacos 还提供包括配置版本跟踪、金丝雀发布、一键回滚配置以及客户端配置更新状态跟踪在内的一系列开箱即用的配置管理特性，帮助您更安全地在生产环境中管理配置变更和降低配置变更带来的风险。

- **动态 DNS 服务**

  动态 DNS 服务支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务。动态DNS服务还能让您更容易地实现以 DNS 协议为基础的服务发现，以帮助您消除耦合到厂商私有服务发现 API 上的风险。

  Nacos 提供了一些简单的 [DNS APIs TODO](https://nacos.io/docs/latest/ecology/use-nacos-with-coredns/) 帮助您管理服务的关联域名和可用的 IP

  

  列表.

  

- **服务及其元数据管理**

  Nacos 能让您从微服务平台建设的视角管理数据中心的所有服务及元数据，包括管理服务的描述、生命周期、服务的静态依赖分析、服务的健康状态、服务的流量管理、路由及安全策略、服务的 SLA 以及最首要的 metrics 统计数据。

## 使用的版本

1. `spring-cloud.alibaba`: 2023.0.3.2 
2. `spring-cloud`：2023.0.3
3. `springboot`：3.3.4

### 搭建项目

1. 搭建一个这个目录的项目

   ![image-20250326181953606](/alibabaImage/image-20250326181953606.png)

2. 在`study-spring-cloud-alibaba`项目下添加依赖

   1. 

   ```xml
   <properties>
       <maven.compiler.source>17</maven.compiler.source>
       <maven.compiler.target>17</maven.compiler.target>
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
       <spring-cloud-alibaba.version>2023.0.3.2</spring-cloud-alibaba.version>
       <spring-cloud.version>2023.0.3</spring-cloud.version>
       <spring-boot.version>3.3.4</spring-boot.version>
   </properties>
   <dependencyManagement>
       <dependencies>
         <!-- spring-cloud alibaba -->
         <dependency>
           <groupId>com.alibaba.cloud</groupId>
           <artifactId>spring-cloud-alibaba-dependencies</artifactId>
           <version>${spring-cloud-alibaba.version}</version>
           <type>pom</type>
           <scope>import</scope>
         </dependency>
         <!-- spring-boot -->
         <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-dependencies</artifactId>
           <version>${spring-boot.version}</version>
         </dependency>
         <!-- spring-cloud -->
         <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-dependencies</artifactId>
           <version>${spring-cloud.version}</version>
           <type>pom</type>
           <scope>import</scope>
         </dependency>
       </dependencies>
   </dependencyManagement>
   ```

3. 在`services`项目下添加依赖

   ```xml
   <dependencies>
       <!-- 服务发现 -->
       <dependency>
           <groupId>com.alibaba.cloud</groupId>
           <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-openfeign</artifactId>
       </dependency>
   </dependencies>
   ```

4. 下载`Nacos` [Nacos Server 下载 地址](https://nacos.io/download/nacos-server/?spm=5238cd80.2ef5001f.0.0.3f613b7cxWlkjC#稳定版本)

5. 下载完之后解压到一个没有中文和空格的文件夹下

6. 解压完成之后，进入bin文件夹下在`cmd`输入 `startup.cmd -m standalone`启动`Nacos`

7. ![image-20250326183208176](/alibabaImage/image-20250326183208176.png)

8. 启动完成之后我们访问`localhost:8848/nacos`来访问`Nacos`

   > 注意：
   >
   > ​	如果访问`localhost:8848`会访问不到

9. 集成 `Nacos`

   1. 基于上面的项目在`service-order`和`service-product`添加依赖

      ```xml
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
      </dependency>
      ```

   2. 编写`service-order`和`service-product`配置

      1. `service-order`

         ```yaml
         spring:
           application:
             name: service-order
           cloud:
             nacos:
               server-addr: 127.0.0.1:8848 # nacos 注册地址
         server:
           port: 8000
         ```

      2. `service-product`

         ```yaml
         spring:
           application:
             name: service-product
           cloud:
             nacos:
               server-addr: 127.0.0.1:8848 # nacos 注册地址
         server:
           port: 9000
         ```

      3. 启动这两个项目

      4. 访问`localhost:8848/nacos`

      5. ![image-20250326193343921](/alibabaImage/image-20250326193343921.png)

      6. 从图中看的我们的两个服务已经注册到`Nacos`上了

         >注意：
         >
         >​	`Nacos`必须开启，要不然访问不到

## 服务注册/发现&注册中心

A 服务调用 B 服务，A 服务并不知道 B 服务当前在哪几台服务器有，哪些正常的，哪些服务已经下线。解决这个问题可以引入注册中心；

![img](/alibabaImage/d2db.png)

如果某些服务下线，我们其他人可以实时的感知到其他服务的状态，从而避免调用不可用的服务

服务发现是一种允许服务之间相互发现和通信的机制

服务发现是一种**允许服务之间相互发现和通信的机制**。服务发现包括服务注册和服务查找两个过程。服务注册是指服务将自己的网络地址注册到服务注册中心。服务查找是指服务通过查询服务注册中心来获取其他服务的网络地址。服务发现的优点是提高了系统的灵活性和可扩展性，无需关心服务的具体位置，只需要知道服务的名称。服务发现还需要提供健康监控、多种查询、实时更新和高可用性等特性。

开启服务发现：

1. 在启动类上添加服务发现的注解 `@EnableDiscoveryClient`

2. 获取端口号，主机名字

   ```java
   @Autowired
   private DiscoveryClient discoveryClient;
   @Test
   void discoveryTest(){
       //获取所有服务
       List<String> services = discoveryClient.getServices();
       for (String service : services) {
           // 根据服务获取所有实例
           List<ServiceInstance> instances = discoveryClient.getInstances(service);
           for (ServiceInstance instance : instances) {
               //主机地址
               System.out.println("host："+instance.getHost());
               //获取url
               System.out.println("uri："+instance.getUri());
               //获取端口号
               System.out.println("port："+instance.getPort());
           }
       }
   }
   ```

3. 测试结果

   ![image-20250327215131828](/alibabaImage/image-20250327215131828.png)

4. 使用`NacosDiscoveryClint`获取服务实例

   ```java
   @Resource
   private NacosDiscoveryClient nacosDiscoveryClient;
   
   @Test
   void nacosDiscoveryClientTest() {
       // 获取所有服务
       List<String> services = nacosDiscoveryClient.getServices();
       for (String service : services) {
           // 根据服务获取实例
           for (ServiceInstance instance : nacosDiscoveryClient.getInstances(service)) {
               //主机地址
               System.out.println("host："+instance.getHost());
               // 端口号
               System.out.println("port："+instance.getPort());
               System.out.println("uri："+instance.getUri());
               System.out.println("实例id："+instance.getInstanceId());
           }
       }
   }
   ```

   ![image-20250327215734279](/alibabaImage/image-20250327215734279.png)

## 远程调用

在分布式系统中，各个服务可能处于不同主机，但是服务之间不可避免的需要互相调用，我们称为远程调用。 SpringCloud 中使用 HTTP+JSON 的方式完成远程调用

![img](/alibabaImage/1733297496168-259c804b-17cc-4f14-9127-9eb0f56c049b.png)



在Spring Cloud中，远程调用是微服务架构中非常重要的一部分。它允许一个服务调用另一个服务的API，从而实现服务之间的通信。Spring Cloud提供了多种方式来实现远程调用，主要包括**RestTemplate**和**Feign**，我们就有 `RestTemplate`来实现远程调用，我们要用订单远程调用商品

1. 在`study-spring-cloud-alibab`下新建一个`model`模块作为公共模块，在存放`service-order`和`service-product`的公共模块,在下面在引入`lombok`依赖

   ![image-20250327225354669](/alibabaImage/image-20250327225354669.png)

2. 在`model`创建`Order实体类`和`Product实体类`

   1. `Order实体类`

      ```java
      package com.lazy.cloud.order.bean;
      
      @Data
      @AllArgsConstructor
      @NoArgsConstructor
      public class Order {
          private Long id;
          private BigDecimal totalAmount;
          private Long userId;
          private String address;
          private List<Product> productList;
      }
      
      ```

   2. `Product实体类`

      ```java
      package com.lazy.cloud.product.bean;
      
      @Data
      @AllArgsConstructor
      @NoArgsConstructor
      public class Product {
          private Long id;
          private BigDecimal price;
          private String productName;
          private Integer num;
      }
      
      ```

   3. 在`service-order`和`service-product`的父项`service`引入`model`

      ```xml
      <dependency>
          <groupId>com.lazy.cloud</groupId>
          <artifactId>model</artifactId>
          <version>1.0-SNAPSHOT</version>
      </dependency>
      ```

   4. `service-product`

      1. `service`

         ```java
         package com.lazy.cloud.service;
         
         public interface ProductService {
             Product addProduct(Long productId);
         }
         ```

      2. `impl`

         ```java
         package com.lazy.cloud.service.impl;
         
         @Service
         public class ProductServiceImpl implements ProductService {
         
             @Override
             public Product addProduct(Long productId) {
                 return new Product(productId,new BigDecimal("20.0"),"苹果"+productId,2);
             }
         }	
         ```

      3. `controller`

         ```java
         package com.lazy.cloud.controller;
         
         @RestController
         public class ProductController {
         
             @Resource
             private ProductService productService;
         
             @GetMapping("/product/{productId}")
             public Product getProduct(@PathVariable("productId") Long productId) {
                 return productService.addProduct(productId);
             }
         }
         
         ```

      4. 测试`service-product`

         ![image-20250327230127411](/alibabaImage/image-20250327230127411.png)

   5. `service-order`

      1. `service`

         ```java
         package com.lazy.cloud.service;
         
         public interface OrderService {
             Order addOrder(Long userId, Long productId);
         }
         ```

      2. `impl`

         ```java
         package com.lazy.cloud.service.impl;
         
         @Slf4j
         @Service
         public class OrderServiceImpl implements OrderService {
         
             @Resource
             private DiscoveryClient discoveryClient;
         
             @Resource
             private RestTemplate restTemplate;
         
             @Override
             public Order addOrder(Long userId, Long productId) {
                 Product product = getProductFormRemote(productId);
                 BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));
         
                 return new Order(userId,price,productId,"河北", List.of(product));
             }
         
             public Product getProductFormRemote(Long productId) {
                 //获取商品所在的所有机器的IP+Port
                 List<ServiceInstance> instances = discoveryClient.getInstances("service-product");
                 log.info("远程请求调用{}",instances.get(0).getUri());
                 String url = instances.get(0).getUri()+"/product/"+productId;
         
                 return restTemplate.getForObject(url, Product.class);
             }
         }
         ```

      3. `config`配置`RestTemplate`

         ```java
         package com.lazy.cloud.config;
         
         @Configuration
         public class OrderServiceConfig {
         
             @Bean
             public RestTemplate restTemplate() {
                 return new RestTemplate();
             }
         }
         
         ```

         

      4. `controller`

         ```java
         package com.lazy.cloud.controller;
         
         @RestController
         public class OrderController {
         
             @Resource
             private OrderService orderService;
         
             @GetMapping("/addOrder")
             public Order addOrder(
                     @RequestParam("userId") Long userId,
                     @RequestParam("productId") Long productId
             ) {
                 return orderService.addOrder(userId, productId);
             }
         }
         
         ```

      5. 测试`service-product`,要启动`service-product`和`service-order`

         ![image-20250327230508764](/alibabaImage/image-20250327230508764.png)

## 负载均衡

分布式系统中，A 服务需要调用 B 服务，B 服务在多台机器中都存在，A 调用任意一个服务器均可完成功能。 为了使每一个服务器都不要太忙或者太闲，我们可以负载均衡的调用每一个服务器，提升网站的健壮性。 

***常见的负载均衡算法：*** 

- **轮询：** 为第一个请求选择健康池中的第一个后端服务器，然后按顺序往后依次选择，直到最后一个，然后循环。 

- **最小连接：** 优先选择连接数最少，也就是压力最小的后端服务器，在会话较长的情况下可以考虑采取这种方式。 

- **散列：** 根据请求源的 IP 的散列（hash）来选择要转发的服务器。这种方式可以一定程度上保证特定用户能连接到相同的服务器。如果你的应用需要处理状态而要求用户能连接到和之前相同的服务器，可以考虑采取这种方式。

![img](/alibabaImage/1733297584522-54991385-dc66-4e94-a9a0-159da79227f6.png)

### LoadBalancer负载均衡

当我们的`service-product`服务崩了，随着我们的`service-order`服务也用不了了，所以我们要引入负载均衡	

因为我们的`service-order`服务对我们的`service-product`进行调用，所以说服务调用者是`service-order`，对我们的`service-product`进行负载均衡

1. 对我们的`service-order`引入负载均衡的依赖

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-loadbalancer</artifactId>
   </dependency>
   ```

2. 修改`OrderServiceImpl`进行改造

   ```java
   package com.lazy.cloud.service.impl;
   
   @Slf4j
   @Service
   public class OrderServiceImpl implements OrderService {
   
       @Resource
       private RestTemplate restTemplate;
   
       @Override
       public Order addOrder(Long userId, Long productId) {
           Product product = getProductFormRemoteWithLoadBalance(productId);
           BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));
   
           return new Order(userId,price,productId,"河北", List.of(product));
       }
   
       @Resource
       private LoadBalancerClient loadBalancer;
   
       public Product getProductFormRemoteWithLoadBalance(Long productId) {
           //获取商品所在的所有机器的IP+Port
           ServiceInstance serviceInstance = loadBalancer.choose("service-product");
           log.info("远程请求调用{}",serviceInstance.getUri());
           String url = serviceInstance.getUri()+"/product/"+productId;
   
           return restTemplate.getForObject(url, Product.class);
       }
   }
   
   ```

3. 运行测试

   当我们运行多次后发现，已经实现了负载均衡

   ![image-20250327232746247](/alibabaImage/image-20250327232746247.png)
   
   ### 基于注解的负载均衡
   
   1. 改造`OrderServiceConfig`
   
      ```java
      package com.lazy.cloud.config;
      
      @Configuration
      public class OrderServiceConfig {
      
          @Bean
          @LoadBalanced
          public RestTemplate restTemplate() {
              return new RestTemplate();
          }
      }
      ```
   
   2. 改造`OrderServiceImpl`类
   
      ```java
      package com.lazy.cloud.service.impl;
      
      @Slf4j
      @Service
      public class OrderServiceImpl implements OrderService {
      
          @Resource
          private RestTemplate restTemplate;
      
      
          @Override
          public Order addOrder(Long userId, Long productId) {
              Product product = getProductFormRemoteWithLoadBalanceAnnotation(productId);
              BigDecimal price = product.getPrice().multiply(new BigDecimal(product.getNum()));
      
              return new Order(userId,price,productId,"河北", List.of(product));
          }
          // 基于注解的负载均衡
          public Product getProductFormRemoteWithLoadBalanceAnnotation(Long productId) {
              String url = "http://service-product/product/"+productId;
              log.info("远程请求调用{}",url);
              return restTemplate.getForObject(url, Product.class);
          }
      }
      ```
   
   3. 运行测试，访问`localhost:8000/addOrder?userId=1&productId=100](http://localhost:8000/addOrder?userId=1&productId=100`
   
      ![image-20250328181459804](/alibabaImage/4.png)
   
      ![image-20250328181508786](/alibabaImage/6.png)

## 小结

**如果注册中心宕机，远程调用是否可以成功？**

1. 从未调用过，如果宕机，调用会立即失败
2. 调用过，如果宕机，因为会缓存名单，调用会成功
3. 调用过，如果注册中心和对方服务宕机，因为会缓存名单，调用会阻塞后失败（Connection Refused）

![img](/alibabaImage/81.png)

## 配置中心

主要提示：

![image-20250328224501029](/alibabaImage/9.png)

每一个服务最终都有大量的配置，并且每个服务都可能部署在多台机器上。我们经常需要变更配置，我们可以让每个服务在配置中心获取自己的配置。 

***配置中心用来集中管理微服务的配置信息***

![img](/alibabaImage/fa.png)

## 1、使用@value和@RefreshScope自动刷新

1. 在`service`下引入依赖

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
   </dependency>
   ```

2. 在`service-order`编写配置文件

   ```yaml
   spring:
     application:
       name: service-order
     cloud:
       nacos:
         server-addr: 127.0.0.1:8848 # nacos 服务地址和端口号
     config:
       import: nacos:service-order.properties # nacos 配置列表的名字
   server:
     port: 8000
   ```

3. 打开`nacos`创建`service-order.properties`

   ![image-20250328203049848](/alibabaImage/18.png)

4. 点击创建配置、创建`service-order.properties`

   ![image-20250328203254934](/alibabaImage/34.png)

5. 点击发布

   ![image-20250328203317623](/alibabaImage/623.png)

6. 编写`controller`类来进行测试

   ```java
   package com.lazy.cloud.controller;
   
   @RestController
   public class OrderController {
   
       @Value("${order.timeout}")
       private String timeout;
       @Value("${order.auto-confirm}")
       private String autoConfirm;
   
       @GetMapping("/config")
       public String config() {
           return "timeout："+timeout+"\nauto-confirm"+autoConfirm;
       }
   
   }
   ```

7. 运行测试一下

   ![image-20250328203656304](/alibabaImage/20250328203656304.png)

8. 发现已经，可以访问了，我们在修改一下`service-order.properties`，测试一下看看本地是否变

   ![image-20250328203803399](/alibabaImage/03399.png)

9. 在刷新一下，配置文件变了，本地没有变

   ![image-20250328203845610](/alibabaImage/-20250328203845610.png)

10. 我们在改造一下`controller`类，让他实现实时刷新

    ```java
    package com.lazy.cloud.controller;
    
    import com.lazy.cloud.order.bean.Order;
    import com.lazy.cloud.service.OrderService;
    import jakarta.annotation.Resource;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.cloud.context.config.annotation.RefreshScope;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    
    @RefreshScope // 配置自动刷新
    @RestController
    public class OrderController {
    
        @Value("${order.timeout}")
        private String timeout;
        @Value("${order.auto-confirm}")
        private String autoConfirm;
    
        @GetMapping("/config")
        public String config() {
            return "timeout："+timeout+"\nauto-confirm"+autoConfirm;
        }
    }
    ```

11. 在运行一下看看，发现配置已经变了

    ![image-20250328204107416](/alibabaImage/250328204107416.png)

12. 我们在变回来试试

    ![image-20250328204146150](/alibabaImage/image-20250328204146150.png)

发现配置实现了实时刷新！

>注意：
>​	如果导入了`spring-cloud-starter-alibaba-nacos-config`依赖就必须编写`spring.config.import`配置，不然启动的时候，启动不起来，或者添加`spring.cloud.nacos.config.import-check.enabled=false`也行。`spring.cloud.nacos.config.import-check.enabled=false`是禁用导入检查

## 2、使用@ConfigurationProperties无感刷新

1. 导入`spring-cloud-starter-alibaba-nacos-config`依赖

2. 新建`OrderProerties`类

   ```java
   package com.lazy.cloud.config;
   
   @Component
   @ConfigurationProperties(prefix = "order") //配置批量绑定在nacos下，可以无需@RefreshScope就能实现自动刷新
   @Data
   public class OrderProperties {
       private String timeout;
       private String autoConfirm;
   }
   
   ```

3. `controller`

   ```java
   package com.lazy.cloud.controller;
   
   @RestController
   public class OrderController {
   
       @Resource
       private OrderService orderService;
   
   
       @Resource
       private OrderProperties orderProperties;
   
       @GetMapping("/config")
       public String config() {
           return "timeout："+orderProperties.getTimeout()+"\nauto-confirm"+orderProperties.getAutoConfirm();
       }
   }
   ```

4. 运行测试

   ![image-20250328205953330](/alibabaImage/image-20250328205953330.png)

5. 修改`service-order.properties`,再刷新

   ![image-20250328210102666](/alibabaImage/image-20250328210102666.png)

发现可以实现无感刷新

## 配置监听变换

需求，当我们发现` service-order.properties`配置文件修改后，发生短信通知配置文件已修改

```java
package com.lazy.cloud;

@SpringBootApplication
public class ServiceOrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceOrderApplication.class, args);
    }
    //1、项目启动就监听配置文件变化
    //2、发生变换后拿到变化值
    //3、发生邮件
    /**
     * ApplicationRunner 是一个一次性任务，项目启动成功后，这个任务就会执行
     * @return
     */
    @Bean
    ApplicationRunner applicationRunner(NacosConfigManager configManager) {
        return args -> {
            ConfigService configService = configManager.getConfigService();
            configService.addListener("service-order.properties", "DEFAULT_GROUP", new Listener() {
                // 线程池,Executors.newFixedThreadPool(4) new 了4个线程
                @Override
                public Executor getExecutor() {
                    return Executors.newFixedThreadPool(4);
                }
                // receiveConfigInfo 接受所有变化了的配置
                @Override
                public void receiveConfigInfo(String s) {
                    System.out.println("变化了的配置："+s);
                    System.out.println("邮件通知...");
                }
            });
        };
    }
}

```

启动测试，当我们修改`service-order.properties`配置文件后，看看控制台打印什么

![image-20250328211705854](/alibabaImage/image-20250328211705854.png)

## nacos重启后配置还会有吗？

会，配置会保存到本地

![image-20250328213407805](/alibabaImage/image-20250328213407805.png)

官方解释

![image-20250328213727113](/alibabaImage/image-20250328213727113.png)

## `Nacos`中的数据集和`application.properties`中有相同的配置项，那个先生效

在Nacos中，当配置中心（Nacos Server）中的数据集（如通过`dataId`和`groupId`指定的配置）与本地`application.properties`文件中存在**相同配置项**时，**生效优先级**取决于以下规则：

------

### **1. 默认情况下：Nacos配置中心的优先级更高**

- **Nacos配置会覆盖本地配置**。即如果Nacos Server和`application.properties`有相同的配置项，Nacos中的值会生效。
- **原因**：Spring Cloud Alibaba Nacos Config默认将远程配置（Nacos）作为高优先级源，本地配置作为低优先级源。这是通过`PropertySource`的顺序实现的（Nacos的配置通常被添加到`Environment`的前部）。

------

### **2. 关键配置项：`spring.cloud.nacos.config.override-none`**

如果希望本地配置优先，可以通过以下配置显式控制：

```properties
# 设置为true时，本地配置优先（默认false）
spring.cloud.nacos.config.override-none=true
```

- **`false`（默认）**：Nacos配置覆盖本地配置。
- **`true`**：本地配置优先，Nacos中的同名配置不生效。

------

### **3. 验证顺序**

可以通过以下方式查看实际生效的配置：

1. **检查`Environment`中的属性顺序**：

   ```java
   @Autowired
   private Environment env;
   
   // 打印所有PropertySource
   ((AbstractEnvironment) env).getPropertySources().forEach(System.out::println);
   ```

   - 输出中排名靠前的`PropertySource`优先级更高（如Nacos的配置通常以`NACOS`开头）。

2. **直接获取配置值**：

   ```java
   @Value("${your.config.key}")
   private String configValue;
   ```

   观察实际注入的值是来自Nacos还是本地。

------

### **4. 动态刷新与本地配置**

- 即使`Nacos`配置覆盖了本地配置，当`Nacos`中的配置**动态更新**时，应用也会实时生效（需配合`@RefreshScope`注解）。
- 本地`application.properties`的配置是静态的，启动后无法动态修改。

------

### **总结**

| 场景                              | 生效配置                         |
| :-------------------------------- | :------------------------------- |
| 默认情况（`override-none=false`） | `Nacos`配置优先                  |
| 显式设置`override-none=true`      | 本地`application.properties`优先 |

## 配置中心-数据隔离

在企业研发过程中，通常需要在多个环境中进行开发、测试和部署，以确保生产环境的稳定性。`Nacos`提供了一种优雅的方式来实现环境隔离，确保不同环境的数据和配置互不干扰。

环境隔离的概念

环境是指一整套独立的系统，包括网关、服务框架、微服务注册中心、配置中心、消息系统、缓存、数据库等组件，用于处理特定类别的请求。环境隔离的主要目的是提高系统的可用性和稳定性，避免故障影响到整个系统。

`Nacos`实现环境隔离的方法

`Nacos`通过以下几种方式实现环境隔离：

1. **网段划分**：利用IP地址的网段划分不同的环境。例如，192.168.1.0/24属于环境A，192.168.2.0/24属于环境B。通过这种方式，不同网段的`Nacos`客户端会自动获取到不同的`Nacos`服务端IP列表，实现环境隔离。
2. **命名空间（Namespace）**：命名空间用于进行租户粒度的配置隔离，不同的命名空间下可以存在相同的Group或Data ID的配置。在`Nacos`的管理界面中，可以创建新的命名空间，并在配置文件中指定命名空间ID，以实现配置的隔离。
3. **配置分组（Group）**：通过配置分组，可以将不同环境的配置文件进行区分。例如，开发环境的配置文件可以使用Group=DEV，测试环境的配置文件可以使用Group=TEST。在配置文件中指定不同的Group，就能对应到不同的配置文件。

步骤：

1. 在`Nacos`创建3个环境，分别为开发环境(`dev`)、测试环境(`test`)、生产环境(`prod`)

2. ![image-20250328215833735](/alibabaImage/image-20250328215833735.png)

3. 按照这个顺序创建

   ![image-20250328215908057](/alibabaImage/image-20250328215908057.png)

4. `commont.properties`在`dev`环境下的配置文件，`prod`环境各加1，`test`环境各加2

   ![image-20250328220316072](/alibabaImage/image-20250328220316072.png)

5. `database.properties`在`dev`环境下的配置文件，`prod`环境换成`order.db_url=order_prod`,`test`环境换成`order.db_url=order_test`![image-20250328220602433](/alibabaImage/image-20250328220602433.png)

6. `common.properties`商品在`dev`环境下的配置文件，`prod`环境各加10，`test`环境各加10

   ![image-20250328220908201](/alibabaImage/image-20250328220908201.png)

7. 结果

   ![image-20250328221320164](/alibabaImage/image-20250328221320164.png)

   ![image-20250328221340427](/alibabaImage/image-20250328221340427.png)

   ![image-20250328221358203](/alibabaImage/image-20250328221358203.png)

   

   ## 读取`nacos`上的配置文件并显示

   配置文件

   ```yaml
   server:
     port: 8000
   spring:
     profiles:
       active: dev # 激活那个环境
     application:
       name: service-order
     cloud:
       nacos:
         server-addr: 127.0.0.1:8848 # nacos 服务地址和端口号
         config:
           namespace: ${spring.profiles.active:dev} # 要读取 nacos 的配置,默认为dev环境
   ---
   spring:
     config:
       import:
        - nacos:common.properties?group=order # nacos 配置列表的名字
        - nacos:database.properties?group=order
       activate:
         on-profile: dev # 动态激活判断，如果当前是 dev 环境才会生效
   ---
   spring:
     config:
       import:
         - nacos:common.properties?group=order # nacos 配置列表的名字
         - nacos:database.properties?group=order
       activate:
         on-profile: prod # 动态激活判断，如果当前是 prod 环境才会生效
   ---
   spring:
     config:
       import:
         - nacos:common.properties?group=order # nacos 配置列表的名字
         - nacos:database.properties?group=order
       activate:
         on-profile: test # 动态激活判断，如果当前是 test 环境才会生效
   ```

   实体类

   ```java
   package com.lazy.cloud.config;
   
   import lombok.Data;
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.stereotype.Component;
   
   @Component
   @ConfigurationProperties(prefix = "order") //配置批量绑定在nacos下，可以无需@RefreshScope就能实现自动刷新
   @Data
   public class OrderProperties {
       private String timeout;
       private String autoConfirm;
       private String dbUrl;
   }
   ```

   `controller`

   ```java
   package com.lazy.cloud.controller;
   
   @RestController
   public class OrderController {
   
       @Resource
       private OrderProperties orderProperties;
   
       @GetMapping("/config")
       public String config() {
           return "timeout="+orderProperties.getTimeout()
                   +"auto-confirm="+orderProperties.getAutoConfirm()
                   +"db-url="+orderProperties.getDbUrl();
       }
   
   }
   ```

   测试

   ![image-20250328225403518](/alibabaImage/image-20250328225403518.png)

   我们切换到`prod`环境下试试

   ![image-20250328225446750](/alibabaImage/image-20250328225446750.png)

   发现我们已经成功了！

   ## `Nacos`拉取`data-id`的注意事项

   >在 Nacos Spring Cloud 中，`dataId` 的完整格式如下：
   >
   >- `prefix` 默认为 `spring.application.name` 的值，也可以通过配置项 `spring.cloud.nacos.config.prefix`来配置。
   >- `spring.profiles.active` 即为当前环境对应的 profile，详情可以参考 [Spring Boot文档](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html#boot-features-profiles)。 **注意：当 `spring.profiles.active` 为空时，对应的连接符 `-` 也将不存在，dataId 的拼接格式变成 `${prefix}.${file-extension}`**
   >- `file-exetension` 为配置内容的数据格式，可以通过配置项 `spring.cloud.nacos.config.file-extension` 来配置。目前只支持 `properties` 和 `yaml` 类型。

总结：先拉取不带后缀名的，类似于`data`在拉取代后缀名的，类似与`data.properties/yaml`最后拉取，带当前对应环境的`data.properties.dev`

## 从远程更换端口号

1. 在`nacos`上创建好文件,和配置

   ![image-20250328235251100](/alibabaImage/image-20250328235251100.png)

2. 在`application.yaml`中引用文件

   ```yaml
   spring:
     profiles:
       active: dev # 激活那个环境
     application:
       name: service-order
     cloud:
       nacos:
         server-addr: 127.0.0.1:8848 # nacos 服务地址和端口号
         config:
           namespace: ${spring.profiles.active:dev} # 要读取 nacos 的配置,默认为dev环境
   ---
   spring:
     config:
       import:
        - nacos:common.properties?group=order # nacos 配置列表的名字
        - nacos:database.properties?group=order
       activate:
         on-profile: dev # 动态激活判断，如果当前是 dev 环境才会生效
   ---
   spring:
     config:
       import:
         - nacos:common.properties?group=order # nacos 配置列表的名字
         - nacos:database.properties?group=order
       activate:
         on-profile: prod # 动态激活判断，如果当前是 prod 环境才会生效
   ---
   spring:
     config:
       import:
         - nacos:common.properties?group=order # nacos 配置列表的名字
         - nacos:database.properties?group=order
       activate:
         on-profile: test # 动态激活判断，如果当前是 test 环境才会生效
   ```

3. 启动测试

![image-20250328235418981](/alibabaImage/image-20250328235418981.png)

## Nacos集群配置和本地持久化配置

## Nacos集群模式

本部署手册是帮忙您快速在你的电脑上，下载安装并使用Nacos，部署生产使用的集群模式。

### 集群部署架构图

无论采用何种部署方式，推荐用户把Nacos集群中所有服务节点放到一个vip下面，然后挂到一个域名下面。

`<http://ip1:port/openAPI>` 直连ip模式，机器挂则需要修改ip才可以使用。

`<http://SLB:port/openAPI>` 挂载SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，直连SLB即可，下面挂server真实ip，可读性不好。

`<http://nacos.com:port/openAPI>` 域名 + SLB模式(内网SLB，不可暴露到公网，以免带来安全风险)，可读性好，而且换ip方便，推荐模式

![deployDnsVipMode.jpg](/alibabaImage/deploy-dns-vip-mode.svg)

在使用VIP时，需要开放Nacos服务的主端口(默认8848)以及gRPC端口(默认9848)、同时如果对Nacos的主端口有所修改的话，需要对vip中的端口映射作出配置，具体端口的映射方式参考[部署手册概览-Nacos部署架构](https://nacos.io/docs/latest/manual/admin/deployment/deployment-overview/#1-Nacos部署架构)

### 配置到mysql

1. 安装数据库，版本要求：5.6.5+

2. 新建`mysql-schema`库，把`nacos/conf`的`mysql-schema.sql`复制到数据库

   1. ![image-20250404174959032](/alibabaImage/image-20250404174959032.png)
   2. ![image-20250404175208957](/alibabaImage/image-20250404175208957.png)

3. 修改配置文件

   ![image-20250404175322497](/alibabaImage/image-20250404175322497.png)

   ![image-20250404175614989](/alibabaImage/image-20250404175614989.png)

4. 修改完重新启动

   ![image-20250404175716337](/alibabaImage/image-20250404175716337.png)

   启动成功，没有报错，证明修改好了！创建一个配置文件，看看数据库上有没有

   ![image-20250404175920495](/alibabaImage/image-20250404175920495.png)

   去mysql看看

   ![image-20250404175942147](/alibabaImage/image-20250404175942147.png)

