# 1. 分布式基础

## 1.1. **微服务**

微服务架构风格，就像是把一个**单独的应用程序**开发为**一套小服务**，每个**小服务**运行在**自己**的**进程**中，并使用轻量级机制通信，通常是 HTTP API。这些服务围绕业务能力来构建， 并通过完全自动化部署机制来独立部署。这些服务使用不同的编程语言书写，以及不同数据存储技术，并保持最低限度的集中式管理。 

***简而言之：拒绝大型单体应用，基于业务边界进行服务微化拆分，各个服务独立部署运行。***

![img](/alibabaImage/1733297310596-6a264038-d7d3-43b6-9883-c0d70c43d678.png)



## 1.2. **集群&分布式&节点**

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

## 1.7. **服务熔断&服务降级**

在微服务架构中，微服务之间通过网络进行通信，存在相互依赖，当其中一个服务不可用时，有可能会造成雪崩效应。要防止这样的情况，必须要有容错机制来保护服务。

![img](/alibabaImage/52c47f.png)



1）、服务熔断 

设置服务的超时，当被调用的服务经常失败到达某个阈值，我们可以开启断路保护机制，后来的请求不再去调用这个服务。本地直接返回默认的数据 

2）、服务降级 

在运维期间，当系统处于高峰期，系统资源紧张，我们可以让非核心业务降级运行。降级：某些服务不处理，或者简单处理【抛异常、返回 NULL、调用 Mock 数据、调用 Fallback 处理逻辑】



## 1.8. **API 网关**

在微服务架构中，API Gateway 作为整体架构的重要组件，它***抽象了微服务中都需要的公共功能***，同时提供了客户端**负载均衡**，**服务自动熔断**，**灰度发布**，**统一认证**，**限流流控**，**日志统计**等丰富的功能，帮助我们解决很多 API 管理难题。

![img](/alibabaImage/718a16.png)

# Spring Cloud Alibaba 是什么

Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

此外，[Spring Cloud Alibaba 企业版](https://www.aliyun.com/product/aliware/mse?spm=sca-website.topbar.0.0.0)，包括无侵入服务治理(全链路灰度，无损上下线，离群实例摘除等)，企业级 Nacos 注册配置中心和企业级云原生网关等众多产品。

## Spring Cloud 微服务体系

Spring Cloud 是分布式微服务架构的一站式解决方案，它提供了一套简单易用的编程模型，使我们能在 Spring Boot 的基础上轻松地实现微服务系统的构建。 **Spring Cloud 提供以微服务为核心的分布式系统构建标准。**

![spring-cloud](/alibabaImage/spring-cloud-img.png)

Spring Cloud 本身并不是一个开箱即用的框架，它是一套微服务规范，共有两代实现。

- Spring Cloud Netflix 是 Spring Cloud 的第一代实现，主要由 Eureka、Ribbon、Feign、Hystrix 等组件组成。
- Spring Cloud Alibaba 是 Spring Cloud 的第二代实现，主要由 Nacos、Sentinel、Seata 等组件组成。

## Spring Cloud Alibaba 定位

![spring-cloud](/alibabaImage/spring-cloud-alibaba-img.png)

Spring Cloud Alibaba 是阿里巴巴结合自身丰富的微服务实践而推出的微服务开发的一站式解决方案，是 Spring Cloud 第二代实现的主要组成部分。吸收了 Spring Cloud Netflix 微服务框架的核心架构思想，并进行了高性能改进。自 Spring Cloud Netflix 进入停更维护后，Spring Cloud Alibaba 逐渐代替它成为主流的微服务框架。

同时 Spring Cloud Alibaba 也是国内首个进入 Spring 社区的开源项目。2018 年 7 月，Spring Cloud Alibaba 正式开源，并进入 Spring Cloud 孵化器中孵化；2019 年 7 月，Spring Cloud 官方宣布 Spring Cloud Alibaba 毕业，并将仓库迁移到 Alibaba Github OSS 下。

# 版本发布说明

### 2023.x 分支

适配 Spring Boot 3.2，Spring Cloud 2023.x 版本及以上的 Spring Cloud Alibaba 版本按从新到旧排列如下表（最新版本用*标记）：

| Spring Cloud Alibaba Version | Spring Cloud Version  | Spring Boot Version |
| ---------------------------- | --------------------- | ------------------- |
| 2023.0.1.0*                  | Spring Cloud 2023.0.1 | 3.2.4               |
| 2023.0.0.0-RC1               | Spring Cloud 2023.0.0 | 3.2.0               |

## 组件版本关系

每个 Spring Cloud Alibaba 版本及其自身所适配的各组件对应版本如下表所示：

| Spring Cloud Alibaba Version | Sentinel Version | Nacos Version | RocketMQ Version | Seata Version |
| ---------------------------- | ---------------- | ------------- | ---------------- | ------------- |
| 2023.0.1.0                   | 1.8.6            | 2.3.2         | 5.1.4            | 2.0.0         |
| 2023.0.0.0-RC1               | 1.8.6            | 2.3.0         | 5.1.4            | 2.0.0         |

# `Nacos`

## `Nacos`概述

[Nacos](https://nacos.io/zh-cn/) /nɑ:k əʊs/ 是 Dynamic Naming and Configuration Service 的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

`Nacos` 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。

`Nacos` 帮助您更敏捷和容易地构建、交付和管理微服务平台。Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。

## 什么是 Nacos？

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

# 使用的版本

1. `spring-cloud.alibaba`: 2023.0.3.2 
2. `spring-cloud`：2023.0.3
3. `springboot`：3.3.4

## 搭建项目

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

# 小结

## **如果注册中心宕机，远程调用是否可以成功？**

1. 从未调用过，如果宕机，调用会立即失败
2. 调用过，如果宕机，因为会缓存名单，调用会成功
3. 调用过，如果注册中心和对方服务宕机，因为会缓存名单，调用会阻塞后失败（Connection Refused）

![img](/alibabaImage/81.png)

# 配置中心

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

# Nacos集群模式

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

# 热点参数限流

## Overview

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

# Seata 分布式事务

Seata 框架中有三个角色：

- **Transaction Coordinator(TC):** 事务协调器（TC）：维护全局事务和分支事务的状态，驱动全局提交或回滚。
- **Transaction Manager(TM):** 事务管理器（TM）：定义全局事务的范围：开始全局事务、提交或回滚全局事务。
- **Resource Manager(RM):**资源管理器（RM）：管理参与分支事务的资源，与 TC 通信以注册分支事务并报告分支事务的状态，并驱动分支事务的提交或回滚。

[![Model](/alibabaImage/seata1.png)](https://camo.githubusercontent.com/a302427a15e1ed0cd8da485e8bb38aadc673657d8574aad4023d6e71dadd65c3/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f6c61726b2f302f323031382f706e672f31383836322f313534353031333931353238362d34613930663064662d356664612d343165312d393165302d3261613364333331633033352e706e67)
Seata 管理的分布式事务的典型生命周期：

1. TM 请求 TC 开始一个新的事务。TC 生成一个 XID 来表示全局事务。
2. 
   XID 在微服务调用链中传播。
3. RM 将本地事务注册为 XID 对应的全局事务的分支到 TC。
4. TM 请求 TC 提交或回滚 XID 对应的全局事务。
5. TC 驱动所有分支事务在对应的 XID 全局事务下完成分支提交或回滚。

[![Typical Process](/alibabaImage/seata2.png)](https://camo.githubusercontent.com/837b5a990d776ae3eb3f96126a251390e25cdb27a563157b45ea436f3a0dc541/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f6c61726b2f302f323031382f706e672f31383836322f313534353239363931373838312d32366661626562392d373166612d346633652d386137612d6663333137643333383966342e706e67)

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

[Seata官网](https://seata.apache.org/zh-cn/)

创建四个服务，分别是`seata-account`、`seata-busines`、`seata-storage`、`seata-order`四个服务，分别在`service`下

```sql
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

>注意：
>
>​	如果使用`seata`必须要写入`undo_log`日志

## 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS `storage_db`;
USE  `storage_db`;
DROP TABLE IF EXISTS `storage_tbl`;
CREATE TABLE `storage_tbl` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `commodity_code` varchar(255) DEFAULT NULL,
                               `count` int(11) DEFAULT 0,
                               PRIMARY KEY (`id`),
                               UNIQUE KEY (`commodity_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO storage_tbl (commodity_code, count) VALUES ('P0001', 100);
INSERT INTO storage_tbl (commodity_code, count) VALUES ('B1234', 10);

-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE DATABASE IF NOT EXISTS `order_db`;
USE  `order_db`;
DROP TABLE IF EXISTS `order_tbl`;
CREATE TABLE `order_tbl` (
                             `id` int(11) NOT NULL AUTO_INCREMENT,
                             `user_id` varchar(255) DEFAULT NULL,
                             `commodity_code` varchar(255) DEFAULT NULL,
                             `count` int(11) DEFAULT 0,
                             `money` int(11) DEFAULT 0,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE DATABASE IF NOT EXISTS `account_db`;
USE  `account_db`;
DROP TABLE IF EXISTS `account_tbl`;
CREATE TABLE `account_tbl` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `user_id` varchar(255) DEFAULT NULL,
                               `money` int(11) DEFAULT 0,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO account_tbl (user_id, money) VALUES ('1', 10000);
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

## `seata-account`

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.3</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean

```java
package com.lazy.bean;

@Data
public class AccountTbl implements Serializable {
    private Integer id;
    private String userId;
    private Integer money;
}
```

mapper

```java
package com.lazy.mapper;

/**
 * 针对表【account_tbl】的数据库操作Mapper
 */
public interface AccountTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(AccountTbl record);

    int insertSelective(AccountTbl record);

    AccountTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountTbl record);

    int updateByPrimaryKey(AccountTbl record);

    void debit(String userId, int money);
}

```

service

```java
package com.lazy.service;

public interface AccountService {
    /**
     * 从用户账户中扣减
     * @param userId  用户id
     * @param money   扣减金额
     */
    void debit(String userId, int money);
}
```

serviceImpl

```java
package com.lazy.service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountTblMapper accountTblMapper;

    @Override
    public void debit(String userId, int money) {
        accountTblMapper.debit(userId, money);
    }
}
```

controller

```java
package com.lazy.controller;

@RestController
public class AccountTbRestController {

    @Autowired
    AccountService accountService;
    /**
     * 扣减账户余额
     * @return
     */
    @GetMapping("/debit")
    public String debit(@RequestParam("userId") String userId,
                        @RequestParam("money") int money){
        accountService.debit(userId, money);
        return "account debit success";
    }
}
```

主启动类

```java
package com.lazy;

@MapperScan("com.lazy.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeataAccountApplication.class, args);
	}

}
```

配置文件

```yaml
spring:
  application:
    name: seata-account
  datasource:
    url: jdbc:mysql://localhost:3306/account_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 10000
mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.mapper.AccountTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.bean.AccountTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="userId" column="user_id" jdbcType="VARCHAR"/>
            <result property="money" column="money" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,user_id,money
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from account_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from account_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.bean.AccountTbl" useGeneratedKeys="true">
        insert into account_tbl
        ( id,user_id,money
        )
        values (#{id,jdbcType=INTEGER},#{userId,jdbcType=VARCHAR},#{money,jdbcType=INTEGER}
        )
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.bean.AccountTbl" useGeneratedKeys="true">
        insert into account_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="userId != null">user_id,</if>
                <if test="money != null">money,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="userId != null">#{userId,jdbcType=VARCHAR},</if>
                <if test="money != null">#{money,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.bean.AccountTbl">
        update account_tbl
        <set>
                <if test="userId != null">
                    user_id = #{userId,jdbcType=VARCHAR},
                </if>
                <if test="money != null">
                    money = #{money,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.bean.AccountTbl">
        update account_tbl
        set 
            user_id =  #{userId,jdbcType=VARCHAR},
            money =  #{money,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="debit">
        update account_tbl
        set money = money - #{money,jdbcType=INTEGER}
        where user_id = #{userId,jdbcType=VARCHAR}
    </update>
</mapper>
```

## `seata-busines`

依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

service

```java
package com.lazy.business.service;

public interface BusinessService {

    /**
     * 采购
     * @param userId            用户id
     * @param commodityCode     商品编号
     * @param orderCount        购买数量
     */
    void purchase(String userId, String commodityCode, int orderCount);
}
```

serviceImpl

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {
    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //TODO 1. 扣减库存

        //TODO 2. 创建订单
    }
}
```

controller

```java
package com.lazy.business.controller;

@RestController
public class PurchaseRestController {

    @Autowired
    BusinessService businessService;
    /**
     * 购买
     * @param userId 用户ID
     * @param commodityCode 商品编码
     * @param orderCount 数量
     * @return
     */
    @GetMapping("/purchase")
    public String purchase(@RequestParam("userId") String userId,
                           @RequestParam("commodityCode") String commodityCode,
                           @RequestParam("count") int orderCount){
        businessService.purchase(userId, commodityCode, orderCount);
        return "business purchase success";
    }
}
```

主启动类

```java
package com.lazy.business;

@EnableDiscoveryClient
@SpringBootApplication
public class SeataBusinessMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataBusinessMainApplication.class, args);
    }
}
```

yaml

```yaml
spring:
  application:
    name: seata-business
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 11000
```

## `seata-order`

依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.4</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean	

```java
package com.lazy.order.bean;

/**
 * @TableName order_tbl
 */
@Data
public class OrderTbl implements Serializable {
    private Integer id;

    private String userId;

    private String commodityCode;

    private Integer count;

    private Integer money;

    private static final long serialVersionUID = 1L;
}
```

mapper

```java
package com.lazy.order.mapper;

/**
* @description 针对表【order_tbl】的数据库操作Mapper
*/
public interface OrderTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(OrderTbl record);

    int insertSelective(OrderTbl record);

    OrderTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OrderTbl record);

    int updateByPrimaryKey(OrderTbl record);
}
```

service

```java
package com.lazy.order.service;

public interface OrderService {
    /**
     * 创建订单
     * @param userId    用户id
     * @param commodityCode  商品编码
     * @param orderCount  商品数量
     */
    OrderTbl create(String userId, String commodityCode, int orderCount);
}
```

serviceImpl

```java
package com.lazy.order.service.impl;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderTblMapper orderTblMapper;

    @Override
    public OrderTbl create(String userId, String commodityCode, int orderCount) {
        //1、计算订单价格
        int orderMoney = calculate(commodityCode, orderCount);

        //TODO 2、扣减账户余额

        //3、保存订单
        OrderTbl orderTbl = new OrderTbl();
        orderTbl.setUserId(userId);
        orderTbl.setCommodityCode(commodityCode);
        orderTbl.setCount(orderCount);
        orderTbl.setMoney(orderMoney);

        orderTblMapper.insert(orderTbl);

        return orderTbl;
    }
    // 计算价格
    private int calculate(String commodityCode, int orderCount) {
        return 9*orderCount;
    }
}
```

controller

```java
package com.lazy.order.controller;

@RestController
public class OrderRestController {

    @Autowired
    OrderService orderService;


    /**
     * 创建订单
     * @param userId
     * @param commodityCode
     * @param orderCount
     * @return
     */
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount)
    {
        OrderTbl tbl = orderService.create(userId, commodityCode, orderCount);
        return "order create success = 订单id：【"+tbl.getId()+"】";
    }
}
```

主启动类

```java
package com.lazy.order;

@MapperScan("com.lazy.order.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataOrderMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataOrderMainApplication.class, args);
    }
}
```

yaml

```yaml
spring:
  application:
    name: seata-order
  datasource:
    url: jdbc:mysql://localhost:3306/order_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 12000
mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.order.mapper.OrderTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.order.bean.OrderTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="userId" column="user_id" jdbcType="VARCHAR"/>
            <result property="commodityCode" column="commodity_code" jdbcType="VARCHAR"/>
            <result property="count" column="count" jdbcType="INTEGER"/>
            <result property="money" column="money" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,user_id,commodity_code,
        count,money
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from order_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from order_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.order.bean.OrderTbl"
            useGeneratedKeys="true">
        insert into order_tbl
        ( id,user_id,commodity_code
        ,count,money)
        values (#{id,jdbcType=INTEGER},#{userId,jdbcType=VARCHAR},#{commodityCode,jdbcType=VARCHAR}
        ,#{count,jdbcType=INTEGER},#{money,jdbcType=INTEGER})
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.order.bean.OrderTbl" useGeneratedKeys="true">
        insert into order_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="userId != null">user_id,</if>
                <if test="commodityCode != null">commodity_code,</if>
                <if test="count != null">count,</if>
                <if test="money != null">money,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="userId != null">#{userId,jdbcType=VARCHAR},</if>
                <if test="commodityCode != null">#{commodityCode,jdbcType=VARCHAR},</if>
                <if test="count != null">#{count,jdbcType=INTEGER},</if>
                <if test="money != null">#{money,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.order.bean.OrderTbl">
        update order_tbl
        <set>
                <if test="userId != null">
                    user_id = #{userId,jdbcType=VARCHAR},
                </if>
                <if test="commodityCode != null">
                    commodity_code = #{commodityCode,jdbcType=VARCHAR},
                </if>
                <if test="count != null">
                    count = #{count,jdbcType=INTEGER},
                </if>
                <if test="money != null">
                    money = #{money,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.order.bean.OrderTbl">
        update order_tbl
        set 
            user_id =  #{userId,jdbcType=VARCHAR},
            commodity_code =  #{commodityCode,jdbcType=VARCHAR},
            count =  #{count,jdbcType=INTEGER},
            money =  #{money,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
</mapper>
```

## `seata-storage`

依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.4</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean

```java
package com.lazy.storage.bean;

/**
 * @TableName storage_tbl
 */
@Data
public class StorageTbl implements Serializable {
    private Integer id;

    private String commodityCode;

    private Integer count;

    private static final long serialVersionUID = 1L;
}
```

mapper

```java
package com.lazy.storage.mapper;

/**
* @description 针对表【storage_tbl】的数据库操作Mapper
*/
public interface StorageTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(StorageTbl record);

    int insertSelective(StorageTbl record);

    StorageTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(StorageTbl record);

    int updateByPrimaryKey(StorageTbl record);

    void deduct(String commodityCode, int count);
}
```

service

```java
package com.lazy.storage.service;

public interface StorageService {
    /**
     * 扣除存储数量
     * @param commodityCode 商品编码
     * @param count 数量
     */
    void deduct(String commodityCode, int count);
}
```

serviceImpl

```java
package com.lazy.storage.service.impl;

@Service
public class StorageServiceImpl implements StorageService {

    @Autowired
    StorageTblMapper storageTblMapper;

    @Override
    public void deduct(String commodityCode, int count) {
        storageTblMapper.deduct(commodityCode, count);
    }
}
```

controller

```java
package com.lazy.storage.controller;

@RestController
public class StorageRestController {

    @Autowired
    StorageService  storageService;

    @GetMapping("/deduct")
    public String deduct(@RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") Integer count) {

        storageService.deduct(commodityCode, count);
        return "storage deduct success";
    }
}
```

主启动类

```java
package com.lazy.storage;

@MapperScan("com.lazy.storage.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataStorageMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataStorageMainApplication.class, args);
    }
}
```

```yaml
spring:
  application:
    name: seata-storage
  datasource:
    url: jdbc:mysql://localhost:3306/storage_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 13000

mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.storage.mapper.StorageTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.storage.bean.StorageTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="commodityCode" column="commodity_code" jdbcType="VARCHAR"/>
            <result property="count" column="count" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,commodity_code,count
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from storage_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from storage_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.storage.bean.StorageTbl" useGeneratedKeys="true">
        insert into storage_tbl
        ( id,commodity_code,count
        )
        values (#{id,jdbcType=INTEGER},#{commodityCode,jdbcType=VARCHAR},#{count,jdbcType=INTEGER}
        )
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.storage.bean.StorageTbl" useGeneratedKeys="true">
        insert into storage_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="commodityCode != null">commodity_code,</if>
                <if test="count != null">count,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="commodityCode != null">#{commodityCode,jdbcType=VARCHAR},</if>
                <if test="count != null">#{count,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.storage.bean.StorageTbl">
        update storage_tbl
        <set>
                <if test="commodityCode != null">
                    commodity_code = #{commodityCode,jdbcType=VARCHAR},
                </if>
                <if test="count != null">
                    count = #{count,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.storage.bean.StorageTbl">
        update storage_tbl
        set 
            commodity_code =  #{commodityCode,jdbcType=VARCHAR},
            count =  #{count,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="deduct">
        update storage_tbl
        set count = count - #{count}
        where commodity_code = #{commodityCode}
    </update>
</mapper>
```

## 添加单个事务回滚

我们在`seata-account`、`seata-order`、`seata-storage`上的service添加事务，主启动类上开启事务

seata-account ，service

```java
package com.lazy.service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountTblMapper accountTblMapper;

    @Transactional
    @Override
    public void debit(String userId, int money) {
        accountTblMapper.debit(userId, money);
    }
}
```

开启事务

```java
package com.lazy;

@EnableTransactionManagement
@MapperScan("com.lazy.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeataAccountApplication.class, args);
	}

}
```

`seata-order`，service

```java
package com.lazy.order.controller;

@RestController
public class OrderRestController {

    @Autowired
    OrderService orderService;


    /**
     * 创建订单
     * @param userId
     * @param commodityCode
     * @param orderCount
     * @return
     */
    @Transactional
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount)
    {
        OrderTbl tbl = orderService.create(userId, commodityCode, orderCount);
        return "order create success = 订单id：【"+tbl.getId()+"】";
    }

}
```

```java
package com.lazy.order;

@EnableTransactionManagement
@MapperScan("com.lazy.order.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataOrderMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataOrderMainApplication.class, args);
    }
}
```

`seata-storage`，service

```java
package com.lazy.storage.service.impl;

@Service
public class StorageServiceImpl implements StorageService {

    @Autowired
    StorageTblMapper storageTblMapper;

    @Transactional
    @Override
    public void deduct(String commodityCode, int count) {
        storageTblMapper.deduct(commodityCode, count);
        if (count ==5){
            throw new RuntimeException("库存不足！"); //如果扣减5个库存，会发生异常。进行事务回滚
        }
    }
}

```

```java
package com.lazy.storage;

@EnableTransactionManagement
@MapperScan("com.lazy.storage.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataStorageMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataStorageMainApplication.class, args);
    }
}
```

## `seata-busines`集成下订单和扣库存

![image-20250403170009786](/alibabaImage/image-20250403170009786.png)

在`seata-busines`创建两个接口

```java
package com.lazy.business.feign;

@FeignClient(value = "seata-order")
public interface OrderFeignClient {
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount);
}
```

````java
package com.lazy.business.feign;

@FeignClient(value = "seata-storage")
public interface StorageFeignClient {
    @GetMapping("/deduct")
    public String deduct(@RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") Integer count);
}
````

serviceImpl

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    private StorageFeignClient storageFeignClient;

    @Autowired
    private OrderFeignClient orderFeignClient;

    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //1. 扣减库存
        storageFeignClient.deduct(commodityCode, orderCount);
        //2. 创建订单
        orderFeignClient.create(userId, commodityCode, orderCount);
    }
}
```

主启动类添加开启FeignClient

```java
package com.lazy.business;

@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class SeataBusinessMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataBusinessMainApplication.class, args);
    }
}
```



改造`seata-order`

```java
package com.lazy.order.feign;

@FeignClient(value = "seata-account")
public interface AccountFeignClient {
    @GetMapping("/debit")
    public String debit(@RequestParam("userId") String userId,
                        @RequestParam("money") int money);
}
```

serviceImpl

```java
package com.lazy.order.service.impl;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderTblMapper orderTblMapper;

    @Autowired
    private AccountFeignClient accountFeignClient;
    @Override
    public OrderTbl create(String userId, String commodityCode, int orderCount) {
        //1、计算订单价格
        int orderMoney = calculate(commodityCode, orderCount);

        //2、扣减账户余额
        accountFeignClient.debit(userId, orderMoney);
        //3、保存订单
        OrderTbl orderTbl = new OrderTbl();
        orderTbl.setUserId(userId);
        orderTbl.setCommodityCode(commodityCode);
        orderTbl.setCount(orderCount);
        orderTbl.setMoney(orderMoney);

        orderTblMapper.insert(orderTbl);

        return orderTbl;
    }

    // 计算价格
    private int calculate(String commodityCode, int orderCount) {
        return 9*orderCount;
    }
}
```

主启动类添加开启Feign

```java
@EnableFeignClients
```

## `Seata`原理

![image-20250403172725261](/alibabaImage/image-20250403172725261.png)

下载[Seata](https://seata.apache.org/zh-cn/download/seata-server)

启动seata

![image-20250403183001333](/alibabaImage/image-20250403183001333.png)

seata的访问地址

![image-20250403183040379](/alibabaImage/image-20250403183040379.png)

![image-20250403183124885](/alibabaImage/image-20250403183124885.png)

启动完seata我们就应该配置引入seata了,只要用到了就需要引入

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

配置文件，需要跟`application.yaml`同级，创建一个`file.conf`

完整的`file.conf`

```properties
#
# 版权归Apache软件基金会（ASF）所有，可能有一个或多个
# 贡献者许可协议。请查看与此工作一起分发的NOTICE文件，以获取有关版权所有权的更多信息。
# ASF根据Apache许可证2.0版（以下简称“许可证”）将此文件授权给您使用；
# 除非符合许可证的要求，否则您不得使用此文件。您可以在以下网址获取许可证副本：
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# 除非适用法律要求或书面同意，否则根据许可证分发的软件按“原样”分发，
# 不附带任何形式的明示或暗示的保证或条件。请查看许可证以了解具体的权限和限制规定。
#

transport {
  # 传输类型，可选值：tcp（TCP协议），unix-domain-socket（Unix域套接字）
  type = "TCP"
  # 服务器模式，可选值：NIO（非阻塞I/O），NATIVE（原生模式）
  server = "NIO"
  # 是否启用心跳机制
  heartbeat = true
  # TM客户端是否启用批量发送请求
  enableTmClientBatchSendRequest = false
  # RM客户端是否启用批量发送请求
  enableRmClientBatchSendRequest = true
  # RM客户端RPC请求的超时时间（毫秒）
  rpcRmRequestTimeout = 2000
  # TM客户端RPC请求的超时时间（毫秒）
  rpcTmRequestTimeout = 30000
  # RM客户端RPC请求的超时时间（毫秒）
  rpcRmRequestTimeout = 15000
  # Netty线程工厂配置
  threadFactory {
    # 主线程前缀
    bossThreadPrefix = "NettyBoss"
    # 工作线程前缀
    workerThreadPrefix = "NettyServerNIOWorker"
    # 服务器执行线程前缀
    serverExecutorThread-prefix = "NettyServerBizHandler"
    # 是否共享主线程和工作线程
    shareBossWorker = false
    # 客户端选择器线程前缀
    clientSelectorThreadPrefix = "NettyClientSelector"
    # 客户端选择器线程数量
    clientSelectorThreadSize = 1
    # 客户端工作线程前缀
    clientWorkerThreadPrefix = "NettyClientWorkerThread"
    # Netty主线程数量
    bossThreadSize = 1
    # 工作线程数量，"default"表示自动默认或为8
    workerThreadSize = "default"
  }
  shutdown {
    # 销毁服务器时的等待秒数
    wait = 3
  }
  # 序列化方式
  serialization = "seata"
  # 压缩方式
  compressor = "none"
}
service {
  # 事务服务组映射
  vgroupMapping.default_tx_group = "default"
  # 仅在registry.type=file时支持，请勿设置多个地址
  default.grouplist = "127.0.0.1:8091"
  # 是否启用降级，当前不支持
  enableDegrade = false
  # 是否禁用全局事务
  disableGlobalTransaction = false
}

client {
  rm {
    # 异步提交缓冲区的最大限制
    asyncCommitBufferLimit = 10000
    lock {
      # 锁重试间隔时间（毫秒）
      retryInterval = 10
      # 锁重试次数
      retryTimes = 30
      # 分支事务冲突时是否回滚
      retryPolicyBranchRollbackOnConflict = true
    }
    # 报告重试次数
    reportRetryCount = 5
    # 是否启用表元数据检查
    tableMetaCheckEnable = false
    # 表元数据检查的时间间隔（毫秒）
    tableMetaCheckerInterval = 60000
    # 是否启用报告成功
    reportSuccessEnable = false
    # 是否启用Saga分支注册
    sagaBranchRegisterEnable = false
    # Saga的JSON解析器
    sagaJsonParser = "fastjson"
    # Saga重试持久化模式是否更新
    sagaRetryPersistModeUpdate = false
    # Saga补偿持久化模式是否更新
    sagaCompensatePersistModeUpdate = false
    # TCC动作拦截器的顺序
    tccActionInterceptorOrder = -2147482648 #Ordered.HIGHEST_PRECEDENCE + 1000
    # SQL解析器类型
    sqlParserType = "druid"
    # XA分支执行超时时间（毫秒）
    branchExecutionTimeoutXA = 60000
    # XA连接两阶段持有超时时间（毫秒）
    connectionTwoPhaseHoldTimeoutXA = 10000
  }
  tm {
    # 提交重试次数
    commitRetryCount = 5
    # 回滚重试次数
    rollbackRetryCount = 5
    # 默认全局事务超时时间（毫秒）
    defaultGlobalTransactionTimeout = 60000
    # 是否启用降级检查
    degradeCheck = false
    # 降级检查周期（毫秒）
    degradeCheckPeriod = 2000
    # 降级检查允许次数
    degradeCheckAllowTimes = 10
    # 拦截器顺序
    interceptorOrder = -2147482648 #Ordered.HIGHEST_PRECEDENCE + 1000
  }
  undo {
    # 是否进行数据验证
    dataValidation = true
    # 是否仅关注更新列
    onlyCareUpdateColumns = true
    # 回滚日志的序列化方式
    logSerialization = "jackson"
    # 回滚日志表名
    logTable = "undo_log"
    compress {
      # 是否启用压缩
      enable = true
      # 压缩类型，可选值：zip, gzip, deflater, lz4, bzip2, zstd，默认是zip
      type = zip
      # 回滚信息大小超过此阈值时进行压缩，支持k、m、g、t单位
      threshold = 64k
    }
  }
  loadBalance {
      # 负载均衡类型
      type = "XID"
      # 虚拟节点数量
      virtualNodes = 10
  }
}
log {
  # 异常率
  exceptionRate = 100
}
tcc {
  fence {
    # TCC栅栏日志表名
    logTableName = tcc_fence_log
    # TCC栅栏日志清理周期
    cleanPeriod = 1h
  }
}
```

我们只需要引入部分即可，只要那个项目引入依赖，就得在下面配置这个，不然服务启动不起来

```properties
service {
  # 事务服务组映射
  vgroupMapping.default_tx_group = "default"
  # 仅在registry.type=file时支持，请勿设置多个地址
  default.grouplist = "127.0.0.1:8091" # seata服务端的地址
  # 是否启用降级，当前不支持
  enableDegrade = false
  # 是否禁用全局事务
  disableGlobalTransaction = false
}
```

只引入这个是实现不了分布式事务的，我们还需要在那个地方引入的分布式的上面添加`@GlobalTransactional`注解

这个项目我们是在`seata-busines`中的`serviceImpl`下调用的，所以在改方法上添加注解

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    private StorageFeignClient storageFeignClient;

    @Autowired
    private OrderFeignClient orderFeignClient;

    @GlobalTransactional # 添加seata的全局事务
    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //1. 扣减库存
        storageFeignClient.deduct(commodityCode, orderCount);
        //2. 创建订单
        orderFeignClient.create(userId, commodityCode, orderCount);
    }
}
```

我们在启动项目测试

![image-20250403184404634](/alibabaImage/image-20250403184404634.png)

发现我们的代码报错了，但是我们的数据库是进行回滚了

![image-20250403184449259](/alibabaImage/image-20250403184449259.png)

![image-20250403184500736](/alibabaImage/image-20250403184500736.png)

## seata二阶提交协议

Seata 通过引入 全局事务管理 和 分支事务 来解决分布式系统中的事务一致性问题。它使用类似于传统数据库事务中的 二阶段提交（2PC，Two-Phase Commit） 协议来确保事务的原子性。

![](/alibabaImage/seata二阶提交.png)

### 二阶段提交（2PC）过程

Seata 采用二阶段提交协议（2PC）来确保分布式事务的一致性。以下是二阶段提交的详细流程：

1. 第一阶段：事务预备（Try阶段）
    全局事务开始：客户端应用向 Seata Server 发起请求，Seata 会生成一个全局事务 ID（XID），并返回给客户端应用。全局事务标识用于追踪整个分布式事务。

  ```java
  // 启动全局事务
  GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
  tx.begin();
  ```

  分支事务注册：每个参与者（微服务）启动后，会向 Seata Server 注册自己作为一个分支事务，Seata Server 会为每个分支事务分配一个唯一的事务分支 ID（Branch ID）。Try 阶段：每个微服务会执行 Try 操作，即准备执行本地事务操作，但不提交数据。例如，更新某个数据库中的记录，但不提交。执行数据库操作：每个参与的子事务都会执行数据库更新，但不会真正提交，而是进入 prepare 状态（对于 AT 模式，这意味着生成 undo_log）。

2. 第二阶段：提交（Commit）或回滚（Rollback）

  1. 提交（Commit）：
        1. Seata Server 收到全局事务提交请求后，通知所有分支事务提交事务。
            2. 分支事务提交数据库操作（删除 undo_log）。

  2. 回滚（Rollback）：

    如果 Seata Server 发现某个分支事务执行失败，则通知所有已提交的分支事务回滚，恢复 undo_log 记录的数据。


## seata配置到nacos

[官网地址](https://seata.apache.org/zh-cn/docs/user/configuration/nacos)



## seata的四种事务模式

### Seata AT 模式

#### 概述

AT 模式是 Seata 创新的一种非侵入式的分布式事务解决方案，Seata 在内部做了对数据库操作的代理层，我们使用 Seata AT 模式时，实际上用的是 Seata 自带的数据源代理 DataSourceProxy，Seata 在这层代理中加入了很多逻辑，比如插入回滚 undo_log 日志，检查全局锁等。

本文中，我们将重点介绍 Seata AT 模式的使用，如果您对于 AT 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/at-mode)。

##### 整体机制

两阶段提交协议的演变：

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。
- 二阶段：
  - 提交异步化，非常快速地完成。
  - 回滚通过一阶段的回滚日志进行反向补偿。

### Seata TCC 模式

#### 概述

TCC 模式是 Seata 支持的一种由业务方细粒度控制的侵入式分布式事务解决方案，是继 AT 模式后第二种支持的事务模式，最早由蚂蚁金服贡献。其分布式事务模型直接作用于服务层，不依赖底层数据库，可以灵活选择业务资源的锁定粒度，减少资源锁持有时间，可扩展性好，可以说是为独立部署的 SOA 服务而设计的。

![Overview of a global transaction](/alibabaImage/seata_tcc-1-1f7a834639aa755d73fa2af435c4f042.png)

本文中，我们将重点介绍 Seata TCC 模式的使用，如果您对于 TCC 模式原理感兴趣，想要了解 Seata TCC 对于幂等、空回滚、悬挂问题的解决，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/tcc-mode)。

#### 优势

TCC 完全不依赖底层数据库，能够实现跨数据库、跨应用资源管理，可以提供给业务方更细粒度的控制。

#### 缺点

TCC 是一种侵入式的分布式事务解决方案，需要业务系统自行实现 Try，Confirm，Cancel 三个操作，对业务系统有着非常大的入侵性，设计相对复杂。

#### 适用场景

TCC 模式是高性能分布式事务解决方案，适用于核心系统等对性能有很高要求的场景。

#### 整体机制

在两阶段提交协议中，资源管理器（RM, Resource Manager）需要提供“准备”、“提交”和“回滚” 3 个操作；而事务管理器（TM, Transaction Manager）分 2 阶段协调所有资源管理器，在第一阶段询问所有资源管理器“准备”是否成功，如果所有资源均“准备”成功则在第二阶段执行所有资源的“提交”操作，否则在第二阶段执行所有资源的“回滚”操作，保证所有资源的最终状态是一致的，要么全部提交要么全部回滚。

资源管理器有很多实现方式，其中 TCC（Try-Confirm-Cancel）是资源管理器的一种服务化的实现；TCC 是一种比较成熟的分布式事务解决方案，可用于解决跨数据库、跨服务业务操作的数据一致性问题；TCC 其 Try、Confirm、Cancel 3 个方法均由业务编码实现，故 TCC 可以被称为是服务化的资源管理器。

TCC 的 Try 操作作为一阶段，负责资源的检查和预留；Confirm 操作作为二阶段提交操作，执行真正的业务；Cancel 是二阶段回滚操作，执行预留资源的取消，使资源回到初始状态。

### Seata Saga 模式

#### 概述

Saga 模式是 SEATA 提供的长事务解决方案，在 Saga 模式中，业务流程中每个参与者都提交本地事务，当出现某一个参与者失败则补偿前面已经成功的参与者，一阶段正向服务和二阶段补偿服务都由业务开发实现。

![Saga模式示意图](/alibabaImage/Saga模式示意图.png)

理论基础：Hector & Kenneth 发表论⽂ Sagas （1987）

#### 适用场景：

- 业务流程长、业务流程多
- 参与者包含其它公司或遗留系统服务，无法提供 TCC 模式要求的三个接口

#### 优势：

- 一阶段提交本地事务，无锁，高性能
- 事件驱动架构，参与者可异步执行，高吞吐
- 补偿服务易于实现

#### 缺点：

- 不保证隔离性（应对方案见后面文档）

#### Saga 的实现：

#### 基于状态机引擎的 Saga 实现：

目前 SEATA 提供的 Saga 模式是基于状态机引擎来实现的，机制是：

1. 通过状态图来定义服务调用的流程并生成 json 状态语言定义文件

2. 状态图中一个节点可以是调用一个服务，节点可以配置它的补偿节点

3. 状态图 json 由状态机引擎驱动执行，当出现异常时状态引擎反向执行已成功节点对应的补偿节点将事务回滚

   > 注意: 异常发生时是否进行补偿也可由用户自定义决定

4. 可以实现服务编排需求，支持单项选择、并发、子流程、参数转换、参数映射、服务执行状态判断、异常捕获等功能

示例状态图:

![示例状态图](/alibabaImage/demo_statelang-90f1fc01bfaf3a795c3b3357e1046f16.png)

### Seata XA 模式

#### 概述

XA 模式是从 1.2 版本支持的事务模式。XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准。Seata XA 模式是利用事务资源（数据库、消息服务等）对 XA 协议的支持，以 XA 协议的机制来管理分支事务的一种事务模式。

![img](/alibabaImage/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png)

本文中，我们将重点介绍 Seata XA 模式的使用，如果您对于 XA 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/xa-mode)。

#### 优势

与 Seata 支持的其它事务模式不同，XA 协议要求事务资源本身提供对规范和协议的支持，所以事务资源（如数据库）可以保障从任意视角对数据的访问有效隔离，满足全局数据一致性。此外的一些优势还包括：

1. 业务无侵入：和 AT 一样，XA 模式将是业务无侵入的，不给应用设计和开发带来额外负担。
2. 数据库的支持广泛：XA 协议被主流关系型数据库广泛支持，不需要额外的适配即可使用。

#### 缺点

XA prepare 后，分支事务进入阻塞阶段，收到 XA commit 或 XA rollback 前必须阻塞等待。事务资源长时间得不到释放，锁定周期长，而且在应用层上面无法干预，性能差。

#### 适用场景

适用于想要迁移到 Seata 平台基于 XA 协议的老应用，使用 XA 模式将更平滑，还有 AT 模式未适配的数据库应用。

#### 整体机制

- 执行阶段：
  - 可回滚：业务 SQL 操作放在 XA 分支中进行，由资源对 XA 协议的支持来保证 *可回滚*
  - 持久化：XA 分支完成后，执行 XA prepare，同样，由资源对 XA 协议的支持来保证 *持久化*（即，之后任何意外都不会造成无法回滚的情况）
- 完成阶段：
  - 分支提交：执行 XA 分支的 commit
  - 分支回滚：执行 XA 分支的 rollback

## 切换seata数据源的代理模式

```yaml
seata:
  data-source-proxy-mode: AT
```

