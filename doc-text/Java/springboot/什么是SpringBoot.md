idea springboot 2.x构建地址：https://start.aliyun.com/
SpringBoot3 笔记链接：https://www.yuque.com/leifengyang/springboot3
## 1.什么是SpringBoot

> 回顾什么是Spring？

- Spring是一个开源框架，2003 年兴起的一个轻量级的Java 开发框架，作者：Rod Johnson  。
- **Spring是为了解决企业级应用开发的复杂性而创建的，简化开发**。

> Spring是如何简化Java开发的？

为了降低Java开发的复杂性，Spring采用了以下4种关键策略：

1、基于POJO的轻量级和最小侵入性编程，所有东西都是bean；

2、通过IOC，依赖注入（DI）和面向接口实现松耦合；

3、基于切面（AOP）和惯例进行声明式编程；

4、通过切面和模版减少样式代码，RedisTemplate，xxxTemplate；

> 什么是SpringBoot？

学过javaweb的同学就知道，开发一个web应用，从最初开始接触Servlet结合Tomcat, 跑出一个Hello Wolrld程序，是要经历特别多的步骤；后来就用了框架Struts，再后来是SpringMVC，到了现在的SpringBoot，过一两年又会有其他web框架出现；你们有经历过框架不断的演进，然后自己开发项目所有的技术也在不断的变化、改造吗？建议都可以去经历一遍；

言归正传，什么是SpringBoot呢，就是一个javaweb的开发框架，和SpringMVC类似，对比其他javaweb框架的好处，官方说是简化开发，约定大于配置，  you can "just run"，能迅速的开发web应用，几行代码开发一个http接口。

所有的技术框架的发展似乎都遵循了一条主线规律：从一个复杂应用场景 衍生 一种规范框架，人们只需要进行各种配置而不需要自己去实现它，这时候强大的配置功能成了优点；发展到一定程度之后，人们根据实际生产应用情况，选取其中实用功能和设计精华，重构出一些轻量级的框架；之后为了提高开发效率，嫌弃原先的各类配置过于麻烦，于是开始提倡“约定大于配置”，进而衍生出一些一站式的解决方案。

是的，这就是Java企业级应用->J2EE->spring->springboot的过程。

随着 Spring 不断的发展，涉及的领域越来越多，项目整合开发需要配合各种各样的文件，慢慢变得不那么易用简单，违背了最初的理念，甚至人称配置地狱。Spring Boot 正是在这样的一个背景下被抽象出来的开发框架，目的为了让大家更容易的使用 Spring 、更容易的集成各种常用的中间件、开源软件；

Spring Boot 基于 Spring 开发，Spirng Boot 本身并不提供 Spring 框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于 Spring 框架的应用程序。也就是说，它并不是用来替代 Spring 的解决方案，而是和 Spring 框架紧密结合用于提升 Spring 开发者体验的工具。Spring Boot 以**约定大于配置的核心思想**，默认帮我们进行了很多设置，多数 Spring Boot 应用只需要很少的 Spring 配置。同时它集成了大量常用的第三方库配置（例如 Redis、MongoDB、Jpa、RabbitMQ、Quartz 等等），Spring Boot 应用中这些第三方库几乎可以零配置的开箱即用。

简单来说就是SpringBoot其实不是什么新的框架，它默认配置了很多框架的使用方式，就像maven整合了所有的jar包，spring boot整合了所有的框架 。

Spring Boot 出生名门，从一开始就站在一个比较高的起点，又经过这几年的发展，生态足够完善，Spring Boot 已经当之无愧成为 Java 领域最热门的技术。

> **Spring Boot的主要优点**：

- 为所有Spring开发者更快的入门；
- **开箱即用**，提供各种默认配置来简化项目配置；
- 内嵌式容器简化Web项目；
- 没有冗余代码生成和XML配置的要求；

## 2.什么是微服务架构

- [参考原文](https://martinfowler.com/articles/microservices.html)
- [参考译文](https://www.cnblogs.com/liuning8023/p/4493156.html)

> 什么是微服务？

微服务是一种架构风格，它要求我们在开发一个应用时，将单个应用程序开发为一组小服务的方法，每个小服务都在自己的进程中运行，并与轻量级机制（通常是 HTTP 资源 API）进行通信。简单说：==每个功能元素最终都是一个可独立替换和独立升级的软件单元==。

> 单体应用架构

- 所谓单体应用架构（ all in one）是指，我们将一个应用的中的所有应用服务都封装在一个应用中。
- 无论是ERP、CRM或是其他什么系统，你都把数据库访问，web访问，等等各个功能放到一个war包内。
- 这样做的好处是，易于开发和测试；也十分方便部罢；当需要扩展时，只需要将war复制多份，然后放到多个服务器上，再做个负载均衡就可以了。
- 单体应用架构的缺点是，哪怕我要修改一个非常小的地方，我都需要停掉整个服务，重新打包、部署这个应用war包。特别是对于一个大型应用，我们不可能吧所有内容都放在一个应用里面，我们如何维护、如何分工合作都是问题。

- 例如：[Apache Dubbo](https://dubbo.apache.org/zh/)

![](/SpringBoot-images/什么是SpringBoot/image-20211017223841534.png)

> 微服务架构

all in one的架构方式，我们把所有的功能单元放在一个应用里面。然后我们把整个应用部罢到服务器上。如果负载能力不行，我们将整个应用进行水平复制，进行扩展，然后在负载均衡。

所谓微服务架构，就是打破之前 all in one的架构方式，把每个功能元素独立出来，肥独立出来的功能元素的动态组合，需要的功能元素才去拿来组合，需要多一些时可以整合多个功能元素。所以微服务架构是对功能元素进行复制，而没有对整个应用进行复制。

这样做的好处是：

- 节省了调用资源。
- 每个功能元素的服都是一个可替换的、可独立升吸的软件代码。

<center>图1：单体和微服务</center>

![](/SpringBoot-images/什么是SpringBoot/image-20211017223148167.png)

> 微服务技术栈有那些？

| 微服务技术条目                         | 落地技术                                                     |
| -------------------------------------- | ------------------------------------------------------------ |
| 服务开发                               | SpringBoot、Spring、SpringMVC等                              |
| 服务配置与管理                         | Netfix公司的Archaius、阿里的Diamond等                        |
| 服务注册与发现                         | Eureka、Consul、Zookeeper等                                  |
| 服务调用                               | Rest、PRC、gRPC                                              |
| 服务熔断器                             | Hystrix、Envoy等                                             |
| 负载均衡                               | Ribbon、Nginx等                                              |
| 服务接口调用(客户端调用服务的简化工具) | Fegin等                                                      |
| 消息队列                               | Kafka、RabbitMQ、ActiveMQ等                                  |
| 服务配置中心管理                       | SpringCloudConfig、Chef等                                    |
| 服务路由(API网关)                      | Zuul等                                                       |
| 服务监控                               | Zabbix、Nagios、Metrics、Specatator等                        |
| 全链路追踪                             | Zipkin、Brave、Dapper等                                      |
| 数据流操作开发包                       | SpringCloud Stream(封装与Redis，Rabbit，Kafka等发送接收消息) |
| 时间消息总栈                           | SpringCloud Bus                                              |
| 服务部署                               | Docker、OpenStack、Kubernetes等                              |

- [各微服务框架对比](https://www.cnblogs.com/wangju/p/11813141.html)

> 如何构建微服务？

一个大型系统的微服务架构，就像一个复杂交织的神经网络，每一个神经元就是一个功能元素，它们各自完成自己的功能，然后通过http相互请求调用。比如一个电商系统，查缓存、连数据库、浏览页面、结账、支付等服务都是一个个独立的功能服务，都被微化了，它们作为一个个微服务共同构建了个庞大的系统。如果修改其中的一个功能，只需要更新升级其中一个功能服务单元即可。
但是这种庞大的系统架构给部罢和运维带来很大的难度。于是， spring为我们带来了构建大型分布式微服务的全套、全程产品：

- 构建一个个功能独立的微服务应用单元，可以使用 Spring boot，可以帮我们快速构建一个应用；
- 大型分布式网络服务的调用，这部分由 Spring cloud来完成，实现分布式；
- 在分布式中间，进行流式数据计算、批处理，我们有 Spring cloud data flow。
- Spring为我们想清楚了整个从开始构建应用到大型分布式应用全流程方案。

![image-20211017231320406](/SpringBoot-images/什么是SpringBoot/image-20211017231320406.png)

![springboot](/SpringBoot-images/什么是SpringBoot/springboot.png)