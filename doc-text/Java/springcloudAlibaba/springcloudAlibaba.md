# 1. 分布式基础

## 1.1. **微服务**

微服务架构风格，就像是把一个**单独的应用程序**开发为**一套小服务**，每个**小服务**运行在**自己**的**进程**中，并使用轻量级机制通信，通常是 HTTP API。这些服务围绕业务能力来构建， 并通过完全自动化部署机制来独立部署。这些服务使用不同的编程语言书写，以及不同数据存储技术，并保持最低限度的集中式管理。 

***简而言之：拒绝大型单体应用，基于业务边界进行服务微化拆分，各个服务独立部署运行。***

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297310596-6a264038-d7d3-43b6-9883-c0d70c43d678.png)



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



## 1.3. **远程调用**

在分布式系统中，各个服务可能处于不同主机，但是服务之间不可避免的需要互相调用，我们称为远程调用。 SpringCloud 中使用 HTTP+JSON 的方式完成远程调用

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297496168-259c804b-17cc-4f14-9127-9eb0f56c049b.png)





## 1.4. **负载均衡**

分布式系统中，A 服务需要调用 B 服务，B 服务在多台机器中都存在，A 调用任意一个服务器均可完成功能。 为了使每一个服务器都不要太忙或者太闲，我们可以负载均衡的调用每一个服务器，提升网站的健壮性。 

***常见的负载均衡算法：*** 

- **轮询：**为第一个请求选择健康池中的第一个后端服务器，然后按顺序往后依次选择，直到最后一个，然后循环。 

- **最小连接：**优先选择连接数最少，也就是压力最小的后端服务器，在会话较长的情况下可以考虑采取这种方式。 

- **散列：**根据请求源的 IP 的散列（hash）来选择要转发的服务器。这种方式可以一定程度上保证特定用户能连接到相同的服务器。如果你的应用需要处理状态而要求用户能连接到和之前相同的服务器，可以考虑采取这种方式。

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297584522-54991385-dc66-4e94-a9a0-159da79227f6.png)



## 1.5. **服务注册/发现&注册中心**

A 服务调用 B 服务，A 服务并不知道 B 服务当前在哪几台服务器有，哪些正常的，哪些服务已经下线。解决这个问题可以引入注册中心；

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297640042-15e7635e-8726-489a-a4e6-05d87c8bd2db.png)

如果某些服务下线，我们其他人可以实时的感知到其他服务的状态，从而避免调用不可用的服务





## 1.6. **配置中心**

每一个服务最终都有大量的配置，并且每个服务都可能部署在多台机器上。我们经常需要变更配置，我们可以让每个服务在配置中心获取自己的配置。 

***配置中心用来集中管理微服务的配置信息***

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297744486-dd9818fa-80c0-4cfa-b7d2-1bff28f60afa.png)



## 1.7. **服务熔断&服务降级**

在微服务架构中，微服务之间通过网络进行通信，存在相互依赖，当其中一个服务不可用时，有可能会造成雪崩效应。要防止这样的情况，必须要有容错机制来保护服务。

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297804203-30703d21-c64d-4013-9fd1-06bd4e52c47f.png)



1）、服务熔断 

设置服务的超时，当被调用的服务经常失败到达某个阈值，我们可以开启断路保护机制，后来的请求不再去调用这个服务。本地直接返回默认的数据 

2）、服务降级 

在运维期间，当系统处于高峰期，系统资源紧张，我们可以让非核心业务降级运行。降级：某些服务不处理，或者简单处理【抛异常、返回 NULL、调用 Mock 数据、调用 Fallback 处理逻辑】



## 1.8. **API 网关**

在微服务架构中，API Gateway 作为整体架构的重要组件，它***抽象了微服务中都需要的公共功能***，同时提供了客户端**负载均衡**，**服务自动熔断**，**灰度发布**，**统一认证**，**限流流控**，**日志统计**等丰富的功能，帮助我们解决很多 API 管理难题。

![img](https://cdn.nlark.com/yuque/0/2024/png/1613913/1733297890520-ad75a281-4de7-4f76-b9d6-f4f74f718a16.png)

# Spring Cloud Alibaba 是什么

Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

此外，[Spring Cloud Alibaba 企业版](https://www.aliyun.com/product/aliware/mse?spm=sca-website.topbar.0.0.0)，包括无侵入服务治理(全链路灰度，无损上下线，离群实例摘除等)，企业级 Nacos 注册配置中心和企业级云原生网关等众多产品。

## Spring Cloud 微服务体系

Spring Cloud 是分布式微服务架构的一站式解决方案，它提供了一套简单易用的编程模型，使我们能在 Spring Boot 的基础上轻松地实现微服务系统的构建。 **Spring Cloud 提供以微服务为核心的分布式系统构建标准。**

![spring-cloud](https://sca.aliyun.com/img/overview-doc-img/spring-cloud-img.png)

Spring Cloud 本身并不是一个开箱即用的框架，它是一套微服务规范，共有两代实现。

- Spring Cloud Netflix 是 Spring Cloud 的第一代实现，主要由 Eureka、Ribbon、Feign、Hystrix 等组件组成。
- Spring Cloud Alibaba 是 Spring Cloud 的第二代实现，主要由 Nacos、Sentinel、Seata 等组件组成。

## Spring Cloud Alibaba 定位

![spring-cloud](https://sca.aliyun.com/img/overview-doc-img/spring-cloud-alibaba-img.png)

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

# 搭建项目

1. 搭建一个这个目录的项目

   ![image-20250326181953606](D:\HBuilder X wrok\docs-demo\public\alibabaImage\image-20250326181953606.png)

2. 在`study-spring-cloud-alibaba`项目下添加依赖

   1. 

   ```bash
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

   ```bash
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

7. ![image-20250326183208176](D:\HBuilder X wrok\docs-demo\public\alibabaImage\image-20250326183208176.png)

8. 启动完成之后我们访问`localhost:8848/nacos`来访问`Nacos`

   > 注意：
   >
   > ​	如果访问`localhost:8848`会访问不到

9. 集成 `Nacos`

   1. 基于上面的项目在`service-order`和`service-product`添加依赖

      ```bash
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

      5. ![image-20250326193343921](D:\HBuilder X wrok\docs-demo\public\alibabaImage\image-20250326193343921.png)

      6. 从图中看的我们的两个服务已经注册到`Nacos`上了

         >注意：
         >
         >​	`Nacos`必须开启，要不然访问不到