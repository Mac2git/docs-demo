## redis分布式锁

目的：解决多个服务原子性的问题

在很多场景中，我们为了保证数据的最终一致性，需要很多的技术方案来支持，比如分布式事务、分布式锁等。那具体什么是分布式锁，分布式锁应用在哪些业务场景、如何来实现分布式锁呢？

锁的种类

* 单机版同一个jvm虚拟机内，synchronized或者Lock接口
* 分布式多个不同虚拟机，单机的线程锁机制不再起作用，资源类在不同的服务器之间共享了

一个靠谱分布式锁需要具备的条件和刚需

* 独占性

  OnlyOne，任何时刻只能有且仅有一个线程持有

* 高可用

  若redis集群环境下，不能因为某一个节点挂了而出现获取锁和释放锁失败的情况

  高并发请求下，依旧性能ok好使

* 防死锁

  杜绝死锁，必须有超时控制机制或者撤销操作，有个兜底终止跳出方案

* 不乱抢

  不能私下unlock（解）别人的锁，只能自己加锁自己释放

* 重入性

  同一个节点的同一个线程如何获得锁之后，它也可以再次获得这个锁。

分布式锁

![image-20250706154309003](/redisImages/image-20250706154309003.png)

## 案例1

使用场景：多个服务间保证同一时刻同一时间段内同一用户只能有一个请求（防止关键业务出现并发攻击）

两个服务，分别是`redis_distributed_lock2`和`redis_distributed_lock3`代码一样端口号不一样

`pom`

```xml
<!--SpringBoot通用依赖模块-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!--SpringBoot与Redis整合依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
<!--通用基础配置boottest/lombok/hutool-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.8</version>
</dependency>
```

`yaml`

```yaml
server:
  port: 7777
spring:
  application:
    name: redis_distributed_lock2
  data:
    redis:
      host: 192.168.0.134
      port: 6379
      password: redis
      lettuce:
        pool:
          max-idle: 8
          max-wait: -1ms
          max-active: 8
          min-idle: 0
      database: 0
```

`config`

```java
package com.lazy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

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
}
```

`service`

```java
package com.lazy.service;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    private final Lock lock = new ReentrantLock();

    public String sale()
    {
        String retMessage = "";
        lock.lock();
        try
        {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if(inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001",String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: "+inventoryNumber;
                System.out.println(retMessage);
            }else{
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        }finally {
            lock.unlock();
        }
        return retMessage+"\t"+"服务端口号："+port;
    }
}
```

`controller`

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

    @GetMapping("/inventory/sale")
    public String sale() {
        return inventoryService.sale();
    }
}
```

nginx配置

![image-20250706164748316](/redisImages/image-20250706164748316.png)

使用`start nginx`启动即可

测试：

![image-20250706165511889](/redisImages/image-20250706165511889.png)

没问题！使用压测工具同时开启100个线程访问

![image-20250706165259013](/redisImages/image-20250706165259013.png)

![image-20250706165312138](/redisImages/image-20250706165312138.png)

加了lock还是出现超卖的现象，在分布式下毫无意义，因为lock只适用于单服务！

### 第一次改造(递归重试)

接下来改造我们的`service`

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;
    
    public String sale() {
        String retMessage = "";
        String key = "lock";
        String value = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//uuid+当前线程id
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, value);
        //判断是否获得锁
        if (Boolean.FALSE.equals(flag)){
            //未获得锁，停留20毫秒继续抢
            try {
                TimeUnit.MILLISECONDS.sleep(20);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            this.sale();
        }else{
            //获得锁
            try {
                //1 查询库存信息
                String result = stringRedisTemplate.opsForValue().get("inventory001");
                //2 判断库存是否足够
                Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
                //3 扣减库存
                if (inventoryNumber > 0) {
                    stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                    retMessage = "成功卖出一个商品，库存剩余: " + inventoryNumber;
                    System.out.println(retMessage);
                } else {
                    retMessage = "商品卖完了，o(╥﹏╥)o";
                }
            } finally {
                //删除锁
                stringRedisTemplate.delete(key);
            }
        }
        return retMessage + "\t" + "服务端口号：" + port;
    }
}
```

启动测试，我们要把值修改为5000，我们要使用1秒2w线程数进行压测

![image-20250706172931582](/redisImages/image-20250706172931582.png)

![image-20250706172953495](/redisImages/image-20250706172953495.png)

![image-20250706173002069](/redisImages/image-20250706173002069.png)

这是我们的锁

![image-20250706173123232](/redisImages/image-20250706173123232.png)

递归是一种思想没错，但是容易导致`StackOverflowError`，不太推荐，需要进一步完善，另外，高并发唤醒后推荐用white判断而不是if

### 第二次改造（while替代）

继续改造`service`

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    public String sale() {
        String retMessage = "";
        String key = "lock";
        String value = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//uuid+当前线程id
        while (Boolean.FALSE.equals(stringRedisTemplate.opsForValue().setIfAbsent(key, value))) {
            //休眠20毫秒
            try {
                TimeUnit.MILLISECONDS.sleep(20);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        //获得锁
        try {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if (inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: " + inventoryNumber;
                System.out.println(retMessage);
            } else {
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        } finally {
            //删除锁
            stringRedisTemplate.delete(key);
        }
        return retMessage + "\t" + "服务端口号：" + port;
    }
}
```

继续进行压测，压测1轮3000

![image-20250706175549309](/redisImages/image-20250706175549309.png)

![image-20250706175558294](/redisImages/image-20250706175558294.png)

![image-20250706175612817](/redisImages/image-20250706175612817.png)

问题：

* 部署了微服务的java程序机器挂了，代码层面根本没有走到finally这块，没办法保证解锁（无过期时间改key一直存在），这个key没有被删除，需要加入一个过期时间限定key

### 第三次改造（宕机与过期+防止死锁）

设置key的过期时间，设置过期时间为30秒

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    public String sale() {
        String retMessage = "";
        String key = "lock";
        String value = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//uuid+当前线程id
        while (Boolean.FALSE.equals(stringRedisTemplate.opsForValue().setIfAbsent(key, value,30L, TimeUnit.SECONDS))) {
            //休眠20毫秒
            try {
                TimeUnit.MILLISECONDS.sleep(20);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        //获得锁
        try {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if (inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: " + inventoryNumber;
                System.out.println(retMessage);
            } else {
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        } finally {
            //删除锁
            stringRedisTemplate.delete(key);
        }
        return retMessage + "\t" + "服务端口号：" + port;
    }
}
```

在进行压测

![image-20250706180901881](/redisImages/image-20250706180901881.png)

结论：

* 加锁和过期时间必须设置同一行，保证原子性

### 第四次改造（防止误删key的问题）

![image-20250706182055589](/redisImages/image-20250706182055589.png)

只能删除自己的，不许删除别人的锁

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    public String sale() {
        String retMessage = "";
        String key = "lock";
        String value = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//uuid+当前线程id
        while (Boolean.FALSE.equals(stringRedisTemplate.opsForValue().setIfAbsent(key, value,30L, TimeUnit.SECONDS))) {
            //休眠20毫秒
            try {
                TimeUnit.MILLISECONDS.sleep(20);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        //获得锁
        try {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if (inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: " + inventoryNumber;
                System.out.println(retMessage);
            } else {
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        } finally {
            //判断不为空，才能进行equals判断
            if (Objects.requireNonNull(stringRedisTemplate.opsForValue().get(key)).equalsIgnoreCase(value)) {
                //删除锁
                stringRedisTemplate.delete(key);
            }
        }
        return retMessage + "\t" + "服务端口号：" + port;
    }
}
```

存在问题，最后判断和删除不是原子性操作，需要使用lua脚本确保一致性操作

### 第五次改造（保证原子性，使用lua脚本）

![image-20250707101521381](/redisImages/image-20250707101521381.png)

#### Lua脚本

redis调用Lua脚本通过eval命令保证代码执行的原子性，直接用return返回脚本执行后的结果值

eval命令

```cmd
EVAL script numkeys key [key ...] arg [arg ...]
#numkeys 代表参数个数
#key 是键
#arg 是具体key的值
```

hello world入门

1. hello lua

   ```cmd
   127.0.0.1:6379> EVAL "return 'hello lua'" 0 
   "hello lua"
   ```

2. set k1 v1 get k1

   ```cmd
   127.0.0.1:6379> EVAL "redis.call('set','k1','v1') return redis.call('get','k1')" 0
   "v1"
   ```

3. mset

   ```cmd
   127.0.0.1:6379> EVAL "return redis.call('mset',KEYS[1],ARGV[1],KEYS[2],ARGV[2]) " 2 k1 k2 v1 v2
   OK
   127.0.0.1:6379> get k1
   "v1"
   127.0.0.1:6379> get k2
   "v2"
   ```

Lua脚本进一步

* 条件判断语法

  ![image-20250707102719142](/redisImages/image-20250707102719142.png)

* 条件判断案例

  ```cmd
  127.0.0.1:6379> get keys
  "1"
  127.0.0.1:6379> EVAL "if redis.call('get',KEYS[1])==ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 keys 2
  (integer) 0
  127.0.0.1:6379> EVAL "if redis.call('get',KEYS[1])==ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end" 1 keys 1
  (integer) 1
  ```

改造

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    public String sale() {
        String retMessage = "";
        String key = "lock";
        String value = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//uuid+当前线程id
        while (Boolean.FALSE.equals(stringRedisTemplate.opsForValue().setIfAbsent(key, value,30L, TimeUnit.SECONDS))) {
            //休眠20毫秒
            try {
                TimeUnit.MILLISECONDS.sleep(20);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        //获得锁
        try {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if (inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001", String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: " + inventoryNumber;
                System.out.println(retMessage);
            } else {
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        } finally {
            //添加lua脚本，确保原子性
            String luaScript = "if redis.call('get',KEYS[1]) == ARGV[1] then " +
                    "return redis.call('del',KEYS[1]) " +
                    "else return 0 end";
            stringRedisTemplate.execute(new DefaultRedisScript<>(luaScript,Boolean.class), List.of(key),value);//使用该构造方法，不然报错
        }
        return retMessage + "\t" + "服务端口号：" + port;
    }
}
```

结果

```cmd
127.0.0.1:6379> get lock
"7f5195a7954d468aa32830d9ebedcdd6:244"
127.0.0.1:6379> get lock
"4721213967994ef28ce98ee6ed3a68bc:76"
127.0.0.1:6379> get lock
"e9d20717da254f5b930fc04b6e983974:47"
```

保证了程序的原子性！

### 第六次改造

while判断并自旋重试获得锁+setnx含自然过期时间+Lua脚本删除锁命令

问题

* 如何兼顾锁的可重入性问题？

一个靠谱分布式锁需要具备的条件和刚需

* 独占性
* 高可用
* 防死锁
* 不乱抢
* 重入性

#### 可重入锁（又名递归锁）

是指在同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁(前提，锁对象得是同一个对象)，不会因为之前已经获取过还没释放而阻塞。

如果是1个有 synchronized 修饰的递归调用方法，程序第2次进入被自己阻塞了岂不是天大的笑话，出现了作茧自缚。

所以Java中ReentrantLock和synchronized都是可重入锁，可重入锁的一个优点是可一定程度避免死锁。

可重入锁种类

* 隐式锁（即synchronized关键字使用的锁）默认是可重入锁

  指的是可重复可递归调用的锁，在外层使用锁之后，在内层仍然可以使用，并且不发生死锁，这样的锁就叫做可重入锁。

  简单的来说就是：在一个synchronized修饰的方法或代码块的内部调用本类的其他synchronized修饰的方法或代码块时，是永远可以得到锁的

  与可重入锁相反，不可重入锁不可递归调用，递归调用就发生死锁。

  * 同步块

    ```java
    package com.lazy;
    
    import org.junit.jupiter.api.Test;
    import org.springframework.boot.test.context.SpringBootTest;
    
    @SpringBootTest
    public class ReEntryLockDemo {
    
        final Object obj = new Object();
        public void lockBlock(){
           new Thread(()->{
               synchronized (obj){
                   System.out.println(Thread.currentThread().getName()+"---外层调用");
                   synchronized (obj){
                       System.out.println(Thread.currentThread().getName()+"---中层调用");
                       synchronized (obj){
                           System.out.println(Thread.currentThread().getName()+"---内层调用");
                       }
                   }
               }
           },"t1").start();
        }
    
        @Test
        public void testLock() {
            ReEntryLockDemo reEntryLockDemo = new ReEntryLockDemo();
            reEntryLockDemo.lockBlock();
        }
    }
    ```

  * 同步方法

    ```java
    package com.lazy;
    
    import org.junit.jupiter.api.Test;
    import org.springframework.boot.test.context.SpringBootTest;
    
    @SpringBootTest
    public class ReEntryLockDemo {
    
        public synchronized void lockMethod(){
            System.out.println(Thread.currentThread().getName()+"---外层调用");
            lockMethod2();
        }
    
        public synchronized void lockMethod2() {
            System.out.println(Thread.currentThread().getName()+"---中层调用");
            lockMethod3();
        }
    
        public synchronized void lockMethod3() {
            System.out.println(Thread.currentThread().getName()+"---内层调用");
        }
    
        @Test
        public void testLock() {
            ReEntryLockDemo reEntryLockDemo = new ReEntryLockDemo();
            reEntryLockDemo.lockMethod();
        }
    }
    ```

  * Synchronized的重入的实现原理

    <span style="color:#FF3333;">每个锁对象拥有一个锁计数器和一个指向持有该锁的线程的指针。</span>

    当执行monitorenter时，如果目标锁对象的计数器为零，那么说明它没有被其他线程所持有，Java虚拟机会将该锁对象的持有线程设置为当前线程，并且将其计数器加1。

    在目标锁对象的计数器不为零的情况下，如果锁对象的持有线程是当前线程，那么Java虚拟机可以将其计数器加1，否则需要等待，甚至持有线程释放该锁。

    当执行monitorexit时，Java虚拟机则需将锁对象的计数器减1。计数器为零代表锁已被释放。

  * 显示锁（即Lock）也有ReentrantLock这样的可重入锁。

    ```java
    public void lock(){
        new Thread(()->{
            myLock.lock();
            try{
                System.out.println(Thread.currentThread().getName()+"---外层调用");
                myLock.lock();
                try{
                    System.out.println(Thread.currentThread().getName()+"---中层调用");
                    myLock.lock();
                    try{
                        System.out.println(Thread.currentThread().getName()+"---内层调用");
                    }finally {
                        //这里故意注释，实现加锁次数和释放次数不一样
                        //由于加锁次数和释放次数不一样，第二个线程始终无法获取到锁，导致一直在等待。
                        myLock.unlock(); // 正常情况，加锁几次就要解锁几次
                    }
                }finally {
                    myLock.unlock();
                }
            }finally {
                myLock.unlock();
            }
        },"t1").start();
    }
    ```

    切记，一般而言，lock了几次就要unlock几次。

* 上述可重入锁问题，redis中那个数据类型可以代替？

  * K，K，V

    ![image-20250707174427391](/redisImages/image-20250707174427391.png)

    hset zzyyRedisLock 29f0ee01ac77414fb8b0861271902a94:1

    * 总结

      setnx，只能解决有无的问题，够用但是不够完美

      hset，不但解决有无，还解决可重入问题

* 思考+设计模式（一横一纵）

  * 目前有2条支线，目的是保证同一个时候只能有一个线程持有锁进去redis做扣减库存动作

    * 2个分支

      * 保证加锁/解锁，lock/unlock

        一个靠谱分布式锁需要具备的条件和刚需

        * 独占性
        * 高可用
        * 防死锁
        * 不乱抢
        * 重入性

      * 扣减库存redis命令的原子性

        ![image-20250707181751904](/redisImages/image-20250707181751904.png)

* Lua脚本

  * redis命令过程分析

    ```cmd
    127.0.0.1:6379> EXISTS lock
    (integer) 0
    127.0.0.1:6379> HSET lock 1a2b3c 1
    (integer) 1
    127.0.0.1:6379> HINCRBY lock 1a2b3c 1
    (integer) 2
    127.0.0.1:6379> HGET lock 1a2b3c
    "2"
    ```

  * 加锁Lua脚本lock

    * 先判断redis分布式锁这个key是否存在

      * exists key

        * 返回0说明不存在，hset新建当前线程属于自己的锁 uuid:threadId

          ![image-20250707182254870](/redisImages/image-20250707182254870.png)

        * 返回1说明已经有锁，需进一步判断是不是当前线程自己的

          * hexists key uuid:threadID
            * 返回0说明不是自己的
            * 返回1说明是自己的锁，自增1次表示重入

    * 上述设计修改为Lua脚本

      * v1

        ```cmd
        if redis.call('exists','key') == 0 then
          redis.call('hset','key','uuid:threadid',1)
          redis.call('expire','key',30)
          return 1
        elseif redis.call('hexists','key','uuid:threadid') == 1 then
          redis.call('hincrby','key','uuid:threadid',1)
          redis.call('expire','key',30)
          return 1
        else
          return 0
        end
        ```

        相同部分是否可以替换处理？？？

        hincrby命令可否替代hset命令

      * v2

        ```cmd
        if redis.call('exists','key') == 0 or redis.call('hexists','key','uuid:threadid') == 1 then
          redis.call('hincrby','key','uuid:threadid',1)
          redis.call('expire','key',30)
          return 1
        else
          return 0
        end
        ```

      * v3

        | key        | KEYS[1] | lock                               |
        | ---------- | ------- | ---------------------------------- |
        | value      | ARGV[1] | 2f586ae740a94736894ab9d51880ed9d:1 |
        | 过期时间值 | ARGV[2] | 30  秒                             |

         ```cmd
         if redis.call('exists',KEYS[1]) == 0 or redis.call('hexists',KEYS[1],ARGV[1]) == 1 then 
          redis.call('hincrby',KEYS[1],ARGV[1],1) 
          redis.call('expire',KEYS[1],ARGV[2]) 
          return 1 
         else
          return 0
         end
         ```

  * 解锁Lua脚本unlock

    * 设计思路：有锁且还是自己的锁

      * hexists key uuid:threadID

        * 返回零，说明根本没有锁，程序块返回nil
        * 不是零，说明有锁是自己的锁，直接调用`hincrby -1`表示每次减个1，解锁一次。直到它变为零表示可以删除该锁key,del锁key

      * 设计脚本

        * v1

          ```cmd
          if redis.call('HEXISTS',lock,uuid:threadID) == 0 then
           return nil
          elseif redis.call('HINCRBY',lock,uuid:threadID,-1) == 0 then
           return redis.call('del',lock)
          else 
           return 0
          end
          ```

        * v2

          ```cmd
          if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 0 then
           return nil
          elseif redis.call('HINCRBY',KEYS[1],ARGV[1],-1) == 0 then
           return redis.call('del',KEYS[1])
          else
           return 0
          end
          ```

    
### 第七次改造（确保可重入性和原子性）

`RedisDistributedLock`

```java
package com.lazy.locks;

import cn.hutool.core.util.IdUtil;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;

public class RedisDistributedLock implements Lock
{
    private StringRedisTemplate stringRedisTemplate;

    private String lockName;//KEYS[1]
    private String uuidValue;//ARGV[1]
    private long   expireTime;//ARGV[2]

    public RedisDistributedLock(StringRedisTemplate stringRedisTemplate, String lockName){
        this.stringRedisTemplate = stringRedisTemplate;
        this.lockName = lockName;
        this.uuidValue = IdUtil.simpleUUID()+":"+Thread.currentThread().getId();//UUID:ThreadID
        this.expireTime = 30L;
    }
    @Override
    public void lock(){
        tryLock();
    }
    @Override
    public boolean tryLock(){
        try {tryLock(-1L,TimeUnit.SECONDS);} catch (InterruptedException e) {e.printStackTrace();}
        return false;
    }

    /**
     * 干活的，实现加锁功能，实现这一个干活的就OK，全盘通用
     * @param time
     * @param unit
     * @return
     * @throws InterruptedException
     */
    @Override
    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException{
        if(time != -1L){
            this.expireTime = unit.toSeconds(time);
        }
        String script =
                "if redis.call('exists',KEYS[1]) == 0 or redis.call('hexists',KEYS[1],ARGV[1]) == 1 then " +
                        "redis.call('hincrby',KEYS[1],ARGV[1],1) " +
                        "redis.call('expire',KEYS[1],ARGV[2]) " +
                        "return 1 " +
                        "else " +
                        "return 0 " +
                        "end";
        System.out.println("script: "+script);
        System.out.println("lockName: "+lockName);
        System.out.println("uuidValue: "+uuidValue);
        System.out.println("expireTime: "+expireTime);
        while (Boolean.FALSE.equals(stringRedisTemplate.execute(new DefaultRedisScript<>(script, Boolean.class), Arrays.asList(lockName), uuidValue, String.valueOf(expireTime)))) {
            TimeUnit.MILLISECONDS.sleep(50);
        }
        return true;
    }

    /**
     *干活的，实现解锁功能
     */
    @Override
    public void unlock()
    {
        String script =
                "if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 0 then " +
                        "   return nil " +
                        "elseif redis.call('HINCRBY',KEYS[1],ARGV[1],-1) == 0 then " +
                        "   return redis.call('del',KEYS[1]) " +
                        "else " +
                        "   return 0 " +
                        "end";
        // nil = false 1 = true 0 = false
        System.out.println("lockName: "+lockName);
        System.out.println("uuidValue: "+uuidValue);
        System.out.println("expireTime: "+expireTime);
        Long flag = stringRedisTemplate.execute(new DefaultRedisScript<>(script, Long.class), Arrays.asList(lockName),uuidValue,String.valueOf(expireTime));
        if(flag == null)
        {
            throw new RuntimeException("This lock doesn't EXIST");
        }

    }

    //===下面的redis分布式锁暂时用不到=======================================
    //===下面的redis分布式锁暂时用不到=======================================
    //===下面的redis分布式锁暂时用不到=======================================
    @Override
    public void lockInterruptibly() throws InterruptedException
    {

    }

    @Override
    public Condition newCondition()
    {
        return null;
    }
}
```

`service`

```java
package com.lazy.service;

import cn.hutool.core.util.IdUtil;
import com.lazy.locks.RedisDistributedLock;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.locks.Lock;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    private final Lock lock = new RedisDistributedLock(stringRedisTemplate,"lock");
    public String sale()
    {
        String retMessage = "";
        lock.lock();
        try
        {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if(inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001",String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，库存剩余: "+inventoryNumber;
                System.out.println(retMessage);
            }else{
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        }finally {
            lock.unlock();
        }
        return retMessage+"服务端口号："+port;
    }
}
```

![image-20250708182329476](/redisImages/image-20250708182329476.png)

为了有更好的兼容性我们引入了工程设计模式

`DistributedLockFactory`

```java
package com.lazy.factory;

import com.lazy.locks.RedisDistributedLock;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.locks.Lock;

@Component
public class DistributedFactory {

    @Resource
    private StringRedisTemplate stringRedisTemplate;
    private String lockName;

    public Lock getDistributedLock(String lockType) {
        if (lockType == null) return null;
        if (lockType.equalsIgnoreCase("redis")){
            this.lockName = "redisLock";
            return new RedisDistributedLock(stringRedisTemplate,lockName);
        }else if (lockType.equalsIgnoreCase("mysql")){
            //TODO mysql版本的分布式锁实现
            return null;
        }else if(lockType.equalsIgnoreCase("zookeeper")){
            //TODO zookeeper版本的分布式锁实现
            return null;
        }
        return null;
    }
}
```

`service`

```java
package com.lazy.service;

import com.lazy.factory.DistributedFactory;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.locks.Lock;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    @Resource
    private DistributedFactory distributedFactory;
    public String sale()
    {
        Lock redisLock = distributedFactory.getDistributedLock("redis");
        String retMessage = "";
        redisLock.lock();
        try
        {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if(inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001",String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，QD库存剩余: "+inventoryNumber;
                System.out.println(retMessage);
            }else{
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        }finally {
            redisLock.unlock();
        }
        return retMessage+"服务端口号："+port;
    }
}
```

![image-20250708191029076](/redisImages/image-20250708191029076.png)

看着好像没问题

#### 可重入测试重点

我们在`service`增加一个方法试试

```java
package com.lazy.service;

import com.lazy.factory.DistributedFactory;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.locks.Lock;

@Service
public class InventoryService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Value("${server.port}")
    private String port;

    @Resource
    private DistributedFactory distributedFactory;
    public String sale()
    {
        Lock redisLock = distributedFactory.getDistributedLock("redis");
        String retMessage = "";
        redisLock.lock();
        try
        {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if(inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001",String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，QD库存剩余: "+inventoryNumber;
                testLock();
                System.out.println(retMessage);
            }else{
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        }finally {
            redisLock.unlock();
        }
        return retMessage+"服务端口号："+port;
    }

    public void testLock() {
        Lock redisLock = distributedFactory.getDistributedLock("redis");
        redisLock.lock();
        try{
            System.out.println("测试可重入性方法");
        }finally {
            redisLock.unlock();
        }
    }
}
```

启动测试试试

![image-20250708194225270](/redisImages/image-20250708194225270.png)

`DistributedLockFactory`

```java
package com.lazy.factory;

import cn.hutool.core.util.IdUtil;
import com.lazy.locks.RedisDistributedLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.locks.Lock;

@Component
public class DistributedLockFactory
{
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    private String lockName;
    private String uuidValue;

    public DistributedLockFactory()
    {
        this.uuidValue = IdUtil.simpleUUID();//UUID
    }

    public Lock getDistributedLock(String lockType)
    {
        if(lockType == null) return null;

        if(lockType.equalsIgnoreCase("REDIS")){
            lockName = "zzyyRedisLock";
            return new RedisDistributedLock(stringRedisTemplate,lockName,uuidValue);
        } else if(lockType.equalsIgnoreCase("ZOOKEEPER")){
            //TODO zookeeper版本的分布式锁实现
            return null;
        } else if(lockType.equalsIgnoreCase("MYSQL")){
            //TODO mysql版本的分布式锁实现
            return null;
        }
        return null;
    }
}
```

`RedisDistributedLock`

```java
package com.lazy.locks;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;

public class RedisDistributedLock implements Lock
{
    private StringRedisTemplate stringRedisTemplate;
    private String lockName;
    private String uuidValue;
    private long   expireTime;

    public RedisDistributedLock(StringRedisTemplate stringRedisTemplate, String lockName,String uuidValue)
    {
        this.stringRedisTemplate = stringRedisTemplate;
        this.lockName = lockName;
        this.uuidValue = uuidValue+":"+Thread.currentThread().getId();
        this.expireTime = 30L;
    }

    @Override
    public void lock()
    {
        this.tryLock();
    }
    @Override
    public boolean tryLock()
    {
        try
        {
            return this.tryLock(-1L,TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException
    {
        if(time != -1L)
        {
            expireTime = unit.toSeconds(time);
        }

        String script =
                "if redis.call('exists',KEYS[1]) == 0 or redis.call('hexists',KEYS[1],ARGV[1]) == 1 then " +
                        "redis.call('hincrby',KEYS[1],ARGV[1],1) " +
                        "redis.call('expire',KEYS[1],ARGV[2]) " +
                        "return 1 " +
                        "else " +
                        "return 0 " +
                        "end";
        System.out.println("lockName: "+lockName+"\t"+"uuidValue: "+uuidValue);

        while (!stringRedisTemplate.execute(new DefaultRedisScript<>(script, Boolean.class), Arrays.asList(lockName), uuidValue, String.valueOf(expireTime)))
        {
            try { TimeUnit.MILLISECONDS.sleep(60); } catch (InterruptedException e) { e.printStackTrace(); }
        }

        return true;
    }

    @Override
    public void unlock()
    {
        String script =
                "if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 0 then " +
                        "return nil " +
                        "elseif redis.call('HINCRBY',KEYS[1],ARGV[1],-1) == 0 then " +
                        "return redis.call('del',KEYS[1]) " +
                        "else " +
                        "return 0 " +
                        "end";
        System.out.println("lockName: "+lockName+"\t"+"uuidValue: "+uuidValue);
        Long flag = stringRedisTemplate.execute(new DefaultRedisScript<>(script, Long.class), Arrays.asList(lockName), uuidValue, String.valueOf(expireTime));
        if(flag == null)
        {
            throw new RuntimeException("没有这个锁，HEXISTS查询无");
        }
    }

    //=========================================================
    @Override
    public void lockInterruptibly() throws InterruptedException
    {

    }
    @Override
    public Condition newCondition()
    {
        return null;
    }
}
```

测试通过！

### 第八次改造（添加自动续期）

确保`redisLock`过期时间大于业务执行时间的问题，在第一次改造上修改

`service`

```java
package com.lazy.service;

import com.lazy.factory.DistributedLockFactory;
import jakarta.annotation.Resource;
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
    private DistributedLockFactory distributedFactory;
    public String sale()
    {
        Lock redisLock = distributedFactory.getDistributedLock("redis");
        String retMessage = "";
        redisLock.lock();
        try
        {
            //1 查询库存信息
            String result = stringRedisTemplate.opsForValue().get("inventory001");
            //2 判断库存是否足够
            Integer inventoryNumber = result == null ? 0 : Integer.parseInt(result);
            //3 扣减库存
            if(inventoryNumber > 0) {
                stringRedisTemplate.opsForValue().set("inventory001",String.valueOf(--inventoryNumber));
                retMessage = "成功卖出一个商品，QD库存剩余: "+inventoryNumber;
                //暂停120秒
                try {
                    TimeUnit.SECONDS.sleep(120);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }else{
                retMessage = "商品卖完了，o(╥﹏╥)o";
            }
        }finally {
            redisLock.unlock();
        }
        return retMessage+"服务端口号："+port;
    }
}
```

`RedisDistributedLock`

```java
package com.lazy.locks;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;

import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;

public class RedisDistributedLock implements Lock {
    private final StringRedisTemplate stringRedisTemplate;
    private final String lockName;
    private final String uuidValue;
    private long expireTime;

    public RedisDistributedLock(StringRedisTemplate stringRedisTemplate, String lockName, String uuidValue) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.lockName = lockName;
        this.uuidValue = uuidValue + ":" + Thread.currentThread().getId();
        this.expireTime = 30L;
    }

    @Override
    public void lock() {
        this.tryLock();
    }

    @Override
    public boolean tryLock() {
        try {
            return this.tryLock(-1L, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException {
        if (time != -1L) {
            expireTime = unit.toSeconds(time);
        }

        String script =
                "if redis.call('exists',KEYS[1]) == 0 or redis.call('hexists',KEYS[1],ARGV[1]) == 1 then " +
                        "redis.call('hincrby',KEYS[1],ARGV[1],1) " +
                        "redis.call('expire',KEYS[1],ARGV[2]) " +
                        "return 1 " +
                        "else " +
                        "return 0 " +
                        "end";
        System.out.println("lockName: " + lockName + "\t" + "uuidValue: " + uuidValue);

        while (!stringRedisTemplate.execute(new DefaultRedisScript<>(script, Boolean.class), Collections.singletonList(lockName), uuidValue, String.valueOf(expireTime))) {
            try {
                TimeUnit.MILLISECONDS.sleep(60);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        renewExpire();
        return true;
    }

    @Override
    public void unlock() {
        String script =
                "if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 0 then " +
                        "return nil " +
                        "elseif redis.call('HINCRBY',KEYS[1],ARGV[1],-1) == 0 then " +
                        "return redis.call('del',KEYS[1]) " +
                        "else " +
                        "return 0 " +
                        "end";
        System.out.println("lockName: " + lockName + "\t" + "uuidValue: " + uuidValue);
        Long flag = stringRedisTemplate.execute(new DefaultRedisScript<>(script, Long.class), Collections.singletonList(lockName), uuidValue, String.valueOf(expireTime));
        if (flag == null) {
            throw new RuntimeException("没有这个锁，HEXISTS查询无");
        }
    }

    private void renewExpire()
    {
        String script =
                "if redis.call('HEXISTS',KEYS[1],ARGV[1]) == 1 then " +
                        "return redis.call('expire',KEYS[1],ARGV[2]) " +
                        "else " +
                        "return 0 " +
                        "end";
		//定时任务每隔10秒后执行一次
        new Timer().schedule(new TimerTask()
        {
            @Override
            public void run()
            {
                if (Boolean.TRUE.equals(stringRedisTemplate.execute(new DefaultRedisScript<>(script, Boolean.class), Arrays.asList(lockName), uuidValue, String.valueOf(expireTime)))) {
                    renewExpire();
                }
            }
        },(this.expireTime * 1000)/3);
    }

    //=========================================================
    @Override
    public void lockInterruptibly() throws InterruptedException {

    }

    @Override
    public Condition newCondition() {
        return null;
    }
}
```

效果！

![image-20250711185139011](/redisImages/image-20250711185139011.png)

## 总结

1. 第一版：`synchronized`单机版OK，上分布式死翘翘
2. 第二版：`nginx`分布式微服务单机锁不行
3. 第三版：取消单机锁改为上`redis`分布式锁`setnx`
   1. 只加了锁，没有释放锁，出异常的话，可能无法释放锁，必须要在代码层面`finally`释放锁
   2. 宕机了，部署了微服务代码层面根本没有走到`finally`这块，没办法保证解锁，这个`key`没有被删除，需要有`lockKey`的过期时间设定
4. 第四版：为`redis`的分布式锁`key`，增加过期时间，此外，还必须要`setnx`+过期时间必须同一行
4. 第五版：必须规定只能删除自己的锁，不能删除别人的锁
5. 第六版：`unlock`变为`lua`脚本保证
6. 第七版：锁重入，`hset`替代`setnx`+`lock`变为`lua`脚本保证
7. 第八版：自动续期
