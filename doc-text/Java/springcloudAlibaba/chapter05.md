# Seata 分布式事务

Seata 框架中有三个角色：

- **Transaction Coordinator(TC):** 事务协调器（TC）：维护全局事务和分支事务的状态，驱动全局提交或回滚。
- **Transaction Manager(TM):** 事务管理器（TM）：定义全局事务的范围：开始全局事务、提交或回滚全局事务。
- **Resource Manager(RM):**资源管理器（RM）：管理参与分支事务的资源，与 TC 通信以注册分支事务并报告分支事务的状态，并驱动分支事务的提交或回滚。

[![Model](/alibabaImage/seata1.png)](https://camo.githubusercontent.com/a302427a15e1ed0cd8da485e8bb38aadc673657d8574aad4023d6e71dadd65c3/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f6c61726b2f302f323031382f706e672f31383836322f313534353031333931353238362d34613930663064662d356664612d343165312d393165302d3261613364333331633033352e706e67)
Seata 管理的分布式事务的典型生命周期：

1. TM 请求 TC 开始一个新的事务。TC 生成一个 XID 来表示全局事务。
2. XID 在微服务调用链中传播。
3. RM 将本地事务注册为 XID 对应的全局事务的分支到 TC。
4. TM 请求 TC 提交或回滚 XID 对应的全局事务。
5. TC 驱动所有分支事务在对应的 XID 全局事务下完成分支提交或回滚。

[![Typical Process](/alibabaImage/seata2.png)](https://camo.githubusercontent.com/837b5a990d776ae3eb3f96126a251390e25cdb27a563157b45ea436f3a0dc541/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f6c61726b2f302f323031382f706e672f31383836322f313534353239363931373838312d32366661626562392d373166612d346633652d386137612d6663333137643333383966342e706e67)

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

[Seata官网](https://seata.apache.org/zh-cn/)

创建四个服务，分别是`seata-account`、`seata-busines`、`seata-storage`、`seata-order`四个服务，分别在`service`下

```sql
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

>注意：
>
>​	如果使用`seata`必须要写入`undo_log`日志

## 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS `storage_db`;
USE  `storage_db`;
DROP TABLE IF EXISTS `storage_tbl`;
CREATE TABLE `storage_tbl` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `commodity_code` varchar(255) DEFAULT NULL,
                               `count` int(11) DEFAULT 0,
                               PRIMARY KEY (`id`),
                               UNIQUE KEY (`commodity_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO storage_tbl (commodity_code, count) VALUES ('P0001', 100);
INSERT INTO storage_tbl (commodity_code, count) VALUES ('B1234', 10);

-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE DATABASE IF NOT EXISTS `order_db`;
USE  `order_db`;
DROP TABLE IF EXISTS `order_tbl`;
CREATE TABLE `order_tbl` (
                             `id` int(11) NOT NULL AUTO_INCREMENT,
                             `user_id` varchar(255) DEFAULT NULL,
                             `commodity_code` varchar(255) DEFAULT NULL,
                             `count` int(11) DEFAULT 0,
                             `money` int(11) DEFAULT 0,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE DATABASE IF NOT EXISTS `account_db`;
USE  `account_db`;
DROP TABLE IF EXISTS `account_tbl`;
CREATE TABLE `account_tbl` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `user_id` varchar(255) DEFAULT NULL,
                               `money` int(11) DEFAULT 0,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO account_tbl (user_id, money) VALUES ('1', 10000);
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log` (
                            `id` bigint(20) NOT NULL AUTO_INCREMENT,
                            `branch_id` bigint(20) NOT NULL,
                            `xid` varchar(100) NOT NULL,
                            `context` varchar(128) NOT NULL,
                            `rollback_info` longblob NOT NULL,
                            `log_status` int(11) NOT NULL,
                            `log_created` datetime NOT NULL,
                            `log_modified` datetime NOT NULL,
                            `ext` varchar(100) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

## `seata-account`

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.3</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean

```java
package com.lazy.bean;

@Data
public class AccountTbl implements Serializable {
    private Integer id;
    private String userId;
    private Integer money;
}
```

mapper

```java
package com.lazy.mapper;

/**
 * 针对表【account_tbl】的数据库操作Mapper
 */
public interface AccountTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(AccountTbl record);

    int insertSelective(AccountTbl record);

    AccountTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AccountTbl record);

    int updateByPrimaryKey(AccountTbl record);

    void debit(String userId, int money);
}

```

service

```java
package com.lazy.service;

public interface AccountService {
    /**
     * 从用户账户中扣减
     * @param userId  用户id
     * @param money   扣减金额
     */
    void debit(String userId, int money);
}
```

serviceImpl

```java
package com.lazy.service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountTblMapper accountTblMapper;

    @Override
    public void debit(String userId, int money) {
        accountTblMapper.debit(userId, money);
    }
}
```

controller

```java
package com.lazy.controller;

@RestController
public class AccountTbRestController {

    @Autowired
    AccountService accountService;
    /**
     * 扣减账户余额
     * @return
     */
    @GetMapping("/debit")
    public String debit(@RequestParam("userId") String userId,
                        @RequestParam("money") int money){
        accountService.debit(userId, money);
        return "account debit success";
    }
}
```

主启动类

```java
package com.lazy;

@MapperScan("com.lazy.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeataAccountApplication.class, args);
	}

}
```

配置文件

```yaml
spring:
  application:
    name: seata-account
  datasource:
    url: jdbc:mysql://localhost:3306/account_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 10000
mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.mapper.AccountTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.bean.AccountTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="userId" column="user_id" jdbcType="VARCHAR"/>
            <result property="money" column="money" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,user_id,money
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from account_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from account_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.bean.AccountTbl" useGeneratedKeys="true">
        insert into account_tbl
        ( id,user_id,money
        )
        values (#{id,jdbcType=INTEGER},#{userId,jdbcType=VARCHAR},#{money,jdbcType=INTEGER}
        )
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.bean.AccountTbl" useGeneratedKeys="true">
        insert into account_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="userId != null">user_id,</if>
                <if test="money != null">money,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="userId != null">#{userId,jdbcType=VARCHAR},</if>
                <if test="money != null">#{money,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.bean.AccountTbl">
        update account_tbl
        <set>
                <if test="userId != null">
                    user_id = #{userId,jdbcType=VARCHAR},
                </if>
                <if test="money != null">
                    money = #{money,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.bean.AccountTbl">
        update account_tbl
        set 
            user_id =  #{userId,jdbcType=VARCHAR},
            money =  #{money,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="debit">
        update account_tbl
        set money = money - #{money,jdbcType=INTEGER}
        where user_id = #{userId,jdbcType=VARCHAR}
    </update>
</mapper>
```

## `seata-busines`

依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

service

```java
package com.lazy.business.service;

public interface BusinessService {

    /**
     * 采购
     * @param userId            用户id
     * @param commodityCode     商品编号
     * @param orderCount        购买数量
     */
    void purchase(String userId, String commodityCode, int orderCount);
}
```

serviceImpl

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {
    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //TODO 1. 扣减库存

        //TODO 2. 创建订单
    }
}
```

controller

```java
package com.lazy.business.controller;

@RestController
public class PurchaseRestController {

    @Autowired
    BusinessService businessService;
    /**
     * 购买
     * @param userId 用户ID
     * @param commodityCode 商品编码
     * @param orderCount 数量
     * @return
     */
    @GetMapping("/purchase")
    public String purchase(@RequestParam("userId") String userId,
                           @RequestParam("commodityCode") String commodityCode,
                           @RequestParam("count") int orderCount){
        businessService.purchase(userId, commodityCode, orderCount);
        return "business purchase success";
    }
}
```

主启动类

```java
package com.lazy.business;

@EnableDiscoveryClient
@SpringBootApplication
public class SeataBusinessMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataBusinessMainApplication.class, args);
    }
}
```

yaml

```yaml
spring:
  application:
    name: seata-business
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 11000
```

## `seata-order`

依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.4</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean	

```java
package com.lazy.order.bean;

/**
 * @TableName order_tbl
 */
@Data
public class OrderTbl implements Serializable {
    private Integer id;

    private String userId;

    private String commodityCode;

    private Integer count;

    private Integer money;

    private static final long serialVersionUID = 1L;
}
```

mapper

```java
package com.lazy.order.mapper;

/**
* @description 针对表【order_tbl】的数据库操作Mapper
*/
public interface OrderTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(OrderTbl record);

    int insertSelective(OrderTbl record);

    OrderTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OrderTbl record);

    int updateByPrimaryKey(OrderTbl record);
}
```

service

```java
package com.lazy.order.service;

public interface OrderService {
    /**
     * 创建订单
     * @param userId    用户id
     * @param commodityCode  商品编码
     * @param orderCount  商品数量
     */
    OrderTbl create(String userId, String commodityCode, int orderCount);
}
```

serviceImpl

```java
package com.lazy.order.service.impl;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderTblMapper orderTblMapper;

    @Override
    public OrderTbl create(String userId, String commodityCode, int orderCount) {
        //1、计算订单价格
        int orderMoney = calculate(commodityCode, orderCount);

        //TODO 2、扣减账户余额

        //3、保存订单
        OrderTbl orderTbl = new OrderTbl();
        orderTbl.setUserId(userId);
        orderTbl.setCommodityCode(commodityCode);
        orderTbl.setCount(orderCount);
        orderTbl.setMoney(orderMoney);

        orderTblMapper.insert(orderTbl);

        return orderTbl;
    }
    // 计算价格
    private int calculate(String commodityCode, int orderCount) {
        return 9*orderCount;
    }
}
```

controller

```java
package com.lazy.order.controller;

@RestController
public class OrderRestController {

    @Autowired
    OrderService orderService;


    /**
     * 创建订单
     * @param userId
     * @param commodityCode
     * @param orderCount
     * @return
     */
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount)
    {
        OrderTbl tbl = orderService.create(userId, commodityCode, orderCount);
        return "order create success = 订单id：【"+tbl.getId()+"】";
    }
}
```

主启动类

```java
package com.lazy.order;

@MapperScan("com.lazy.order.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataOrderMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataOrderMainApplication.class, args);
    }
}
```

yaml

```yaml
spring:
  application:
    name: seata-order
  datasource:
    url: jdbc:mysql://localhost:3306/order_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 12000
mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.order.mapper.OrderTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.order.bean.OrderTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="userId" column="user_id" jdbcType="VARCHAR"/>
            <result property="commodityCode" column="commodity_code" jdbcType="VARCHAR"/>
            <result property="count" column="count" jdbcType="INTEGER"/>
            <result property="money" column="money" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,user_id,commodity_code,
        count,money
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from order_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from order_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.order.bean.OrderTbl"
            useGeneratedKeys="true">
        insert into order_tbl
        ( id,user_id,commodity_code
        ,count,money)
        values (#{id,jdbcType=INTEGER},#{userId,jdbcType=VARCHAR},#{commodityCode,jdbcType=VARCHAR}
        ,#{count,jdbcType=INTEGER},#{money,jdbcType=INTEGER})
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.order.bean.OrderTbl" useGeneratedKeys="true">
        insert into order_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="userId != null">user_id,</if>
                <if test="commodityCode != null">commodity_code,</if>
                <if test="count != null">count,</if>
                <if test="money != null">money,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="userId != null">#{userId,jdbcType=VARCHAR},</if>
                <if test="commodityCode != null">#{commodityCode,jdbcType=VARCHAR},</if>
                <if test="count != null">#{count,jdbcType=INTEGER},</if>
                <if test="money != null">#{money,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.order.bean.OrderTbl">
        update order_tbl
        <set>
                <if test="userId != null">
                    user_id = #{userId,jdbcType=VARCHAR},
                </if>
                <if test="commodityCode != null">
                    commodity_code = #{commodityCode,jdbcType=VARCHAR},
                </if>
                <if test="count != null">
                    count = #{count,jdbcType=INTEGER},
                </if>
                <if test="money != null">
                    money = #{money,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.order.bean.OrderTbl">
        update order_tbl
        set 
            user_id =  #{userId,jdbcType=VARCHAR},
            commodity_code =  #{commodityCode,jdbcType=VARCHAR},
            count =  #{count,jdbcType=INTEGER},
            money =  #{money,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
</mapper>
```

## `seata-storage`

依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>3.0.4</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

bean

```java
package com.lazy.storage.bean;

/**
 * @TableName storage_tbl
 */
@Data
public class StorageTbl implements Serializable {
    private Integer id;

    private String commodityCode;

    private Integer count;

    private static final long serialVersionUID = 1L;
}
```

mapper

```java
package com.lazy.storage.mapper;

/**
* @description 针对表【storage_tbl】的数据库操作Mapper
*/
public interface StorageTblMapper {

    int deleteByPrimaryKey(Long id);

    int insert(StorageTbl record);

    int insertSelective(StorageTbl record);

    StorageTbl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(StorageTbl record);

    int updateByPrimaryKey(StorageTbl record);

    void deduct(String commodityCode, int count);
}
```

service

```java
package com.lazy.storage.service;

public interface StorageService {
    /**
     * 扣除存储数量
     * @param commodityCode 商品编码
     * @param count 数量
     */
    void deduct(String commodityCode, int count);
}
```

serviceImpl

```java
package com.lazy.storage.service.impl;

@Service
public class StorageServiceImpl implements StorageService {

    @Autowired
    StorageTblMapper storageTblMapper;

    @Override
    public void deduct(String commodityCode, int count) {
        storageTblMapper.deduct(commodityCode, count);
    }
}
```

controller

```java
package com.lazy.storage.controller;

@RestController
public class StorageRestController {

    @Autowired
    StorageService  storageService;

    @GetMapping("/deduct")
    public String deduct(@RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") Integer count) {

        storageService.deduct(commodityCode, count);
        return "storage deduct success";
    }
}
```

主启动类

```java
package com.lazy.storage;

@MapperScan("com.lazy.storage.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataStorageMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataStorageMainApplication.class, args);
    }
}
```

```yaml
spring:
  application:
    name: seata-storage
  datasource:
    url: jdbc:mysql://localhost:3306/storage_db?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      config:
        import-check:
          enabled: false
server:
  port: 13000

mybatis:
  mapper-locations: classpath:mapper/*.xml
```

mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lazy.storage.mapper.StorageTblMapper">

    <resultMap id="BaseResultMap" type="com.lazy.storage.bean.StorageTbl">
            <id property="id" column="id" jdbcType="INTEGER"/>
            <result property="commodityCode" column="commodity_code" jdbcType="VARCHAR"/>
            <result property="count" column="count" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        id,commodity_code,count
    </sql>

    <select id="selectByPrimaryKey" parameterType="java.lang.Long" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List" />
        from storage_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </select>

    <delete id="deleteByPrimaryKey" parameterType="java.lang.Long">
        delete from storage_tbl
        where  id = #{id,jdbcType=INTEGER} 
    </delete>
    <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.lazy.storage.bean.StorageTbl" useGeneratedKeys="true">
        insert into storage_tbl
        ( id,commodity_code,count
        )
        values (#{id,jdbcType=INTEGER},#{commodityCode,jdbcType=VARCHAR},#{count,jdbcType=INTEGER}
        )
    </insert>
    <insert id="insertSelective" keyColumn="id" keyProperty="id" parameterType="com.lazy.storage.bean.StorageTbl" useGeneratedKeys="true">
        insert into storage_tbl
        <trim prefix="(" suffix=")" suffixOverrides=",">
                <if test="id != null">id,</if>
                <if test="commodityCode != null">commodity_code,</if>
                <if test="count != null">count,</if>
        </trim>
        <trim prefix="values (" suffix=")" suffixOverrides=",">
                <if test="id != null">#{id,jdbcType=INTEGER},</if>
                <if test="commodityCode != null">#{commodityCode,jdbcType=VARCHAR},</if>
                <if test="count != null">#{count,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <update id="updateByPrimaryKeySelective" parameterType="com.lazy.storage.bean.StorageTbl">
        update storage_tbl
        <set>
                <if test="commodityCode != null">
                    commodity_code = #{commodityCode,jdbcType=VARCHAR},
                </if>
                <if test="count != null">
                    count = #{count,jdbcType=INTEGER},
                </if>
        </set>
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="updateByPrimaryKey" parameterType="com.lazy.storage.bean.StorageTbl">
        update storage_tbl
        set 
            commodity_code =  #{commodityCode,jdbcType=VARCHAR},
            count =  #{count,jdbcType=INTEGER}
        where   id = #{id,jdbcType=INTEGER} 
    </update>
    <update id="deduct">
        update storage_tbl
        set count = count - #{count}
        where commodity_code = #{commodityCode}
    </update>
</mapper>
```

## 添加单个事务回滚

我们在`seata-account`、`seata-order`、`seata-storage`上的service添加事务，主启动类上开启事务

seata-account ，service

```java
package com.lazy.service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountTblMapper accountTblMapper;

    @Transactional
    @Override
    public void debit(String userId, int money) {
        accountTblMapper.debit(userId, money);
    }
}
```

开启事务

```java
package com.lazy;

@EnableTransactionManagement
@MapperScan("com.lazy.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeataAccountApplication.class, args);
	}

}
```

`seata-order`，service

```java
package com.lazy.order.controller;

@RestController
public class OrderRestController {

    @Autowired
    OrderService orderService;


    /**
     * 创建订单
     * @param userId
     * @param commodityCode
     * @param orderCount
     * @return
     */
    @Transactional
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount)
    {
        OrderTbl tbl = orderService.create(userId, commodityCode, orderCount);
        return "order create success = 订单id：【"+tbl.getId()+"】";
    }

}
```

```java
package com.lazy.order;

@EnableTransactionManagement
@MapperScan("com.lazy.order.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataOrderMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataOrderMainApplication.class, args);
    }
}
```

`seata-storage`，service

```java
package com.lazy.storage.service.impl;

@Service
public class StorageServiceImpl implements StorageService {

    @Autowired
    StorageTblMapper storageTblMapper;

    @Transactional
    @Override
    public void deduct(String commodityCode, int count) {
        storageTblMapper.deduct(commodityCode, count);
        if (count ==5){
            throw new RuntimeException("库存不足！"); //如果扣减5个库存，会发生异常。进行事务回滚
        }
    }
}

```

```java
package com.lazy.storage;

@EnableTransactionManagement
@MapperScan("com.lazy.storage.mapper")
@EnableDiscoveryClient
@SpringBootApplication
public class SeataStorageMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataStorageMainApplication.class, args);
    }
}
```

## `seata-busines`集成下订单和扣库存

![image-20250403170009786](/alibabaImage/image-20250403170009786.png)

在`seata-busines`创建两个接口

```java
package com.lazy.business.feign;

@FeignClient(value = "seata-order")
public interface OrderFeignClient {
    @GetMapping("/create")
    public String create(@RequestParam("userId") String userId,
                         @RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") int orderCount);
}
```

````java
package com.lazy.business.feign;

@FeignClient(value = "seata-storage")
public interface StorageFeignClient {
    @GetMapping("/deduct")
    public String deduct(@RequestParam("commodityCode") String commodityCode,
                         @RequestParam("count") Integer count);
}
````

serviceImpl

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    private StorageFeignClient storageFeignClient;

    @Autowired
    private OrderFeignClient orderFeignClient;

    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //1. 扣减库存
        storageFeignClient.deduct(commodityCode, orderCount);
        //2. 创建订单
        orderFeignClient.create(userId, commodityCode, orderCount);
    }
}
```

主启动类添加开启FeignClient

```java
package com.lazy.business;

@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class SeataBusinessMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeataBusinessMainApplication.class, args);
    }
}
```



改造`seata-order`

```java
package com.lazy.order.feign;

@FeignClient(value = "seata-account")
public interface AccountFeignClient {
    @GetMapping("/debit")
    public String debit(@RequestParam("userId") String userId,
                        @RequestParam("money") int money);
}
```

serviceImpl

```java
package com.lazy.order.service.impl;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderTblMapper orderTblMapper;

    @Autowired
    private AccountFeignClient accountFeignClient;
    @Override
    public OrderTbl create(String userId, String commodityCode, int orderCount) {
        //1、计算订单价格
        int orderMoney = calculate(commodityCode, orderCount);

        //2、扣减账户余额
        accountFeignClient.debit(userId, orderMoney);
        //3、保存订单
        OrderTbl orderTbl = new OrderTbl();
        orderTbl.setUserId(userId);
        orderTbl.setCommodityCode(commodityCode);
        orderTbl.setCount(orderCount);
        orderTbl.setMoney(orderMoney);

        orderTblMapper.insert(orderTbl);

        return orderTbl;
    }

    // 计算价格
    private int calculate(String commodityCode, int orderCount) {
        return 9*orderCount;
    }
}
```

主启动类添加开启Feign

```java
@EnableFeignClients
```

## `Seata`原理

![image-20250403172725261](/alibabaImage/image-20250403172725261.png)

下载[Seata](https://seata.apache.org/zh-cn/download/seata-server)

启动seata

![image-20250403183001333](/alibabaImage/image-20250403183001333.png)

seata的访问地址

![image-20250403183040379](/alibabaImage/image-20250403183040379.png)

![image-20250403183124885](/alibabaImage/image-20250403183124885.png)

启动完seata我们就应该配置引入seata了,只要用到了就需要引入

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

配置文件，需要跟`application.yaml`同级，创建一个`file.conf`

完整的`file.conf`

```properties
#
# 版权归Apache软件基金会（ASF）所有，可能有一个或多个
# 贡献者许可协议。请查看与此工作一起分发的NOTICE文件，以获取有关版权所有权的更多信息。
# ASF根据Apache许可证2.0版（以下简称“许可证”）将此文件授权给您使用；
# 除非符合许可证的要求，否则您不得使用此文件。您可以在以下网址获取许可证副本：
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# 除非适用法律要求或书面同意，否则根据许可证分发的软件按“原样”分发，
# 不附带任何形式的明示或暗示的保证或条件。请查看许可证以了解具体的权限和限制规定。
#

transport {
  # 传输类型，可选值：tcp（TCP协议），unix-domain-socket（Unix域套接字）
  type = "TCP"
  # 服务器模式，可选值：NIO（非阻塞I/O），NATIVE（原生模式）
  server = "NIO"
  # 是否启用心跳机制
  heartbeat = true
  # TM客户端是否启用批量发送请求
  enableTmClientBatchSendRequest = false
  # RM客户端是否启用批量发送请求
  enableRmClientBatchSendRequest = true
  # RM客户端RPC请求的超时时间（毫秒）
  rpcRmRequestTimeout = 2000
  # TM客户端RPC请求的超时时间（毫秒）
  rpcTmRequestTimeout = 30000
  # RM客户端RPC请求的超时时间（毫秒）
  rpcRmRequestTimeout = 15000
  # Netty线程工厂配置
  threadFactory {
    # 主线程前缀
    bossThreadPrefix = "NettyBoss"
    # 工作线程前缀
    workerThreadPrefix = "NettyServerNIOWorker"
    # 服务器执行线程前缀
    serverExecutorThread-prefix = "NettyServerBizHandler"
    # 是否共享主线程和工作线程
    shareBossWorker = false
    # 客户端选择器线程前缀
    clientSelectorThreadPrefix = "NettyClientSelector"
    # 客户端选择器线程数量
    clientSelectorThreadSize = 1
    # 客户端工作线程前缀
    clientWorkerThreadPrefix = "NettyClientWorkerThread"
    # Netty主线程数量
    bossThreadSize = 1
    # 工作线程数量，"default"表示自动默认或为8
    workerThreadSize = "default"
  }
  shutdown {
    # 销毁服务器时的等待秒数
    wait = 3
  }
  # 序列化方式
  serialization = "seata"
  # 压缩方式
  compressor = "none"
}
service {
  # 事务服务组映射
  vgroupMapping.default_tx_group = "default"
  # 仅在registry.type=file时支持，请勿设置多个地址
  default.grouplist = "127.0.0.1:8091"
  # 是否启用降级，当前不支持
  enableDegrade = false
  # 是否禁用全局事务
  disableGlobalTransaction = false
}

client {
  rm {
    # 异步提交缓冲区的最大限制
    asyncCommitBufferLimit = 10000
    lock {
      # 锁重试间隔时间（毫秒）
      retryInterval = 10
      # 锁重试次数
      retryTimes = 30
      # 分支事务冲突时是否回滚
      retryPolicyBranchRollbackOnConflict = true
    }
    # 报告重试次数
    reportRetryCount = 5
    # 是否启用表元数据检查
    tableMetaCheckEnable = false
    # 表元数据检查的时间间隔（毫秒）
    tableMetaCheckerInterval = 60000
    # 是否启用报告成功
    reportSuccessEnable = false
    # 是否启用Saga分支注册
    sagaBranchRegisterEnable = false
    # Saga的JSON解析器
    sagaJsonParser = "fastjson"
    # Saga重试持久化模式是否更新
    sagaRetryPersistModeUpdate = false
    # Saga补偿持久化模式是否更新
    sagaCompensatePersistModeUpdate = false
    # TCC动作拦截器的顺序
    tccActionInterceptorOrder = -2147482648 #Ordered.HIGHEST_PRECEDENCE + 1000
    # SQL解析器类型
    sqlParserType = "druid"
    # XA分支执行超时时间（毫秒）
    branchExecutionTimeoutXA = 60000
    # XA连接两阶段持有超时时间（毫秒）
    connectionTwoPhaseHoldTimeoutXA = 10000
  }
  tm {
    # 提交重试次数
    commitRetryCount = 5
    # 回滚重试次数
    rollbackRetryCount = 5
    # 默认全局事务超时时间（毫秒）
    defaultGlobalTransactionTimeout = 60000
    # 是否启用降级检查
    degradeCheck = false
    # 降级检查周期（毫秒）
    degradeCheckPeriod = 2000
    # 降级检查允许次数
    degradeCheckAllowTimes = 10
    # 拦截器顺序
    interceptorOrder = -2147482648 #Ordered.HIGHEST_PRECEDENCE + 1000
  }
  undo {
    # 是否进行数据验证
    dataValidation = true
    # 是否仅关注更新列
    onlyCareUpdateColumns = true
    # 回滚日志的序列化方式
    logSerialization = "jackson"
    # 回滚日志表名
    logTable = "undo_log"
    compress {
      # 是否启用压缩
      enable = true
      # 压缩类型，可选值：zip, gzip, deflater, lz4, bzip2, zstd，默认是zip
      type = zip
      # 回滚信息大小超过此阈值时进行压缩，支持k、m、g、t单位
      threshold = 64k
    }
  }
  loadBalance {
      # 负载均衡类型
      type = "XID"
      # 虚拟节点数量
      virtualNodes = 10
  }
}
log {
  # 异常率
  exceptionRate = 100
}
tcc {
  fence {
    # TCC栅栏日志表名
    logTableName = tcc_fence_log
    # TCC栅栏日志清理周期
    cleanPeriod = 1h
  }
}
```

我们只需要引入部分即可，只要那个项目引入依赖，就得在下面配置这个，不然服务启动不起来

```properties
service {
  # 事务服务组映射
  vgroupMapping.default_tx_group = "default"
  # 仅在registry.type=file时支持，请勿设置多个地址
  default.grouplist = "127.0.0.1:8091" # seata服务端的地址
  # 是否启用降级，当前不支持
  enableDegrade = false
  # 是否禁用全局事务
  disableGlobalTransaction = false
}
```

只引入这个是实现不了分布式事务的，我们还需要在那个地方引入的分布式的上面添加`@GlobalTransactional`注解

这个项目我们是在`seata-busines`中的`serviceImpl`下调用的，所以在改方法上添加注解

```java
package com.lazy.business.service.impl;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    private StorageFeignClient storageFeignClient;

    @Autowired
    private OrderFeignClient orderFeignClient;

    @GlobalTransactional # 添加seata的全局事务
    @Override
    public void purchase(String userId, String commodityCode, int orderCount) {
        //1. 扣减库存
        storageFeignClient.deduct(commodityCode, orderCount);
        //2. 创建订单
        orderFeignClient.create(userId, commodityCode, orderCount);
    }
}
```

我们在启动项目测试

![image-20250403184404634](/alibabaImage/image-20250403184404634.png)

发现我们的代码报错了，但是我们的数据库是进行回滚了

![image-20250403184449259](/alibabaImage/image-20250403184449259.png)

![image-20250403184500736](/alibabaImage/image-20250403184500736.png)

## seata二阶提交协议

Seata 通过引入 全局事务管理 和 分支事务 来解决分布式系统中的事务一致性问题。它使用类似于传统数据库事务中的 二阶段提交（2PC，Two-Phase Commit） 协议来确保事务的原子性。

![](/alibabaImage/seata二阶提交.png)

### 二阶段提交（2PC）过程

Seata 采用二阶段提交协议（2PC）来确保分布式事务的一致性。以下是二阶段提交的详细流程：

1. 第一阶段：事务预备（Try阶段）
   全局事务开始：客户端应用向 Seata Server 发起请求，Seata 会生成一个全局事务 ID（XID），并返回给客户端应用。全局事务标识用于追踪整个分布式事务。

  ```java
// 启动全局事务
GlobalTransaction tx = GlobalTransactionContext.getCurrentOrCreate();
tx.begin();
  ```

  分支事务注册：每个参与者（微服务）启动后，会向 Seata Server 注册自己作为一个分支事务，Seata Server 会为每个分支事务分配一个唯一的事务分支 ID（Branch ID）。Try 阶段：每个微服务会执行 Try 操作，即准备执行本地事务操作，但不提交数据。例如，更新某个数据库中的记录，但不提交。执行数据库操作：每个参与的子事务都会执行数据库更新，但不会真正提交，而是进入 prepare 状态（对于 AT 模式，这意味着生成 undo_log）。

2. 第二阶段：提交（Commit）或回滚（Rollback）

  3. 提交（Commit）：
     1. Seata Server 收到全局事务提交请求后，通知所有分支事务提交事务。
        2. 分支事务提交数据库操作（删除 undo_log）。

  4. 回滚（Rollback）：

    如果 Seata Server 发现某个分支事务执行失败，则通知所有已提交的分支事务回滚，恢复 undo_log 记录的数据。


## seata配置到nacos

[官网地址](https://seata.apache.org/zh-cn/docs/user/configuration/nacos)



## seata的四种事务模式

### Seata AT 模式

#### 概述

AT 模式是 Seata 创新的一种非侵入式的分布式事务解决方案，Seata 在内部做了对数据库操作的代理层，我们使用 Seata AT 模式时，实际上用的是 Seata 自带的数据源代理 DataSourceProxy，Seata 在这层代理中加入了很多逻辑，比如插入回滚 undo_log 日志，检查全局锁等。

本文中，我们将重点介绍 Seata AT 模式的使用，如果您对于 AT 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/at-mode)。

##### 整体机制

两阶段提交协议的演变：

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。
- 二阶段：
  - 提交异步化，非常快速地完成。
  - 回滚通过一阶段的回滚日志进行反向补偿。

### Seata TCC 模式

#### 概述

TCC 模式是 Seata 支持的一种由业务方细粒度控制的侵入式分布式事务解决方案，是继 AT 模式后第二种支持的事务模式，最早由蚂蚁金服贡献。其分布式事务模型直接作用于服务层，不依赖底层数据库，可以灵活选择业务资源的锁定粒度，减少资源锁持有时间，可扩展性好，可以说是为独立部署的 SOA 服务而设计的。

![Overview of a global transaction](/alibabaImage/seata_tcc-1-1f7a834639aa755d73fa2af435c4f042.png)

本文中，我们将重点介绍 Seata TCC 模式的使用，如果您对于 TCC 模式原理感兴趣，想要了解 Seata TCC 对于幂等、空回滚、悬挂问题的解决，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/tcc-mode)。

#### 优势

TCC 完全不依赖底层数据库，能够实现跨数据库、跨应用资源管理，可以提供给业务方更细粒度的控制。

#### 缺点

TCC 是一种侵入式的分布式事务解决方案，需要业务系统自行实现 Try，Confirm，Cancel 三个操作，对业务系统有着非常大的入侵性，设计相对复杂。

#### 适用场景

TCC 模式是高性能分布式事务解决方案，适用于核心系统等对性能有很高要求的场景。

#### 整体机制

在两阶段提交协议中，资源管理器（RM, Resource Manager）需要提供“准备”、“提交”和“回滚” 3 个操作；而事务管理器（TM, Transaction Manager）分 2 阶段协调所有资源管理器，在第一阶段询问所有资源管理器“准备”是否成功，如果所有资源均“准备”成功则在第二阶段执行所有资源的“提交”操作，否则在第二阶段执行所有资源的“回滚”操作，保证所有资源的最终状态是一致的，要么全部提交要么全部回滚。

资源管理器有很多实现方式，其中 TCC（Try-Confirm-Cancel）是资源管理器的一种服务化的实现；TCC 是一种比较成熟的分布式事务解决方案，可用于解决跨数据库、跨服务业务操作的数据一致性问题；TCC 其 Try、Confirm、Cancel 3 个方法均由业务编码实现，故 TCC 可以被称为是服务化的资源管理器。

TCC 的 Try 操作作为一阶段，负责资源的检查和预留；Confirm 操作作为二阶段提交操作，执行真正的业务；Cancel 是二阶段回滚操作，执行预留资源的取消，使资源回到初始状态。

### Seata Saga 模式

#### 概述

Saga 模式是 SEATA 提供的长事务解决方案，在 Saga 模式中，业务流程中每个参与者都提交本地事务，当出现某一个参与者失败则补偿前面已经成功的参与者，一阶段正向服务和二阶段补偿服务都由业务开发实现。

![Saga模式示意图](/alibabaImage/Saga模式示意图.png)

理论基础：Hector & Kenneth 发表论⽂ Sagas （1987）

#### 适用场景：

- 业务流程长、业务流程多
- 参与者包含其它公司或遗留系统服务，无法提供 TCC 模式要求的三个接口

#### 优势：

- 一阶段提交本地事务，无锁，高性能
- 事件驱动架构，参与者可异步执行，高吞吐
- 补偿服务易于实现

#### 缺点：

- 不保证隔离性（应对方案见后面文档）

#### Saga 的实现：

#### 基于状态机引擎的 Saga 实现：

目前 SEATA 提供的 Saga 模式是基于状态机引擎来实现的，机制是：

1. 通过状态图来定义服务调用的流程并生成 json 状态语言定义文件

2. 状态图中一个节点可以是调用一个服务，节点可以配置它的补偿节点

3. 状态图 json 由状态机引擎驱动执行，当出现异常时状态引擎反向执行已成功节点对应的补偿节点将事务回滚

   > 注意: 异常发生时是否进行补偿也可由用户自定义决定

4. 可以实现服务编排需求，支持单项选择、并发、子流程、参数转换、参数映射、服务执行状态判断、异常捕获等功能

示例状态图:

![示例状态图](/alibabaImage/demo_statelang-90f1fc01bfaf3a795c3b3357e1046f16.png)

### Seata XA 模式

#### 概述

XA 模式是从 1.2 版本支持的事务模式。XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准。Seata XA 模式是利用事务资源（数据库、消息服务等）对 XA 协议的支持，以 XA 协议的机制来管理分支事务的一种事务模式。

![img](/alibabaImage/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png)

本文中，我们将重点介绍 Seata XA 模式的使用，如果您对于 XA 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](https://seata.apache.org/zh-cn/docs/dev/mode/xa-mode)。

#### 优势

与 Seata 支持的其它事务模式不同，XA 协议要求事务资源本身提供对规范和协议的支持，所以事务资源（如数据库）可以保障从任意视角对数据的访问有效隔离，满足全局数据一致性。此外的一些优势还包括：

1. 业务无侵入：和 AT 一样，XA 模式将是业务无侵入的，不给应用设计和开发带来额外负担。
2. 数据库的支持广泛：XA 协议被主流关系型数据库广泛支持，不需要额外的适配即可使用。

#### 缺点

XA prepare 后，分支事务进入阻塞阶段，收到 XA commit 或 XA rollback 前必须阻塞等待。事务资源长时间得不到释放，锁定周期长，而且在应用层上面无法干预，性能差。

#### 适用场景

适用于想要迁移到 Seata 平台基于 XA 协议的老应用，使用 XA 模式将更平滑，还有 AT 模式未适配的数据库应用。

#### 整体机制

- 执行阶段：
  - 可回滚：业务 SQL 操作放在 XA 分支中进行，由资源对 XA 协议的支持来保证 *可回滚*
  - 持久化：XA 分支完成后，执行 XA prepare，同样，由资源对 XA 协议的支持来保证 *持久化*（即，之后任何意外都不会造成无法回滚的情况）
- 完成阶段：
  - 分支提交：执行 XA 分支的 commit
  - 分支回滚：执行 XA 分支的 rollback

## 切换seata数据源的代理模式

```yaml
seata:
  data-source-proxy-mode: AT
```

## 总结

[SpringCloud alibaba 总结](https://www.processon.com/mindmap/67f46c3f4265fb0abfaf291f)