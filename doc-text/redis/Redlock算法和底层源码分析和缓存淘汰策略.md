上一章自研的redis锁对于一般中小公司，不是特别高并发场景足够用了，单机redis小业务也撑得住。但是对于特别高并发场景的话，就得使用`Redisson`了

## Redis分布式锁-RedLock红锁算法（Distributed locks with Redis）

官网：[Redis 的分布式锁 |文档](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)

说明：

![image-20250712181141261](/redisImages/image-20250712181141261.png)

为什么学习这个？怎样产生的？

![image-20250712181218952](/redisImages/image-20250712181218952.png)

![image-20250712181230862](/redisImages/image-20250712181230862.png)

线程 1 首先获取锁成功，将键值对写入 redis 的 master 节点，在 redis 将该键值对同步到 slave 节点之前，master 发生了故障；redis 触发故障转移，其中一个 slave 升级为新的 master，此时新上位的master并不包含线程1写入的键值对，因此线程 2 尝试获取锁也可以成功拿到锁，此时相当于有两个线程获取到了锁，可能会导致各种预期之外的情况发生，例如最常见的脏数据。

 我们加的是排它独占锁，同一时间只能有一个建redis锁成功并持有锁，严禁出现2个以上的请求线程拿到锁。危险的！

### RedLock算法设计理念

Redis也提供了Redlock算法，用来实现**基于多个实例的**分布式锁。锁变量由多个实例维护，即使有实例发生了故障，锁变量仍然是存在的，客户端还是可以完成锁操作。Redlock算法是实现高可靠分布式锁的一种有效解决方案，可以在实际开发中使用。

![image-20250712181356201](/redisImages/image-20250712181356201.png)

该方案也是基于（set 加锁、Lua 脚本解锁）进行改良的，所以redis之父antirez 只描述了差异的地方，大致方案如下。

假设我们有N个Redis主节点，例如 N = 5这些节点是完全独立的，我们不使用复制或任何其他隐式协调系统，

为了取到锁客户端执行以下操作：

1. 获取当前时间，以毫秒为单位；
2. 依次尝试从5个实例，使用相同的 key 和随机值（例如 UUID）获取锁。当向Redis 请求获取锁时，客户端应该设置一个超时时间，这个超时时间应该小于锁的失效时间。例如你的锁自动失效时间为 10 秒，则超时时间应该在 5-50 毫秒之间。这样可以防止客户端在试图与一个宕机的 Redis 节点对话时长时间处于阻塞状态。如果一个实例不可用，客户端应该尽快尝试去另外一个 Redis 实例请求获取锁；
3. 客户端通过当前时间减去步骤 1 记录的时间来计算获取锁使用的时间。当且仅当从大多数（N/2+1，这里是 3 个节点）的 Redis 节点都取到锁，并且获取锁使用的时间小于锁失效时间时，锁才算获取成功；
4. 如果取到了锁，其真正有效时间等于初始有效时间减去获取锁所使用的时间（步骤 3 计算的结果）。
5. 如果由于某些原因未能获得锁（无法在至少 N/2 + 1 个 Redis 实例获取锁、或获取锁的时间超过了有效时间），客户端应该在所有的 Redis 实例上进行解锁（即便某些Redis实例根本就没有加锁成功，防止某些节点获取到锁但是客户端没有得到响应而导致接下来的一段时间不能被重新获取锁）。

该方案为了解决数据不一致的问题，直接舍弃了异步复制只使用 master 节点，同时由于舍弃了 slave，为了保证可用性，引入了 N 个节点，官方建议是 5。本次演示用3台实例来做说明。

客户端只有在满足下面的这两个条件时，才能认为是加锁成功。

条件1：客户端从超过半数（大于等于N/2+1）的Redis实例上成功获取到了锁；

条件2：客户端获取锁的总耗时没有超过锁的有效时间。

### 解决方案（容错公式）：

![image-20250712181551663](/redisImages/image-20250712181551663.png)

 为什么是奇数？ N = 2X + 1  (N是最终部署机器数，X是容错机器数)

1. 先知道什么是容错?

   失败了多少个机器实例后我还是可以容忍的，所谓的容忍就是数据一致性还是可以Ok的，CP数据一致性还是可以满足 加入在集群环境中，redis失败1台，可接受。2X+1 = 2 * 1+1 =3，部署3台，死了1个剩下2个可以正常工作，那就部署3台。 加入在集群环境中，redis失败2台，可接受。2X+1 = 2 * 2+1 =5，部署5台，死了2个剩下3个可以正常工作，那就部署5台。

2. 为什么是奇数？ 

   最少的机器，最多的产出效果 加入在集群环境中，redis失败1台，可接受。2N+2= 2 * 1+2 =4，部署4台 加入在集群环境中，redis失败2台，可接受。2N+2 = 2 * 2+2 =6，部署6台

redisson实现：

redisson是java的redis客户端之一，提供了一些api方便操作redis

* github：https://github.com/redisson/redisson
* 官网：https://redisson.pro

### 案例

基于redis分布式锁继续进行修改，引入`redisson`

1. 添加`redisson`配置

   ```xml
   <!-- 引入redisson -->
   <dependency>
       <groupId>org.redisson</groupId>
       <artifactId>redisson</artifactId>
       <version>3.50.0</version>
   </dependency>
   ```

2. 添加`redisson`配置

   ```java
   package com.lazy.config;
   
   import org.redisson.Redisson;
   import org.redisson.config.Config;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
   import org.springframework.data.redis.core.RedisTemplate;
   import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
   import org.springframework.data.redis.serializer.StringRedisSerializer;
   
   @Configuration
   public class RedisConfig {
   
       /**
        * 配置redis序列化
        * @param lettuceConnectionFactory
        * @return
        */
       @Bean
       public RedisTemplate<String, Object> redisTemplate(LettuceConnectionFactory lettuceConnectionFactory) {
           RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
           redisTemplate.setConnectionFactory(lettuceConnectionFactory);
           //设置key的序列化方式string
           redisTemplate.setKeySerializer(new StringRedisSerializer());
           //设置value序列化方式json
           redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
           redisTemplate.setHashKeySerializer(new StringRedisSerializer());
           redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
           redisTemplate.afterPropertiesSet();
           return redisTemplate;
       }
   
       /**
        * 引入redisson
        * @return Redisson
        */
       @Bean
       public Redisson redisson(){
           Config redissonConfig = new Config();
           redissonConfig.useSingleServer().setAddress("redis://192.168.0.136:6379")
                   .setDatabase(0).setPassword("redis");
           return (Redisson) Redisson.create(redissonConfig);
       }
   }
   ```

3. `service`

   ```java
   package com.lazy.service;
   
   import com.lazy.factory.DistributedLockFactory;
   import jakarta.annotation.Resource;
   import org.redisson.Redisson;
   import org.redisson.api.RLock;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.data.redis.core.StringRedisTemplate;
   import org.springframework.stereotype.Service;
   
   import java.util.concurrent.TimeUnit;
   import java.util.concurrent.locks.Lock;
   
   @Service
   public class InventoryService {
   
       @Resource
       private StringRedisTemplate stringRedisTemplate;
   
       @Value("${server.port}")
       private String port;
   
       @Resource
       private Redisson redisson;
   
       public String saleByRedisson() {
           String retMessage;
           RLock redisLock = redisson.getLock("redisLock");//获得锁
           redisLock.lock();//添加锁
           try {
               //查询库存信息
               String result = stringRedisTemplate.opsForValue().get("inventory001");
               //判断库存信息是否足够
               int inventoryNumber = result == null ? 0 : Integer.parseInt(result);
               //如果库存大于0扣减库存
               if (inventoryNumber > 0) {
                   stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                   retMessage = "卖出一个商品，库存剩余：" + inventoryNumber;
                   System.out.println(retMessage);
               } else {
                   retMessage = "商品卖完了！";
               }
           } finally {
               redisLock.unlock();//解锁
           }
           return retMessage + "端口号：" + port;
       }
   }
   ```

4. `controller`

   ```java
   package com.lazy.controller;
   
   import com.lazy.service.InventoryService;
   import jakarta.annotation.Resource;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   public class InventoryController {
   
       @Resource
       private InventoryService inventoryService;
   
       @GetMapping("/inventory/saleByRedisson")
       public String saleByRedisson() {
           return inventoryService.saleByRedisson();
       }
   }
   ```

5. 测试

   ![image-20250713185156596](/redisImages/image-20250713185156596.png)

bug：

![image-20250713185555257](/redisImages/image-20250713185555257.png)

只能解自己的锁，不能解别人的锁，所以我们更改，`InventoryService`解锁的时候添加一个判断

```java
package com.lazy.service;

import com.lazy.factory.DistributedLockFactory;
import jakarta.annotation.Resource;
import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;
    
    @Resource
    private Redisson redisson;

    public String saleByRedisson() {
        String retMessage;
        RLock redisLock = redisson.getLock("redisLock");//获得锁
        redisLock.lock();//添加锁
        try {
            //查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //判断库存信息是否足够
            int inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //如果库存大于0扣减库存
            if (inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                retMessage = "卖出一个商品，库存剩余：" + inventoryNumber;
                System.out.println(retMessage);
            } else {
                retMessage = "商品卖完了！";
            }
        } finally {
            //当前锁已锁定，并且是当前线程持有的才能解锁
            if (redisLock.isLocked() && redisLock.isHeldByCurrentThread()) {
                redisLock.unlock();//解锁
            }
        }
        return retMessage + "端口号：" + port;
    }
}

```

![image-20250713185958904](/redisImages/image-20250713185958904.png)

### Redisson源码分析

* 加锁
* 可重入
* 续命
* 解锁 

`Redis`分布式锁过期了，但是业务逻辑还没处理完怎么办？

* 守护线程“续命”

  额外起一个线程，定期检查线程是否还持有锁，如果有则延长过期时间。

  Redisson 里面就实现了这个方案，使用“看门狗”定期检查（每1/3的锁时间检查1次），如果线程还持有锁，则刷新过期时间；

在获得锁成功后，给锁加一个 `watchdog`，`watchdog`会起一个定时任务，在锁没有被释放且要快过期的时候会续期

![image-20250714151449443](/redisImages/image-20250714151449443.png)

#### 源码分析1

通过redisson新建出来的锁key，默认是30秒

![image-20250714151823752](/redisImages/image-20250714151823752.png)

![image-20250714151848520](/redisImages/image-20250714151848520.png)

#### 源码分析2

`RedissonLock.java`

`lock()--tryAcquire()--tryAcquireAsync()`

加锁流程：

加锁---尝试去加锁--尝试去异步加锁

![image-20250714153309055](/redisImages/image-20250714153309055.png)

#### 源码分析3

![image-20250714153403106](/redisImages/image-20250714153403106.png)

解释

* 通过`exists`判断，如果锁不存在，则设置值和过期时间，加锁成功
* 通过`hexists`判断，如果锁已存在，并且锁的是当前线程，则证明是重入锁，加锁成功
* 如果锁已存在，但锁的不是当前线程，则证明有其他线程持有锁。返回当前锁的过期时间（代表了锁key的剩余生存时间），加锁失败

#### 源码分析4

![image-20250714153641986](/redisImages/image-20250714153641986.png)

这里面初始化了一个定时器，dely 的时间是 internalLockLeaseTime/3。在 Redisson 中，internalLockLeaseTime 是 30s，也就是每隔 10s 续期一次，每次 30s。

![image-20250714153653985](/redisImages/image-20250714153653985.png)

##### watch dong自动延期机制

客户端A加锁成功，就会启动一个watch dog看门狗，他是一个后台线程，会每隔10秒检查一下，如果客户端A还持有锁key，那么就会不断的延长锁key的生存时间，默认每次续命又从30秒新开始

![image-20250714153727435](/redisImages/image-20250714153727435.png)

##### 自动续期lua脚本分析

![image-20250714153754434](/redisImages/image-20250714153754434.png)

#### 解锁

![image-20250714153819284](/redisImages/image-20250714153819284.png)

### 多机案例

![image-20250714163658481](/redisImages/image-20250714163658481.png)

![image-20250714163707610](/redisImages/image-20250714163707610.png)

这个锁的算法实现了多redis实例的情况，相对于单redis节点来说，优点在于 防止了 单节点故障造成整个服务停止运行的情况且在多节点中锁的设计，及多节点同时崩溃等各种意外情况有自己独特的设计方法。

Redisson 分布式锁支持 MultiLock 机制可以将多个锁合并为一个大锁，对一个大锁进行统一的申请加锁以及释放锁。

 

最低保证分布式锁的有效性及安全性的要求如下：

1. 互斥；任何时刻只能有一个client获取锁

2. 释放死锁；即使锁定资源的服务崩溃或者分区，仍然能释放锁

3. 容错性；只要多数redis节点（一半以上）在使用，client就可以获取和释放锁

 

网上讲的基于故障转移实现的redis主从无法真正实现Redlock:

* 因为redis在进行主从复制时是异步完成的，比如在clientA获取锁后，主redis复制数据到从redis过程中崩溃了，导致没有复制到从redis中，然后从redis选举出一个升级为主redis,造成新的主redis没有clientA 设置的锁，这是clientB尝试获取锁，并且能够成功获取锁，导致互斥失效；

![image-20250714163822288](/redisImages/image-20250714163822288.png)

#### 案例：

`pom`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.19.1</version>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.8</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.4</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.11</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

`yaml`

```properties
server.port=9090
spring.application.name=redlock


spring.swagger2.enabled=true


spring.redis.database=0
spring.redis.password=
spring.redis.timeout=3000
spring.redis.mode=single

spring.redis.pool.conn-timeout=3000
spring.redis.pool.so-timeout=3000
spring.redis.pool.size=10

spring.redis.single.address1=192.168.111.185:6381
spring.redis.single.address2=192.168.111.185:6382
spring.redis.single.address3=192.168.111.185:6383
```

配置类

`CacheConfiguration`

```java
package com.lazy.redlock.config;

import org.apache.commons.lang3.StringUtils;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableConfigurationProperties(RedisProperties.class)
public class CacheConfiguration {

    @Autowired
    RedisProperties redisProperties;

    @Bean
    RedissonClient redissonClient1() {
        Config config = new Config();
        String node = redisProperties.getSingle().getAddress1();
        node = node.startsWith("redis://") ? node : "redis://" + node;
        SingleServerConfig serverConfig = config.useSingleServer()
                .setAddress(node)
                .setTimeout(redisProperties.getPool().getConnTimeout())
                .setConnectionPoolSize(redisProperties.getPool().getSize())
                .setConnectionMinimumIdleSize(redisProperties.getPool().getMinIdle());
        if (StringUtils.isNotBlank(redisProperties.getPassword())) {
            serverConfig.setPassword(redisProperties.getPassword());
        }
        return Redisson.create(config);
    }

    @Bean
    RedissonClient redissonClient2() {
        Config config = new Config();
        String node = redisProperties.getSingle().getAddress2();
        node = node.startsWith("redis://") ? node : "redis://" + node;
        SingleServerConfig serverConfig = config.useSingleServer()
                .setAddress(node)
                .setTimeout(redisProperties.getPool().getConnTimeout())
                .setConnectionPoolSize(redisProperties.getPool().getSize())
                .setConnectionMinimumIdleSize(redisProperties.getPool().getMinIdle());
        if (StringUtils.isNotBlank(redisProperties.getPassword())) {
            serverConfig.setPassword(redisProperties.getPassword());
        }
        return Redisson.create(config);
    }

    @Bean
    RedissonClient redissonClient3() {
        Config config = new Config();
        String node = redisProperties.getSingle().getAddress3();
        node = node.startsWith("redis://") ? node : "redis://" + node;
        SingleServerConfig serverConfig = config.useSingleServer()
                .setAddress(node)
                .setTimeout(redisProperties.getPool().getConnTimeout())
                .setConnectionPoolSize(redisProperties.getPool().getSize())
                .setConnectionMinimumIdleSize(redisProperties.getPool().getMinIdle());
        if (StringUtils.isNotBlank(redisProperties.getPassword())) {
            serverConfig.setPassword(redisProperties.getPassword());
        }
        return Redisson.create(config);
    }


    /**
     * 单机
     * @return
     */
    /*@Bean
    public Redisson redisson()
    {
        Config config = new Config();

        config.useSingleServer().setAddress("redis://192.168.111.147:6379").setDatabase(0);

        return (Redisson) Redisson.create(config);
    }*/

}
```

`RedisPoolProperties`

```java
package com.lazy.redlock.config;
import lombok.Data;

@Data
public class RedisPoolProperties {

    private int maxIdle;

    private int minIdle;

    private int maxActive;

    private int maxWait;

    private int connTimeout;

    private int soTimeout;

    /**
     * 池大小
     */
    private  int size;

}
```

`RedisProperties`

```java
package com.lazy.redlock.config;

import lombok.Data;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.redis", ignoreUnknownFields = false)
@Data
public class RedisProperties {

    private int database;

    /**
     * 等待节点回复命令的时间。该时间从命令发送成功时开始计时
     */
    private int timeout;

    private String password;

    private String mode;

    /**
     * 池配置
     */
    private RedisPoolProperties pool;

    /**
     * 单机信息配置
     */
    private RedisSingleProperties single;
}
```

`RedisSingleProperties`

```java
package com.lazy.redlock.config;

import lombok.Data;

@Data
public class RedisSingleProperties {
    private  String address1;
    private  String address2;
    private  String address3;
}
```

`controller`

```java
package com.lazy.controller;

import cn.hutool.core.util.IdUtil;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.RedissonMultiLock;
import org.redisson.RedissonRedLock;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@RestController
@Slf4j
public class RedLockController {

    public static final String CACHE_KEY_REDLOCK = "ATGUIGU_REDLOCK";

    @Autowired
    RedissonClient redissonClient1;

    @Autowired
    RedissonClient redissonClient2;

    @Autowired
    RedissonClient redissonClient3;

    boolean isLockBoolean;

    @GetMapping(value = "/multiLock")
    public String getMultiLock() throws InterruptedException
    {
        String uuid =  IdUtil.simpleUUID();
        String uuidValue = uuid+":"+Thread.currentThread().getId();

        RLock lock1 = redissonClient1.getLock(CACHE_KEY_REDLOCK);
        RLock lock2 = redissonClient2.getLock(CACHE_KEY_REDLOCK);
        RLock lock3 = redissonClient3.getLock(CACHE_KEY_REDLOCK);

        RedissonMultiLock redLock = new RedissonMultiLock(lock1, lock2, lock3);
        redLock.lock();
        try
        {
            System.out.println(uuidValue+"\t"+"---come in biz multiLock");
            try { TimeUnit.SECONDS.sleep(30); } catch (InterruptedException e) { e.printStackTrace(); }
            System.out.println(uuidValue+"\t"+"---task is over multiLock");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("multiLock exception ",e);
        } finally {
            redLock.unlock();
            log.info("释放分布式锁成功key:{}", CACHE_KEY_REDLOCK);
        }

        return "multiLock task is over  "+uuidValue;
    }

}
```

测试：

![image-20250714164332807](/redisImages/image-20250714164332807.png)

## Redis缓存过期淘汰策略

Redis内存满了怎么办？

* redis默认内存多少？在哪里查看？如何设置修改？

  * 查看Redis最大占用内存

    ![image-20250715165451104](/redisImages/image-20250715165451104.png)

    打开redis配置文件，设置maxmemory参数，maxmemory是bytes字节类型，注意转换。

  * redis默认内存多少可以用？

    如果不设置最大内存大小或者设置最大内存大小为0，在64位操作系统下不限制内存大小，在32位操作系统下最多使用3GB内存

    > 注意：在64bit 系统下，maxmemory 设置为 0 表示不限制 Redis 内存使用

  * 一般生产上如何配置？

    一般推荐Redis设置内存为最大物理内存的四分之三

  * 如何修改 Redis 内存设置

    * 通过修改文件配置（永久）

      ![image-20250715165856889](/redisImages/image-20250715165856889.png)

    * 通过命令修改（临时）

      ![image-20250715165915081](/redisImages/image-20250715165915081.png)

  * 什么命令查看 redis 内存使用情况？

    * `info memory`
    * `config get maxmemory`

真要打满了会怎么样？如果 Redis 内存使用超出了设置的最大值会怎样？

* 改改配置，故意把最大值设为1个byte试试

  ![image-20250715170147445](/redisImages/image-20250715170147445.png)

  ![image-20250715170155798](/redisImages/image-20250715170155798.png)

  * 结论
    * 设置了maxmemory 的选项，假如 redis 内存使用达到了上限
    * 没有加上过期时间就会导致数据写满maxmemory 为了避免类似情况，引出内存淘汰策略

往 redis 里写的数据是怎么没了的？它如何删除的?

* redis过期键的删除策略

  * 如果一个键是过期的，那它到了过期时间之后是不是马上就从内存中被被删除呢？？

    如果回答yes，立即删除，你自己走还是面试官送你走？

    如果不是，那过期后到底什么时候被删除呢？？是个什么操作？

* 三种不同的删除策略

### 立即删除

Redis不可能时时刻刻遍历所有被设置了生存时间的key，来检测数据是否已经到达过期时间，然后对它进行删除。

​	立即删除能保证内存中数据的最大新鲜度，因为它保证过期键值会在过期后马上被删除，其所占用的内存也会随之释放。但是立即删除对cpu是最不友好的。因为删除操作会占用cpu的时间，如果刚好碰上了cpu很忙的时候，比如正在做交集或排序等计算的时候，就会给cpu造成额外的压力，让CPU心累，时时需要删除，忙死。。。。。。。

这会产生大量的性能消耗，同时也会影响数据的读取操作。

  >总结：
  >​	对CPU不友好，用处理器性能换取存储空间（拿时间换空间）

### 惰性删除

数据到达过期时间，不做处理。等下次访问该数据时，

如果未过期，返回数据 ；

发现已过期，删除，返回不存在。

惰性删除策略的缺点是，它对内存是最不友好的。

如果一个键已经过期，而这个键又仍然保留在redis中，那么只要这个过期键不被删除，它所占用的内存就不会释放。

​	在使用惰性删除策略时，如果数据库中有非常多的过期键，而这些过期键又恰好没有被访问到的话，那么它们也许永远也不会被删除(除非用户手动执行FLUSHDB)，我们甚至可以将这种情况看作是一种内存泄漏–无用的垃圾数据占用了大量的内存，而服务器却不会自己去释放它们，这对于运行状态非常依赖于内存的Redis服务器来说,肯定不是一个好消息

  >总结：
  >
  >​	对memory不友好，用存储空间换取处理器性能（拿空间换时间）

  开启惰性淘汰，在redis配置文件`lazyfree-lazy-eviction yes`

  * 上面两种方案都走极端

    * 定期删除

      定期抽样key，判断是否过期

      有漏网之鱼

  上述步骤，有漏洞吗？

  1. 定期删除时，从来没有被抽查到
  2. 惰性删除时，也从来没有被点中使用过

   上述两个步骤\====\==\> 大量过期的key堆积在内存中，导致redis内存空间紧张或者很快耗尽

   必须要有一个更好的兜底方案......

## Redis缓存淘汰策略

在`MEMORY MANAGEMENT`标签下

![image-20250715173414780](/redisImages/image-20250715173414780.png)

### Lru和Lfu算法的区别是什么

**区别**

LRU：最近最少使用页面置换算法，淘汰最长时间未被使用的页面，看页面最后一次被使用到发生调度的时间长短，首先淘汰最长时间未被使用的页面。

LFU：最近最不常用页面置换算法，淘汰一定时期内被访问次数最少的页，看一定时间段内页面被使用的频率，淘汰一定时期内被访问次数最少的页

**举例**

某次时期Time为10分钟,如果每分钟进行一次调页,主存块为3,若所需页面走向为2 1 2 1 2 3 4

假设到页面4时会发生缺页中断

若按LRU算法,应换页面1(1页面最久未被使用)，但按LFU算法应换页面3(十分钟内,页面3只使用了一次)

可见LRU关键是看页面最后一次被使用到发生调度的时间长短,而LFU关键是看一定时间段内页面被使用的频率!

### 有哪些（redis7版本）？

1. noeviction：不会驱逐任何key，表示即使内存达到上限也不进行置换，所有能引起内存增加的命令都会返回error
2. allkeys-lru：对所有key使用LRU算法进行删除，优先删除掉最近最不经常使用的key，用以保存新数据
3. volatile-lru：对所有设置了过期时间的key使用LRU算法进行删除
4. allkeys-random：对所有key随机删除
5. volatile-random：对所有设置了过期时间的key随机删除
6. volatile-ttl：删除马上要过期的key
7. allkeys-lfu：对所有key使用LFU算法进行删除
8. volatile-lfu：对所有设置了过期时间的key使用LFU算法进行删除

2个维度：

* 过期键中筛选
  * `volatile-lru`、`volatile-random`
* 所有键中删选
  * `noeviction`、`allkeys-lru`、`volatile-lru`、`allkeys-random`、`allkeys-lfu`、`volatile-lfu`

4个方面

* LRU
* LFU
* random
* ttl

平时使用哪一种？

* 在所有的 key 都是最近最经常使用，那么就需要选择 allkeys-lru 进行置换最近最不经常使用的 key，如果不确定使用哪种策略，那么推荐使用 allkeys-lru
* 如果所有的 key 的访问概率都是差不多的，那么可以选用 allkeys-random 策略去置换数据
* 如果对数据有足够的了解，能够为 key 指定 hint （通过expire/ttl指定），那么可以选择 volatile-ttl 进行置换

如何配置、修改

* 直接使用config命令（临时）

* 直接redis.conf 配置文件（永久）

  ![image-20250715175029639](/redisImages/image-20250715175029639.png)

### redis缓存淘汰策略配置性能建议

1. 避免存储bigkey
2. 开启惰性淘汰，`lazyfree-lazy-eviction yes`

![image-20250715175055684](/redisImages/image-20250715175055684.png)





