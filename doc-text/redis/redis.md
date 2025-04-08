# Redis

## 什么是Redis？

Redis 是一个内存数据存储，被数百万开发者用作缓存、向量数据库、文档数据库、流式引擎和消息代理。Redis 具有内置的复制和不同级别的磁盘持久化。它支持复杂的数据类型（例如，字符串、散列、列表、集合、有序集合和 JSON），并为这些数据类型定义了原子操作。

Redis 通常被称为数据结构服务器。这意味着 Redis 通过一组命令提供对可变数据结构的访问，这些命令通过 TCP 套接字和简单协议使用服务器-客户端模型发送。因此，不同的进程可以以共享的方式查询和修改相同的数据结构。

Redis 实现的数据结构具有一些特殊的属性：

1. Redis 会将其存储在磁盘上，即使它们总是被服务器内存中读取和修改。这意味着 Redis 速度快，但同时也非易失性。
2. 数据结构的实现强调内存效率，因此 Redis 内部的数据结构可能比使用高级编程语言建模的相同数据结构模型使用更少的内存。
3. Redis 提供了一系列数据库中常见的功能，如复制、可调的持久性级别、集群和高度可用性。

## 下载Redis

>**命名规则：**
>
>​	版本号第二位如果是奇数，则为非稳定版本，如2.7、2.9、3.1
>
>​	版本号第二位如果是偶数，则为文档版本，如2.6、2.8、3.0、3.2
>
>​	当前奇数版本就是下一个稳定版本的开发版本，如2.9版本是3.0版本的开发版本

[下载Redis](https://redis.io/downloads/)

## Linux安装Redis

1. `getconf LONG_BIT`命令先看看是多少位的，一定要是64位

2. Centos7安装`Redis`，先具备gcc环境

   1. 查看是否具有`gcc`环境`gcc -v`

      ![image-20250406143055527](/redisImages/image-20250406143055527.png)

   2. 如果没有`gcc`环境，则通过`yum -y install gcc-c++`命令来安装`gcc`

3. `Redis`官方建议版本升级到6.0.8以上

   ![](/redisImages/redis.png)

4. 下载命令`wget https://download.redis.io/releases/redis-7.0.0.tar.gz`

   ![](/redisImages/redis安装.png)

5. 进入`/opt`目录下解压`redis`，解压命令`tar -zxvf redis-7.0.0.tar.gz`

   1. 解压后

      ![image-20250406143750928](/redisImages/image-20250406143750928.png)

6. 进入目录`cd redis-7.0.0`

7. 在`redis-7.0.0`目录执行`make`命令

   ![image-20250406144027413](/redisImages/image-20250406144027413.png)

8. 查看默认安装目录：`usr/local/bin`

   1. 安装完后查看

      ![image-20250406144621148](/redisImages/image-20250406144621148.png)

   2. `redis-benchmark`：性能测试工具，服务启动后运行该命令，看看自己笔记本性能如何

   3. `redis-check-aof`：修复有问题的AOF文件

   4. `redis-check-dump`：修复有问题的dump.rdb文件

   5. <span style="color:#990000;">`redis-cli`：客户端，操作入口</span>

   6. `redis-sentinel`：redis集群使用

   7. <span style="color:#990000;">`redis-server`：redis服务器启动命令</span>

9. 将默认的`redis.conf`拷贝到自己定义好的一个路径下，比如`/myredis`(如果改坏的话有备份)

   ![image-20250406144745776](/redisImages/image-20250406144745776.png)

10. 修改`/myredis`目录下`redis.conf`配置文件做初始化设置

    ```cmd
    redis.conf配置文件，改完后确保生效，记得重启，记得重启
    
       1 默认daemonize no              改为  daemonize yes
    
       2 默认protected-mode  yes    改为  protected-mode no
    
       3 默认bind 127.0.0.1             改为  直接注释掉(默认bind 127.0.0.1只能本机访问)或改成本机IP地址，否则影响远程IP连接
    
       4 添加redis密码                      改为 requirepass 你自己设置的密码
    ```

    ![image-20250406144910139](/redisImages/image-20250406144910139.png)

    `daemonize yes`：在后台启动 

    ![image-20250406144931933](/redisImages/image-20250406144931933.png)

    `proteccted-mode no`：关闭保护模式

    ![image-20250406144946561](/redisImages/image-20250406144946561.png)

    `requirepass 密码`：添加redis密码

11. 启动服务

    `/usr/local/bin`目录下运行`redis-server`，启用`/myredis`目录下的`redis.conf`文件

12. 连接服务

    ![image-20250406145135039](/redisImages/image-20250406145135039.png)

    Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.

    我看着不爽，怎么办？

     

    warning 这串输出并不是普通输出，

    shell的标准输出包含两种：

    1（标准输出）

    2（标准错误）我们的命令，即包含1也包含2，2即是我们想要去除的提示。

     

    解决办法将标准错误去除即可，追加2>/dev/null，将标准错误丢弃即可，就没有烦人的警告了。

    ![image-20250406145229817](/redisImages/image-20250406145229817.png)

13. 关闭

    1. 单实例关闭：`redis-cli -a redis密码 shutdown` 
    2. 多实例关闭，指定端口关闭：`redis-cli -p 6379 shutdown`

## Redis卸载步骤

1. 停止`redis-server`服务

   ![image-20250406145603470](/redisImages/image-20250406145603470.png)

2. 删除`/usr/local/lib`目录下与`redis`相关的文件

   1. ls -l /usr/local/bin/redis-*
   2. rm -rf /usr/local/bin/redis-*
   3. ![image-20250406145719940](/redisImages/image-20250406145719940.png)



​    

## Redis7新特性

| 多AOF文件支持                     | 7.0 版本中一个比较大的变化就是 aof 文件由一个变成了多个，主要分为两种类型：基本文件(base files)、增量文件(incr files)，请注意这些文件名称是复数形式说明每一类文件不仅仅只有一个。在此之外还引入了一个清单文件(manifest) 用于跟踪文件以及文件的创建和应用顺序（恢复） |
| --------------------------------- | ------------------------------------------------------------ |
| config命令增强                    | 对于Config Set 和Get命令，支持在一次调用过程中传递多个配置参数。例如，现在我们可以在执行一次Config Set命令中更改多个参数： config set maxmemory 10000001 maxmemory-clients 50% port 6399 |
| 限制客户端内存使用Client-eviction | 一旦 Redis 连接较多，再加上每个连接的内存占用都比较大的时候， Redis总连接内存占用可能会达到maxmemory的上限，可以增加允许限制所有客户端的总内存使用量配置项，redis.config 中对应的配置项// 两种配置形式：指定内存大小、基于 maxmemory 的百分比。maxmemory-clients 1gmaxmemory-clients 10% |
| listpack紧凑列表调整              | listpack 是用来替代 ziplist 的新数据结构，在 7.0 版本已经没有 ziplist 的配置了（6.0版本仅部分数据类型作为过渡阶段在使用）listpack 已经替换了 ziplist 类似 hash-max-ziplist-entries 的配置 |
| 访问安全性增强ACLV2               | 在redis.conf配置文件中，protected-mode默认为yes，只有当你希望你的客户端在没有授权的情况下可以连接到Redis server的时候可以将protected-mode设置为no |
| Redis Functions                   | Redis函数，一种新的通过服务端脚本扩展Redis的方式，函数与数据本身一起存储。简言之，redis自己要去抢夺Lua脚本的饭碗 |
| RDB保存时间调整                   | 将持久化文件RDB的保存规则发生了改变，尤其是时间记录频度变化  |
| 命令新增和变动                    | Zset (有序集合)增加 ZMPOP、BZMPOP、ZINTERCARD 等命令Set (集合)增加 SINTERCARD 命令LIST (列表)增加 LMPOP、BLMPOP ，从提供的键名列表中的第一个非空列表键中弹出一个或多个元素。 |
| 性能资源利用率、安全、等改进      | 自身底层部分优化改动，Redis核心在许多方面进行了重构和改进主动碎片整理V2：增强版主动碎片整理，配合Jemalloc版本更新，更快更智能，延时更低HyperLogLog改进：在Redis5.0中，HyperLogLog算法得到改进，优化了计数统计时的内存使用效率，7更加优秀更好的内存统计报告 |

Redis 命令

```cmd
redis  执行了make install后，redis的课执行文件都会自动复制到 /usr/local/bin 目录
redis-server        redis服务器
redis-cli            redis命令行客户端
redis-benchmark        redis性能测试工具
redis-check-aof        aof文件修复工具
redis-check-dump    rdb文件检查工具
```

## 启动Redis

1. 启动配置文件

   ```cmd
   redis-server /myredis/redis7.conf # /myredis/redis7.conf 为配置文件名
   ```

2. 启动

   ```cmd
   redis-cli
   auth 用户名
   ```

3. 或

   ```cmd
   redis-cli -a 用户名 -p 端口号
   ```

> 不输入 `-p 端口号` 默认会找 `6379`

停止

```cmd
redis-cli shutdown
```



## Redis十大数据类型：

### 字符串（String）

`String`是`redis`最基本的类型，一个`key`对应一个`value`

`String`类型是二进制安全的（支持序列号），意思是`redis`的`String`可以包含任何数据，比如`jpg`图片或者序列号对象

`String`类型是`Redis`最基本的数据类型，一个`Redis`中字符串`value`最多可以是512MB

#### Redis键（key）

![](/redisImages/key.png)



1. `keys *`：查看当前库所有的key
2. `exists key`：判断某个key是否存在
3. `type key`：查看你的key是什么类型
4. `del key`：删除指定的key数据
5. `unlink key`：非阻塞删除，仅仅将keys从keyspace元数据中删除，真正的删除会在后续异步中操作
6. `ttl key`：查看还有多少秒过期，-1表示永不过期，-2表示已过期
7. `expire key 秒钟`：为给定的key设置过期时间
8. `move key dbindex【0-15】`：将当前数据库的key移动到给定的数据库`dbindex【0-15】`当中
9. `select dbindex`：切换数据库【0-15】，默认为0
10. `dbsize`：查看当前数据库key的数量
11. `flushdb`：清空当前库
12. `flushall`：通杀全部库
13. `help @*`：* 表示所有命令，都可以通过help来查看帮助文档

>命令不区分大小写，但是名字区分大小写

#### String 类型的 API

![](/redisImages/string命令.png)

##### set 指令

```cmd
set key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL]
```

![image-20250406163641212](/redisImages/image-20250406163641212.png)

1. `set key value [ex seconds]` ：设置带有过期时间的键值对 单位：秒,效果等同于`setex key seconds value`，成功返回“OK”，如果对在有效时间内存在的键值对重新使用该命令，则value会被覆盖，有效时间也会被覆盖，并重新开始计时。
2. `set key value [px milliseconds] `：设置带有过期时间的键值对  单位：毫秒,效果等同于`psetex key milliseconds value`，成功返回“OK”。如果对在有效时间内存在的键值对重新使用该命令，则value会被覆盖，有效时间也会被覆盖，并重新开始计时。
3. `set key value nx`： 设置key-value的键值对，如果之前该键key不存在，则设置执行操作，返回值“OK”,如果之前键值对存在，则不会执行操作，返回“（nil）”，效果等同于`setnx key value`，但是后者成功返回值1，失败返回值0。
4. `set key value xx`： 设置key-value的键值对,只有之前该键值key对已经存在的时候才会执行操作（value会被覆盖），返回“OK”，若之前不存在则不会执行，返回“nil”。

##### 同时设置/获取多个键值



设置多个值

```cmd
mset k1 v1 k2 v2 .... #输出 v1 v2
```

`msetnx`：如果不存在创建成功

```cmd
msetnx k1 v1 k2 v2 ...
```

>假如k1已经存在，k4不存在，则都不执行成功

获取多个值

```cmd
mget k1 k2 ...
```

`mget`：都存在才会执行成功

```cmd
mget k1 k2 k3 k4 k5 ....
```

##### 获取指定区间范围内的值

`getrange`：获取指定区间的值

```cmd
getrange k1 0 4 # 获取k1的 0 5是区间的范围，默认从0开始
```

`setrange`：设置指定区间的值

```cmd
setrange k1 3 xxxx #设置k1从3往后的值为xxx
```

##### 数值的增减

>注意：一定要是数字才能进行加减

###### 递增数字

```cmd
incr key
```

###### 增加指定的整数

```cmd
incrby key x
key: 代表变量名
x：代表增加的数字
```

###### 递减数值

```cmd
decr key
```

###### 减少指定的整数

```cmd
decrby key x
key：代表变量名
x：代表递减的数字
```

##### 获取字符串的长度

```cmd
strlen key
key：表示变量名
```

##### 字符串长度和内容追加

```cmd
append key value
key：表示变量名
value：表示要增加的字符
```

##### 分布式锁

```cmd
setnx key value # 如果不存在把变量和值加上
key：变量名
value：值
setex(set with expire)键秒值/setnx(set if not exist)
```

`set key vlaue 【ex seconds】【px milliseconds】 【nx|xx】`

`ex：key在多少秒后过期`
`px：key在多少毫秒之后过期`
`nx：当key不存在的时候，才创建key，效果等同于setnx`
`xx：当key存在的时候，覆盖key`

```cmd
setex k1 time value
k1：表示变量名
time：表示过期事件
value：表示变量名的值
```

`setnx`：只有在key不存在设置key值

######    getset(先get在set)先获取值，在设置值

getset：将给定key的值设为value，并返回key的旧值（old value）。简单一句话，先get然后立即set

### 列表（List）

> 特点：单key多value

`Redis`列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）

它的底层实际是个双端链表，最多可以包含 2³²-1 个元素（4294967295，每个列表超过40亿个元素）,主要功能有push/pop等，一般用在栈、队列、消息队列等场景。left、right都可以插入添加：

如果键不存在，创建新的链表

如果键已存在，新增内容

如果值全移除，对应的键也就消失了。

>它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差

![](/redisImages/list.png)

![](/redisImages/list命令.png)

#### 常用操作命令(L是从左到右，R是从右到左)

1. `lpop key count`：移除并获取到第count个元素
2. `lpush key value 【value2】`：将一个或多个值插入到列表头部
3. `lpushx key value`：将一个或多个值插入到已存在的列表头部
4. `lrange key start stop`：获取列表指定范围内的元素，start是开始，stop结束
5. `lrem key count value`：移除列表重复的元素，count移除几个重复的元素，value元素值
6. `lset key index value`：通过索引设置列表元素的值，index索引，value要设定的值
7. `ltrim key start stop`：截取指定索引区间的元素，格式是 ltrim list的key 起始索引，结束索引   
8. `rpop key count`：移除并获取列表最后count个元素
9. `rpoplpush source destination`：移除列表的最后一个元素，并将该元素添加到另一个列表并返回，就是将source的头一个元素，给destination的尾元素
10. `rpush key value [value2]`：在列表中添加一个或多个值
11. `rpushx key value`：为已存在的列表添加值
12. `llen key`：获取列表中元素的个数
13. `lindex key index`：按照索引下标获得元素（从上到下），key表示变量名，index表示索引
14. `linsert key before/after oldValue newValue`：已有值插入的新值，key变量名，before/after 前或后，oldValue：key的已有值，newValue要插入的值

`rpush/lpush/lrange`

![image-20250406172123946](/redisImages/image-20250406172123946.png)

`rpop/lpop`

![image-20250406172356511](/redisImages/image-20250406172356511.png)

`lrem/lset`

![image-20250406172732940](/redisImages/image-20250406172732940.png)

`ltrim`

![image-20250406173052157](/redisImages/image-20250406173052157.png)

`rpoplpush`

![image-20250406173317366](/redisImages/image-20250406173317366.png)

`llen/lindex`

![image-20250406173508097](/redisImages/image-20250406173508097.png)

`linsert`

![image-20250406173742983](/redisImages/image-20250406173742983.png)

### 哈希表（Hash）

特点：KV模式不变，但V是一个键值对

`Redis hash`是一个`String`类型的`field`（字段）和`value`（值）的映射表，hash特别适合用于存储对象。

`Redis`中每个`hash`可以存储  键值对（40多亿）

#### 命令

![](/redisImages/hash命令.png)

`hset key filed value`：设置值

```cmd
hset user:001 id 11 name z3 age 25
```

`hget key filed value` ：获取值

```cmd
hget user:001 name
```

![image-20250406175251833](/redisImages/image-20250406175251833.png)

**`hmset/hmget`可以进行批处理**

`hmset key filed value`：设置值

```cmd
hmest user:001 id 12 name li4 age 26 
```

`hmget key filed value`：获取值

```cmd
hmget user:001 id name age
```

![image-20250406175459761](/redisImages/image-20250406175459761.png)

`hgetall key`：遍历key的所有属性和值

```cmd
hgetall user:001
```

`hdel key filed value`：删除指定的元素

```cmd
hdel user:001 age
```

![image-20250406175551830](/redisImages/image-20250406175551830.png)

`hlen key`：获取key的长度

```cmd
hlen user:001
```

`hexists key`：在key里面的某个值的key

```cmd
hexists user:001 name
```

![image-20250406175725012](/redisImages/image-20250406175725012.png)

`hkeys key`：获取key里面的属性

```cmd
hkeys hash1
```

`hvals key`：获取key里面的所有value值

```cmd
hvals hash2
```

`hincrby key filed value`：对某个整数的值加value

```cmd
hincrby user:001 age 1
```

![image-20250406175903212](/redisImages/image-20250406175903212.png)

`hincrbyfloat key filed value`：对某个浮点数的值加value

```cmd
hincrbyfloat user:001 score 0.5
```

`hsetnx key fuked value`：不存在赋值成功/新建成功，存在了无效

```cmd
hsetnx user:001 email zzssww@qq.com
```

![image-20250406180220994](/redisImages/image-20250406180220994.png)

### 集合（Set）

特点：单值多value，且无重复

`Redis`的`Set`是`String`类型的无序集合，集合成员是唯一的，这就意味着不能出现重复的数据，集合对象的编码可以是 `intset` 或者 `hashtable`

`Redis` 中 `Set`集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1) 。

集合中最大的成员数 2³²-1 (4294967295，每个集合可存储40多亿个成员)

`sadd key member[member ...]`：添加元素，自动去重

```cmd
sadd set1 1 1 1 1 1 2 2 2 2
```

`smembers key`：遍历集合中的所有元素

```cmd
smembers set1
```

`sismember key member`：判断member属性值是否在集合中

```cmd
sismember set1 1
```

`srem key member[member ...]`：删除member元素

```cmd
srem set1 1
```

`scard key`：获取集合里面的元素个数

```cmd
scard set1
```

`srandmember key [数字]`：从集合中随机展现设置的数字个数元素，元素不删除

```cmd
srandomember set1 1 # 从set1集合展现1个元素
```

`spop key [数字]`：从集合中随机弹出一个元素，出一个删一个

```cmd
spop set1 1 #随机弹出一个元素
```

`smove key1 key2 member`：在key1里已存在的某个值，将key1里已存在的某个值赋值给key2集合运算

```cmd
smove set1 set2 7 #将set1中的7移动到set2里面
```

#### 集合运算

A、B 两个集合，A的元素是abc12，B的元素是123ax

1. 集合的差集运算 A-B

   属于A但不属于B的元素构成的集合

   ```cmd
   sdiff key [key...]
   例：
   sdiff set2 set1 # set2 和 set1 的差集
   ```

2. 集合的并集运算 A ∪ B

   属于A或者属于B的元素合并后的集合

   ```cmd
   sunion key [key...]
   例：
   sunion set1 set2 # set1 和 set2 的并集
   ```

3. 集合的交集运算 A ∩ B

   属于 A 同时也属于 B 的共同拥有的元素构成的集合

   ```cmd
   sinter key [key...]
   例：
   sinter set1 set2 # set1 和 set2 的交集
   ```

`sintercard numkeys key [key...][limit limit]`

redis7新命令

它不返回结果集，而只返回结果的基数（去重以后的数字个数）。返回由所有给定集合的交集产生的集合的基数（返回重复的个数）

```cmd
sinetercard 2 set1 set2 limit 1 # 2个key set1 和 set2 只显示 1个
```



### 有序集合（ZSet（sorted set））

`zset`(`sorted set`：有序集合)

在 set 基础上，每个val值前加一个score分数值。之前set是k1 v1 v2 v3

现在zset是k1 score v1 score2 v2

`Redis zset`和`set`一样也是`String`类型元素的集合，且不允许重复的成员。

> 不同的是每个元素都会关联一个`double`类型的分数，`redis`正是通过分数来为集合中的成员进行从小到大的排序。

> `zset`的成员是唯一的，但分数`(score)`却可以重复

> `zset`集合是通过哈希表实现的，所以添加、删除、查找的复杂度都是O（1）。集合中最大的成员数为 2³²-1

向有序集合中加入一个元素和该元素的分数

添加元素：

`zadd key score member [score member...]`

```cmd
zadd zset1 60 v1 80 v2 90 v3 100 v5
```



按照元素分数从小到大的顺序，返回索引从start到stop之间的所有元素：

`zrange key start stop [withscores]`

```cmd
zrange zset 0 -1 # 遍历所有
zrange zset 0 -1 withscores # 遍历所有包括分数
```



逆序按照元素分数从小到大的顺序，返回索引从start到stop之间的所有元素

`zrevrange`

```cmd
zrevrange zset 0 -1 withscores # 逆序遍历包括分数
zrevrange zset 0 -1 # 逆序遍历所有
```



获取指定分数范围的元素：

`zrangebyscore key min max [withscores] [limit offset count]`

withscores：包括变量名

(：不包含

limit：作用是返回限制，limit开始下标步，多少步

```cmd
zrangebyscore zset1 60 90 # 按照分数找变量名
zrangebyscore zset1 60 90 withscores # 按照分数遍历变量和值
zrangebyscore zset1 （60 90 withscores # 按分数遍历变量和值，不包含60
zrangebyscore zset1 （60 90 withscores limit 0 1  # 按照分数遍历变量和值，不包含60，返回一个键值对
```



获取元素的分数：

`zscore key member`

```cmd
zscore zset1 v1 # 获取 v1 元素的分数
```



获取集合中元素的数量：

`zcard key`

```cmd
zcard zset1 # 获取 zset1 的集合数量
```



某score下对应的value值，作用是删除元素

`zrem key`

```cmd
zrem zset1 v5 # 删除 v5 元素
```



增加某个元素的分数：

`zincrby key incrmenet member`

```cmd
zincrby zset1 3 v1 # 给v1的值增加3分
```



获得指定分数范围内的元素个数：

`zcount key min max`

```cmd
zcount zset1 60 100 # 获取 60 到 100 分数的值有多少个
```



从键名列表中的第一个非空排序集中弹出一个或多个元素，它们是成员分数对

`zmpop` redis 7.0 新命令

```cmd
zmpop 1 zset min count 1 # 把最小的键值对给弹出，显示弹出的键值对
```



获得下标值：

`zrange key values`

```cmd
zrange zset 0 -1 # 获得 zset的变量名
```



逆序获得下标值

`zrevrank key values`

```cmd
zrevrank zset v1 # 获得逆序的下标值
```



### 地理空间（GEO）

`Redis GEO`主要用于存储地理位置信息，并对于存储的信息进行操作，包括：

1. 添加地理位置的坐标
2. 获取地理位置的坐标
3. 计算两个位置之间的距离
4. 根据用户给定的经纬度坐标来获取指定范围内的地理位置集合

### 基数统计（HyperLogLog）

`HyperLogLog`是用来做**<u>基数统计</u>**的算法，`HyperLogLog`的优点是，在输入元素的数量或者体积非常大时，计算基数所需的空间总是固定且很小的。

在`Redis`里面，每个`HyperLogLog`键只需要花费 12KB 内存，就可以计算接近 2^64 个不同元素的基数，这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为`HyperLogLog`只会根据输入元素来计算基数，而不会存储元素本身，所以`HyperLogLog`不能像集合那样，返回输入的各个元素。

### 位图（bitmap）

`Bit arrays （or simply bitmaps，我们可以称之为位图）`

<img src="/redisImages/bitmaps.png" style="zoom:60%;" />

一个字节(一个byte)=8位

上图由许许多多的小格子组成，每一个格子里面只能放1或者0，用它来判断Y/N状态，说的专业点，就是每一个小格子就是一个个bit

由0和1状态表现的二进制位的bit数组

### 位域（bitfield）

通过 `bitfield`命令可以一次性操作多个比特位域（指的是连续的多个比特位），它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应操作的执行结果。

说白了就是通过`bitfield`命令我们可以一次性对比多个比特位域进行操作。

### 流（Stream)

`Redis Stream`是 `Redis 5.0`版本新增加的数据结构。

`Redis Stream`主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 （pub/sub）来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开，Redis 宕机等，消息就会被丢弃。

简单来说发布订阅（pub/sub）可以分发消息，但无法记录历史消息。

而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失
