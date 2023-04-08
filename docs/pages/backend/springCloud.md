Spring Cloud

## 微服务导学

### 什么是微服务

1. 微服务简单总结就是：微服务是一种架构风格，将一个大的项目拆分成多个模块（服务），每一个模块可以独立运行。
2. 总结的确实有点简单，对于初学者来说知道这个概念就OK了。
3. 至于为什么要拆分成多个模块？怎么样拆分模块？拆分的模块如何进行管理和维护，各个模块之间如何通信？这些都不用担心，后面会学习！！



### 单体架构

1. 先看一个单体架构的简单结构图，项目中使用同一个数据库，而且没有对项目服务模块拆分，而是将项目部署在同一台服务器上。

   ![image-20230408161126340](../../.vuepress/public/image-20230408161126340.png)

2. 单体架构有什么优点？

   + 部署简单、架构成本低，比较适用于中小型项目。

3. 单体架构的缺点？

   + 项目代码耦合度高、扩展性差、一旦服务器宕机整个项目将无法运行。
   + 单体架构所有的模块开发都是要使用一样的技术。

### 分布式架构

1. 下面是基于分布式架构的简单示意图，将项目的模块进行了拆分并且部署到不同的服务器上、每个模块都对应不同的数据库。

   ![image-20230408162745011](../../.vuepress/public/image-20230408162745011.png)

2. 分布式架构有什么优点？

   + 代码松耦合、扩展性较强、每个模块都可以使用不同的技术开发模式更灵活。
   + 即使是某个服务器宕机、也不会影响整个项目，微服务架构比较适用于开发互联网大型项目，例如：京东、淘宝。

3. 分布式架构的缺点？

   + 架构比较复杂、开发难度较大。

     

### 微服务架构

1. 微服务架构是经过良好架构设计的分布式架构方案，微服务架构特点：
   + 单一职责：微服务拆分力度更小，每一个服务都对应唯一的业务能力，做到单一职责避免业务重复开发。
   + 面向服务：微服务对外暴露业务接口，方便各模块之间数据通信。
   + 独立自治：团队对立、技术独立、数据独立、部署独立。
   + 隔离性：服务调用做好隔离、容错、降级避免出现级联问题。
2. 微服务是一种良好的分布四架构方案
   + 优点：拆分力度更小、服务更独立、耦合度更低。
   + 缺点：架构非常复杂、监控、部署难度提高。



### Spring Cloud 简介

1. Spring Cloud是目前国内使用最广泛的微服务框架，官网地址：https://spring.io/projects/spring-cloud。

2. SpringCloud集成了各种微服务功能组件，并基于SpringBoot实现了这些组件的自动装配，从而提供了良好的开箱即用体验

   + 服务注册发现

     + Eureka、Nacos、Consul

   + 统一配置管理

     + SpringCloudCoofig、Nacos

   + 服务远程调用

     + OpenFeign、Dubbo

   + 统一网关路由

     + SpringCloudGetWay、Zuul

   + 服务链路监控

     + ZipKin、Sleuth

   + 流控、降级、保护

     + Hystix、Sentinel

       

3. Spring Cloud和SpringBoot版本关系对照表

   | Release Train                                                | Release Train                         |
   | ------------------------------------------------------------ | ------------------------------------- |
   | [2022.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes) aka Kilburn | 3.0.x                                 |
   | [2021.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes) aka Jubilee | 2.6.x, 2.7.x (Starting with 2021.0.3) |
   | [2020.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes) aka Ilford | 2.4.x, 2.5.x (Starting with 2020.0.3) |
   | [Hoxton](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes) | 2.2.x, 2.3.x (Starting with SR5)      |
   | [Greenwich](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes) | 2.1.x                                 |
   | [Finchley](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes) | 2.0.x                                 |
   | [Edgware](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes) | 1.5.x                                 |
   | [Dalston](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes) | 1.5.x                                 |



### 微服务拆分案例

1. 将项目拆分成两个模块，分别是user-server（用户模块）和order-service（订单模块），springboot01作为user-server和order-server的父模块，user-server和order-server都是SpringBoot项目（需要手动写一下启动口类和相关配置文件application.yml，因为这是创建的Maven工程而不是通过spring initializr创建的工程），我们需要在springboot01的pom文件中引入公共依赖，再在user-server和order-server子工程中引入所需要的依赖。

   ```xml
   <!-- 将当前项目声明为 springboot 项目 -->
   <parent>
       <artifactId>spring-boot-starter-parent</artifactId>
       <groupId>org.springframework.boot</groupId>
       <version>2.5.0</version>
   </parent>
   
   <!-- 定义依赖版本 -->
   <properties>
       <maven.compiler.source>17</maven.compiler.source>
       <maven.compiler.target>17</maven.compiler.target>
       <spring-boot-starter-web.version>3.0.5</spring-boot-starter-web.version>
       <mysql-connector-j.version>8.0.32</mysql-connector-j.version>
       <mybatis-spring-boot-starter.version>2.2.2</mybatis-spring-boot-starter.version>
       <spring-cloud-dependencies.version>2021.0.1</spring-cloud-dependencies.version>
       <lombok.version>1.18.26</lombok.version>
   </properties>
   
   <dependencyManagement>
       <dependencies>
           <!-- spring-cloud依赖 -->
           <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-dependencies</artifactId>
               <version>${spring-cloud-dependencies.version}</version>
               <type>pom</type>
           </dependency>
   
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
               <version>${spring-boot-starter-web.version}</version>
           </dependency>
   
           <dependency>
               <groupId>com.mysql</groupId>
               <artifactId>mysql-connector-j</artifactId>
               <version>${mysql-connector-j.version}</version>
           </dependency>
   
           <dependency>
               <groupId>org.mybatis.spring.boot</groupId>
               <artifactId>mybatis-spring-boot-starter</artifactId>
               <version>${mybatis-spring-boot-starter.version}</version>
           </dependency>
   
           <dependency>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <version>${lombok.version}</version>
           </dependency>
       </dependencies>
   </dependencyManagement>
   ```

   

2. user-server使用 springcloud-user数据库，order-service使用 springcloud-order数据库，再分别提供一个根据ID查询信息的接口。省略了实体类、service层和mapper层代码...（和平时使用SpringBoot框架开发一样搞就行了）。

   + springcloud-user

     ```java
     @RestController
     @RequiredArgsConstructor
     public class UserController {
     
         private final UserService userService;
     
         @GetMapping("/{id}")
         public Object getUserById(@PathVariable("id") Integer id) {
             return userService.selectById(id);
         }
     }
     ```

     

   + order-service

     ```java
     @RestController
     @RequiredArgsConstructor
     public class OrderController {
     
         private final OrderService orderService;
     
         @GetMapping("/{id}")
         public Object getOrderById(@PathVariable("id") Integer id) {
             return orderService.selectById(id);
         }
     }
     ```

3. 分别配置user-server和order-server的application.yml文件，因为他们是两个单独的服务，使用的数据库也不一样，所以要单独配置服务端口和数据库连接信息。

   + user-server

     ```yaml
     server:
       port: 8081
       servlet:
         context-path: /orders
     
     spring:
       datasource:
         driver-class-name: com.mysql.cj.jdbc.Driver
         url: jdbc:mysql://localhost:3306/springcloud-order
         username: root
         password: 123456
     
     mybatis:
       configuration:
         log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
         map-underscore-to-camel-case: true
     ```

     

   + order-server

     ```yaml
     server:
       port: 8082
       servlet:
         context-path: /users
     
     spring:
       datasource:
         driver-class-name: com.mysql.cj.jdbc.Driver
         url: jdbc:mysql://localhost:3306/springcloud-user
         username: root
         password: 123456
     
     mybatis:
       configuration:
         log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
         map-underscore-to-camel-case: true
     ```

4. 浏览器访问两个服务的接口

   + user-server

     ![image-20230408192310019](../../.vuepress/public/image-20230408192310019.png)

   + order-server

     ![image-20230408192410411](../../.vuepress/public/image-20230408192410411.png)



### 服务间接口调用

1. 现在有一个新需要，访问订单信息的时候，我需要拿到用户信息！

   + 在单体架构中，我们搞一个UserService调一下业务方法就ok了，但是现在不是单体架构是基于微服务架构，用户模块和订单模块已经分开了，部署在两个不同的服务器，你要是现在还在想UserService那就没搞头了！！
   + order-server模块怎么样才能访问到user-server模块的数据呢？
     + 浏览器可以发送HTTP请求去获取user-server中的数据，user-server到时候会响应一串json字符串回来。
     + 那么在order-server模块中不一样也可以发送HTTP请求嘛，我在OrdeService中请求user-serve模块中的接口，user-server到时候再给我响应一串json，我都能拿到数据了，我自己再处理一下不就ok了？
     + 有了这个思路，那就成功了一大半了，在SprinBoot项目中可以使用RestTemplate对象发送Http请求，RestTemplate还能够将json字符串转成JavaBean对象，太爽了...

2. 微服务调用方式

   + 基于RestTemplate发起的HTTP请求实现远程调用。
   + HTTP请求做远程调用是与语言无关的调用，只要知道对方的ip、端口、接口路径、请求参数即可。

3. 使用RestTemplate访问服务API接口

   + 先将RestTemplate注入到Sring容器中

     ```java
     @Configuration
     public class AppConfiguration {
         /**
          * RestTemplate 提供远程服务接口调用能力
          */
         @Bean
         public RestTemplate restTemplate() {
             return new RestTemplate();
         }
     }
     ```

     

   + 在OrderService的业务方法中，使用RestTemplate访问服务API接口

     ```java
     @Service
     @RequiredArgsConstructor
     public class OrderServiceImpl implements OrderService {
     
         private final OrderMapper orderMapper;
         private final RestTemplate restTemplate;
     
         @Override
         public Order selectById(Integer id) {
             Order order = orderMapper.selectById(id);
     
             // 通过 restTemplate 调用user-service服务模块的API接口
             String url = "http://localhost:8082/users/" + order.getUserId();
             User user = restTemplate.getForObject(url, User.class);
             order.setUser(user);
             return order;
         }
     }
     
     ```

     

   + 浏览器测试（okok，搞定~~）

     ![image-20230408193943571](../../.vuepress/public/image-20230408193943571.png)



## Eureka 注册中心

### Eureka 解决什么问题

1. 远程服务调用中出现的问题

   ![image-20230408221446286](../../.vuepress/public/image-20230408221446286.png)

   

2. Eureka 注册中心其实就可以解决上述问题，Eureka原理简单示意图。

   ![image-20230408211050730](../../.vuepress/public/image-20230408211050730.png)

   



### 服务提供者和服务消费者

1. 什么是服务提供者？什么是服务消费者？
   + order-server调用user-server的服务接口，那么user-server就是服务提供者，反之order-server就是服务消费者！
2. A服务调用B服务，B服务又调用C服务，那么B是服务提供者还是服务消费者？
   + 这是一个相对问题概念，B服务对于A服务来说B服务就充当服务提供者，B服务对C服务来说B服务就充当服务消费者。
   + 任何一个服务都可以充当服务提供者角色也可以充当服务消费者角色，只不过看相对于谁。
3. 在Eureka架构中，微服务角色有两类
   + EurekaServer：服务端，注册中心
     + 记录服务信息、心跳监控
   + EurekaClient：客户端
     + Provider：服务提供者，例如案例中的 user-server
       + 注册自己的信息到EurekaServer
       + 每隔30秒向EurekaServer发送心跳
     + consumer：服务消费者，例如案例中的 order-server
       + 根据服务名称从EurekaServer拉取服务列表
       + 基于服务列表做负载均衡，选中一个微服务后发起远程调用

### 搭建Eureka Server

1. 引入依赖（需要新建立一个模块eureka-server，案例代码还是在springboot01工程基础上），依赖统一在父工程进行声明。

   ```xml
   <!-- 手动指定了版本号、按道理可以不用管版本号的（可能是Maven或者IDEA问题）-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
       <version>3.1.5</version>
   </dependency>
   ```

2. 启动类添加@EnableEurekaServer注解

   ```java
   @EnableEurekaServer
   @SpringBootApplication
   public class EurekaApplication {
       public static void main(String[] args) {
           SpringApplication.run(EurekaApplication.class, args);
       }
   }
   ```

   

3. 编辑配置文件

   ```yaml
   server:
   # eureka 服务端口
     port: 10010
   
   spring:
     application:
       # eureka 服务名称
       name: eurekaServer
   
   eureka:
     client:
       service-url:
         # eureka 服务运行地址(浏览器访问的是http://127.0.0.1:10010, 但是eureka/后缀不能省略)
         defaultZone: http://127.0.0.1:10010/eureka/
   ```

   

4. 浏览器访问：http://localhost:10010/，在DS Replicas下，Instances currently registered with Eureka中会发现有一个运行实例，名字叫：EUREKASERVER，这就是当前的Eureka服务（也被注册到注册中心了）。

   ![image-20230408220052311](../../.vuepress/public/image-20230408220052311.png)

   

### 服务注册

1. 在user-server和order-server模块中分别添加依赖

   ```xml
   <!-- 注意：这是eureka的客户端依赖， 上面那个是eureka服务端依赖，可以使用相同版本-->
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
   ```

   

2. 在user-server和order-server模块中分别添加配置

   ```yaml
   spring:
     application:
       # 配置服务名称（order-server模块同理）
       name: userService
   
   eureka:
     client:
       service-url:
         # 配置服务地址，将当前服务注册到该地址上
         defaultZone: http://127.0.0.1:10010/eureka/
   ```

   

3. 重启服务，再次访问http://localhost:10010/

   ![image-20230408221002943](../../.vuepress/public/image-20230408221002943.png)

   

4. 重启之后，再次访问页面，如果界面中有一串下面这种红色文字，可以参考：https://blog.csdn.net/hadues/article/details/105023709

   `EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE`

   

### 服务发现

1. 服务发现主要就是来解决，远程服务调用中存在的问题呗！

   + IP地址和端口号硬编码问题，多个服务如何做负载均衡？

     

2. 在OrderServiceImpl业务方法中进行代码修改

   ```java
   @Service
   @RequiredArgsConstructor
   public class OrderServiceImpl implements OrderService {
   
       private final OrderMapper orderMapper;
       private final RestTemplate restTemplate;
   
       @Override
       public Order selectById(Integer id) {
           Order order = orderMapper.selectById(id);
   
           // 通过 restTemplate 调用user-service服务模块的API接口
           // String url = "http://localhost:8082/users/" + order.getUserId();
   
           // 对于IP地址和端口号不再采用硬编码方式，而是通过服务名称向eureka注册中心索要服务信息
           String url = "http://userServer/users/" + order.getUserId();
           User user = restTemplate.getForObject(url, User.class);
           order.setUser(user);
           return order;
       }
   }
   
   ```

   

3. 如何做服务负载均衡？在配置RestTemplateBean的时候，方法上面加一个@LoadBalanced注解就搞定了！

   ```java
   @Configuration
   public class AppConfiguration {
   
       @LoadBalanced
       @Bean
       public RestTemplate restTemplate() {
           return new RestTemplate();
       }
   }
   ```

4. 重启order-server服务，浏览器多次访问http://localhost:8081/orders/id，观察控制台会发现8083/8082服务器会交替响应客户请求，说明负载均衡是有效果的。

