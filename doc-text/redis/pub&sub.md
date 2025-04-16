## 发布/订阅

是一种消息通信模式：发送者（publish）发送消息，订阅者（subscribe）接受消息，可以实现进程间的消息传递

`Redis`  可以实现消息中间件 MQ 的功能，通过发布订阅实现消息的引导和分流。**不推荐使用该功能**，专业的事情交给专业的中间件，redis就做好分布式缓存功能

**能干嘛？**

* redis 客户端可以订阅任意数量的频道，类似我们微信关注多个公众号

  * ![image-20250416152204885](/redisImages/image-20250416152204885.png)
  * 当有新的消息通过 publish 命令发送给频道 channel1 时
    * ![image-20250416152303136](/redisImages/image-20250416152303136.png)

  总结：

  发布/订阅其实是一个轻量的队列，只不过数据不会被持久化，一般用来处理实时性较高的异步消息

  ![image-20250416152345866](/redisImages/image-20250416152345866.png)

### 常用命令

  ```cmd
  subscribe channel [channel...]
  ```

  * 订阅给定的一个或多个频道的信息
  * 推荐先执行订阅后再发布，订阅成功之前发布的消息是收不到的
  * 订阅的客户端每次可以收到一个3个参数的消息
    * 消息的种类
    * 始发频道的名称
    * 实际的消息内容
      * ![image-20250416153326379](/redisImages/image-20250416153326379.png)

  ```cmd
  publish channel message 
  ```

  * 发布消息到指定的频道

  ```cmd
  psubscribe pattern[pattern...]
  ```

  * 按照模式批量订阅，订阅一个或多个符合给定模式（支持*号？号之类的）频道

    * ![image-20250416153815078](/redisImages/image-20250416153815078.png)

```cmd
pubsub subcommand [argument [argument ...]]
```
* 查看订阅与发布系统状态

```cmd
pubsub channels  
```

  * 由活跃频道组成的列表

  * ![image-20250416154153634](/redisImages/image-20250416154153634.png)


```cmd 
pubsub numsub [channel [channel...]]
```

* 某个频道有几个订阅者

```cmd
pubsub numpay
```

* 只统计使用 pubscribe 命令执行的，返回客户端订阅的唯一模式的数量
* ![image-20250416154647155](/redisImages/image-20250416154647155.png)

```cmd
unsubscribe [channel [channel...]]
```

* 取消订阅

```cmd
punsubscribe [pattern [pattern...]]
```

* 退订所有给定模式的频道

### 总结

* redis 可以实现消息中间件 MQ 的功能，通过发布订阅实现消息的引导和分流。**不推荐使用该功能，专业的事情交给专业的中间件出来，redis就做好分布式缓存功能**
* pub/sub 缺点
  * 发布的消息在 redis 系统中不能持久化，因此，必须先订阅，再等待消息发布。如果先发布了消息，那么该消息由于没有订阅者，消息将被直接丢弃
  * 消息只管发送对于发布者而言消息是即发即失的，不管接收，也没有 ack 机制，无法保证消息的消费成功。
  * 以上的缺点导致redis的pub/sub模式就像个小玩具，在生产环境中几乎无用武之地，为此redis 5.0 版本新增了 stream 数据结构，不但支持多播，还支持数据持久化，相比 pub/sub 更加的强大



