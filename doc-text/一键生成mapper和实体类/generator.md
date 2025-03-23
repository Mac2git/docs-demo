>本次是使用mapper4一键生成

# 步骤

1. 先写数据库文件

   ```sql
   CREATE DATABASE `db2024`
   USE `db2024`
   DROP TABLE IF EXISTS `t_pay`;
   CREATE TABLE `t_pay` (
     `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     `pay_no` VARCHAR(50) NOT NULL COMMENT '支付流水号',
     `order_no` VARCHAR(50) NOT NULL COMMENT '订单流水号',
     `user_id` INT(10) DEFAULT '1' COMMENT '用户账号ID',
     `amount` DECIMAL(8,2) NOT NULL DEFAULT '9.9' COMMENT '交易金额',
     `deleted` TINYINT(4) UNSIGNED NOT NULL DEFAULT '0' COMMENT '删除标志，默认0不删除，1删除',
     `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
     `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     PRIMARY KEY (`id`)
   ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='支付交易表';
   INSERT INTO t_pay(pay_no,order_no) VALUES('pay17203699','6544bafb424a');
   ```

2. 新建一个项目

3. 添加依赖

   ```cmd
   <dependencies>
           <!--Mybatis 通用mapper tk单独使用，自己独有+自带版本号-->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>3.5.13</version>
           </dependency>
           <!-- Mybatis Generator 自己独有+自带版本号-->
           <dependency>
               <groupId>org.mybatis.generator</groupId>
               <artifactId>mybatis-generator-core</artifactId>
               <version>1.4.2</version>
           </dependency>
           <!--通用Mapper-->
           <dependency>
               <groupId>tk.mybatis</groupId>
               <artifactId>mapper</artifactId>
           </dependency>
           <!--persistence-->
           <dependency>
               <groupId>javax.persistence</groupId>
               <artifactId>persistence-api</artifactId>
           </dependency>
           <!--mysql5.1.47-->
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
           </dependency>
       </dependencies>
   
       <build>
           <resources>
               <resource>
                   <directory>${basedir}/src/main/java</directory>
                   <includes>
                       <include>**/*.xml</include>
                   </includes>
               </resource>
               <resource>
                   <directory>${basedir}/src/main/resources</directory>
               </resource>
           </resources>
           <plugins>
               <plugin>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-maven-plugin</artifactId>
                   <configuration>
                       <excludes>
                           <exclude>
                               <groupId>org.projectlombok</groupId>
                               <artifactId>lombok</artifactId>
                           </exclude>
                       </excludes>
                   </configuration>
               </plugin>
               <plugin>
                   <groupId>org.mybatis.generator</groupId>
                   <artifactId>mybatis-generator-maven-plugin</artifactId>
                   <version>1.4.2</version>
                   <configuration>
                       <configurationFile>${basedir}/src/main/resources/generatorConfig.xml</configurationFile>
                       <overwrite>true</overwrite>
                       <verbose>true</verbose>
                   </configuration>
                   <dependencies>
                       <dependency>
                           <groupId>mysql</groupId>
                           <artifactId>mysql-connector-java</artifactId>
                           <version>5.1.47</version>
                       </dependency>
                       <dependency>
                           <groupId>tk.mybatis</groupId>
                           <artifactId>mapper</artifactId>
                           <version>4.2.3</version>
                       </dependency>
                   </dependencies>
               </plugin>
           </plugins>
       </build>
   ```

4. 在`resources`新建`config.properties`和`generatorConfig.xml`

   1. `config.properties`

      1. `mysql5`

         ```properties
         #User表包名
         package.name=com.lazy.cloud
         # mysql5.7
         jdbc.driverClass = com.mysql.jdbc.Driver
         jdbc.url= jdbc:mysql://localhost:3306/db2024?useUnicode=true&characterEncoding=UTF-8&useSSL=false
         jdbc.user = root
         jdbc.password =123456
         ```

      2. `mysql8`

         ```properties
         #t_pay表包名
         package.name=com.lazy.cloud
         # mysql8.0
         jdbc.driverClass = com.mysql.cj.jdbc.Driver
         jdbc.url= jdbc:mysql://localhost:3306/db2024?characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
         jdbc.user = root
         jdbc.password =123456
         ```

         > 要写项目已有的包名，就是在那个包下生成的包名

   2. `generatorConfig.xml`

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE generatorConfiguration
              PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
              "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
      
      <generatorConfiguration>
          <!-- 去config.properties 里面读取配置 -->
          <properties resource="config.properties"/>
      
          <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
              <property name="beginningDelimiter" value="`"/>
              <property name="endingDelimiter" value="`"/>
      
              <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
                  <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
                  <property name="caseSensitive" value="true"/>
              </plugin>
      
              <jdbcConnection driverClass="${jdbc.driverClass}"
                              connectionURL="${jdbc.url}"
                              userId="${jdbc.user}"
                              password="${jdbc.password}">
              </jdbcConnection>
              <!-- 生成的实体类包名 -->
              <javaModelGenerator targetPackage="${package.name}.pojo" targetProject="src/main/java"/>
              <!-- 生成的mapper的包名 -->
              <sqlMapGenerator targetPackage="${package.name}.mapper" targetProject="src/main/java"/>
              <!-- 生成的mapper.xml的包名 -->
              <javaClientGenerator targetPackage="${package.name}.mapper" targetProject="src/main/java" type="XMLMAPPER"/>
              <!-- 表名 -->
              <table tableName="t_pay" domainObjectName="Pay">
                  <generatedKey column="id" sqlStatement="JDBC"/>
              </table>
          </context>
      </generatorConfiguration>
      ```

5. 刷新maven

   双击generator

   ![](/generatorImage/4.png)

   静静等待生成即可

6. 效果

![](/generatorImage/1.png)

![2](/generatorImage/2.png)

![3](/generatorImage/3.png)

>刚才创建表的注释也加载到实体类里面了！