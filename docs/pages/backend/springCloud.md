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

2. SpringCloud集成了各种微服务功能组件，并基于springcloud实现了这些组件的自动装配，从而提供了良好的开箱即用体验

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

       

3. Spring Cloud和springcloud版本查询地址： https://start.spring.io/actuator/info 

4. Spring Cloud和springcloud版本关系对照表

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

1. 将项目拆分成两个模块，分别是user-server（用户模块）和order-service（订单模块），springcloud01作为user-server和order-server的父模块，user-server和order-server都是springcloud项目（需要手动写一下启动口类和相关配置文件application.yml，因为这是创建的Maven工程而不是通过spring initializr创建的工程），我们需要在springcloud01的pom文件中引入公共依赖，再在user-server和order-server子工程中引入所需要的依赖。

   ```xml
   <!-- 将当前项目声明为 springcloud 项目 -->
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

   

2. user-server使用 springcloud-user数据库，order-service使用 springcloud-order数据库，再分别提供一个根据ID查询信息的接口。省略了实体类、service层和mapper层代码...（和平时使用springcloud框架开发一样搞就行了）。

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

1. 引入依赖（需要新建立一个模块eureka-server，案例代码还是在springcloud01工程基础上），依赖统一在父工程进行声明。

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
   @springcloudApplication
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



## Ribbon 负载均衡

### 负载均衡流程

1. 负载均衡流程

   ![image-20230409133656458](../../.vuepress/public/image-20230409133656458.png)

   

### 负载均衡策略

1. IRule接口

   ![image-20230409160426651](../../.vuepress/public/image-20230409160426651.png)

   

2. Ribbon的负载均衡规则是一个叫做IRule的接口来定义的，每一个子接口都是一种规则：

   | **内置负载均衡规则类**    | **规则描述**                                                 |
   | ------------------------- | ------------------------------------------------------------ |
   | RoundRobinRule            | 简单轮询服务列表来选择服务器。它是Ribbon默认的负载均衡规则。 |
   | AvailabilityFilteringRule | 对以下两种服务器进行忽略： （1）在默认情况下，这台服务器如果3次连接失败，这台服务器就会被设置为“短路”状态。短路状态将持续30秒，如果再次连接失败，短路的持续时间就会几何级地增加。（2）并发数过高的服务器。如果一个服务器的并发连接数过高，配置了AvailabilityFilteringRule规则的客户端也会将其忽略。并发连接数的上限，可以由客户端的\<clientName>.\<clientConfigNameSpace>.ActiveConnectionsLimit属性进行配置。 |
   | WeightedResponseTimeRule  | 为每一个服务器赋予一个权重值。服务器响应时间越长，这个服务器的权重就越小。这个规则会随机选择服务器，这个权重值会影响服务器的选择。 |
   | ZoneAvoidanceRule         | 以区域可用的服务器为基础进行服务器的选择。使用Zone对服务器进行分类，这个Zone可以理解为一个机房、一个机架等。而后再对Zone内的多个服务做轮询。 |
   | BestAvailableRule         | 忽略那些短路的服务器，并选择并发数较低的服务器。             |
   | RandomRule                | 随机选择一个可用的服务器。                                   |
   | RetryRule                 | 重试机制的选择逻辑                                           |

   

3. 配置 负载均衡策略

   + 代码方式：在order-server中的OrderApplication类中，定义一个新的IRule

     ```java
     @Bean
     public IRule randomRule(){ 
         return new RandomRule();
     }
     ```

   + 配置文件方式：在order-server的application.yml文件中，添加新的配置也可以修改规则：

     ```yaml
     userservice:
       ribbon:
       	# 负载均衡规则 
         NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
     ```

     

### 饥饿加载

1. Ribbon默认是采用懒加载，即第一次访问时才会去创建LoadBalanceClient，请求时间会很长，而饥饿加载则会在项目启动时创建，降低第一次访问的耗时，通过下面配置开启饥饿加载：

   ```yaml
   ribbon:
     eager-load:
       enabled: true # 开启饥饿加载 
         clients: userservice # 指定对userservice这个服务饥饿加载 
   ```

   

## Nacos 注册中心

### Nacos 简介

1. Nacos官网地址：https://nacos.io/zh-cn/docs/v2/what-is-nacos.html
2. Nacos官网Github地址：https://github.com/alibaba/nacos
3. 什么是Nacos
   + Nacos /nɑ:kəʊs/ 是 Dynamic Naming and Configuration Service的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
   + Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。
   + Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。
4. Nacos 的关键特性
   + 服务发现和服务健康监测
   + 动态配置服务
   + 动态 DNS 服务
   + 服务及其元数据管理

### Nacos 环境搭建

1. 下载Nacos，直接到Github下载即可，[Nacos 1.X](https://nacos.io/zh-cn/docs/quick-start.html)是老版本，将来会停止维护。 建议您使用[2.X版本](https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html)。Nacos的下载地址：https://github.com/alibaba/nacos/releases。

2. 可以根据需求下载Linux版本或者Windows版本（我选择Windows），下载之后解压。

   + bin：启动目录
   + conf：配置文件

   ![image-20230409172859701](../../.vuepress/public/image-20230409172859701.png)

   

3. Ncos端口配置

   + Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。如果无法关闭占用8848端口的进程，也可以进入nacos的conf目录，修改application.properties配置文件中的端口。

     

4. 启动Nacos

   + 进入到bin目录下执行

     ```bat
     startup.cmd -m standalone
     ```

   + 显式下面LOGO信息，并且无报错就表示启动成功了

     ![image-20230409173219331](../../.vuepress/public/image-20230409173219331.png)

   

5. 浏览器输入：http://192.168.1.168:8848/nacos/index.html，能够正常访问就表示OK了！！

   

### Nacos 服务注册

1. 父工程中添加spring-cloud-alilbaba的管理依赖（将之前代码copy了一份叫做springcloud-nacos）。

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-alibaba-dependencies</artifactId>
       <version>2.2.6.RELEASE</version>
       <type>pom</type>
       <scope>import</scope>
   </dependency>
   ```

   

2. 注释掉order-service和user-service中原有的eureka依赖，再添加nacos的客户端依赖

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

   

3. 修改order-service和user-service的配置文件，注释eureka地址，添加nacos地址。

   ```yaml
   spring:
     cloud:
       nacos:
         # 配置Nacos 服务端地址(也可以不用配置，因为默认就是localhost:8848)
         server-addr: localhost:8848
   ```

   

4. 重新启动order-service和user-service服务，访问order-service接口，不报错表示已经成功将服务注册到Nacos上面了。

   + 需要提前将Nacos服务启动起来哈！！
   + 因为现在是将服务注册到Nacos上，而不是Eureka上面，所以eureka-service服务可以不用启动。

### Nacos 服务分级存储模型

1. 服务分级模型

   + 一级：服务，例如userService
   + 二级：集群，例如上海机房、北京机房
   + 三级：实例，北京机房部署了userService的实例

   ![image-20230409200838162](../../.vuepress/public/image-20230409200838162.png)

   

2. 服务跨集群调用问题

   + 服务调用尽可能选择本地集群服务调用，因为跨集群服务调用延迟较高。

   + 本地集群不可访问时，再去访问其它集群。

     

3. 配置服务集群属性

   + 简单理解就是，将user-service实例1部署到哪一个集群，将user-service实例2部署到哪一个集群，以此类推，默认情况下可以在Nacos中发现集群叫做：DEFAULT

     ![image-20230409201211616](../../.vuepress/public/image-20230409201211616.png)

     

   + 修改服务的配置文件（user-service和order-service都需要修改）

     + 将user-service实例一（8082）和实例二（8083）以及order-service配置集群到HZ
     + 将user-service实例三（8084）配置集群到SH

     ```yaml
     spring:
       cloud:
         inetutils:
           # 配置Nacos 服务端地址
           default-ip-address: localhost:8848
         nacos:
           discovery:
               # 集群名称 杭州(HZ)
             cluster-name: HZ
     ```

     ![image-20230409203441065](../../.vuepress/public/image-20230409203441065.png)

     

### Nacos 负载均衡

1. 将集群属性配置好之后，访问http://localhost:8081/orders/id，会发现三个实例是随机访问的，其实并没有满足服务跨集群调用问题，优先访问本地集群，本地集群不能访问时再访问其他集群（这时候IDEA控制台会有警告信息，告诉你跨集群调用服务了）。

   

2. 其实这个问题，可以通过配置Nacos负载均衡来实现

   ```yaml
   # 在order-service中设置负载均衡的IRule为NacosRule，这个规则优先会寻找与自己同集群的服务
   userServer:
     ribbon:
       # 负载均衡规则 
       NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule 
   ```

3. 如果上述配置不生效，请查看项目中是否自定义了IRule负载均衡规则覆盖住NacosRule，例如：

   ```java
   @Bean
   public IRule iRule() {
       return new RandomRule();
   }
   ```

   

4. 负载均衡权重问题

   + 项目中可能一部分服务器性能较好，另一部分略差，那么多个并发请求时，当然是性能好的服务器处理更多的请求，就目前配置来看每个服务的访问频率都大差不差。

   + 要解决这个问题，我们可以在Nacos控制台上配置权重（默认是1），权重值是0.1 - 1之间， 权重值越大访问频率越高，如果权重是0，则完全不会被访问，直接在Nacos控制台更改权重就可以了。

     ![image-20230409213931517](../../.vuepress/public/image-20230409213931517.png)



### Nacos 环境隔离

1. Nacos中服务存储和数据存储的最外层都是一个名为namespace的东西，用来做最外层隔离。

2. 在Nacos控制台可以创建namespace，用来隔离不同环境。

   ![image-20230409215107734](../../.vuepress/public/image-20230409215107734.png)

3. 创建完成之后，会得到一个命名空间ID

   ![image-20230409215159312](../../.vuepress/public/image-20230409215159312.png)

4. 修改order-service的application.yml，添加namespace

   ```yaml
   spring:
     application:
       # 配置服务名称
       name: orderServer
       
     cloud:
       inetutils:
         # 配置Nacos 服务端地址
         default-ip-address: localhost:8848
       nacos:
         discovery:
           # 集群名称 杭州(HZ)
           cluster-name: HZ
           # 设置环境ID
           namespace: 71150466-bf99-45b3-9ec4-09524214570d
   ```

5. 重启order-service服务，再次访问http://localhost:8081/orders/101，会发现order-service调用user-service服务接口时失败了，因为不同namespace下的服务互相不可见。

   + order-service在dev命名空间下
   + user-service在默认的public(保留空间)命名空间下

   ```tex
   No instances available for userServer
   ```

### Nacos 临时和非临时实例

1. Nacos中默认都是临时实例，如果想将某个服务配置成非临时实例，可以修改对应服务的配置文件

   ```yml
   spring:
      nacos:
        # 设置为非临时实例
   	 ephemeral: false 
   ```

2. 临时实例和非临时实例有什么区别？

   + 临时实例
     + 采用心跳检测来告诉Nacos当前服务的状态。
     + 如果服务挂掉了，那么Nacos会从注册列表中将当前服务移除。
   + 非临时实例
     + Nacos主动询问当前服务的状态。
     + 如果服务挂掉了，Nacos不会从注册列表中将当前服务移除，而是继续等待服务重启。

### Nacos 和 Eureka 对比

1. 相同点

   + 都支持服务注册和服务拉去。
   + 都支持服务提供者的心跳机制做健康检测。

2. 不同点

   + Nacos支持服务端主动检测服务提供者状态，临时实例采用心跳模式，非临时实例采用主动检测模式，临时实例心跳不正常会被剔除，非临时实例不会。
   + Nacos支持服务列表变更的消息推送模式，让服务消费者中的服务列表更新更及时。
   + Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

   

## 项目版本依赖对照

| 环境/依赖名称                                | 版本号        |
| -------------------------------------------- | ------------- |
| jdk                                          | 1.8.0_181     |
| maven                                        | 3.3.9         |
| spring-boot-starter-parent                   | 2.3.9.RELEASE |
| spring-boot-starter                          | 2.3.4.RELEASE |
| spring-boot-starter-web                      | 2.3.9.RELEASE |
| spring-cloud-dependencies                    | Hoxton.SR10   |
| spring-cloud-starter-netflix-eureka-server   | 2.2.7.RELEASE |
| spring-cloud-alibaba-dependencies            | 2.2.6.RELEASE |
| spring-cloud-starter-alibaba-nacos-discovery | 2.2.6.RELEASE |
| nacos                                        | 1.4.1         |

