# redis

## redis数据数据持久化

![image-20250412134834950](/redisImages/image-20250412134834950.png)

为什么要用数据持久化？

数据持久化可以在内存丢失或其他灾难性故障的情况下实现恢复。

数据持久化的两种方式

1. AOF：以日志的形式来记录每个写操作，将redis执行过的所有写指令记录下来（读操作不记录），只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，redis重启的话就根据日志文件的内容将写入指令从前到后执行一次以完成数据的恢复工作。
2. RDB（Redis 数据库）：RDB 持久性以指定的时间间隔执行数据集的时间点快照。

### rdb（redis database）

**能干嘛？**

在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的Snapshot内存快照，它恢复时再将硬盘快照文件直接读回到内存里。Redis的数据都在内存中，保存备份时它执行的是全量快照，也就是说，把内存中的所有数据都记录到磁盘中，一锅端。

Rdb保存的是dump.rdb文件

![image-20250412135541703](/redisImages/image-20250412135541703.png)



Redis6.0.16以下

![image-20250412135626311](/redisImages/image-20250412135626311.png)



Redis6.2以及Redis-7.0.0

![image-20250412135716317](/redisImages/image-20250412135716317.png)

#### 自动触发

1. redis7版本，按照redis.conf里配置的save\<seconds\>\<changes\>

![image-20250412135904456](/redisImages/image-20250412135904456.png)

2. 本案例5秒内2次修改

![image-20250412140300483](/redisImages/image-20250412140300483.png)

3. 修改dump文件保存路径

![image-20250412140334001](/redisImages/image-20250412140334001.png)

![image-20250412140539111](/redisImages/image-20250412140539111.png)

![image-20250412143040215](/redisImages/image-20250412143040215.png)

![image-20250412143204897](/redisImages/image-20250412143204897.png)

修改dump的默认文件名称

![image-20250412143515348](/redisImages/image-20250412143515348.png)

触发备份情况

1. ![image-20250412143957147](/redisImages/image-20250412143957147.png)
2. ![image-20250412144015323](/redisImages/image-20250412144015323.png)

如何恢复？

1. 将备份文件（dump6379.rdb）移动到redis安装目录并启动服务即可

2. 备份成功后故意用flushdb清空redis，看看是否可以恢复数据

   ![image-20250412144353554](/redisImages/image-20250412144353554.png)

   1. 结论

      执行flushdb/flushall命令也会产生dump.rdb文件，但是里面是空的，无意义

3. 物理恢复，一定服务和备份**分级隔离**

   ![image-20250412144525191](/redisImages/image-20250412144525191.png)不可以把备份文件dump.rdb和生产redis服务器放在同一台机器，必须分开各自存储，以防生产机物理损坏后备份文件也挂了。

注意：

![image-20250412145620989](/redisImages/image-20250412145620989.png)

执行quit命令就会写入dump文件，建议保存好数据，修改文件名或后缀名，或者备份文件，以免文件被覆盖

#### 手动触发

redis提供了两个命令来生成RDB文件，分别是save和bgsave

**save（不推荐使用）**：

在主程序中执行**会阻塞**当前redis服务器，直到持久化工作完成执行save命令期间，redis不能处理其他命令，线上禁止使用。

![image-20250412160029456](/redisImages/image-20250412160029456.png)

![image-20250412160456020](/redisImages/image-20250412160456020.png)

**bgsave（默认）**：

redis会在后台异步进行快照操作，**不阻塞**快照同时还可以响应客户端请求，该触发方式会fork一个子进程由子进程复制持久化过程

redis会使用bgsave对当前内存中的所有数据做快照，这个操作是子进程在后台完成的，这就允许主进程同时可以修改数据。

**fork是什么？**

 在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，尽量避免膨胀。

![image-20250412160045041](/redisImages/image-20250412160045041.png)

![image-20250412160715667](/redisImages/image-20250412160715667.png)

**lastsave**：可以通过lastsave命令获取最后一次成功执行快照的时间

![image-20250412160833207](/redisImages/image-20250412160833207.png)





### 优势

![image-20250412162222408](/redisImages/image-20250412162222408.png)

1. 适合大规模的数据恢复
2. 按照业务定时备份
3. 对数据完整性和一致性要求不高
4. RDB文件在内存中的加载速度要比 AOF 快得多

### 劣势

![image-20250412162355639](/redisImages/image-20250412162355639.png)

1. 在一定间隔时间做一次备份，所以如果redis意外down掉的话，就会丢失从当前至最近一次快照期间的数据，快照之间的数据会丢失
2. 内存数据的全量同步，如果数据量太大会导致 I/O 严重影响服务器性能
3. RDB 依赖于主进程的 fork，在更大的数据集中，这可能会导致服务请求的瞬间延迟。fork的时候内存中的数据被克隆了一份，大致2倍的膨胀性，需要考虑

**数据丢失案例**：

正常录入数据

![image-20250412163907395](/redisImages/image-20250412163907395.png)

使用kill -9杀死进程

![image-20250412163947557](/redisImages/image-20250412163947557.png)

重启服务后，查看数据是否丢失

![image-20250412164019685](/redisImages/image-20250412164019685.png)



### 如何检测并修复dump.rdb文件

![image-20250412164706643](/redisImages/image-20250412164706643.png)

### 哪些情况会触发RDB快照

1. 配置文件中默认的快照配置
2. 手动 save/bgsave 命令
3. 执行 flushall/flushdb 命令也会产生 dump.rdb 文件，但这里面是空的，无意义
4. 执行 shutdown 且没有设置开启 AOF 持久化
5. 主从复制时，主节点自动触发

### 如何禁用快照

1. 动态所有停止 RDB 保存规则的方法：`redis-cli config set save` ""

2. 快照禁用

   ![image-20250412165053214](/redisImages/image-20250412165053214.png)

### RDB 优化配置项

配置文件`SNAPSHOTTING`模块

save \<seconds\>\<changes\>

`dbfilename`

`dir`

`stop-writes-on-bgsave-error`

![image-20250412170306543](/redisImages/image-20250412170306543.png)

默认yes

如果配置成no，表示你不在乎数据不一致或者有其他的手段发现和控制这种不一致，那么在快照写入失败时，

也能确保redis继续接受新的写请求

`rdbcompression`

![image-20250412170338012](/redisImages/image-20250412170338012.png)

默认yes

对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis会采用LZF算法进行压缩。 如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能 

`rdbchecksum`

![image-20250412170442335](/redisImages/image-20250412170442335.png)

默认yes

在存储快照后，还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能

`rdb-del-sync-files`

![image-20250412170506875](/redisImages/image-20250412170506875.png)

rdb-del-sync-files：在没有持久性的情况下删除复制中使用的RDB文件启用。默认情况下no，此选项是禁用的。

### 总结

![image-20250412170541034](/redisImages/image-20250412170541034.png)
