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





















