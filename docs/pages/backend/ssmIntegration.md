# SSM整合文档

## SSM整合步骤

### 1、新建WEB项目

1. 通过maven新建web项目，补全缺失的文件夹

### 2、添加相关依赖

1. 修改pom文件，添加相关依赖

   ```xml
   <properties>
       <maven.compiler.encoding>utf-8</maven.compiler.encoding>
       <maven.compiler.source>1.8</maven.compiler.source>
       <maven.compiler.target>1.8</maven.compiler.target>
   
       <junit.version>4.11</junit.version>
   
       <mybatis.version>3.5.7</mybatis.version>
       <mybatis-spring.version>2.0.7</mybatis-spring.version>
       <mysql-connector-java.version>8.0.22</mysql-connector-java.version>
       <druid.version>1.2.8</druid.version>
       <pagehelper.version>5.3.2</pagehelper.version>
       <jedis.version>4.0.1</jedis.version>
   
   
       <spring.version>5.2.18.RELEASE</spring.version>
       <validation-api.version>2.0.1.Final</validation-api.version>
       <hibernate-validator.version>6.0.9.Final</hibernate-validator.version>
       <javax.servlet-api.version>4.0.1</javax.servlet-api.version>
       <spring-data-commons.version>2.7.3</spring-data-commons.version>
       <thymeleaf.version>3.0.15.RELEASE</thymeleaf.version>
       <commons-fileupload.version>1.4</commons-fileupload.version>
   
   
       <jackson-databind.version>2.13.4</jackson-databind.version>
       <logback-classic.version>1.2.3</logback-classic.version>
       <lombok.version>1.18.22</lombok.version>
       <javax.annotation-api.version>1.3.2</javax.annotation-api.version>
   
   </properties>
   
   <dependencies>
   
       <!--        单元测试-->
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>${junit.version}</version>
           <scope>test</scope>
       </dependency>
   
   
       <!--        mybatis-->
       <dependency>
           <groupId>org.mybatis</groupId>
           <artifactId>mybatis</artifactId>
           <version>${mybatis.version}</version>
       </dependency>
       <!--        mybatis支持spring-->
       <dependency>
           <groupId>org.mybatis</groupId>
           <artifactId>mybatis-spring</artifactId>
           <version>${mybatis-spring.version}</version>
       </dependency>
       <!--        mysql-->
       <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
           <version>${mysql-connector-java.version}</version>
       </dependency>
       <!--        druid-->
       <dependency>
           <groupId>com.alibaba</groupId>
           <artifactId>druid</artifactId>
           <version>${druid.version}</version>
       </dependency>
       <!--        mybatis 分页插件-->
       <dependency>
           <groupId>com.github.pagehelper</groupId>
           <artifactId>pagehelper</artifactId>
           <version>${pagehelper.version}</version>
       </dependency>
       <!--        redis-->
       <dependency>
           <groupId>redis.clients</groupId>
           <artifactId>jedis</artifactId>
           <version>${jedis.version}</version>
       </dependency>
   
       <!--        spring-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
           <version>${spring.version}</version>
       </dependency>
       <!--        spring-jdbc 对jdbc支持-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-jdbc</artifactId>
           <version>${spring.version}</version>
       </dependency>
       <!--        spring切面框架-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-aspects</artifactId>
           <version>${spring.version}</version>
       </dependency>
       <!--        spring事务-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-tx</artifactId>
           <version>${spring.version}</version>
       </dependency>
   
   
       <!--        springmvc-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-webmvc</artifactId>
           <version>${spring.version}</version>
       </dependency>
       <!--        数据校验-->
       <dependency>
           <groupId>javax.validation</groupId>
           <artifactId>validation-api</artifactId>
           <version>${validation-api.version}</version>
       </dependency>
       <dependency>
           <groupId>org.hibernate</groupId>
           <artifactId>hibernate-validator</artifactId>
           <version>${hibernate-validator.version}</version>
       </dependency>
       <dependency>
           <groupId>javax.servlet</groupId>
           <artifactId>javax.servlet-api</artifactId>
           <version>${javax.servlet-api.version}</version>
           <scope>provided</scope>
       </dependency>
       <dependency>
           <groupId>org.springframework.data</groupId>
           <artifactId>spring-data-commons</artifactId>
           <version>${spring-data-commons.version}</version>
       </dependency>
       <!--        thymeleaf 模板-->
       <dependency>
           <groupId>org.thymeleaf</groupId>
           <artifactId>thymeleaf-spring5</artifactId>
           <version>${thymeleaf.version}</version>
       </dependency>
       <!--        文件上传-->
       <dependency>
           <groupId>commons-fileupload</groupId>
           <artifactId>commons-fileupload</artifactId>
           <version>${commons-fileupload.version}</version>
       </dependency>
   
   
   
   
       <!--        jackson-databind-->
       <dependency>
           <groupId>com.fasterxml.jackson.core</groupId>
           <artifactId>jackson-databind</artifactId>
           <version>${jackson-databind.version}</version>
       </dependency>
       <!--        logback 日志-->
       <dependency>
           <groupId>ch.qos.logback</groupId>
           <artifactId>logback-classic</artifactId>
           <version>${logback-classic.version}</version>
       </dependency>
   
       <!--        lombok-->
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <version>${lombok.version}</version>
       </dependency>
       <!--        针对jdk8瘦身之后 补充的注解-->
       <dependency>
           <groupId>javax.annotation</groupId>
           <artifactId>javax.annotation-api</artifactId>
           <version>${javax.annotation-api.version}</version>
       </dependency>
   
   
   </dependencies>
   
   <build>
   
       <plugins>
           <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-compiler-plugin</artifactId>
               <version>3.1</version>
               <configuration>
                   <source>${maven.compiler.source}</source>
                   <target>${maven.compiler.target}</target>
                   <encoding>${maven.compiler.encoding}</encoding>
               </configuration>
           </plugin>
       </plugins>
   
       <resources>
           <resource>
               <directory>src/main/resources</directory>
               <includes>
                   <include>**/*.xml</include>
                   <include>**/*.properties</include>
               </includes>
           </resource>
           <resource>
               <directory>src/main/java</directory>
               <includes>
                   <include>**/*.xml</include>
                   <include>**/*.properties</include>
               </includes>
           </resource>
       </resources>
   </build>
   ```

   



### 3、新建数据库配置文件

1. jdbc.properties

   ```properties
   jdbc.driverClassName=com.mysql.cj.jdbc.Driver
   jdbc.url=jdbc:mysql://localhost:3306/ssm?characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC&rewriteBatchedStatements=true&allowMultiQueries=true
   jdbc.username=root
   jdbc.password=****
   ```

   

### 4、新建mybatis配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>

    <typeAliases>
        <package name="com.ilovesshan.pojo"/>
    </typeAliases>

</configuration>
```



### 5、新建spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            https://www.springframework.org/schema/context/spring-context.xsd
            http://www.springframework.org/schema/aop
            https://www.springframework.org/schema/aop/spring-aop.xsd
            http://www.springframework.org/schema/tx
            http://www.springframework.org/schema/tx/spring-tx.xsd
            http://mybatis.org/schema/mybatis-spring
            http://mybatis.org/schema/mybatis-spring.xsd
">

    <!--    配置注解扫描-->
    <context:component-scan base-package="com.ilovesshan.service"/>

    <!--    读取数据源-->
    <context:property-placeholder ignore-unresolvable="true" location="classpath:jdbc.properties, classpath:redis.properties"/>


    <!--    配置 支持切面-->
    <aop:aspectj-autoproxy/>

    <!--    配置支持注解式 事务-->
    <tx:annotation-driven/>

    <!--    配置mybatis 注解扫描-->
    <mybatis:scan base-package="com.ilovesshan.mapper"/>

    <!--    配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--    配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>


    <!--    配置 SqlSessionFactoryBean-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <!--        加载mybatis配置文件-->
        <property name="configLocation" value="classpath:mybatis.xml"/>

        <!--        加载mapper文件-->
        <property name="mapperLocations" value="classpath:mapper/**/*.xml"/>
    </bean>

     <!--    配置redis-->
    <bean id="jedisPool" class="redis.clients.jedis.JedisPool">
        <constructor-arg name="host" value="${redis.host}"/>
        <constructor-arg name="port" value="${redis.port}"/>
        <property name="maxIdle" value="${redis.maxIdle}"/>
        <property name="minIdle" value="${redis.minIdle}"/>
        <property name="maxTotal" value="${redis.maxTotal}"/>
    </bean>
    
</beans>
```

```properties
redis.host=127.0.0.1
redis.port=6379
redis.maxIdle=20
redis.minIdle=5
redis.maxTotal=30
redis.maxWait=3000
```

```java
package com.ilovesshan.common;

import com.fasterxml.jackson.core.type.TypeReference;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Slf4j
@Component
public class RedisTemplate {
    @Autowired
    private JedisPool jedisPool;

    @Autowired
    private CustomObjectMapper objectMapper;

    /**
     * 持久化 字符串
     *
     * @param key    键
     * @param value  值
     * @param expire 过期时间
     * @return
     */
    public String set(String key, String value, Long expire) {
        Jedis jedis = jedisPool.getResource();
        String executorValue = null;
        try {
            if (expire <= 0) {
                executorValue = jedis.set(key, value);
            } else {
                executorValue = jedis.setex(key, expire, value);
            }
        } catch (Exception e) {
            log.error("redis  executor error: ", e);
            jedisPool.returnBrokenResource(jedis);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return executorValue;
    }


    /**
     * 获取 字符串
     *
     * @param key 键
     * @return
     */
    public String get(String key) {
        Jedis jedis = jedisPool.getResource();
        String executorValue = null;
        try {
            executorValue = jedis.get(key);
        } catch (Exception e) {
            log.error("redis  executor error: ", e);
            jedisPool.returnBrokenResource(jedis);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return executorValue;
    }


    /**
     * 持久化 对象
     *
     * @param key    键
     * @param value  值
     * @param expire 过期时间
     * @return
     */
    public String setObject(String key, Object value, Long expire) {
        Jedis jedis = jedisPool.getResource();
        String executorValue = null;
        try {
            String valueString = objectMapper.writeValueAsString(value);
            if (expire <= 0) {
                executorValue = jedis.set(key, valueString);
            } else {
                executorValue = jedis.setex(key, expire, valueString);
            }
        } catch (Exception e) {
            log.error("redis  executor error: ", e);
            jedisPool.returnBrokenResource(jedis);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return executorValue;
    }


    /**
     * 获取 对象
     *
     * @param key 键
     * @return
     */
    public <T> T getObject(String key, TypeReference<T> clazz) {
        Jedis jedis = jedisPool.getResource();
        T executorValue = null;
        try {
            String value = jedis.get(key);
            executorValue = objectMapper.readValue(value, clazz);
        } catch (Exception e) {
            log.error("redis  executor error: ", e);
            jedisPool.returnBrokenResource(jedis);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return executorValue;
    }
}

```



### 6、新建springmvc配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           https://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/mvc
           https://www.springframework.org/schema/mvc/spring-mvc.xsd
">

    <!--    扫包-->
    <context:component-scan base-package="com.ilovesshan.controller"/>

    <!--    支持 springmvc的注解-->
    <mvc:annotation-driven validator="localValidator">
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
                <!-- 自定义Jackson的objectMapper -->
                <property name="objectMapper" ref="customObjectMapper"/>
                <!-- 自定义Jackson的objectMapper -->
                <property name="supportedMediaTypes">
                    <list>
                        <value>text/plain;charset=UTF-8</value>
                        <value>application/json;charset=UTF-8</value>
                    </list>
                </property>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>

    <!--    配置视图资源解析器 springmvc 默认-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="order" value="10"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <bean id="localValidator" class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean">
        <property name="providerClass" value="org.hibernate.validator.HibernateValidator"/>
    </bean>


    <!-- 配置Thymeleaf视图解析器 -->
    <bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">

                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>

                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8"/>
                    </bean>
                </property>
            </bean>
        </property>
    </bean>

    <!-- 配置MultipartResolver，用于上传文件，使用spring的CommonsMultipartResolver -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="maxUploadSize" value="5000000"/>
        <property name="defaultEncoding" value="UTF-8"/>
    </bean>


    <!--    配置静态资源信息-->
    <!--    <mvc:resources mapping="/js/**" location="/static/js/"/>-->
    <!--    <mvc:resources mapping="/css/**" location="/static/css/"/>-->
    <!--    <mvc:resources mapping="/images/**" location="/static/images/"/>-->

    <!--    配置拦截器-->
    <!--    <mvc:interceptors>-->
    <!--        <mvc:interceptor>-->
    <!--            <mvc:mapping path="/**"/>-->
    <!--            <mvc:exclude-mapping path="/login"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.css"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.js"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.png"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.gif"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.jpg"/>-->
    <!--            <mvc:exclude-mapping path="/**/*.jpeg"/>-->
    <!--            <bean class="com.ilovesshan.interceptor.LoginInterceptor"/>-->
    <!--        </mvc:interceptor>-->
    <!--    </mvc:interceptors>-->

    <!--    配置 视图控制器-->
    <mvc:view-controller path="/" view-name="index"/>

</beans>
```

```java
package com.ilovesshan.common;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

@Component
public class CustomObjectMapper extends ObjectMapper {

    public CustomObjectMapper() {
        super();
        //去掉默认的时间戳格式
        configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        //设置为东八区
        setTimeZone(TimeZone.getTimeZone("GMT+8"));
        //设置日期转换yyyy-MM-dd HH:mm:ss
        setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        // 设置输入:禁止把POJO中值为null的字段映射到json字符串中
        configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
        // 空值不序列化
        // setSerializationInclusion(JsonInclude.Include.NON_NULL);
        // 反序列化时，属性不存在的兼容处理
        getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        // 序列化枚举是以toString()来输出，默认false，即默认以name()来输出
        configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
    }
}
```



### 7、修改web.xml文件

1. 修改web.xml文件，配置加载spring和springmvc配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
   
       <!--    解决乱码问题-->
       <filter>
           <filter-name>characterEncodingFilter</filter-name>
           <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
           <init-param>
               <param-name>encoding</param-name>
               <param-value>UTF-8</param-value>
           </init-param>
           <init-param>
               <param-name>forceRequestEncoding</param-name>
               <param-value>true</param-value>
           </init-param>
           <init-param>
               <param-name>forceResponseEncoding</param-name>
               <param-value>true</param-value>
           </init-param>
       </filter>
   
       <filter-mapping>
           <filter-name>characterEncodingFilter</filter-name>
           <url-pattern>/*</url-pattern>
       </filter-mapping>
   
       <!--    注册spring -->
       <listener>
           <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
       </listener>
       <context-param>
           <param-name>contextConfigLocation</param-name>
           <param-value>classpath:application.xml</param-value>
       </context-param>
   
       <!--    注册核心控制器(springmvc)-->
       <servlet>
           <servlet-name>dispatcherServlet</servlet-name>
           <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
           <init-param>
               <param-name>contextConfigLocation</param-name>
               <param-value>classpath:springmvc.xml</param-value>
           </init-param>
       </servlet>
   
       <servlet-mapping>
           <servlet-name>dispatcherServlet</servlet-name>
           <url-pattern>/</url-pattern>
       </servlet-mapping>
   </web-app>
   ```

   



### 7、编写业务代码

1. 编写controller、service、mapper代码

### 8、编写测试类

### 9、添加tomcat，进行项目部署



## idea插件配置

### mybatis调试插件

1. MyBatis Log Free

### mybaits逆向工程

1. 代码生成方式

   + 代码生成工具 Easy Code

2. 通过插件方式

   + pom.xml

     ```xml
     <!-- 控制Maven在构建过程中相关配置 -->
     <build>
         <!-- 构建过程中用到的插件 -->
         <plugins>
             <!-- maven 编译插件 -->
             <plugin>
                 <groupId>org.apache.maven.plugins</groupId>
                 <artifactId>maven-compiler-plugin</artifactId>
                 <version>3.8.1</version>
                 <configuration>
                     <source>17</source>
                     <target>17</target>
                 </configuration>
             </plugin>
     
             <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
             <plugin>
                 <groupId>org.mybatis.generator</groupId>
                 <artifactId>mybatis-generator-maven-plugin</artifactId>
                 <version>1.3.2</version>
                 <configuration>
                     <configurationFile>${basedir}/src/main/resources/generator-config.xml</configurationFile>
                     <overwrite>true</overwrite>
                     <verbose>true</verbose>
                 </configuration>
                 <!-- 插件的依赖 -->
                 <dependencies>
                     <!-- 逆向工程的核心依赖 -->
                     <dependency>
                         <groupId>org.mybatis.generator</groupId>
                         <artifactId>mybatis-generator-core</artifactId>
                         <version>1.3.2</version>
                     </dependency>
                     <!-- MySQL驱动 -->
                     <dependency>
                         <groupId>mysql</groupId>
                         <artifactId>mysql-connector-java</artifactId>
                         <version>8.0.30</version>
                     </dependency>
                 </dependencies>
             </plugin>
         </plugins>
     </build>
     ```

     

   + generator-config.xml

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!DOCTYPE generatorConfiguration
             PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
             "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
     <generatorConfiguration>
         <!--
             targetRuntime: 执行生成的逆向工程的版本
             MyBatis3Simple: 生成基本的CRUD（清新简洁版）
             MyBatis3: 生成带条件的CRUD（奢华尊享版）
         -->
         <context id="DB2Tables" targetRuntime="MyBatis3Simple">
     
             <!--定义生成的java类的编码格式-->
             <property name="javaFileEncoding" value="UTF-8"/>
     
             <!--去掉注释-->
             <commentGenerator>
                 <property name="suppressAllComments" value="true"/>
             </commentGenerator>
     
             <!-- 数据库的连接信息 -->
             <jdbcConnection
                             driverClass="com.mysql.cj.jdbc.Driver"
                             connectionURL="jdbc:mysql://localhost:3306/powernode_mybatis"
                             userId="root"
                             password="123456">
             </jdbcConnection>
     
             <!-- javaBean的生成策略-->
             <javaModelGenerator targetPackage="com.ilovesshan.pojo" targetProject=".\src\main\java">
                 <property name="enableSubPackages" value="true"/>
                 <property name="trimStrings" value="true"/>
             </javaModelGenerator>
     
             <!-- SQL映射文件的生成策略 -->
             <sqlMapGenerator targetPackage="com.ilovesshan.mapper" targetProject=".\src\main\resources">
                 <property name="enableSubPackages" value="true"/>
             </sqlMapGenerator>
     
             <!-- Mapper接口的生成策略 -->
             <javaClientGenerator type="XMLMAPPER" targetPackage="com.ilovesshan.mapper" targetProject=".\src\main\java">
                 <property name="enableSubPackages" value="true"/>
             </javaClientGenerator>
     
             <!-- 逆向分析的表 -->
             <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
             <!-- domainObjectName属性指定生成出来的实体类的类名 -->
             <table tableName="t_car" domainObjectName="Car"/>
     
         </context>
     
     </generatorConfiguration>
     ```

     

### Easy Code 自定义模板配置

1. Controller层

   ```java
   ##定义初始变量
   #set($tableName = $tool.append($tableInfo.name, "Controller"))
   ##设置回调
   $!callback.setFileName($tool.append($tableName, ".java"))
   $!callback.setSavePath($tool.append($tableInfo.savePath, "/controller"))
   ##拿到主键
   #if(!$tableInfo.pkColumn.isEmpty())
       #set($pk = $tableInfo.pkColumn.get(0))
   #end
   
   #if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}controller;
   
   import $!{tableInfo.savePackageName}.pojo.$!{tableInfo.name};
   import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.PageRequest;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.*;
   
   import javax.annotation.Resource;
   
   /**
    * $!{tableInfo.comment}($!{tableInfo.name})表控制层
    *
    * @author $!author
    * @since $!time.currTime()
    */
   @RestController
   @RequestMapping("/$!tool.firstLowerCase($tableInfo.name)")
   public class $!{tableName} {
       /**
        * 服务对象
        */
       @Resource
       private $!{tableInfo.name}Service $!tool.firstLowerCase($tableInfo.name)Service;
   
       /**
        * 分页查询
        *
        * @param $!{tool.firstLowerCase($tableInfo.name)} 筛选条件
        * @param pageNum  分页页数
        * @param pageSize 分页条数
        * @return 查询结果
        */
       @GetMapping
       public ResponseEntity<Page<$!{tableInfo.name}>> queryByPage($!{tableInfo.name} $!{tool.firstLowerCase($tableInfo.name)},  @RequestParam("pageSize") Integer pageSize, @RequestParam("pageNum") Integer pageNum) {
           return ResponseEntity.ok(this.$!{tool.firstLowerCase($tableInfo.name)}Service.queryByPage($!{tool.firstLowerCase($tableInfo.name)}, PageRequest.of(pageNum - 1, pageSize)));
       }
   
       /**
        * 通过主键查询单条数据
        *
        * @param id 主键
        * @return 单条数据
        */
       @GetMapping("/{id}")
       public ResponseEntity<$!{tableInfo.name}> queryById(@PathVariable("id") $!pk.shortType id) {
           return ResponseEntity.ok(this.$!{tool.firstLowerCase($tableInfo.name)}Service.queryById(id));
       }
   
       /**
        * 新增数据
        *
        * @param $!{tool.firstLowerCase($tableInfo.name)} 实体
        * @return 新增结果
        */
       @PostMapping
       public ResponseEntity<$!{tableInfo.name}> add($!{tableInfo.name} $!{tool.firstLowerCase($tableInfo.name)}) {
           return ResponseEntity.ok(this.$!{tool.firstLowerCase($tableInfo.name)}Service.insert($!{tool.firstLowerCase($tableInfo.name)}));
       }
   
       /**
        * 编辑数据
        *
        * @param $!{tool.firstLowerCase($tableInfo.name)} 实体
        * @return 编辑结果
        */
       @PutMapping
       public ResponseEntity<$!{tableInfo.name}> edit($!{tableInfo.name} $!{tool.firstLowerCase($tableInfo.name)}) {
           return ResponseEntity.ok(this.$!{tool.firstLowerCase($tableInfo.name)}Service.update($!{tool.firstLowerCase($tableInfo.name)}));
       }
   
       /**
        * 删除数据
        *
        * @param id 主键
        * @return 删除是否成功
        */
       @DeleteMapping
       public ResponseEntity<Boolean> deleteById($!pk.shortType id) {
           return ResponseEntity.ok(this.$!{tool.firstLowerCase($tableInfo.name)}Service.deleteById(id));
       }
   
   }
   
   ```

   

2. Service层

   ```java
   ##定义初始变量
   #set($tableName = $tool.append($tableInfo.name, "Service"))
   ##设置回调
   $!callback.setFileName($tool.append($tableName, ".java"))
   $!callback.setSavePath($tool.append($tableInfo.savePath, "/service"))
   
   ##拿到主键
   #if(!$tableInfo.pkColumn.isEmpty())
       #set($pk = $tableInfo.pkColumn.get(0))
   #end
   
   #if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service;
   
   import $!{tableInfo.savePackageName}.pojo.$!{tableInfo.name};
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.PageRequest;
   
   /**
    * $!{tableInfo.comment}($!{tableInfo.name})表服务接口
    *
    * @author $!author
    * @since $!time.currTime()
    */
   public interface $!{tableName} {
   
       /**
        * 通过ID查询单条数据
        *
        * @param $!pk.name 主键
        * @return 实例对象
        */
       $!{tableInfo.name} queryById($!pk.shortType $!pk.name);
   
       /**
        * 分页查询
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 筛选条件
        * @param pageRequest      分页对象
        * @return 查询结果
        */
       Page<$!{tableInfo.name}> queryByPage($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}), PageRequest pageRequest);
   
       /**
        * 新增数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 实例对象
        */
       $!{tableInfo.name} insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
   
       /**
        * 修改数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 实例对象
        */
       $!{tableInfo.name} update($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
   
       /**
        * 通过主键删除数据
        *
        * @param $!pk.name 主键
        * @return 是否成功
        */
       boolean deleteById($!pk.shortType $!pk.name);
   
   }
   ```

   

3. ServiceImpl层

   ```java
   ##定义初始变量
   #set($tableName = $tool.append($tableInfo.name, "ServiceImpl"))
   ##设置回调
   $!callback.setFileName($tool.append($tableName, ".java"))
   $!callback.setSavePath($tool.append($tableInfo.savePath, "/service/impl"))
   
   ##拿到主键
   #if(!$tableInfo.pkColumn.isEmpty())
       #set($pk = $tableInfo.pkColumn.get(0))
   #end
   
   #if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service.impl;
   
   import $!{tableInfo.savePackageName}.pojo.$!{tableInfo.name};
   import $!{tableInfo.savePackageName}.mapper.$!{tableInfo.name}Mapper;
   import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
   import org.springframework.stereotype.Service;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.PageImpl;
   import org.springframework.data.domain.PageRequest;
   
   import javax.annotation.Resource;
   
   /**
    * $!{tableInfo.comment}($!{tableInfo.name})表服务实现类
    *
    * @author $!author
    * @since $!time.currTime()
    */
   @Service("$!tool.firstLowerCase($!{tableInfo.name})Service")
   public class $!{tableName} implements $!{tableInfo.name}Service {
       @Resource
       private $!{tableInfo.name}Mapper $!tool.firstLowerCase($!{tableInfo.name})Mapper;
   
       /**
        * 通过ID查询单条数据
        *
        * @param $!pk.name 主键
        * @return 实例对象
        */
       @Override
       public $!{tableInfo.name} queryById($!pk.shortType $!pk.name) {
           return this.$!{tool.firstLowerCase($!{tableInfo.name})}Mapper.queryById($!pk.name);
       }
   
       /**
        * 分页查询
        *
        * @param $!{tool.firstLowerCase($tableInfo.name)} 筛选条件
        * @param pageRequest      分页对象
        * @return 查询结果
        */
       @Override
       public Page<$!{tableInfo.name}> queryByPage($!{tableInfo.name} $!{tool.firstLowerCase($tableInfo.name)}, PageRequest pageRequest) {
           long total = this.$!{tool.firstLowerCase($tableInfo.name)}Mapper.count($!{tool.firstLowerCase($tableInfo.name)});
           return new PageImpl<>(this.$!{tool.firstLowerCase($tableInfo.name)}Mapper.queryAllByLimit($!{tool.firstLowerCase($tableInfo.name)}, pageRequest), pageRequest, total);
       }
   
       /**
        * 新增数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 实例对象
        */
       @Override
       public $!{tableInfo.name} insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
           this.$!{tool.firstLowerCase($!{tableInfo.name})}Mapper.insert($!tool.firstLowerCase($!{tableInfo.name}));
           return $!tool.firstLowerCase($!{tableInfo.name});
       }
   
       /**
        * 修改数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 实例对象
        */
       @Override
       public $!{tableInfo.name} update($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name})) {
           this.$!{tool.firstLowerCase($!{tableInfo.name})}Mapper.update($!tool.firstLowerCase($!{tableInfo.name}));
           return this.queryById($!{tool.firstLowerCase($!{tableInfo.name})}.get$!tool.firstUpperCase($pk.name)());
       }
   
       /**
        * 通过主键删除数据
        *
        * @param $!pk.name 主键
        * @return 是否成功
        */
       @Override
       public boolean deleteById($!pk.shortType $!pk.name) {
           return this.$!{tool.firstLowerCase($!{tableInfo.name})}Mapper.deleteById($!pk.name) > 0;
       }
   }
   ```

   

4. Mapper层

   ```java
   ##定义初始变量
       #set($tableName = $tool.append($tableInfo.name, "Mapper"))
       ##设置回调
       $!callback.setFileName($tool.append($tableName, ".java"))
       $!callback.setSavePath($tool.append($tableInfo.savePath, "/mapper"))
   
       ##拿到主键
       #if(!$tableInfo.pkColumn.isEmpty())
       #set($pk = $tableInfo.pkColumn.get(0))
       #end
   
       #if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}mapper;
   
   import $!{tableInfo.savePackageName}.pojo.$!{tableInfo.name};
   import org.apache.ibatis.annotations.Param;
   import org.springframework.data.domain.Pageable;
   import java.util.List;
   
   /**
    * $!{tableInfo.comment}($!{tableInfo.name})表数据库访问层
    *
    * @author $!author
    * @since $!time.currTime()
    */
   public interface $!{tableName} {
   
       /**
        * 通过ID查询单条数据
        *
        * @param $!pk.name 主键
        * @return 实例对象
        */
       $!{tableInfo.name} queryById($!pk.shortType $!pk.name);
   
       /**
        * 查询指定行数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 查询条件
        * @param pageable         分页对象
        * @return 对象列表
        */
       List<$!{tableInfo.name}> queryAllByLimit(@Param("$!tool.firstLowerCase($!{tableInfo.name})") $!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}), @Param("pageable") Pageable pageable);
   
       /**
        * 统计总行数
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 查询条件
        * @return 总行数
        */
       long count($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
   
       /**
        * 新增数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 影响行数
        */
       int insert($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
   
       /**
        * 批量新增数据（MyBatis原生foreach方法）
        *
        * @param entities List<$!{tableInfo.name}> 实例对象列表
        * @return 影响行数
        */
       int insertBatch(@Param("entities") List<$!{tableInfo.name}> entities);
   
       /**
        * 批量新增或按主键更新数据（MyBatis原生foreach方法）
        *
        * @param entities List<$!{tableInfo.name}> 实例对象列表
        * @return 影响行数
        * @throws org.springframework.jdbc.BadSqlGrammarException 入参是空List的时候会抛SQL语句错误的异常，请自行校验入参
        */
       int insertOrUpdateBatch(@Param("entities") List<$!{tableInfo.name}> entities);
   
       /**
        * 修改数据
        *
        * @param $!tool.firstLowerCase($!{tableInfo.name}) 实例对象
        * @return 影响行数
        */
       int update($!{tableInfo.name} $!tool.firstLowerCase($!{tableInfo.name}));
   
       /**
        * 通过主键删除数据
        *
        * @param $!pk.name 主键
        * @return 影响行数
        */
       int deleteById($!pk.shortType $!pk.name);
   
   }
   
   ```

   

5. Mapper.xml

   ```xml
   ##引入mybatis支持
   $!{mybatisSupport.vm}
   
   ##设置保存名称与保存位置
   $!callback.setFileName($tool.append($!{tableInfo.name}, "Mapper.xml"))
   $!callback.setSavePath($tool.append($modulePath, "/src/main/resources/mapper"))
   
   ##拿到主键
   #if(!$tableInfo.pkColumn.isEmpty())
   #set($pk = $tableInfo.pkColumn.get(0))
   #end
   
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <mapper namespace="$!{tableInfo.savePackageName}.mapper.$!{tableInfo.name}Mapper">
   
       <resultMap type="$!{tableInfo.savePackageName}.pojo.$!{tableInfo.name}" id="$!{tableInfo.name}Map">
           #foreach($column in $tableInfo.fullColumn)
           <result property="$!column.name" column="$!column.obj.name" jdbcType="$!column.ext.jdbcType"/>
           #end
       </resultMap>
   
       <!--查询单个-->
       <select id="queryById" resultMap="$!{tableInfo.name}Map">
           select
           #allSqlColumn()
   
           from $!tableInfo.obj.name
           where $!pk.obj.name = #{$!pk.name}
       </select>
   
       <!--查询指定行数据-->
       <select id="queryAllByLimit" resultMap="$!{tableInfo.name}Map">
           select
           #allSqlColumn()
   
           from $!tableInfo.obj.name
           <where>
               #foreach($column in $tableInfo.fullColumn)
               <if test="$!tool.firstLowerCase($!{tableInfo.name}).$!column.name != null#if($column.type.equals("java.lang.String")) and $!tool.firstLowerCase($!{tableInfo.name}).$!column.name != ''#end">
                   and $!column.obj.name = #{$!tool.firstLowerCase($!{tableInfo.name}).$!column.name}
               </if>
               #end
           </where>
           limit #{pageable.offset}, #{pageable.pageSize}
       </select>
   
       <!--统计总行数-->
       <select id="count" resultType="java.lang.Long">
           select count(1)
           from $!tableInfo.obj.name
           <where>
               #foreach($column in $tableInfo.fullColumn)
               <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                   and $!column.obj.name = #{$!column.name}
               </if>
               #end
           </where>
       </select>
   
       <!--新增所有列-->
       <insert id="insert" keyProperty="$!pk.name" useGeneratedKeys="true">
           insert into $!{tableInfo.obj.name}(#foreach($column in $tableInfo.otherColumn)$!column.obj.name#if($velocityHasNext), #end#end)
           values (#foreach($column in $tableInfo.otherColumn)#{$!{column.name}}#if($velocityHasNext), #end#end)
       </insert>
   
       <insert id="insertBatch" keyProperty="$!pk.name" useGeneratedKeys="true">
           insert into $!{tableInfo.obj.name}(#foreach($column in $tableInfo.otherColumn)$!column.obj.name#if($velocityHasNext), #end#end)
           values
           <foreach collection="entities" item="entity" separator=",">
               (#foreach($column in $tableInfo.otherColumn)#{entity.$!{column.name}}#if($velocityHasNext), #end#end)
           </foreach>
       </insert>
   
       <insert id="insertOrUpdateBatch" keyProperty="$!pk.name" useGeneratedKeys="true">
           insert into $!{tableInfo.obj.name}(#foreach($column in $tableInfo.otherColumn)$!column.obj.name#if($velocityHasNext), #end#end)
           values
           <foreach collection="entities" item="entity" separator=",">
               (#foreach($column in $tableInfo.otherColumn)#{entity.$!{column.name}}#if($velocityHasNext), #end#end)
           </foreach>
           on duplicate key update
           #foreach($column in $tableInfo.otherColumn)$!column.obj.name = values($!column.obj.name)#if($velocityHasNext),
           #end#end
   
       </insert>
   
       <!--通过主键修改数据-->
       <update id="update">
           update $!{tableInfo.obj.name}
           <set>
               #foreach($column in $tableInfo.otherColumn)
               <if test="$!column.name != null#if($column.type.equals("java.lang.String")) and $!column.name != ''#end">
                   $!column.obj.name = #{$!column.name},
               </if>
               #end
           </set>
           where $!pk.obj.name = #{$!pk.name}
       </update>
   
       <!--通过主键删除-->
       <delete id="deleteById">
           delete from $!{tableInfo.obj.name} where $!pk.obj.name = #{$!pk.name}
       </delete>
   
   </mapper>
   
   ```

6. POJO

   ```java
   ##引入宏定义
       $!{define.vm}
   
   ##使用宏定义设置回调（保存位置与文件后缀）
       #save("/pojo", ".java")
   
       ##使用宏定义设置包后缀
       #setPackageSuffix("pojo")
   
       ##使用全局变量实现默认包导入
       $!{autoImport.vm}
   import java.io.Serializable;
   
   ##使用宏定义实现类注释信息
       #tableComment("实体类")
       public class $!{tableInfo.name} implements Serializable {
           private static final long serialVersionUID = $!tool.serial();
           #foreach($column in $tableInfo.fullColumn)
               #if(${column.comment})/**
        * ${column.comment}
        */#end
   
               private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
           #end
   
               #foreach($column in $tableInfo.fullColumn)
               ##使用宏定义实现get,set方法
               #getSetMethod($column)
               #end
       }
   ```
