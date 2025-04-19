# 哨兵（sentinel）&集群（cluster）

## 哨兵（sentinel）

吹哨人巡查监控后台master主机是否故障，如果故障了根据**投票数**自动将某一个从库转换为新主库，继续对外服务

作用

1. 监控redis运行状态，包括master和slave
2. **当master down机，能自动将slave切换成新master**

![image-20250419141201643](/redisImages/image-20250419141201643.png)



Redis Sentinel是Redis 的高可用性解决方案，由一个或多个Sentinel（哨兵）实例组成。它可以监视任意多个主服务器，以及这些主服务器属下的所有从服务器，并在被监视的主服务器进入下线状态时，自动将下线主服务器属下的某个从服务器升级为新的主服务器，它的主要功能如下：

1. 主从监控

   Sentinel会不断地检查你的主服务器和从服务器是否运作正常。

2. 消息通知

   当被监控的某个 Redis 服务器出现问题时， Sentinel可以通过API向管理员或者其他应用程序发送通知。

3. 故障转移

   如果master异常，则会进行主从切换，将其中一个slave作为新master，当主服务器不能正常工作时，Sentinel会自动进行故障迁移，也就是主从切换。

4. 配置中心

   客户端通过连接哨兵来获得当前redis服务的主节点地址

## 哨兵原理

Sentinel 使用的算法核心是 Raft 算法，主要用途就是用于分布式系统，系统容错，以及Leader选举，每个Sentinel都需要定期的执行以下任务：

* 每个 Sentinel 会自动发现其他 Sentinel 和从服务器，它以每秒钟一次的频率向它所知的主服务器、从服务器以及其他 Sentinel 实例发送一个 PING 命令。
* 如果一个实例（instance）距离最后一次有效回复 PING 命令的时间超过 down-after-milliseconds 选项所指定的值， 那么这个实例会被 Sentinel 标记为主观下线。 有效回复可以是： +PONG 、 -LOADING 或者 -MASTERDOWN 。
* 如果一个主服务器被标记为主观下线， 那么正在监视这个主服务器的所有Sentinel要以每秒一次的频率确认主服务器的确进入了主观下线状态。
* 如果一个主服务器被标记为主观下线， 并且有足够数量的Sentinel（至少要达到配置文件指定的数量）在指定的时间范围内同意这一判断， 那么这个主服务器被标记为客观下线。
* 在一般情况下， 每个Sentinel会以每 10 秒一次的频率向它已知的所有主服务器和从服务器发送 INFO 命令。 当一个主服务器被Sentinel标记为客观下线时，Sentinel向下线主服务器的所有从服务器发送 INFO 命令的频率会从 10 秒一次改为每秒一次。
* 当没有足够数量的Sentinel同意主服务器已经下线， 主服务器的客观下线状态就会被移除。 当主服务器重新向Sentinel的 PING 命令返回有效回复时， 主服务器的主管下线状态就会被移除.

![image-20250419144503922](/redisImages/image-20250419144503922.png)

## sentinel配置文件

```cmd
# 哨兵sentinel实例运行的端口，默认26379  
port 26379
# 是否设置为后台启动。
daemonize no
#pid文件地址
pidfile /var/run/redis-sentinel.pid
#日志文件地址
logfile ""
# 指定sentinel工作目录
dir /tmp
# 哨兵sentinel监控的redis主节点的 
## ip：主机ip地址
## port：哨兵端口号
## master-name：可以自己命名的主节点名字（只能由字母A-z、数字0-9 、这三个字符".-_"组成。）
## quorum：当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了  
# sentinel monitor <master-name> <ip> <redis-port> <quorum>  
sentinel monitor mymaster 127.0.0.1 6379 2
# 指定主节点应答哨兵sentinel的最大时间间隔，超过这个时间，哨兵主观上认为主节点下线，默认30秒  
# sentinel auth-pass <master-name> <password>  
sentinel down-after-milliseconds mymaster 30000
acllog-max-len 128
# 指定了在发生failover主备切换时，最多可以有多少个slave同时对新的master进行同步。这个数字越小，完成failover所需的时间就越长；反之，但是如果这个数字越大，就意味着越多的slave因为replication而不可用。可以通过将这个值设为1，来保证每次只有一个slave，处于不能处理命令请求的状态。
# sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1
# 故障转移的超时时间failover-timeout，默认三分钟，可以用在以下这些方面：
## 1. 同一个sentinel对同一个master两次failover之间的间隔时间。  
## 2. 当一个slave从一个错误的master那里同步数据时开始，直到slave被纠正为从正确的master那里同步数据时结束。  
## 3. 当想要取消一个正在进行的failover时所需要的时间。
## 4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来同步数据了
# sentinel failover-timeout <master-name> <milliseconds>  
sentinel failover-timeout mymaster 180000
sentinel deny-scripts-reconfig yes
SENTINEL resolve-hostnames no
SENTINEL announce-hostnames no
```



重点参数

1. bind

   服务监听地址，用于客户端连接，默认本机地址

2. daemonize

   是否以后台damon方式运行

3. protected-mode

   安全保护模式

4. port

   端口

5. logfile

   日志文件路径

6. pidfile

   pid文件路径

7. dir

   工作目录

8. sentinel monitor \<master-name\> \<ip\> \<redis-port\> \<quorum\>

   1. 设置要监控的master服务器
   2. quorum表示最少有几个哨兵认可客观下线，同意故障迁移的法定票数。

9. sentinel auth-pass \<master-name\> \<password\>

   master设置了密码，连接master服务的密码

10. 其他参数（默认就行）

    1. sentinel down-after-milliseconds \<master-name\> \<milliseconds\>：

       指定多少毫秒之后，主节点没有应答哨兵，此时哨兵主观上认为主节点下线

    2. sentinel parallel-syncs \<master-name\> \<nums\>：

       表示允许并行同步的slave个数，当Master挂了后，哨兵会选出新的Master，此时，剩余的slave会向新的master发起同步数据

    3. sentinel failover-timeout \<master-name\> \<milliseconds\>：

       故障转移的超时时间，进行故障转移时，如果超过设置的毫秒，表示故障转移失败

    4. sentinel notification-script \<master-name\> \<script-path\> ：

       配置当某一事件发生时所需要执行的脚本

    5. sentinel client-reconfig-script \<master-name\> \<script-path\>：

       客户端重新配置主节点参数脚本

示例：

三个哨兵实例需要三台虚拟机，考虑到机器性能有限，这里将三个哨兵实例配置到一台虚拟机上，配置三份不同的哨兵配置文件即可：sentinel26379.conf、sentinel26380.conf、sentinel26381.conf，将它们存放到/myredis下。

/myredi目录下新建或者拷贝`sentinel.conf`文件，名字不能错，如果没有则新建文件

`sentinel.conf`文件

```cmd
# Example sentinel.conf

# By default protected mode is disabled in sentinel mode. Sentinel is reachable
# from interfaces different than localhost. Make sure the sentinel instance is
# protected from the outside world via firewalling or other means.
protected-mode no

# port <sentinel-port>
# The port that this sentinel instance will run on
port 26379

# By default Redis Sentinel does not run as a daemon. Use 'yes' if you need it.
# Note that Redis will write a pid file in /var/run/redis-sentinel.pid when
# daemonized.
daemonize no

# When running daemonized, Redis Sentinel writes a pid file in
# /var/run/redis-sentinel.pid by default. You can specify a custom pid file
# location here.
pidfile /var/run/redis-sentinel.pid

# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)
# warning (only very important / critical messages are logged)
# nothing (nothing is logged)
loglevel notice

# Specify the log file name. Also the empty string can be used to force
# Sentinel to log on the standard output. Note that if you use standard
# output for logging but daemonize, logs will be sent to /dev/null
logfile ""

# To enable logging to the system logger, just set 'syslog-enabled' to yes,
# and optionally update the other syslog parameters to suit your needs.
# syslog-enabled no

# Specify the syslog identity.
# syslog-ident sentinel

# Specify the syslog facility. Must be USER or between LOCAL0-LOCAL7.
# syslog-facility local0

# sentinel announce-ip <ip>
# sentinel announce-port <port>
#
# The above two configuration directives are useful in environments where,
# because of NAT, Sentinel is reachable from outside via a non-local address.
#
# When announce-ip is provided, the Sentinel will claim the specified IP address
# in HELLO messages used to gossip its presence, instead of auto-detecting the
# local address as it usually does.
#
# Similarly when announce-port is provided and is valid and non-zero, Sentinel
# will announce the specified TCP port.
#
# The two options don't need to be used together, if only announce-ip is
# provided, the Sentinel will announce the specified IP and the server port
# as specified by the "port" option. If only announce-port is provided, the
# Sentinel will announce the auto-detected local IP and the specified port.
#
# Example:
#
# sentinel announce-ip 1.2.3.4

# dir <working-directory>
# Every long running process should have a well-defined working directory.
# For Redis Sentinel to chdir to /tmp at startup is the simplest thing
# for the process to don't interfere with administrative tasks such as
# unmounting filesystems.
dir /tmp

# sentinel monitor <master-name> <ip> <redis-port> <quorum>
#
# Tells Sentinel to monitor this master, and to consider it in O_DOWN
# (Objectively Down) state only if at least <quorum> sentinels agree.
#
# Note that whatever is the ODOWN quorum, a Sentinel will require to
# be elected by the majority of the known Sentinels in order to
# start a failover, so no failover can be performed in minority.
#
# Replicas are auto-discovered, so you don't need to specify replicas in
# any way. Sentinel itself will rewrite this configuration file adding
# the replicas using additional configuration options.
# Also note that the configuration file is rewritten when a
# replica is promoted to master.
#
# Note: master name should not include special characters or spaces.
# The valid charset is A-z 0-9 and the three characters ".-_".
sentinel monitor mymaster 127.0.0.1 6379 2

# sentinel auth-pass <master-name> <password>
#
# Set the password to use to authenticate with the master and replicas.
# Useful if there is a password set in the Redis instances to monitor.
#
# Note that the master password is also used for replicas, so it is not
# possible to set a different password in masters and replicas instances
# if you want to be able to monitor these instances with Sentinel.
#
# However you can have Redis instances without the authentication enabled
# mixed with Redis instances requiring the authentication (as long as the
# password set is the same for all the instances requiring the password) as
# the AUTH command will have no effect in Redis instances with authentication
# switched off.
#
# Example:
#
# sentinel auth-pass mymaster MySUPER--secret-0123passw0rd

# sentinel auth-user <master-name> <username>
#
# This is useful in order to authenticate to instances having ACL capabilities,
# that is, running Redis 6.0 or greater. When just auth-pass is provided the
# Sentinel instance will authenticate to Redis using the old "AUTH <pass>"
# method. When also an username is provided, it will use "AUTH <user> <pass>".
# In the Redis servers side, the ACL to provide just minimal access to
# Sentinel instances, should be configured along the following lines:
#
#     user sentinel-user >somepassword +client +subscribe +publish \
#                        +ping +info +multi +slaveof +config +client +exec on

# sentinel down-after-milliseconds <master-name> <milliseconds>
#
# Number of milliseconds the master (or any attached replica or sentinel) should
# be unreachable (as in, not acceptable reply to PING, continuously, for the
# specified period) in order to consider it in S_DOWN state (Subjectively
# Down).
#
# Default is 30 seconds.
sentinel down-after-milliseconds mymaster 30000

# IMPORTANT NOTE: starting with Redis 6.2 ACL capability is supported for
# Sentinel mode, please refer to the Redis website https://redis.io/topics/acl
# for more details.

# Sentinel's ACL users are defined in the following format:
#
#   user <username> ... acl rules ...
#
# For example:
#
#   user worker +@admin +@connection ~* on >ffa9203c493aa99
#
# For more information about ACL configuration please refer to the Redis
# website at https://redis.io/topics/acl and redis server configuration 
# template redis.conf.

# ACL LOG
#
# The ACL Log tracks failed commands and authentication events associated
# with ACLs. The ACL Log is useful to troubleshoot failed commands blocked 
# by ACLs. The ACL Log is stored in memory. You can reclaim memory with 
# ACL LOG RESET. Define the maximum entry length of the ACL Log below.
acllog-max-len 128

# Using an external ACL file
#
# Instead of configuring users here in this file, it is possible to use
# a stand-alone file just listing users. The two methods cannot be mixed:
# if you configure users here and at the same time you activate the external
# ACL file, the server will refuse to start.
#
# The format of the external ACL user file is exactly the same as the
# format that is used inside redis.conf to describe users.
#
# aclfile /etc/redis/sentinel-users.acl

# requirepass <password>
#
# You can configure Sentinel itself to require a password, however when doing
# so Sentinel will try to authenticate with the same password to all the
# other Sentinels. So you need to configure all your Sentinels in a given
# group with the same "requirepass" password. Check the following documentation
# for more info: https://redis.io/topics/sentinel
#
# IMPORTANT NOTE: starting with Redis 6.2 "requirepass" is a compatibility
# layer on top of the ACL system. The option effect will be just setting
# the password for the default user. Clients will still authenticate using
# AUTH <password> as usually, or more explicitly with AUTH default <password>
# if they follow the new protocol: both will work.
#
# New config files are advised to use separate authentication control for
# incoming connections (via ACL), and for outgoing connections (via
# sentinel-user and sentinel-pass) 
#
# The requirepass is not compatible with aclfile option and the ACL LOAD
# command, these will cause requirepass to be ignored.

# sentinel sentinel-user <username>
#
# You can configure Sentinel to authenticate with other Sentinels with specific
# user name. 

# sentinel sentinel-pass <password>
#
# The password for Sentinel to authenticate with other Sentinels. If sentinel-user
# is not configured, Sentinel will use 'default' user with sentinel-pass to authenticate.

# sentinel parallel-syncs <master-name> <numreplicas>
#
# How many replicas we can reconfigure to point to the new replica simultaneously
# during the failover. Use a low number if you use the replicas to serve query
# to avoid that all the replicas will be unreachable at about the same
# time while performing the synchronization with the master.
sentinel parallel-syncs mymaster 1

# sentinel failover-timeout <master-name> <milliseconds>
#
# Specifies the failover timeout in milliseconds. It is used in many ways:
#
# - The time needed to re-start a failover after a previous failover was
#   already tried against the same master by a given Sentinel, is two
#   times the failover timeout.
#
# - The time needed for a replica replicating to a wrong master according
#   to a Sentinel current configuration, to be forced to replicate
#   with the right master, is exactly the failover timeout (counting since
#   the moment a Sentinel detected the misconfiguration).
#
# - The time needed to cancel a failover that is already in progress but
#   did not produced any configuration change (SLAVEOF NO ONE yet not
#   acknowledged by the promoted replica).
#
# - The maximum time a failover in progress waits for all the replicas to be
#   reconfigured as replicas of the new master. However even after this time
#   the replicas will be reconfigured by the Sentinels anyway, but not with
#   the exact parallel-syncs progression as specified.
#
# Default is 3 minutes.
sentinel failover-timeout mymaster 180000

# SCRIPTS EXECUTION
#
# sentinel notification-script and sentinel reconfig-script are used in order
# to configure scripts that are called to notify the system administrator
# or to reconfigure clients after a failover. The scripts are executed
# with the following rules for error handling:
#
# If script exits with "1" the execution is retried later (up to a maximum
# number of times currently set to 10).
#
# If script exits with "2" (or an higher value) the script execution is
# not retried.
#
# If script terminates because it receives a signal the behavior is the same
# as exit code 1.
#
# A script has a maximum running time of 60 seconds. After this limit is
# reached the script is terminated with a SIGKILL and the execution retried.

# NOTIFICATION SCRIPT
#
# sentinel notification-script <master-name> <script-path>
# 
# Call the specified notification script for any sentinel event that is
# generated in the WARNING level (for instance -sdown, -odown, and so forth).
# This script should notify the system administrator via email, SMS, or any
# other messaging system, that there is something wrong with the monitored
# Redis systems.
#
# The script is called with just two arguments: the first is the event type
# and the second the event description.
#
# The script must exist and be executable in order for sentinel to start if
# this option is provided.
#
# Example:
#
# sentinel notification-script mymaster /var/redis/notify.sh

# CLIENTS RECONFIGURATION SCRIPT
#
# sentinel client-reconfig-script <master-name> <script-path>
#
# When the master changed because of a failover a script can be called in
# order to perform application-specific tasks to notify the clients that the
# configuration has changed and the master is at a different address.
# 
# The following arguments are passed to the script:
#
# <master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-port>
#
# <state> is currently always "start"
# <role> is either "leader" or "observer"
# 
# The arguments from-ip, from-port, to-ip, to-port are used to communicate
# the old address of the master and the new address of the elected replica
# (now a master).
#
# This script should be resistant to multiple invocations.
#
# Example:
#
# sentinel client-reconfig-script mymaster /var/redis/reconfig.sh

# SECURITY
#
# By default SENTINEL SET will not be able to change the notification-script
# and client-reconfig-script at runtime. This avoids a trivial security issue
# where clients can set the script to anything and trigger a failover in order
# to get the program executed.

sentinel deny-scripts-reconfig yes

# REDIS COMMANDS RENAMING (DEPRECATED)
#
# WARNING: avoid using this option if possible, instead use ACLs.
#
# Sometimes the Redis server has certain commands, that are needed for Sentinel
# to work correctly, renamed to unguessable strings. This is often the case
# of CONFIG and SLAVEOF in the context of providers that provide Redis as
# a service, and don't want the customers to reconfigure the instances outside
# of the administration console.
#
# In such case it is possible to tell Sentinel to use different command names
# instead of the normal ones. For example if the master "mymaster", and the
# associated replicas, have "CONFIG" all renamed to "GUESSME", I could use:
#
# SENTINEL rename-command mymaster CONFIG GUESSME
#
# After such configuration is set, every time Sentinel would use CONFIG it will
# use GUESSME instead. Note that there is no actual need to respect the command
# case, so writing "config guessme" is the same in the example above.
#
# SENTINEL SET can also be used in order to perform this configuration at runtime.
#
# In order to set a command back to its original name (undo the renaming), it
# is possible to just rename a command to itself:
#
# SENTINEL rename-command mymaster CONFIG CONFIG

# HOSTNAMES SUPPORT
#
# Normally Sentinel uses only IP addresses and requires SENTINEL MONITOR
# to specify an IP address. Also, it requires the Redis replica-announce-ip
# keyword to specify only IP addresses.
#
# You may enable hostnames support by enabling resolve-hostnames. Note
# that you must make sure your DNS is configured properly and that DNS
# resolution does not introduce very long delays.
#
SENTINEL resolve-hostnames no

# When resolve-hostnames is enabled, Sentinel still uses IP addresses
# when exposing instances to users, configuration files, etc. If you want
# to retain the hostnames when announced, enable announce-hostnames below.
#
SENTINEL announce-hostnames no

# When master_reboot_down_after_period is set to 0, Sentinel does not fail over
# when receiving a -LOADING response from a master. This was the only supported
# behavior before version 7.0.
#
# Otherwise, Sentinel will use this value as the time (in ms) it is willing to
# accept a -LOADING response after a master has been rebooted, before failing
# over.

SENTINEL master-reboot-down-after-period mymaster 0
```

### 配置sentinel

在6379下的`/myredis`文件夹下创建sentinel26379.conf、sentinel26380.conf、sentinel26381.conf，并写入

```cmd
bind 0.0.0.0
daemonize yes
protected-mode no
port 26379
logfile "/myredis/sentinel26379.log"
pidfile /var/run/redis-sentinel26379.pid
dir /myredis
sentinel monitor mymaster ip 6379 2 # 2是票数
sentinel auth-pass mymaster redis密码
```

`sentinel26379.conf`

![image-20250419151445198](/redisImages/image-20250419151445198.png)

`sentinel26380.conf`

![image-20250419151552672](/redisImages/image-20250419151552672.png)

`sentinel26381.conf`

![image-20250419151707674](/redisImages/image-20250419151707674.png)

### 配置主机6379的访问密码

因为我们的6380和6381都配置的主机的访问密码了，所以只配置6379的主机访问密码就可以！

![image-20250419152347804](/redisImages/image-20250419152347804.png)

>注意：
>
>​	6379后续可能会变成从机，需要设置访问新主机的密码， 请设置masterauth项访问密码为redis，不然后续可能报错master_link_status:down

启动6379、6380、6381服务

![image-20250419152810794](/redisImages/image-20250419152810794.png)

### 启动sentinel

通过`redis-sentinel sentinel文件 --sentinel`启动

![image-20250419153023197](/redisImages/image-20250419153023197.png)

![image-20250419153118226](/redisImages/image-20250419153118226.png)

当我们模拟主机挂了，看看从机是否会上位

![image-20250419155106107](/redisImages/image-20250419155106107.png)

稍等一下

![image-20250419155137363](/redisImages/image-20250419155137363.png)

主机挂了，从机会进行投票，选择一个进行上位

![image-20250419155242345](/redisImages/image-20250419155242345.png)

可以看到我们的6381已经上位了，当我们打开6379.log文件查看

![image-20250419155854459](/redisImages/image-20250419155854459.png)

我们的6379没启动，可以看出6379已经不是master变成slave了

![image-20250419160012203](/redisImages/image-20250419160012203.png)

可以看到可以正常访问数据

![image-20250419160112468](/redisImages/image-20250419160112468.png)

### 结论

>1. 文件的内容，在运行期间会被自动sentinel动态进行更改
>2. master-slave 切换后，master_redis.conf、slave_redis.conf和sentinel.conf的内容都会发生改变，即master_redis.conf 中会多一行slaveof的配置，sentinel.conf 的监控目标会随之调换

![image-20250419161603929](/redisImages/image-20250419161603929.png)

![image-20250419161744675](/redisImages/image-20250419161744675.png)

## 运行流程和选举原理

当一个主从配置中的master失效之后，sentinel可以选举出一个新的master用于自动接替原master的工作，主从配置中的其他redis服务器自动指向新的master同步数据。一般建议sentinel采取奇数台，防止某一台sentinel无法连接到master导致误切换

### 运行流程，故障切换

#### 三个哨兵监控一主二从，正常运行中

![image-20250419170201516](/redisImages/image-20250419170201516.png)

#### `SDown主观下线（Subjectively Down）`:

SDown（主观不可用）是**单个sentinel自己主观上**检测到的关于master的状态，从sentinel的角度来看，如果发送了PING心跳后，在一定时间内没有收到合法的回复，就达到 SDOWN 的条件

sentinel 配置文件中的 down-after-milisenconds 设置了判断主观下线的时间长度

说明：

所谓主观下线（Subjectively Down， 简称 SDOWN）指的是单个Sentinel实例对服务器做出的下线判断，即单个sentinel认为某个服务下线（有可能是接收不到订阅，之间的网络不通等等原因）。主观下线就是说如果服务器在[sentinel down-after-milliseconds]给定的毫秒数之内没有回应PING命令或者返回一个错误消息， 那么这个Sentinel会主观的(单方面的)认为这个master不可以用了，o(╥﹏╥)o

![image-20250419171025830](/redisImages/image-20250419171025830.png)

sentinel down-after-milliseconds \<masterName\> \<timeout\>

 表示master被当前sentinel实例认定为失效的间隔时间，这个配置其实就是进行主观下线的一个依据

master在多长时间内一直没有给Sentine返回有效信息，则认定该master主观下线。也就是说如果多久没联系上redis-servevr，认为这个redis-server进入到失效（SDOWN）状态。

#### ODown客观下线（Objectively Down）

ODOWN 需要一定数量的 sentinel，**多个哨兵达成一致意见**才能认为一个master客观上已经宕掉

说明：

四个参数含义：

masterName是对某个master+slave组合的一个区分标识(一套sentinel可以监听多组master+slave这样的组合)

![image-20250419171311689](/redisImages/image-20250419171311689.png)

**quorum这个参数是进行客观下线的一个依据**，法定人数/法定票数

意思是至少有quorum个sentinel认为这个master有故障才会对这个master进行下线以及故障转移。因为有的时候，某个sentinel节点可能因为自身网络原因导致无法连接master，而此时master并没有出现故障，所以这就需要多个sentinel都一致认为该master有问题，才可以进行下一步操作，这就保证了公平性和高可用。

#### 选举出领导者哨兵（哨兵中选出兵王（leader））

当主节点被判断客观下线以后，各个哨兵节点会进行协商，先选举出一个**领导者哨兵节点（兵王）**并由该领导者节点，也即被选举出的兵王进行failover(故障迁移)

哨兵领导者，兵王如何选举出来的？

Raft算法

![image-20250419171634394](/redisImages/image-20250419171634394.png)

监视该主节点的所有哨兵都有可能被选为领导者，选举使用的算法是Raft算法；Raft算法的基本思路**是先到先得**：

即在一轮选举中，哨兵A向B发送成为领导者的申请，如果B没有同意过其他哨兵，则会同意A成为领导者

### 由兵王（leader）开始推动故障切换流程并选出一个新的master

#### 3个步骤

1. 选出新的主节点

   1. 某个slave被选中成为新的master

   2. 选出新的master的规则，剩余slave节点健康前提下

      1. ![image-20250419171951635](/redisImages/image-20250419171951635.png)

      2. redis.conf文件中，优先级slave-priority或者 replica-priority 最高的从节点（数字越小优先级越高）

         1. ![image-20250419172102701](/redisImages/image-20250419172102701.png)

      3. 复制偏移位置offset最大的从节点

      4. 最小Run ID 的从节点

         字典顺序，ASCII 码

2. 从机加入到主机上

   1. 执行slaveof no one 命令让选出来的从节点成为新的主节点，并通过slaveof命令让其他节点成为从节点
   2. sentinel leader 会对选举出的新master执行slaveof no one操作，将其提升为master节点
   3. sentinel leader 向其他slave 发送命令，让剩余的slave成为新的master节点的slave

3. 主机up上线会挂在已经上位的主机上

   1. 将之前已下线的老master设置为新选出的新master的从节点，当老master重新上线后，它会成为新的master的从节点
   2. sentinel leader 会让原来的master降级为slave并恢复正常工作。

### 总结

上述的failover操作均由sentinel自己独自完成，无效人工干预。

### 使用建议

1. 哨兵节点的数量为多个，哨兵本身应该集群，保证高可用

2. 哨兵节点的数量应该是奇数

3. 如果哨兵节点部署在 Docker 等容器里面，尤其要注意端口的正确映射

4. 哨兵集群+主从复制，并不保证数据零丢失

   承上启下引出集群