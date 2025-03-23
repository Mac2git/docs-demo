版本

```cmd
jdk:17
maven:3.6.3
springboot:3.4.3
springcloud:2024
mysql:5.7
```

# 微服务

1. 微服务的由来
   微服务最早由Martin Fowler与James Lewis于2014年共同提出，微服务架构风格是一种使用一套小服务来开发单个应用的方式途径，每个服务运行在自己的进程中，并使用轻量级机制通信，通常是HTTP API，这些服务基于业务能力构建，并能够通过自动化部署机制来独立部署，这些服务使用不同的编程语言实现，以及不同数据存储技术，并保持最低限度的集中式管理。

2. 为什么需要微服务
   在传统的IT行业软件大多都是各种独立系统的堆砌，这些系统的问题总结来说就是扩展性差，可靠性不高，维护成本高。到后面引入了SOA服务化，但是，由于 SOA 早期均使用了总线模式，这种总线模式是与某种技术栈强绑定的，比如：J2EE。这导致很多企业的遗留系统很难对接，切换时间太长，成本太高，新系统稳定性的收敛也需要一些时间。

3. 微服务与单体架构区别
   （1）单体架构所有的模块全都耦合在一块，代码量大，维护困难。

​	微服务每个模块就相当于一个单独的项目，代码量明显减少，遇到问题也相对来说比较好解决。

​	（2）单体架构所有的模块都共用一个数据库，存储方式比较单一。

​	微服务每个模块都可以使用不同的存储方式（比如有的用redis，有的用mysql等），数据库也是单个模块对应自己的数据库。（单体架构也可以实现，但是比较麻烦）

​	（3）单体架构所有的模块开发所使用的技术一样。

​	微服务每个模块都可以使用不同的开发技术，开发模式更灵活。

4. 微服务本质
   微服务，关键其实不仅仅是微服务本身，而是系统要提供一套基础的架构，这种架构使得微服务可以独立的部署、运行、升级，不仅如此，这个系统架构还让微服务与微服务之间在结构上“松耦合”，而在功能上则表现为一个统一的整体。这种所谓的“统一的整体”表现出来的是统一风格的界面，统一的权限管理，统一的安全策略，统一的上线过程，统一的日志和审计方法，统一的调度方式，统一的访问入口等等。
   微服务的目的是有效的拆分应用，实现敏捷开发和部署 。
   微服务提倡的理念团队间应该是 inter-operate, not integrate 。inter-operate是定义好系统的边界和接口，在一个团队内全栈，让团队自治，原因就是因为如果团队按照这样的方式组建，将沟通的成本维持在系统内部，每个子系统就会更加内聚，彼此的依赖耦合能变弱，跨系统的沟通成本也就能降低。
5. 什么样的项目适合微服务
   微服务可以按照业务功能本身的独立性来划分，如果系统提供的业务是非常底层的，如：操作系统内核、存储系统、网络系统、数据库系统等等，这类系统都偏底层，功能和功能之间有着紧密的配合关系，如果强制拆分为较小的服务单元，会让集成工作量急剧上升，并且这种人为的切割无法带来业务上的真正的隔离，所以无法做到独立部署和运行，也就不适合做成微服务了。

什么是微服务详细版本[微服务（Microservices）——Martin Flower - 船长&CAP - 博客园](https://www.cnblogs.com/liuning8023/p/4493156.html)

# 注册中心 Consul

## 为什么要引入注册中心？

微服务所在的IP地址和端口号硬编码到订单微服务中，会存在非常多的问题

1. 如果订单微服务和支付微服务的IP地址或者端口号发生了变化，则支付微服务将变得不可用，需要同步修改订单微服务中调用支付微服务的IP地址和端口号。

2. 如果系统中提供了多个订单微服务和支付微服务，则无法实现微服务的负载均衡功能。

3. 如果系统需要支持更高的并发，需要部署更多的订单微服务和支付微服务，硬编码订单微服务则后续的维护会变得异常复杂。

所以，在微服务开发的过程中，需要引入服务治理功能，实现微服务之间的动态注册与发现，从此刻开始我们正式进入SpringCloud实战

 为什么不在使用 Eureka?

1. Eureka 停更进维
2. 对初学者不太友好：首次看到自我保护机制
3. 注册中心独立和微服务解耦
4. 阿里巴巴 Nacos 崛起

## **什么是Consul？**

HashiCorp Consul 是一种服务网络解决方案，使团队能够管理服务之间以及跨本地和多云环境和运行时的安全网络连接。Consul 提供服务发现、服务网格、流量管理和网络基础设施设备的自动更新。您可以单独使用这些功能，也可以在单个 Consul 部署中一起使用这些功能。

## **Consul具有哪些特点?**

- 服务发现（Service Discovery）：`Consul`提供了通过DNS或者HTTP接口的方式来注册服务和发现服务。一些外部的服务通过Consul很容易的找到它所依赖的服务。
- [健康检查](https://zhida.zhihu.com/search?content_id=116144871&content_type=Article&match_order=1&q=健康检查&zhida_source=entity)（Health Checking）：Consul的Client可以提供任意数量的健康检查，既可以与给定的服务相关联(“webserver是否返回200 OK”)，也可以与本地节点相关联(“内存利用率是否低于90%”)。操作员可以使用这些信息来监视集群的健康状况，服务发现组件可以使用这些信息将流量从不健康的主机路由出去。
- [Key/Value存储](https://zhida.zhihu.com/search?content_id=116144871&content_type=Article&match_order=1&q=Key%2FValue存储&zhida_source=entity)：应用程序可以根据自己的需要使用Consul提供的Key/Value存储。 Consul提供了简单易用的HTTP接口，结合其他工具可以实现动态配置、功能标记、领袖选举等等功能。
- 安全服务通信：Consul可以为服务生成和分发TLS证书，以建立相互的TLS连接。意图可用于定义允许哪些服务通信。服务分割可以很容易地进行管理，其目的是可以实时更改的，而不是使用复杂的网络拓扑和静态防火墙规则。
- [多数据中心](https://zhida.zhihu.com/search?content_id=116144871&content_type=Article&match_order=1&q=多数据中心&zhida_source=entity)：Consul支持开箱即用的多数据中心. 这意味着用户不需要担心需要建立额外的抽象层让业务扩展到多个区域。

## Consul 是如何工作的？

Consul 提供了一个*控制平面*，使您能够注册、查询和保护部署在网络中的服务。控制平面是网络基础设施的一部分，它维护一个中央注册表来跟踪服务及其各自的 IP 地址。它是一个分布式系统，运行在节点集群上，例如物理服务器、云实例、虚拟机或容器。

Consul 通过代理与*数据平面*交互。数据层面是处理数据请求的网络基础设施的一部分。有关详细信息，请参阅 [Consul 体系结构](https://developer.hashicorp.com/consul/docs/architecture)。

![](/springcloudImage/1-1742382000428-12.jpg)

核心 Consul 工作流包括以下阶段：

- **注册**：团队将服务添加到 Consul 目录，该目录是一个中央注册表，可让服务自动发现彼此，而无需人工作员修改应用程序代码、部署额外的负载均衡器或硬编码 IP 地址。它是所有服务及其地址的运行时事实来源。团队可以使用 CLI 或 API 手动[定义](https://developer.hashicorp.com/consul/docs/services/usage/define-services)和[注册](https://developer.hashicorp.com/consul/docs/services/usage/register-services-checks)，或者您可以使用[服务同步](https://developer.hashicorp.com/consul/docs/k8s/service-sync)在 Kubernetes 中自动执行该过程。服务还可以包括运行状况检查，以便 Consul 可以监控运行状况不佳的服务。
- **查询**：Consul 基于身份的 DNS 允许您在 Consul 目录中找到运行状况良好的服务。向 Consul 注册的服务提供运行状况信息、接入点和其他数据，帮助您控制通过网络的数据流。您的服务仅根据您定义的基于身份的策略通过其本地代理访问其他服务。
- **安全**：服务找到上游后，Consul 确保服务到服务的通信经过身份验证、授权和加密。Consul 服务网格使用 mTLS 保护微服务架构，并且可以根据服务身份允许或限制访问，而不管计算环境和运行时的差异如何。

## **Consul的使用场景**

Consul的应用场景包括服务发现、服务隔离、服务配置：

- 服务发现场景中consul作为注册中心，服务地址被注册到consul中以后，可以使用consul提供的dns、http接口查询，consul支持health check。
- 服务隔离场景中consul支持以服务为单位设置访问策略，能同时支持经典的平台和新兴的平台，支持tls证书分发，service-to-service加密。
- 服务配置场景中consul提供key-value数据存储功能，并且能将变动迅速地通知出去，借助Consul可以实现配置共享，需要读取配置的服务可以从Consul中读取到准确的配置信息。
- Consul可以帮助系统管理者更清晰的了解复杂系统内部的系统架构，运维人员可以将Consul看成一种监控软件，也可以看成一种资产（资源）管理系统。

> 比如：docker实例的注册与配置共享、coreos实例的注册与配置共享、vitess集群、SaaS应用的配置共享、Consul与confd服务集成，动态生成nginx和haproxy配置文件或者Consul结合nginx构建高可用可扩展的Web服务。

## 下载

<img src="/springcloudImage/2-1742382000429-13.png" alt="image-20250319180558496" style="zoom:67%;" />

下载完运行

![image-20250319180847470](/springcloudImage/image-20250319180847470-1742382000429-14.png)

启动后访问http://localhost:8500

<img src="/springcloudImage/image-20250319181907275-1742382000429-15.png" alt="image-20250319181907275" style="zoom:67%;" />

出现此页面consul就整好了!

## 整合Consul

### 新建一个服务提供者8001

引入依赖

```cmd
<!-- consul discovery -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
    <exclusions>
        <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

`exclusion`是为了解决运行的时候提示：Standard Commons Logging discovery in action with spring-jcl: please remove commons-logging.jar from classpath in order to avoid potential conflicts，所以把他给排除

#### yaml配置文件

```yaml
spring:
  cloud:
    consul:
      host: localhost
      port: 8500 # consul 服务端口号
      discovery:
        service-name: ${spring.application.name} # consul 注册服务名
```

主启动类上添加`@EnableDiscoveryClient`

运行项目，访问http://localhost:8500

![image-20250319182010289](/springcloudImage/image-20250319182010289-1742382000429-16.png)

服务已经注册好了

>注意：
>
>​	省略dao、service、controller 层

## 服务消费者80

导入依赖

```cmd
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```

编写配置

```yaml
server:
  port: 80

spring:
  application:
    name: cloud-consumer-order
  ####Spring Cloud Consul for Service Discovery
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        prefer-ip-address: true #优先使用服务ip进行注册
        service-name: ${spring.application.name}
```

主启动类添加依赖`@EnableDiscoveryClient`

编写controller

```java
package com.lazu.cloud.controller;

import com.lazy.cloud.entities.PayDTO;
import com.lazy.cloud.resp.ResultData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
@RestController
public class OrderController
{
    public static final String PaymentSrv_URL = "http://cloud-payment-service";//服务注册中心上的微服务名称
    @Autowired
    private RestTemplate restTemplate;
    /**
     * 一般情况下，通过浏览器的地址栏输入url，发送的只能是get请求
     * 我们模拟消费者发送get请求，but底层调用post方法，客户端消费者参数PayDTO可以不添加@RequestBody
     * @param payDTO
     * @return
     */
    @GetMapping("/consumer/pay/add")
    public ResultData addOrder(PayDTO payDTO)
    {
        return restTemplate.postForObject(PaymentSrv_URL + "/pay/add",payDTO,ResultData.class);
    }
    @GetMapping("/consumer/pay/get/{id}")
    public ResultData getPayInfo(@PathVariable Integer id)
    {
        return restTemplate.getForObject(PaymentSrv_URL + "/pay/get/"+id, ResultData.class, id);
    }
}
```

启动80并访问http://localhost:8500

![image-20250319182519821](/springcloudImage/image-20250319182519821-1742382000429-18.png)

访问http://localhost/consumer/pay/get/1,结果出了个bug 500 

​	<img src="/springcloudImage/image-20250319182706117-1742382000429-17.png" alt="image-20250319182706117" style="zoom:67%;" />

因为我们的consul自动集成负载均衡，所以我们需要添加支持负载均衡的注解

```java
package com.lazy.cloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig
{
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate()
    {
        return new RestTemplate();
    }
}
```

在访问就好了！

![image-20250319183107813](/springcloudImage/image-20250319183107813-1742382000429-19.png)

# 三个注册中心异同点

![image-20250319183151612](/springcloudImage/image-20250319183151612.png)

CAP

Consistency：强一致性

Availability：可用性

Partition tolerance：分区容错性

## AP(Eureka)

AP架构

当网络分区出现后，为了保证可用性，系统B可以返回旧值，保证系统的可用性。

当数据出现不一致时，虽然A, B上的注册信息不完全相同，但每个Eureka节点依然能够正常对外提供服务，这会出现查询服务信息时如果请求A查不到，但请求B就能查到。如此保证了可用性但牺牲了一致性结论：违背了一致性C的要求，只满足可用性和分区容错，即AP

## CP(Zookeepre/Consul)

CP架构

当网络分区出现后，为了保证一致性，**就必须拒接请求**，否则无法保证一致性，Consul 遵循CAP原理中的CP原则，保证了强一致性和分区容错性，且使用的是Raft算法，比zookeeper使用的Paxos算法更加简单。虽然保证了强一致性，但是可用性就相应下降了，例如服务注册的时间会稍长一些，因为 Consul 的 raft 协议要求必须过半数的节点都写入成功才认为注册成功 ；在leader挂掉了之后，重新选举出leader之前会导致Consul 服务不可用。结论：违背了可用性A的要求，只满足一致性和分区容错，即CP

#  Consul 服务配置

微服务意味着要将单体应用中的业务拆分成一个个子服务，每个服务的粒度相对较小，因此系统中会出现大量的服务。由于每个服务都需要必要的配置信息才能运行，所以一套集中式的、动态的配置管理设施是必不可少的。比如某些配置文件中的内容大部分都是相同的，只有个别的配置项不同。就拿数据库配置来说吧，如果每个微服务使用的技术栈都是相同的，则每个微服务中关于数据库的配置几乎都是相同的，有时候主机迁移了，我希望一次修改，处处生效。

当下我们每一个微服务自己带着一个application.yml，上百个配置文件的管理....../(ㄒoㄒ)/~~

consul配置说明

![image-20250319183807980](/springcloudImage/image-20250319183807980.png)

1. 在我们的8001项目中，引入依赖

   ```cmd
   <!--SpringCloud consul config-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-consul-config</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-bootstrap</artifactId>
   </dependency>
   ```

2. 新建bootstrap.yml

   applicaiton.yml是用户级的资源配置项

   bootstrap.yml是系统级的，优先级更加高

   Spring Cloud会创建一个“Bootstrap Context”，作为Spring应用的`Application Context`的父上下文。初始化的时候，`Bootstrap Context`负责从外部源加载配置属性并解析配置。这两个上下文共享一个从外部获取的`Environment`。

   `Bootstrap`属性有高优先级，默认情况下，它们不会被本地配置覆盖。 `Bootstrap context`和`Application Context`有着不同的约定，所以新增了一个`bootstrap.yml`文件，保证`Bootstrap Context`和`Application Context`配置的分离。

    application.yml文件改为bootstrap.yml,这是很关键的或者两者共存

   因为bootstrap.yml是比aplication.yml先加载的。bootstrap.yml优先级高于application.yml

   ```yml
   spring:
     cloud:
       consul:
         host: localhost
         port: 8500
         discovery:
           service-name: ${spring.application.name}
         config:
           profile-separator: "-" # consul kv存储多环境目录分隔符 默认为逗号，把他设置为 -
           format: yaml
           watch:
             wait-time: 1
     application:
       name: cloud-provider
   # config/cloud-payment-service/data
   #       /cloud-payment-service-dev/data
   #       /cloud-payment-service-prod/data
   ```

3. application.yaml的内容

   ```yaml
   server:
     port: 8001
   spring:
     profiles:
       active: dev
   ```

4. consul服务器key/value编写

   参考：

   ![image-20250319184133882](/springcloudImage/image-20250319184133882.png)

 1. 在consul的key/value创建config文件，以/结尾

    ![image-20250319184335174](/springcloudImage/image-20250319184335174.png)

 2. 在`config`下分别创建3个文件，后面对应的`Springboot`多环境配置的`dev`、`prod`、`default`

![image-20250319184346884](/springcloudImage/image-20250319184346884.png)

3. 最后在创建data文件

![image-20250319184545913](/springcloudImage/image-20250319184545913.png)

5. 编写controller

```java
@Value("${server.port}")
private String port;

@GetMapping("/pay/info")
public String info(@Value("${lazy.info}") String info){
    return info+"\t"+port;
}
```

6. 运行测试

   ![image-20250319184755005](/springcloudImage/image-20250319184755005-1742382000429-20.png)

当我们切换环境的时候

![image-20250319184838244](/springcloudImage/image-20250319184838244-1742382000429-21.png)

注意：

​	![image-20250319184907015](/springcloudImage/image-20250319184907015-1742382000429-22.png)

名字要和`spring.application.name=cloud-provider`保持一致

## consul动态刷新配置文件

当我们修改了配置文件后，刷新http://localhost:8001/pay/info页面发现不生效

这个时候我们要在主启动类添加`@RefreshScope`,当我们添加完这个注解，默认是55秒后刷新，我们可以在`bootstrap.yaml`添加`spring.cloud.consul.config.watch.wait-time=秒`

```yaml
spring:
  application:
    name: cloud-payment-service
    ####Spring Cloud Consul for Service Discovery
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
      config:
        profile-separator: '-' # default value is ","，we update '-'
        format: YAML
        watch:
          wait-time: 1 # 修改配置后，需要等待的时间，不建议修改
```

然后重新启动，就可以实时获取到consul的key/value数据了！

# loadBalancer

**LB负载均衡(Load Balance)是什么**

简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA（高可用），常见的负载均衡有软件Nginx，LVS，硬件 F5等

**spring-cloud-starter-loadbalancer组件是什么**

Spring Cloud LoadBalancer是由SpringCloud官方提供的一个开源的、简单易用的**客户端负载均衡器**，它包含在SpringCloud-commons中用它来替换了以前的Ribbon组件。相比较于Ribbon，SpringCloud LoadBalancer不仅能够支持RestTemplate，还支持WebClient（WeClient是Spring Web Flux中提供的功能，可以实现响应式异步请求）

## loadbalancer本地负载均衡客户端 VS Nginx服务端负载均衡区别

Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求，即负载均衡是由服务端实现的。

loadbalancer本地负载均衡，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到JVM本地，从而在本地实现RPC远程服务调用技术。

## LoadBalancer 工作方式

![image-20250320211348790](/springcloudImage/image-20250320211348790.png)

LoadBalancer 在工作时分成两步：

**第一步**，先选择ConsulServer从服务端查询并拉取服务列表，知道了它有多个服务(上图3个服务)，这3个实现是完全一样的，

默认轮询调用谁都可以正常执行。类似生活中求医挂号，某个科室今日出诊的全部医生，客户端你自己选一个。

**第二步**，按照指定的负载均衡策略从server取到的服务注册列表中由客户端自己选择一个地址，所以LoadBalancer是一个**客户端的**负载均衡器。

## 持久化步骤

1. 新建一个8001项目

2. 启动`consul`，将8001、和8002注册近服务

3. 如何持久化保存

   1. 把consul复制到一个地方

   2. 在`consul.exe`同级新建`mydata`文件

   3. 新建`consul_start.bat`文件

   4. `consul_start.bat`文件下写

   5. ```cmd
      @echo.服务启动......  
      @echo off  
      @sc create Consul binpath= "D:\\Environment\\consul\\consul.exe agent -server -ui -bind=127.0.0.1 -client=0.0.0.0 -bootstrap-expect  1  -data-dir D:\\Environment\\consul\\mydata   "
      @net start Consul
      @sc config Consul start= AUTO  
      @echo.Consul start is OK......success
      @pause
      ```

   6. 右键`consul_start.bat`文件，以管理员身份运行

   7. ![image-20250320212056235](/springcloudImage/image-20250320212056235.png)

   8. ![image-20250320212228296](/springcloudImage/image-20250320212228296.png)

   9. 后续数据就会保存到`mydata`文件夹下了

   ## 将80端口注册到`consul`

   添加依赖

   ```apl
   <!--loadbalancer-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-loadbalancer</artifactId>
   </dependency>
   ```

   添加代码

   ```java
   @GetMapping(value = "/consumer/pay/get/info")
   private String getInfoByConsul()
   {
       return restTemplate.getForObject(PaymentSrv_URL + "/pay/get/info", String.class);
   }
   ```

   

![image-20250320212537433](/springcloudImage/image-20250320212537433.png)

## 通过`DiscoveryClient`获取线上列表服务

```java
@Resource
private DiscoveryClient discoveryClient;
@GetMapping("/consumer/discovery")
public String discovery()
{
    List<String> services = discoveryClient.getServices();
    for (String element : services) {
        System.out.println(element);
    }

    System.out.println("===================================");

    List<ServiceInstance> instances = discoveryClient.getInstances("cloud-payment-service");
    for (ServiceInstance element : instances) {
        System.out.println(element.getServiceId()+"\t"+element.getHost()+"\t"+element.getPort()+"\t"+element.getUri());
    }

    return instances.get(0).getServiceId()+":"+instances.get(0).getPort();
}
```

负载均衡算法：rest接口第几次请求数 % 服务器集群总数量 = 实际调用服务器位置下标 ，每次服务重启动后rest接口计数从1开始。

 ```java
 List<ServiceInstance> instances = discoveryClient.getInstances("cloud-payment-service");
 如：  List [0] instances = 127.0.0.1:8002
 　　　List [1] instances = 127.0.0.1:8001
 ```

8001+ 8002 组合成为集群，它们共计2台机器，集群总数为2， 按照轮询算法原理：

当总请求数为1时： 1 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位2时： 2 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

当总请求数位3时： 3 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位4时： 4 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

如此类推......

## 自定义轮询策略

修改`RestTemplateConfig`文件

```java
package com.lazy.cloud.config;
@Configuration
@LoadBalancerClient(value = "cloud-provider",configuration = RestTemplateConfig.class) // cloud-provider 是服务提供者的spring.application.name
public class RestTemplateConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    //随机策略
    @Bean
    ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(Environment environment,
                                                            LoadBalancerClientFactory loadBalancerClientFactory) {
        String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
        return new RandomLoadBalancer(loadBalancerClientFactory
                .getLazyProvider(name, ServiceInstanceListSupplier.class),
                name);
    }
}

```

# openFeign接口服务调用

## `openFeign`是什么?

官方解释：[Feign](https://github.com/OpenFeign/feign) 是一个声明性 Web 服务客户端。它使编写 Web 服务客户端变得更加容易。要使用 Feign，请创建一个接口并对其进行注释。它具有可插拔的注释支持，包括 Feign 注释和 JAX-RS 注释。Feign 还支持可插拔编码器和解码器。Spring Cloud 增加了对 Spring MVC 注释的支持，以及对使用 Spring Web 中默认使用的相同 `HttpMessageConverters` 的支持。

`openFeign`是一个声明式客户端，只需创建一个Rest接口并在该接口上添加`@FeignClient`即可

## `openFeign`能干嘛?

1. 可插拔的注解支持，包括Feign注解和JAX-RS注解
2. 支持可插拔的HTTP编码器和解码器
3. 支持Sentinel 和它的 Fallback
4. 支持 SpringCloudLoadBalancer 的负载均衡
5. 支持 HTTP 请求和响应的压缩

## 如何玩？

![image-20250322162836204](/springcloudImage/image-20250322162836204.png)

步骤：

1. 建 module `cloud-consumer-feign-order80`

2. 添加pom依赖

   ```cmd
   <dependencies>
       <!--openfeign-->
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-openfeign</artifactId>
       </dependency>
       <!--SpringCloud consul discovery-->
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-consul-discovery</artifactId>
       </dependency>
       <!-- 引入自己定义的api通用包 -->
       <dependency>
           <groupId>com.atguigu.cloud</groupId>
           <artifactId>cloud-api-commons</artifactId>
           <version>1.0-SNAPSHOT</version>
       </dependency>
       <!--web + actuator-->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-actuator</artifactId>
       </dependency>
       <!--lombok-->
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <optional>true</optional>
       </dependency>
       <!--hutool-all-->
       <dependency>
           <groupId>cn.hutool</groupId>
           <artifactId>hutool-all</artifactId>
       </dependency>
       <!--fastjson2-->
       <dependency>
           <groupId>com.alibaba.fastjson2</groupId>
           <artifactId>fastjson2</artifactId>
       </dependency>
       <!-- swagger3 调用方式 http://你的主机IP地址:5555/swagger-ui/index.html -->
       <dependency>
           <groupId>org.springdoc</groupId>
           <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
       </dependency>
   </dependencies>
   
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
           </plugin>
       </plugins>
   </build>
   ```

3. 编写 `application.yaml`

   ```yaml
   server:
     port: 80
   
   spring:
     application:
       name: cloud-consumer-openfeign-order
     ####Spring Cloud Consul for Service Discovery
     cloud:
       consul:
         host: localhost
         port: 8500
         discovery:
           prefer-ip-address: true #优先使用服务ip进行注册
           service-name: ${spring.application.name}
   ```

4. 主启动类上添加注解

   ```java
   @SpringBootApplication
   @EnableDiscoveryClient //该注解用于向使用consul为注册中心时注册服务
   @EnableFeignClients//启用feign客户端,定义服务+绑定接口，以声明式的方法优雅而简单的实现服务调用
   public class MainOpenFeign80
   {
       public static void main(String[] args)
       {
           SpringApplication.run(MainOpenFeign80.class,args);
       }
   }
   ```

5. 业务类，修改 `cloud-api-commons`通用模块

   1. 引入`openfeign`依赖

      ```cmd
      <!--openfeign-->
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-openfeign</artifactId>
      </dependency>
      ```

   2. 新建服务接口，并添加依赖

      ```java
      package com.lazy.cloud.apis;
      
      import com.lazy.cloud.pojo.Pay;
      import com.lazy.cloud.pojo.PayDTO;
      import com.lazy.cloud.resp.ResultData;
      import org.springframework.cloud.openfeign.FeignClient;
      import org.springframework.web.bind.annotation.*;
      
      import java.util.List;
      
      @FeignClient(value = "cloud-provider")
      public interface PayFeignApi {
      
          /**
           * 添加一个支付信息
           *
           * @param pay
           * @return
           */
          @PostMapping("/pay/add")
          public ResultData addOrder(@RequestBody Pay pay);
      
          /**
           * 删除一个支付信息
           *
           * @param id
           * @return
           */
          @DeleteMapping("/pay/del/{id}")
          public ResultData<String> delOrder(@PathVariable("id") Integer id);
      
          /**
           * 更新一个支付信息
           *
           * @param payDTO
           * @return
           */
          @PutMapping("/pay/update")
          public ResultData<String> updateOrder(@RequestBody PayDTO payDTO);
      
          /**
           * 获取一条支付信息
           *
           * @param id
           * @return
           */
          @GetMapping("/pay/get/{id}")
          public ResultData<Pay> select(@PathVariable("id") Integer id);
      
          /**
           * 查询所有支付
           *
           * @return
           */
          @GetMapping("/pay/select")
          public ResultData<List<Pay>> select();
      
          /**
           * 负载均衡
           *
           * @return
           */
          @GetMapping("/pay/info")
          public String mylb();
      }
      
      ```

   3. 上面的类是参考这个`controller`类的接口

      ```java
      package com.lazy.cloud.controller;
      
      import ch.qos.logback.core.util.TimeUtil;
      import com.lazy.cloud.pojo.Pay;
      import com.lazy.cloud.pojo.PayDTO;
      import com.lazy.cloud.resp.ResultData;
      import com.lazy.cloud.service.PayService;
      import io.swagger.v3.oas.annotations.Operation;
      import io.swagger.v3.oas.annotations.tags.Tag;
      import jakarta.annotation.Resource;
      import lombok.extern.slf4j.Slf4j;
      import org.springframework.beans.BeanUtils;
      import org.springframework.beans.factory.annotation.Value;
      import org.springframework.web.bind.annotation.*;
      
      import java.util.List;
      import java.util.concurrent.TimeUnit;
      
      @RestController
      @Slf4j
      @Tag(name = "支付服务模块",description = "支付CRUD")
      public class PayController {
      
          @Resource
          private PayService payService;
      
          @PostMapping(value = "/pay/add")
          @Operation(method = "post方法",summary = "新增方法",description = "需要往请求体传入json")
          public ResultData<String> add(@RequestBody Pay pay){
              System.out.println(pay.toString());
              int i = payService.add(pay);
              return ResultData.success("成功插入，返回值："+i);
          }
          @Operation(method = "delete方法",summary = "删除方法",description = "传入删除id")
          @DeleteMapping(value = "/pay/del/{id}")
          public ResultData<String> delete(@PathVariable("id") Integer id){
              int i = payService.delete(id);
              return ResultData.success("删除成功，返回值："+i);
          }
          @Operation(method = "put方法",summary = "修改方法",description = "需要往请求体传入json")
          @PutMapping(value = "/pay/update")
          public ResultData<String> update(@RequestBody PayDTO payDTO){
              Pay pay = new Pay();
              BeanUtils.copyProperties(payDTO,pay);
              int i = payService.update(pay);
              return ResultData.success("修改成功，返回值："+i);
          }
          @Operation(method = "get方法",summary = "根据id查询",description = "需要传入id，restful风格")
          @GetMapping(value = "/pay/get/{id}")
          public ResultData<Pay> select(@PathVariable("id") Integer id){
              if (id<=0) throw new RuntimeException("id不能为负数");
              try {
                  TimeUnit.SECONDS.sleep(61);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              return ResultData.success(payService.getById(id));
          }
      
          @Operation(method = "get方法",summary = "查询所有",description = "无")
          @GetMapping(value = "/pay/select")
          public ResultData<List<Pay>> select(){
              return ResultData.success(payService.getAll());
          }
      
          @Value("${server.port}")
          private String port;
      
          @GetMapping("/pay/info")
          public String info(@Value("${lazy.info}") String info){
              return info+"\t"+port;
          }
      }
      ```

   4. 小bug

      ![image-20250322163633349](/springcloudImage/image-20250322163633349.png)

   5. `cloud-consumer-feign-order80`模块上添加`controller`层，并调用上面的模块

      ```java
      package com.lazy.cloud.controller;
      
      import cn.hutool.core.date.DateUtil;
      import com.lazy.cloud.apis.PayFeignApi;
      import com.lazy.cloud.pojo.Pay;
      import com.lazy.cloud.pojo.PayDTO;
      import com.lazy.cloud.resp.ResultCodeEnum;
      import com.lazy.cloud.resp.ResultData;
      import jakarta.annotation.Resource;
      import org.springframework.web.bind.annotation.*;
      
      import java.util.List;
      
      @RestController
      public class OrderController {
          @Resource
          private PayFeignApi payFeignApi;
      
          @PostMapping("/consumer/feign/add")
          public ResultData<String> addOrder(@RequestBody Pay pay) {
              return payFeignApi.addOrder(pay);
          }
      
          @DeleteMapping("/consumer/feign/del/{id}")
          public ResultData<String> delOrder(@PathVariable("id") Integer id) {
              return payFeignApi.delOrder(id);
          }
      
          @PutMapping("/consumer/feign/update")
          public ResultData<String> updateOrder(@RequestBody PayDTO payDTO) {
              return payFeignApi.updateOrder(payDTO);
          }
      
          @GetMapping("/consumer/feign/get/{id}")
          public ResultData getOrder(@PathVariable("id") Integer id) {
              ResultData<Pay> resultData = payFeignApi.select(id);
              return resultData;
          }
      
          @GetMapping("/consumer/feign/select")
          public ResultData<List<Pay>> select() {
              return payFeignApi.select();
          }
      
          @GetMapping("/consumer/feign/info")
          public String mylb() {
              return payFeignApi.mylb();
          }
      
      }
      ```

## 测试

1. 先启动 consul
2. 启动微服务8001模块
3. 在启动`cloud-consumer-fegin-order80`
4. ![image-20250322164242856](/springcloudImage/image-20250322164242856.png)

## openFeign高级特性

### openFegin超时控制

![image-20250322164507316](/springcloudImage/image-20250322164507316.png)

测试

![image-20250322164558345](/springcloudImage/image-20250322164558345.png)

结论：

​	`openFegin`默认等待60秒，超过自动报错

默认`OpenFeign`客户端等待60秒钟，但是服务端处理超过规定时间会导致Feign客户端返回报错。为了避免这样的情况，有时候我们需要设置Feign客户端的超时控制，默认60秒太长或者业务时间太短都不好

`yml`文件中开启配置：

`connectTimeout`    连接超时时间

`readTimeout`       请求处理超时时间

添加`cloud-consumer-openfeign-order80`配置

 ```yaml
 server:
   port: 80
 
 spring:
   application:
     name: cloud-consumer-openfeign-order
   ####Spring Cloud Consul for Service Discovery
   cloud:
     consul:
       host: localhost
       port: 8500
       discovery:
         prefer-ip-address: true #优先使用服务ip进行注册
         service-name: ${spring.application.name}
     openfeign:
       client:
         config:
           default: # 默认配置
             connect-timeout: 5000
             read-timeout: 5000
           cloud-provider: # 指定模块配置，按照@FeignClient(value = "cloud-provider")来指定
             connect-timeout: 4000
             read-timeout: 4000
 ```

![image-20250322165045882](/springcloudImage/image-20250322165045882.png)

### `openFegin`重试机制

![image-20250322165131809](/springcloudImage/image-20250322165131809.png)

添加重试机制，在`cloud-api-commons`项目下新建apis包

```java
package com.lazy.cloud.config;

import feign.Retryer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig
{
    @Bean
    public Retryer myRetryer()
    {
        //return Retryer.NEVER_RETRY; //Feign默认配置是不走重试策略的

        //最大请求次数为3(1+2)，初始间隔时间为100ms，重试间最大间隔时间为1s
        return new Retryer.Default(100,1,3);
    }
}
```

结果

![image-20250322165300178](/springcloudImage/image-20250322165300178.png)

>如果你觉得效果不明显，后续演示feign 日志功能的时候再演示，
>
>目前控制台没有看到3次重试过程，只看到结果，***正常的，正确的\***，是feign的日志打印问题

### `openFegin`默认HttpClient修改

是什么？

OpenFeign中http client如果不做特殊配置，OpenFeign默认使用JDK自带的HttpURLConnection发送HTTP请求，由于默认HttpURLConnection没有连接池、性能和效率比较低，如果采用默认，性能上不是最牛B的，所以加到最大。

![image-20250322165524603](/springcloudImage/image-20250322165524603.png)

在`cloud-consumer-fegin-order80`添加pom依赖

```cmd
<!-- httpclient5-->
<dependency>
    <groupId>org.apache.httpcomponents.client5</groupId>
    <artifactId>httpclient5</artifactId>
    <version>5.4.2</version>
</dependency>
<!-- feign-hc5-->
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-hc5</artifactId>
    <version>13.1</version>
</dependency>
```

添加yaml配置

```yaml
spring:
  cloud:
    consul:
      httpclient:
        hc5:
          enabled: true # 开启Apache HttpClient 5
```

替换之前

![image-20250322165749740](/springcloudImage/image-20250322165749740.png)

替换之后

![image-20250322165808515](/springcloudImage/image-20250322165808515.png)

### `OpenFegin`请求/响应压缩

是什么？

**对请求和响应进行GZIP压缩**

Spring Cloud OpenFeign支持对请求和响应进行GZIP压缩，以减少通信过程中的性能损耗。

通过下面的两个参数设置，就能开启请求与相应的压缩功能：

```properties
spring.cloud.openfeign.compression.request.enabled=true
spring.cloud.openfeign.compression.response.enabled=true
```

**细粒度化设置**

对请求压缩做一些更细致的设置，比如下面的配置内容指定压缩的请求数据类型并设置了请求压缩的大小下限，

只有超过这个大小的请求才会进行压缩：

```properties
spring.cloud.openfeign.compression.request.enabled=true
spring.cloud.openfeign.compression.request.mime-types=text/xml,application/xml,application/json #触发压缩数据类型
spring.cloud.openfeign.compression.request.min-request-size=2048 #最小触发压缩的大小
```

在`cloud-consumer-fegin-order80`添加配置

```yaml
spring:
  cloud:
    openfeign:
      compression:
        request:
          enabled: true
          min-request-size: 2048 #最小触发压缩的大小
          mime-types: text/xml,application/xml,application/json #触发压缩数据类型
        response:
          enabled: true
```

![image-20250322170116526](/springcloudImage/image-20250322170116526.png)

### `OpenFegin`日志打印功能

Feign 提供了日志打印功能，我们可以通过配置来调整日志级别，从而了解 Feign 中 Http 请求的细节，说白了就是对Feign接口的调用情况进行监控和输出

日志级别

```java
public static enum Level {
    NONE, //NONE：默认的，不显示任何日志；
    BASIC,//BASIC：仅记录请求方法、URL、响应状态码及执行时间；
    HEADERS,//HEADERS：除了 BASIC 中定义的信息之外，还有请求和响应的头信息；
    FULL;//FULL：除了 HEADERS 中定义的信息之外，还有请求和响应的正文及元数据。
    private Level() {
    }
}
```

添加日志功能，在`cloud-consumer-fegin-order80`添加

```java
package com.lazy.cloud.config;

import feign.Logger;
import feign.Retryer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenFeignConfig {

    @Bean
    public Retryer myRetryer() {
//        return Retryer.NEVER_RETRY;//默认的是这个，没有重试
        //初始间隔时间为，100ms，重试间隔时间为1s，最大重试次数为3
        return new Retryer.Default(100,1,3);
    }
    /**
     * 添加日志打印功能
     * @return
     */
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}

```

配置yaml

```yaml
# feign日志以什么级别监控哪个接口
logging:
  level:
    com:
      atguigu:
        cloud:
          apis:
            PayFeignApi: debug 
```

查看调用

![image-20250322170528023](/springcloudImage/image-20250322170528023.png)

# `CircuitBreaker`熔断器

## 概述

<img src="/springcloudImage\image-20250323155320769.png" alt="image-20250323155320769" style="zoom:67%;" />

`hystrix`已经进入维护模式，替换方案`resilience4j`(`resilience for java`)

![image-20250323155414551](/springcloudImage/image-20250323155414551.png)

### 分布式系统面临的问题

复杂分布式体系结构中的应用程序有数十个依赖关系，每个依赖关系在某些时候将不可避免地失败。

![image-20250323155525241](/springcloudImage/image-20250323155525241.png)

### 服务雪崩

多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务，这就是所谓的“扇出”。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”.

对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。

所以，通常当你发现一个模块下的某个实例失败后，这时候这个模块依然还会接收流量，然后这个有问题的模块还调用了其他的模块，这样就会发生级联故障，或者叫雪崩。

### 诉求 

问题：

禁止服务雪崩故障

解决： 

\- 有问题的节点，快速熔断（快速返回失败处理或者返回默认兜底数据【服务降级】）。

“断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝），向调用方返回一个符合预期的、可处理的备选响应(FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常，这样就保证了服务调用方的线程不会被长时间、不必要地占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。

一句话，**出故障了“保险丝”跳闸，别把整个家给烧了，😄**

### `Circuitbreaker` 是什么

`Circuitbreaker` 提供了一种在 Go 程序中使用 Circuit Breaker 模式的简单方法。

当程序进行远程调用时，通常会使用断路器。远程呼叫通常会在超时之前挂起一段时间。如果您的应用程序发出大量此类请求，则可能会占用许多资源，等待这些超时发生。断路器包装这些远程调用，并在发生定义数量的故障或超时后跳闸。当断路器跳闸时，任何后续调用都将避免进行远程调用，并向调用方返回错误。同时，断路器将定期允许再次尝试某些调用，如果成功，将关闭电路。

根据上述所描述的问题，`Circuitbreaker `可以更好的解决

### 实现原理

CircuitBreaker的目的是保护分布式系统免受故障和异常，提高系统的可用性和健壮性。

 

当一个组件或服务出现故障时，CircuitBreaker会迅速切换到开放OPEN状态(保险丝跳闸断电)，阻止请求发送到该组件或服务从而避免更多的请求发送到该组件或服务。这可以减少对该组件或服务的负载，防止该组件或服务进一步崩溃，并使整个系统能够继续正常运行。同时，CircuitBreaker还可以提高系统的可用性和健壮性，因为它可以在分布式系统的各个组件之间自动切换，从而避免单点故障的问题。

<img src="/springcloudImage/image-20250323160407719.png" alt="image-20250323160407719" style="zoom:67%;" />

>一句话，`Circuitbreaker`只是一套规范和接口，落地实现者是`Resilience4j`

## `Resilience4j`是什么

Resilience4j 是一个轻量级的容错库，专为函数式编程而设计。Resilience4j 提供高阶函数（装饰器），以使用断路器、速率限制器、重试或隔板来增强任何功能接口、lambda 表达式或方法引用。您可以在任何功能接口、lambda 表达式或方法引用上堆叠多个装饰器。优点是您可以选择所需的装饰器，而不是其他任何选择。

**Resilience4j 2 需要 Java 17。**

### `Resilience4j`能干嘛

- resilience4j-cache：结果缓存
- resilience4j-circuitbreaker： 熔断
- resilience4j-ratelimiter：速率限制
- resilience4j-bulkhead： 隔板
- resilience4j-retry：自动重试（同步和异步）
- resilience4j-timelimiter：超时处理

### 熔断（Circuitbreaker）（服务熔断+服务降级）

#### 熔断器的三种状态

CircuitBreaker 通过有限状态机实现，具有三种正常状态：CLOSED、OPEN 和 HALF_OPEN 以及三种特殊状态METRICS_ONLY、DISABLED 和 FORCED_OPEN。

![state_machine.jpg](/springcloudImage/39cdd54-state_machine.jpg)

#### 熔断器三种状态之间的转换

<img src="/springcloudImage/image-20250323161052546.png" alt="image-20250323161052546" style="zoom:67%;" />

熔断器的所有配置参考

| Config 属性                                  | 默认值                                                | 描述                                                         |
| :------------------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------- |
| failureRateThreshold                         | 50                                                    | 以百分比形式配置失败率阈值。  当故障率等于或大于阈值时，CircuitBreaker 将转换为开路并开始短路调用。 |
| slowCallRateThreshold                        | 100                                                   | 以百分比形式配置阈值。当调用持续时间大于  当慢速调用的百分比等于或大于阈值时，CircuitBreaker 将调用视为慢速调用，CircuitBreaker 将转换为打开并开始短路调用。`slowCallDurationThreshold` |
| slowCallDurationThreshold                    | 60000 毫秒                                            | 配置持续时间阈值，超过该阈值的调用将被视为慢速调用，并增加慢速调用的速率。 |
| permittedNumberOfCalls InHalfOpenState 中    | 10                                                    | 配置 CircuitBreaker 半开时允许的调用数。                     |
| maxWaitDurationInHalfOpenState               | 0 [毫秒]                                              | 配置最长等待持续时间，该持续时间控制 CircuitBreaker 在切换到打开状态之前可以保持 Half Open 状态的最长时间。 值 0 表示断路器将在 HalfOpen 状态下无限等待，直到所有允许的调用都完成。 |
| slidingWindowType （滑动窗口类型）           | COUNT_BASED                                           | 配置滑动窗口的类型，该窗口用于在 CircuitBreaker 闭合时记录调用结果。 滑动窗口 可以基于计数或基于时间。  如果滑动窗口COUNT_BASED，则会记录并聚合上次调用。 如果滑动窗口为 TIME_BASED，则记录并聚合最近几秒钟的调用。`slidingWindowSize``slidingWindowSize` |
| slidingWindowSize （滑动窗口大小）           | 100                                                   | 配置滑动窗口的大小，该窗口用于在 CircuitBreaker 关闭时记录调用的结果。 |
| 最小通话次数                                 | 100                                                   | 配置 CircuitBreaker 可以计算错误率或慢速调用率之前所需的最小调用次数 （每个滑动窗口周期）。 例如，如果 minimumNumberOfCalls 为 10，则必须至少记录 10 个调用，然后才能计算失败率。 如果只记录了 9 个调用，则即使所有 9 个调用都失败，CircuitBreaker 也不会转换为打开。 |
| waitDurationInOpenState                      | 60000 毫秒                                            | CircuitBreaker 在从打开转换为半开之前应等待的时间。          |
| automaticTransition 从 OpenToHalfOpenEnabled | 假                                                    | 如果设置为 true，则表示 CircuitBreaker 将自动从打开状态转换为半开状态，并且无需调用来触发转换。创建一个线程来监视 CircuitBreakers 的所有实例，以便在 waitDurationInOpenState 通过后将它们转换为 HALF_OPEN。而，如果设置为 false，则只有在进行调用时才会转换为 HALF_OPEN，即使在传递 waitDurationInOpenState 之后也是如此。这样做的好处是没有线程监视所有 CircuitBreaker 的状态。 |
| 记录异常                                     | 空                                                    | 记录为失败的异常列表，因此会增加失败率。 任何匹配或继承自列表之一的异常都计为失败，除非通过 . 如果指定例外列表，则所有其他异常都计为成功，除非它们被 显式忽略。`ignoreExceptions``ignoreExceptions` |
| ignoreExceptions                             | 空                                                    | 被忽略且既不计为失败也不计为成功的异常列表。 任何匹配或继承自列表之一的异常都不会计为失败或成功，即使异常是 的一部分。`recordExceptions` |
| recordFailurePredicate 的                    | throwable -> true  默认情况下，所有异常都记录为失败。 | 一个自定义 Predicate，用于评估是否应将异常记录为失败。 如果异常应计为失败，则 Predicate 必须返回 true。如果异常 应计为成功，则谓词必须返回 false，除非异常被 显式忽略。`ignoreExceptions` |
| ignoreExceptionPredicate                     | throwable -> false  默认情况下，不会忽略任何异常。    | 一个自定义 Predicate，用于评估是否应忽略异常，并且既不计为失败也不计为成功。 如果应忽略异常，则 Predicate 必须返回 true。 如果异常应计为失败，则 Predicate 必须返回 false |

精简版：

|            **failure-rate-threshold**            | **以百分比配置失败率峰值**                                   |
| :----------------------------------------------: | ------------------------------------------------------------ |
|             **sliding-window-type**              | **断路器的滑动窗口期类型 可以基于“次数”（COUNT_BASED）或者“时间”（TIME_BASED）进行熔断，默认是COUNT_BASED。** |
|             **sliding-window-size**              | **若COUNT_BASED，则10次调用中有50%失败（即5次）打开熔断断路器；****若为TIME_BASED则，此时还有额外的两个设置属性，含义为：在N秒内（sliding-window-size）100%（slow-call-rate-threshold）的请求超过N秒（slow-call-duration-threshold）打开断路器。** |
|            **slowCallRateThreshold**             | **以百分比的方式配置，断路器把调用时间大于slowCallDurationThreshold的调用视为慢调用，当慢调用比例大于等于峰值时，断路器开启，并进入服务降级。** |
|          **slowCallDurationThreshold**           | **配置调用时间的峰值，高于该峰值的视为慢调用。**             |
| **permitted-number-of-calls-in-half-open-state** | **运行断路器在HALF_OPEN状态下时进行N次调用，如果故障或慢速调用仍然高于阈值，断路器再次进入打开状态。** |
|           **minimum-number-of-calls**            | **在每个滑动窗口期样本数，配置断路器计算错误率或者慢调用率的最小调用数。比如设置为5意味着，在计算故障率之前，必须至少调用5次。如果只记录了4次，即使4次都失败了，断路器也不会进入到打开状态。** |
|         **wait-duration-in-open-state**          | **从OPEN到HALF_OPEN状态需要等待的时间**                      |

官网[CircuitBreaker](https://resilience4j.readme.io/docs/circuitbreaker#create-a-circuitbreakerregistry)

### COUNT_BASED(计数的滑动窗口)

步骤：

1. 修改`cloud-provider-payment-8001`,新建`PayCircuitController`

   ```java
   package com.lazy.cloud.controller;
   
   import cn.hutool.core.util.IdUtil;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.PathVariable;
   import org.springframework.web.bind.annotation.RestController;
   
   import java.util.concurrent.TimeUnit;
   
   @RestController
   public class PayCircuitController
   {
       //=========Resilience4j CircuitBreaker 的例子
       @GetMapping(value = "/pay/circuit/{id}")
       public String myCircuit(@PathVariable("id") Integer id)
       {
           if(id == -4) throw new RuntimeException("----circuit id 不能负数");
           if(id == 9999){
               try { TimeUnit.SECONDS.sleep(5); } catch (InterruptedException e) { e.printStackTrace(); }
           }
           return "Hello, circuit! inputId:  "+id+" \t " + IdUtil.simpleUUID();
       }
   }
   ```

2. 修改 [cloud-api-commons](..\..\..\..\..\IntelliJ IDEA 2024.2.3\workspace\cloud2024\cloud-api-commons) 的`PayFeignApi`接口，新增

   ```java
   /**
    * CircuitBreaker 例子
    * @param id
    * @return
    */
   @GetMapping("/pay/circuit/{id}")
   public String payCircuit(@PathVariable("id") Integer id);
   ```

3. 修改 [cloud-consumer-feign-order80](..\..\..\..\..\IntelliJ IDEA 2024.2.3\workspace\cloud2024\cloud-consumer-feign-order80) 

   1. 新增依赖

      ```cmd
      <!--resilience4j-circuit breaker-->
      <dependency>
          <groupId>org.springframework.cloud</groupId>
          <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
      </dependency>
      <!-- 由于断路保护等需要AOP实现，所以必须导入AOP包 -->
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-aop</artifactId>
      </dependency>
      ```

   2. 写配置文件

      ```yaml
      # Resilience4j CircuitBreaker 按照次数：COUNT_BASED 的例子
      #  6次访问中当执行方法的失败率达到50%时CircuitBreaker将进入开启OPEN状态(保险丝跳闸断电)拒绝所有请求。
      #  等待5秒后，CircuitBreaker 将自动从开启OPEN状态过渡到半开HALF_OPEN状态，允许一些请求通过以测试服务是否恢复正常。
      #  如还是异常CircuitBreaker 将重新进入开启OPEN状态；如正常将进入关闭CLOSE闭合状态恢复正常处理请求。
      resilience4j:
        circuitbreaker:
          configs:
            default:
              failureRateThreshold: 50 #设置50%的调用失败时打开断路器，超过失败请求百分⽐CircuitBreaker变为OPEN状态。
              slidingWindowType: COUNT_BASED # 滑动窗口的类型
              slidingWindowSize: 6 #滑动窗⼝的⼤⼩配置COUNT_BASED表示6个请求，配置TIME_BASED表示6秒
              minimumNumberOfCalls: 6 #断路器计算失败率或慢调用率之前所需的最小样本(每个滑动窗口周期)。如果minimumNumberOfCalls为10，则必须最少记录10个样本，然后才能计算失败率。如果只记录了9次调用，即使所有9次调用都失败，断路器也不会开启。
              automaticTransitionFromOpenToHalfOpenEnabled: true # 是否启用自动从开启状态过渡到半开状态，默认值为true。如果启用，CircuitBreaker将自动从开启状态过渡到半开状态，并允许一些请求通过以测试服务是否恢复正常
              waitDurationInOpenState: 5s #从OPEN到HALF_OPEN状态需要等待的时间
              permittedNumberOfCallsInHalfOpenState: 2 #半开状态允许的最大请求数，默认值为10。在半开状态下，CircuitBreaker将允许最多permittedNumberOfCallsInHalfOpenState个请求通过，如果其中有任何一个请求失败，CircuitBreaker将重新进入开启状态。
              recordExceptions:
                - java.lang.Exception
          instances:
            cloud-provider: # 这个名字要和注册到consul的名字一样，就是服务提供者的名字一样
              baseConfig: default
      ```

   3. 新建`OrderCircuitController`类

      ```java
      package com.lazy.cloud.controller;
      
      import com.lazy.cloud.apis.PayFeignApi;
      import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
      import jakarta.annotation.Resource;
      import org.springframework.web.bind.annotation.GetMapping;
      import org.springframework.web.bind.annotation.PathVariable;
      import org.springframework.web.bind.annotation.RestController;
      
      @RestController
      public class OrderCircuitController {
          @Resource
          private PayFeignApi payFeignApi;
      
          /**
           * @CircuitBreaker：
           *  name：是服务提供者的名字，spring.application.name
           *  fallbackMethod：服务降级要执行的方法
           * @param id
           * @return
           */
          @GetMapping("/fegin/pay/circuit/{id}")
          @CircuitBreaker(name = "cloud-provider", fallbackMethod = "myCircuitFallBack")
          public String payCircuit(@PathVariable("id") Integer id) {
              return payFeignApi.payCircuit(id);
          }
      
          public String myCircuitFallBack(Integer id, Throwable t) {
              return "系统繁忙，请稍后重试！" + id;
          }
      }
      ```

4. 测试

   1. 正确执行三次，错误执行三次

      <img src="/springcloudImage/image-20250323162517387.png" alt="image-20250323162517387" style="zoom:67%;" />

      ![image-20250323162545591](/springcloudImage/image-20250323162545591.png)

   2. 显示

      ![image-20250323162628338](/springcloudImage/image-20250323162628338.png)

   3. 我们配置的是到百分之50触发熔断机制，告知调用者服务不可用，进入open状态，当我们再次调用服务就进入close状态了！
