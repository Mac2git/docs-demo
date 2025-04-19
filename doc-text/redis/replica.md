## 复制（replica）

就是主从复制，master以写为主，slave以读为主。当master数据变化的时候，自动将新的数据异步同步到其他slave数据库

优点：

* 读写分离
* 容灾恢复
* 数据备份
* 水平扩容支撑高并发

如何使用

* 配从（库）不配主（库）
* 权限细节，重要
  * master 如果配置了 requirepass 参数，需要密码登录
  * 那么 slave 就要配置 masterauth 来设置校验密码，否则的话 master 会拒绝 slave的访问请求
    * ![image-20250416160335729](/redisImages/image-20250416160335729.png)
* 基本操作命令
  * info replication：可以查看复制节点的主从关系和配置信息
  * replicaof 主库IP 主库端口：一般写入进 redis.conf 配置文件内
  * slaveof 主库IP 主库端口
    * 每次与 master 断开之后，都需要重新连接，除非你配置进 redis.conf 文件
    * 在运行期间修改 slave 节点的信息，如果该数据库已经是某个主数据库的从数据库，那么会停止和原主数据库的同步关系**转而和新的主数据库同步，重新拜主数据库**
  * slaveof no one：使当前数据库停止与其他数据库的同步，**转成主数据库，自立为王**

### 示例

* 架构说明
  * 一个 master 两个 slave
  * 拷贝多个redis.conf 文件
    * redis6379.conf
    * redis6380.conf
    * redis6381.conf
      * ![image-20250416165241212](/redisImages/image-20250416165241212.png)
      * ![image-20250416165307679](/redisImages/image-20250416165307679.png)
      * ![image-20250416165412427](/redisImages/image-20250416165412427.png)
  * 修改配置文件
    * 以redis6380为例，redis6381跟redis6380一样
      * ![image-20250416165619557](/redisImages/image-20250416165619557.png)
      * ![image-20250416165720318](/redisImages/image-20250416165720318.png)
      * ![image-20250416165819294](/redisImages/image-20250416165819294.png)
      * ![image-20250416165901873](/redisImages/image-20250416165901873.png)
      * ![image-20250416170002549](/redisImages/image-20250416170002549.png)
      * ![image-20250416170101192](/redisImages/image-20250416170101192.png)
      * ![image-20250416170152373](/redisImages/image-20250416170152373.png)
      * ![image-20250416170236656](/redisImages/image-20250416170236656.png)
      * ![image-20250416170351266](/redisImages/image-20250416170351266.png)
      * ![image-20250416170415481](/redisImages/image-20250416170415481.png)
      * ![image-20250416170638143](/redisImages/image-20250416170638143.png)
  * 效果，启动redis6379、redis6380、redis6381，并查看（如果连接不上试试ping命令 ，看看是否可以和主机ping通，如果ping不通关闭防火墙`systemctl stop firewalld`）
    * 如果端口号不是 6379 启动的时候加上端口号，如果不加默认6379
      * ![image-20250418211505189](/redisImages/image-20250418211505189.png)
    * 启动两个从机
      * ![image-20250418211822625](/redisImages/image-20250418211822625.png)
      * ![image-20250418224045300](/redisImages/image-20250418224045300.png)
      * 主机日志查看 连接
        * ![image-20250418224709693](/redisImages/image-20250418224709693.png)
      * 从机日志查看连接
        * ![image-20250418224817758](/redisImages/image-20250418224817758.png)
      * 主机
        * ![image-20250418224136632](/redisImages/image-20250418224136632.png)
      * ![image-20250418224349195](/redisImages/image-20250418224349195.png)
      * 使用从机访问试试
        * ![image-20250418224431124](/redisImages/image-20250418224431124.png)

问题：

1. 从机可以执行写命令吗？

   ![image-20250418225224247](/redisImages/image-20250418225224247.png)

2. 从机切入点问题

   slave是从头开始复制还是从切入点开始复制?

    master启动，写到k3

    slave1跟着master同时启动，跟着写到k3

    slave2写到k3后才启动，那之前的是否也可以复制？

     Y，首次一锅端，后续跟随，master写，slave跟

3. 主机shutdown后，从机会不会上位

   从机不动，原地待命，从机数据可以正常使用；等待主机重启动归来

4. 主机shutdown后，重启后主从关系还在吗？从机还能否顺利复制？

   ![image-20250418225407582](/redisImages/image-20250418225407582.png)

5. 某台从机down后，master继续，从机重启后它能跟上主机吗？

   可以

### 命令操作主从关系

![image-20250418225601215](/redisImages/image-20250418225601215.png)

### 总结

配置，持久稳定

命令，当次生效

### 链式复制

上一个slave可以是下一个slave的master，slave同样可以接受其他slaves的连接和同步请求，那么该slave作为了链条中下一个的master，可以有效减轻主master的写压力

中途变更转向：会清除之前的数据，重新建立拷贝最新的

我们这三个形成链式结构

![image-20250419130824794](/redisImages/image-20250419130824794.png)

1. 修改`192.168.0.132`的配置文件(永久生效)

   ![image-20250419131714791](/redisImages/image-20250419131714791.png)

   ![image-20250419131834418](/redisImages/image-20250419131834418.png)

   在6379写入信息

   ![image-20250419131946540](/redisImages/image-20250419131946540.png)

   ![image-20250419132018603](/redisImages/image-20250419132018603.png)

   ![image-20250419132033066](/redisImages/image-20250419132033066.png)

   

2. `slaveof 主库IP 主库端口`

   ![image-20250419132251235](/redisImages/image-20250419132251235.png)

   ![image-20250419132337419](/redisImages/image-20250419132337419.png)





6380的主IP是6379，从IP是6381，6380是否可以写入信息？

![image-20250419132140369](/redisImages/image-20250419132140369.png)

不可以！

### 从机变主机

可以通过 `slaveof no one`使当前数据库停止与其他数据库的同步，转成主数据库

![image-20250419132930604](/redisImages/image-20250419132930604.png)

>注意：
>
>​	这个命令不是长期有效的，如果`shutdown`后，在启动不会生效

### 复制原理和工作流程

#### slave启动，同步初请

slave启动成功连接到master后会发送一个sync命令

slave首次全新连接master，一次完全同步（全量复制）将被自动执行，slave自身原有数据会被master数据覆盖清除

#### 首次连接，全量复制

master节点收到sync命令后会开始在后台保存快照（即RDB持久化，主从复制时会触发RDB），同时收集所有接受到的用于修改数据集命令缓存起来，master节点执行RDB持久化完后，master将rdb快照文件和所有缓存的命令发送到所有slave，以完成一次完全同步。

而slave服务在接受到数据库文件数据后，将其存盘并加载到内存中，从而完成复制初始化

#### 心跳持续，保持通信

`repl-ping-replica-period 10`

master发出PING包的周期，默认是10秒

![image-20250419133730232](/redisImages/image-20250419133730232.png)

#### 进入平稳，增量复制

master继续将新的所有收集到的修改命令自动依次传给slave，完成同步

#### 从机下线，重连续传

master会检查backlog里面的offset，master和slave都会保存一个复制的offset还有一个masterId，offset是保存在backlog中的。**master只会把已经复制的offset后面的数据复制给slave**

### 复制的缺点

#### 复制延时，信号衰减

由于所有的写操作都是先在Master上操作，然后同步更新到Slave上，所以从Master同步到Slave机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重。

![image-20250419134221438](/redisImages/image-20250419134221438.png)

#### master挂了如何办？

默认情况下，不会在slave节点中自动重选一个master

那每次都要人工干预？

**无人值守安装变成刚需**
