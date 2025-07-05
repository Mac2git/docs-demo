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

## redis解决中文乱码

```cmd
redis-cli -a 密码 --raw
```



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



## 添加中文支持

```cmd
redis-cli -a 密码 -p 端口号 --raw  # --raw 添加中文支持
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

![image-20250409154617663](/redisImages/image-20250409154617663.png)

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

![image-20250409154749391](/redisImages/image-20250409154749391.png)

`spop key [数字]`：从集合中随机弹出一个元素，出一个删一个

```cmd
spop set1 1 #随机弹出一个元素
```

`smove key1 key2 member`：在key1里已存在的某个值，将key1里已存在的某个值赋值给key2集合运算

```cmd
smove set1 set2 7 #将set1中的7移动到set2里面
```

![image-20250409154951035](/redisImages/image-20250409154951035.png)

#### 集合运算

A、B 两个集合，A的元素是abc12，B的元素是123ax

1. 集合的差集运算 A-B

   属于A但不属于B的元素构成的集合

   ```cmd
   sdiff key [key...]
   例：
   sdiff set2 set1 # set2 和 set1 的差集
   ```

   ![image-20250409155136630](/redisImages/image-20250409155136630.png)

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
   
   ![image-20250409155245778](/redisImages/image-20250409155245778.png)

`sintercard numkeys key [key...][limit limit]`

redis7新命令

它不返回结果集，而只返回结果的基数（去重以后的数字个数）。返回由所有给定集合的交集产生的集合的基数（返回重复的个数）

```cmd
sinetercard 2 set1 set2 limit 1 # 2个key set1 和 set2 只显示 1个
```

![image-20250409155446974](/redisImages/image-20250409155446974.png)

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

![image-20250409170419443](/redisImages/image-20250409170419443.png)

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

![image-20250409171225792](/redisImages/image-20250409171225792.png)

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

![image-20250409171654381](/redisImages/image-20250409171654381.png)

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

![image-20250409172544136](/redisImages/image-20250409172544136.png)

### 位图（bitmap）

`Bit arrays （or simply bitmaps，我们可以称之为位图）`

<img src="/redisImages/bitmaps.png" style="zoom:60%;" />

一个字节(一个byte)=8位

上图由许许多多的小格子组成，每一个格子里面只能放1或者0，用它来判断Y/N状态，说的专业点，就是每一个小格子就是一个个bit

由0和1状态表现的二进制位的bit数组

说明：用String类型作为底层数据结构实现的一种统计二值状态的数据类型

位图本质是数组，它是基于String数据类型的按位的操作。该数组由多个二进制位组成，每个二进制位都对应一个偏移量(我们称之为一个索引)。

Bitmap支持的最大位数是2^32位，它可以极大的节约存储空间，使用512M内存就可以存储多达42.9亿的字节信息(2^32 = 4294967296)

 

`setbit`设置bit：

```cmd
setbit key offset value
```

![image-20250409180618769](/redisImages/image-20250409180618769.png)

![image-20250409180842482](/redisImages/image-20250409180842482.png)

`gitbit`获取某个bit的值：

```cmd
getbit key offset
```

![image-20250409180948310](/redisImages/image-20250409180948310.png)

`strlen`统计字节占用多少：

不是字符串长度而是占据几个字节，超过8位后自己按照8位一组一byte再扩容

```cmd
strlen key
```

![image-20250409181059541](/redisImages/image-20250409181059541.png)

`bitcount`全部键里面含有多少1：

```cmd
bitcount key
```

![image-20250409181139433](/redisImages/image-20250409181139433.png)

`bitop`：

```cmd
bitop and destkey key key # 两个key合并放到destkey里面
```



![image-20250409181646736](/redisImages/image-20250409181646736.png)

![image-20250409181818185](/redisImages/image-20250409181818185.png)

### 基数统计（HyperLogLog）属于String 类型

![image-20250409182113564](/redisImages/image-20250409182113564.png)

`HyperLogLog`是用来做**<u>基数统计</u>**的算法，`HyperLogLog`的优点是，在输入元素的数量或者体积非常大时，计算基数所需的空间总是固定且很小的。

在`Redis`里面，每个`HyperLogLog`键只需要花费 12KB 内存，就可以计算接近 2^64 个不同元素的基数，这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为`HyperLogLog`只会根据输入元素来计算基数，而不会存储元素本身，所以`HyperLogLog`不能像集合那样，返回输入的各个元素。



`PFADD`将所有元素参数添加到 HyperLogLog 数据结构中：

```cmd
PFADD key element [element ...]
```

`PFCOUNT`返回给定 HyperLogLog 的基数估算值：

```cmd
PFCOUNT key [key ...]
```

`PFMERGE`将多个 HyperLogLog 合并为一个 HyperLogLog ，合并后的 HyperLogLog 的基数估算值是通过对所有 给定 HyperLogLog 进行并集计算得出的：

```cmd
PFMERGE destkey sourcekey [sourcekey ...]
```

演示：

![image-20250410160818942](/redisImages/image-20250410160818942.png)

### 地理空间（GEO）

移动互联网时代LBS应用越来越多，交友软件中附近的小姐姐、外卖软件中附近的美食店铺、高德地图附近的核酸检查点等等，那这种附近各种形形色色的XXX地址位置选择是如何实现的？

 

地球上的地理位置是使用二维的经纬度表示，经度范围 (-180, 180]，纬度范围 (-90, 90]，只要我们确定一个点的经纬度就可以名取得他在地球的位置。

例如滴滴打车，最直观的操作就是实时记录更新各个车的位置，

然后当我们要找车时，在数据库中查找距离我们(坐标x0,y0)附近r公里范围内部的车辆

使用如下SQL即可：

```cmd
select taxi from position where x0-r < x < x0 + r and y0-r < y < y0+r
```

但是这样会有什么问题呢？

1.查询性能问题，如果并发高，数据量大这种查询是要搞垮数据库的

2.这个查询的是一个矩形访问，而不是以我为中心r公里为半径的圆形访问。

3.精准度的问题，我们知道地球不是平面坐标系，而是一个圆球，这种矩形计算在长距离计算时会有很大误差

`Redis GEO`主要用于存储地理位置信息，并对于存储的信息进行操作，包括：

1. 添加地理位置的坐标
2. 获取地理位置的坐标
3. 计算两个位置之间的距离
4. 根据用户给定的经纬度坐标来获取指定范围内的地理位置集合



![image-20250410162957806](/redisImages/image-20250410162957806.png)

命令：

**GEOADD**：添加地理位置

![image-20250410163315401](/redisImages/image-20250410163315401.png)

```cmd
GEOADD city 116.403963 39.915119 "天安门" 116.403414 39.924091 "故宫" 116.024067 40.362639 "长城"
```

**GEOPOS**：获取指定的经纬度

![image-20250410163507481](/redisImages/image-20250410163507481.png)

```cmd
GEOPOS city 天安门 故宫 长城
```

![image-20250410163723293](/redisImages/image-20250410163723293.png)

**GEOHASN**：使用hash值来保存地理位置的坐标

![image-20250410163750436](/redisImages/image-20250410163750436.png)

```cmd
GEOHASH city 天安门 故宫 长城
```

**GEOLIST**：返回两个给定位置之间的距离

![image-20250410164012610](/redisImages/image-20250410164012610.png)

后面参数是距离单位：

1. m 米
2. km 千米
3. ft 英尺
4. mi 英里

```cmd
GEODIST city 天安门 故宫 km
```

![image-20250410164156033](/redisImages/image-20250410164156033.png)

**GEORADIUS(以半径为中心)**： 以给定的经纬度为中心， 返回键包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素。

 ```cmd
 GEORADIUS city 116.418017 39.914402 10 km withdist withcoord count 10 withhash desc
 GEORADIUS city 116.418017 39.914402 10 km withdist withcoord withhash count 10 desc
 ```

1. WITHDIST: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致。
2. WITHCOORD: 将位置元素的经度和维度也一并返回。
3. WITHHASH: 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大COUNT 限定返回的记录数。

![image-20250410164811698](/redisImages/image-20250410164811698.png)



**GEORADIUSBYMEMBER**：找出位于指定范围内的元素，中心点是由给定的位置元素决定的

```cmd
GEORADIUSBYMEMBER  city 天安门 10 km withdist withcoord count 10 withhash # 找出以天安门为中心，附近10km的地方
```

![image-20250410165223579](/redisImages/image-20250410165223579.png)

### 流（Stream)

`Redis Stream`是 `Redis 5.0`版本新增加的数据结构。

`Redis Stream`主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 （pub/sub）来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开，Redis 宕机等，消息就会被丢弃。

简单来说发布订阅（pub/sub）可以分发消息，但无法记录历史消息。

而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

Redis版的MQ消息中间件+阻塞队列

**能干嘛？**

实现消息队列，它支持消息的持久化，支持自动生成全局唯一ID、支持ack确认消息的模式、支持消费组模式等，让消息队列更加的稳定和可靠

#### 底层结构和原理说明

![image-20250410172029685](/redisImages/image-20250410172029685.png)

| 1    | Message Content   | 消息内容                                                     |
| ---- | ----------------- | ------------------------------------------------------------ |
| 2    | Consumer group    | 消费组，通过XGROUP CREATE 命令创建，同一个消费组可以有多个消费者 |
| 3    | Last_delivered_id | 游标，每个消费组会有个游标 last_delivered_id，任意一个消费者读取了消息都会使游标 last_delivered_id 往前移动。 |
| 4    | Consumer          | 消费者，消费组中的消费者                                     |
| 5    | Pending_ids       | 消费者会有一个状态变量，用于记录被当前消费已读取但未ack的消息Id，如果客户端没有ack，这个变量里面的消息ID会越来越多，一旦某个消息被ack它就开始减少。这个pending_ids变量在Redis官方被称之为 PEL(Pending Entries List)，记录了当前已经被客户端读取的消息，但是还没有 ack (Acknowledge character：确认字符），它用来确保客户端至少消费了消息一次，而不会在网络传输的中途丢失了没处理 |

#### 基本命令理论简介

**队列相关指令**

![image-20250410172141313](/redisImages/image-20250410172141313.png)

**消费组相关指令**

![image-20250410172214112](/redisImages/image-20250410172214112.png)

**四个特殊符号**

1. -：最小可能出现的id
2. +：最大可能出现的id
3. $：$表示只消费新的消息，当前流中最大的id，可用于将要到来的信息
4. \>：用于`XREADGROUP`命令，表现迄今还没有发送组中使用者的消息，会更新消费组的最后ID
5. *：用于`XADD`命令中，让系统自动生成id

#### 基本命令实操

##### 队列相关指令

**XADD**：添加消息队列到末尾

XADD 用于向Stream 队列中添加消息，如果指定的Stream 队列不存在，则该命令执行时会新建一个Stream 队列

 

\* 号表示服务器自动生成 MessageID(类似mysql里面主键auto_increment)，后面顺序跟着一堆 业务key/value

信息条目指的是序列号，在相同的毫秒下序列号从0开始递增，序列号是64位长度，理论上在同一毫秒内生成的数据量无法到达这个级别，因此不用担心序列号会不够用。millisecondsTime指的是Redis节点服务器的本地时间，如果存在当前的毫秒时间戳比以前已经存在的数据的时间戳小的话（本地时间钟后跳），那么系统将会采用以前相同的毫秒创建新的ID，也即redis 在增加信息条目时会检查当前 id 与上一条目的 id， 自动纠正错误的情况，一定要保证后面的 id 比前面大，一个流中信息条目的ID必须是单调增的，这是流的基础。 
**客户端显示传入规则:**

Redis对于ID有强制要求，格式必须是时间戳-自增Id这样的方式，且后续ID不能小于前一个ID 
Stream的消息内容，也就是图中的Message Content它的结构类似Hash结构，以key-value的形式存在。 

![image-20250410174747266](/redisImages/image-20250410174747266.png)

>注意：
>
>1. 消息ID必须要比上个ID大
>2. 默认用型号表示自动生成规矩
>3. *：用于XDD命令中，让系统自动生成ID

**xrange**：用于获取消息列表（可以指定范围），忽略删除的消息

1. start 表示开始值，- 代表最小值
2. end 表示结束值，+ 代表最大值
3. count 表示最多获取多少个值

![image-20250410175418702](/redisImages/image-20250410175418702.png)

**xrevrange**：与`xrange`的区别在于，获取消息列表元素的方向是相反的，end在前，start在后

![image-20250410175614939](/redisImages/image-20250410175614939.png)

**xdel**：删除一条消息

![image-20250410175725471](/redisImages/image-20250410175725471.png)

**xlen**：用于获取stream队列的消息的长度

![image-20250410175746217](/redisImages/image-20250410175746217.png)

**xtrim**：用于对stream的长度进行截取，如超长会进行截取

1. `maxlen`：允许的最大长度，对流进行修剪限制长度
2. `minid`：允许的最小id，从某id值开始比该id值小的将会被抛弃

![image-20250410180149257](/redisImages/image-20250410180149257.png)

![image-20250410181006834](/redisImages/image-20250410181006834.png)

**xread**：用于获取消息（阻塞/非阻塞），只会返回大于指定ID的消息

![image-20250410173811155](/redisImages/image-20250410173811155.png)

1. 非阻塞

   1. $代表特殊ID，表示以当前Stream已经存储的最大的ID作为最后一个ID，当前Stream中不存在大于当前最大ID的消息，因此此时返回nil
   2. 0-0代表从最小的ID开始获取Stream中的消息，当不指定count，将会返回Stream中的所有消息，注意也可以使用0（00/000也都是可以的……）

   ![image-20250410181716134](/redisImages/image-20250410181716134.png)

2. 阻塞

![image-20250410182230965](/redisImages/image-20250410182230965.png)

总结：

​	Stream的基础方法，使用xadd存入消息和xread循环阻塞读取消息的方式可以实现简易版的消息队列，交互流程如下

![image-20250410173936545](/redisImages/image-20250410173936545.png)

对比list结构

![image-20250410173951159](/redisImages/image-20250410173951159.png)

##### 消费组相关指令

`xgroup create`：用于创建消费组

![image-20250410184052182](/redisImages/image-20250410184052182.png)

1. $表示从Stream尾部开始消费
2. 0表示从Stream头部开始消费
3. 创建消费者组的时候必须指定 ID, ID 为 0 表示从头开始消费，为 $ 表示只消费新的消息，队尾新来

`xreadgroup group`

1. ">"，表示从第一条尚未被消费的消息开始读取

2. 消费组group内的消费组consumer从mystream消息队列中读取所有消息

3. 但是，不同消费组的消费者可以消费同一条消息

   ![image-20250410184654314](/redisImages/image-20250410184654314.png)

4. 消费组的目的？

   让组内的多个消费者共同分担读取消息，所以，我们通常会让每个消费者读取部分消息，从而实现消息读取负载在多个消费者间是均衡分布的

![image-20250410185005071](/redisImages/image-20250410185005071.png)

| 1问题 | 基于 Stream 实现的消息队列，如何保证消费者在发生故障或宕机再次重启后，仍然可以读取未处理完的消息？ |
| ----- | ------------------------------------------------------------ |
| 2     | Streams 会自动使用内部队列（也称为 PENDING List）留存消费组里每个消费者读取的消息保底措施，直到消费者使用 XACK 命令通知 Streams“消息已经处理完成”。 |
| 3     | 消费确认增加了消息的可靠性，一般在业务处理完成之后，需要执行 XACK 命令确认消息已经被消费完成 |

![image-20250410183229300](/redisImages/image-20250410183229300.png)

`xpending`：

1. 查询每个消费组内所有消费者"已读取，但尚未确认"的消息
2. 查看某个消费者具体读取了哪些数据

![image-20250410185349874](/redisImages/image-20250410185349874.png)

`xack`：向消息队列确认消息处理已完成

![image-20250411220813033](/redisImages/image-20250411220813033.png)

`xinfo`：用于打印 stream\consumer\group\的详细信息

![image-20250411220856782](/redisImages/image-20250411220856782.png)

### 位域（bitfield）



通过 `bitfield`命令可以一次性操作多个比特位域（指的是连续的多个比特位），它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应操作的执行结果。

说白了就是通过`bitfield`命令我们可以一次性对比多个比特位域进行操作。

![image-20250411223808858](/redisImages/image-20250411223808858.png)

能干嘛？

1. 位域修改
2. 溢出控制

![image-20250411221002550](/redisImages/image-20250411221002550.png)

[ascii码 | ascii码对照表](https://ascii.org.cn/)

返回指定位域：

```cmd
bitfield key [get type offset]
```

![image-20250411221551010](/redisImages/image-20250411221551010.png)

1. i：有符号数
2. u：无符号数
3. i8：读取8位

hello 等价于 01101000 01100101 01101100 01101100 01101111

![image-20250411221656767](/redisImages/image-20250411221656767.png)

设置指定位域并返回它的原值

```cmd
bitfield key [set type offset value]
```

![image-20250411222138274](/redisImages/image-20250411222138274.png)

二进制加一，默认情况下，`incrby` 使用wrap参数：

```cmd
bitfield key [incrby type offset increment]
```

![image-20250411222525532](/redisImages/image-20250411222525532.png)

溢出控制`overflow[wrap|sat|fail]`

1. wrap：使用回绕（wrap around）方法处理有符号数和无符号数的溢出情况

   ![image-20250411223252108](/redisImages/image-20250411223252108.png)

2. sat：使用饱和计算（saturation arithmetic）方法处理溢出，下溢计算的结果为最小的整数值，而上溢计算的结果为最大的整数值

   ![image-20250411223309327](/redisImages/image-20250411223309327.png)

3. fail：命令将拒绝执行哪些会导致上溢或者下溢情况出现的计算，并向用户返回空值表示计算未被执行

   ![image-20250411223324513](/redisImages/image-20250411223324513.png)
