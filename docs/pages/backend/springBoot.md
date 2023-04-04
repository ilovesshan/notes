# SpringBoot

## SpringBoot 起步

### SpringBoot 简介

1. [SpringBoot官网](https://spring.io/projects/spring-boot)
2. SpringBoot是一个微服务框架，SpringBoot使用“约定大于配置”的理念。SpringBoot其设计目的是用来简化Spring应用的创建、运行、调试、部署等，使用Spring Boot可以做到专注于Spring应用的开发。
3. Spring Boot是开发者和Spring 本身框架的中间层，帮助开发者统筹管理应用的配置，提供基于实际开发中常见配置的默认处理（即约定大于配置），简化应用的开发，简化应用的运维。
4. 总的来说，其目的SpringBoot就是为了对JavaWEB的开发进行“简化”和加“快”速度，简化开发过程中引入或启动相关Spring 功能的配置。这样带来的好处就是降低开发人员对于框架的关注点，可以把更多的精力放在自己的业务代码上。

### SpringBoot 特点

1.  可独立运行的Spring项目：SpringBoot可以以jar包的形式独立运行。
2. 内嵌的Servlet容器：SpringBoot可以选择内嵌Tomcat、Jetty或者Undertow，无须以war包形式部署项目。
3. 简化的Maven配置：Spring提供推荐的基础 POM 文件来简化Maven 配置。
4. 自动配置Spring：SpringBoot会根据项目依赖来自动配置Spring 框架，极大地减少项目要使用的配置。
5. 提供生产就绪型功能：提供可以直接在生产环境中使用的功能，如性能指标、应用信息和应用健康检查。
6. 无代码生成和xml配置：SpringBoot不生成代码。完全不需要任何xml配置即可实现Spring的所有配置。

### SpringBoot3 新特性

1. 最低要求 Java 17 和 Java 19 支持 。
   + Spring Boot 3.0 要求 Java 17 作为最低版本，Spring Boot 3.0 运行良好，并已通过 JDK 19 测试。
   + 如果你当前使用的是 Java 8 或 Java 11，则需要先升级 JDK，然后才能开发 Spring Boot 3.0 应用程序。
2. 支持用 GraalVM 生成原生镜像，取代了实验性的 Spring Native 项目。
3. 通过 Micrometer 和 Micrometer 跟踪改进可观察性。
4. 支持具有 EE 9 baseline 的 Jakarta EE 10
   + 对于所有依赖项，Spring Boot 3.0 已从 Java EE 迁移到 Jakarta EE api。



## SpringBoot 脚手架

### 什么是脚手架

1. 脚手架是一种用在建筑领域的辅助工具，或者说是为了保证各施工过程顺利进行而搭设的工作平台，有兴趣的读者可自行查看维基百科上的定义。
2. 对应到软件工程领域，脚手架可以解释为帮助开发人员在开发过程中使用的开发工具、开发框架，使用脚手架你无须从头开始搭建或者编写底层软件。
3. 脚手架是一种元编程的方法，程序员编写一份规格说明书（Specification），用来描述怎样去使用数据库，然后由编译器脚手架根据这份规格说明书生成相应的代码，进行增、删、改、查等数据库的操作，在脚手架上更高效地建造出强大的应用。（本段话来自于Stack Overflow）

### SpringBoot 默认脚手架

1. [SpringBoot 默认脚手架地址](https://start.spring.io/)：https://start.spring.io/

### 阿里云脚手架

1. [阿里云脚手架地址](https://start.aliyun.com/)：https://start.aliyun.com/

### 创建SpringBoot 项目

1. 两种方式
   + 通过WEB浏览器端创建项目，将配置好的项目下载到本地，再通过IDEA导入进行开发。
   + 直接使用IDEA提供的 spring initializr选项进行创建项目（常用）。
2. 创建SpringBoot项目注意点
   + 本套文档的案例代码使用SpringBoot3进行开发，请注意各个依赖项的版本兼容问题。
   + 使用IDEA创建项目，是可以手动选择使用SpringBoot 默认脚手架（IDEA默认）还是阿里云脚手架。

## SpringBoot 初体验

### SpringBoot 入门案例

1. 案例要求

   + 浏览器输入：http://localhost:8080/time， 服务端会响应给浏览器当前时间。

2. 定义控制器（需要用到SpringMVC知识）

   ```java
   @Controller
   public class TimeController {
       @GetMapping("/time")
       public String getCurrentTime() {
           return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
       }
   }
   ```

3. 运行main方法（Application类的main方法）

   ```java
   @SpringBootApplication
   public class Application {
       public static void main(String[] args) {
           SpringApplication.run(Application.class, args);
       }
   }
   ```

4. 观察控制台，查看日志信息！

   ![image-20230403222615930](../../.vuepress/public/image-20230403222615930.png)

   

### SpringBoot 项目结构

1. SpringBoot 默认项目结构

   + 可以删除文件/文件夹

     +  HELP.md文件、mvnw文件、mvnw.cmd文件、.mvn文件夹 可以删除。
     + 也可以在IDEA中通过设置来屏蔽不显示这些文件夹。

   + 引入spring-boot-starter-web依赖，IDEA就会默认生成的文件夹

     + static 文件夹 
     + templates 文件夹

     ```bat
     │  .gitignore
     │  HELP.md(可以删掉)
     │  mvnw(可以删掉)
     │  mvnw.cmd(可以删掉)
     │  pom.xml
     │  springboot01-start.iml
     │  
     ├─.mvn(可以删掉)
     │  └─wrapper
     │          maven-wrapper.jar
     │          maven-wrapper.properties
     │
     └─src
         ├─main
         │  ├─java
         │  │  └─com
         │  │      └─ilovesshan
         │  │              Springboot01StartApplication.java(入口类)
         │  │
         │  └─resources
         │      │  application.properties(配置文件)
         │      │
         │      ├─static (静态资源)
         │      └─templates(模板文件)
         └─test
             └─java
                 └─com
                     └─ilovesshan
                             Springboot01StartApplicationTests.java（单元测试类）
     
     ```

2. SpringBoot 单一项目结构

   + 适用于项目功能模块比较少的场景。

   ```bat
   │  .gitignore
   │  HELP.md
   │  mvnw
   │  mvnw.cmd
   │  pom.xml
   │  springboot02-project-structure-single.iml
   │  
   ├─.mvn
   │  └─wrapper
   │          maven-wrapper.jar
   │          maven-wrapper.properties
   │          
   └─src
       ├─main
       │  ├─java
       │  │  └─com
       │  │      └─ilovesshan
       │  │          └─application
       │  │              │  Application.java
       │  │              │  
       │  │              ├─controller
       │  │              │      OrderController.java
       │  │              │      UserController.java
       │  │              │      
       │  │              ├─mapper
       │  │              │      OrderMapper.java
       │  │              │      UserMapper.java
       │  │              │      
       │  │              ├─model
       │  │              │      Order.java
       │  │              │      User.java
       │  │              │
       │  │              └─service
       │  │                  │  OrderService.java
       │  │                  │  UserService.java
       │  │                  │
       │  │                  └─impl
       │  │                          OrderServiceImpl.java
       │  │                          UserServiceImpl.java
       │  │
       │  └─resources
       │      │  application.properties
       │      │
       │      ├─static
       │      └─templates
       └─test
           └─java
               └─com
                   └─ilovesshan
                       └─application
                               ApplicationTests.java
   ```

   

3. SpringBoot 复杂项目结构

   + 适用于项目功能模块比较多、比较复杂的场景。

   ```bat
   │  .gitignore
   │  HELP.md
   │  mvnw
   │  mvnw.cmd
   │  pom.xml
   │  springboot03-project-structure-multiple.iml
   │  
   ├─.mvn
   │  └─wrapper
   │          maven-wrapper.jar
       │  │              │  ├─mapper
       │  │              │  ├─model
       │  │              │  └─service
       │  │              │      └─impl
       │  │              └─user
       │  │                  ├─controller
       │  │                  ├─impl
       │  │                  ├─mapper
       │  │                  └─model
       │  └─resources
       │      │  application.properties
       │      │
       │      ├─static
       │      └─templates
       └─test
           └─java
               └─com
                   └─ilovesshan
                       └─application
                               ApplicationTests.java
   ```



### SpringBoot starter 启动器

1. 先看一下项目默认的pom.xml文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
   
       <!-- 父模块依赖 -->
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>3.0.5</version>
           <relativePath/>
       </parent>
   
       <!-- 当前项目信息 -->
       <groupId>com.ilovesshan</groupId>
       <artifactId>springboot01-start</artifactId>
       <version>0.0.1-SNAPSHOT</version>
       <name>springboot01-start</name>
       <description>springboot01-start</description>
   
       <!-- JDK版本 -->
       <properties>
           <java.version>17</java.version>
       </properties>
   
       <!-- 项目依赖 -->
       <dependencies>
   
           <!-- WEB项目依赖 -->
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
   
           <!-- lombok -->
           <dependency>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <optional>true</optional>
           </dependency>
   
           <!-- 单元测试 -->
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-test</artifactId>
               <scope>test</scope>
           </dependency>
       </dependencies>
   
       <build>
           <plugins>
               <!-- maven对SpringBoot支持的插件-->
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
           </plugins>
       </build>
   </project>
   
   ```

2. starter 启动器分类

   + spring-boot-starter-xxx，这是Spring官方提供的依赖。
   + xxx-starter，这是一些三方组织提供的依赖。

### SpringBoot 父项目

1. 回到pom.xml中，观察 \<parent> 标签

   ```xml
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-parent</artifactId>
       <version>3.0.5</version>
       <relativePath/>
   </parent>
   ```

   

2. 不妨按住ctrl键，用鼠标点到spring-boot-starter-parent中去看看，里面配置项比较多，下面浅析总结一下

   + spring-boot-starter-parent的parent是spring-boot-dependencies

   + 依赖版本管理
   + 属性配置
   + 资源过滤
   + 插件配置

3. 再进到 spring-boot-dependencies中，浅析总结一下

   + 定义了很多依赖的版本号，注意这些依赖的版本号SpringBoot已经测试过了，表示这些版本在一起使用不会出现兼容问题，开发程序员可以大胆使用。
   + 通过\<dependencyManagement> 标签定义了很多依赖项，我们要是有的话，通过maven的依赖传递特性直接使用就好了，依赖也有版本号也定义好了！

4. 关系整理

   + 开发工程中的pom.xml 继承了 spring-boot-starter-parent
   +  spring-boot-starter-parent  继承了 spring-boot-dependencies

### SpringBoot 启动类剖析 

1. SpringBoot  核心注解

   ```java
   @SpringBootApplication
   public class Application {
       public static void main(String[] args) {
           SpringApplication.run(Application.class, args);
       }
   }
   ```

   

   + @SpringBootApplication是一个复合注解，也是SpringBoot项目的核心注解，被@SpringBootApplication注解标识的类可以称之为SpringBoot项目的启动类。

   + @SpringBootApplication注解又被三个注解所标识，分别是： 

     + @SpringBootConfiguration

       + 注解作用：标识当前类是一个配置类，可以配合@Bean注解自定义Bena对象并实例化到IOC容器中。

     + @EnableAutoConfiguration

       + 注解作用：启用自动配置，帮助SpringBoot应用将所有符合条件的@Configuration配置，可以是将项目中的Bean对象也可以是第三方的Bean对象自动实例化到并放入到IOC容器中。

     + @ComponentScan

       + 开启组件扫描功能

       + 注意点，组件扫描功能规则是：只扫描启动类所在的包或者子包（启动类所在的包我们一般称之为根包），根包之外的类SpringBoot不会自动扫描。

         + 符合规则

           ```bat
           ├─src
           │  ├─main
           │  │  ├─java
           │  │  │  └─com
           │  │  │      └─ilovesshan
           │  │  │          └─pk01
           │  │  │              │  Application.java(入口类)
           │  │  │              │
           │  │  │              └─controller
           │  │  │                      TimeController.java
           ```

           

         + 不符合规则

           ```bat
           ├─src
           │  ├─main
           │  │  ├─java
           │  │  │  └─com
           │  │  │      └─ilovesshan
           │  │  │          ├─pk01
           │  │  │          │      Application.java(入口类)
           │  │  │          │
           │  │  │          └─pk02
           │  │  │              └─controller
           │  │  │                      TimeController.java
           ```

   

2. SpringApplication.run 方法

   + run 方法 分析

     ```java
     // run方法会返回一个ConfigurableApplicationContext对象，这个对象就是Spring的IOC容器。
     // run一个重载方法，将primarySource可以作为一个数组传递，但是我们推荐SpringBoot项目仅有一个启动类。
     // primarySource 启动类的字节码
     // args 传递给JVM的参数信息
     public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
         return run(new Class[]{primarySource}, args);
     }
     
     // run 重载方法
     public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
         return (new SpringApplication(primarySources)).run(args);
     }
     ```

   + 测试启动类的复合注解，自定义Bean对象并获取

     ```java
     @SpringBootApplication
     public class Application {
     
         @Bean(name = "date")
         public Date getDate() {
             return new Date();
         }
     
         public static void main(String[] args) {
             // applicationContext IOC容器
             ApplicationContext applicationContext = SpringApplication.run(Application.class, args);
     
             // 从IOC容器中获取Bean实例
             Date bean = applicationContext.getBean("date", Date.class);
             System.out.println("bean = " + bean); // bean = Tue Apr 04 08:57:44 CST 2023
         }
     }
     ```

     在Controller中通过依赖注入方式获取Bean对象

     ```java
     @RestController
     public class TimeController {
     
         @Resource
         private Date date;
     
         @GetMapping("/time")
         public String getCurrentTime() {
             return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
         }
     }
     ```

   

### SpringBoot  运行三种方式

1. 通过IDEA工具进行运行（普通运行和debug运行、开发中一般采用debug方便调试）

   

2. 通过Maven插件 方式运行，首次运行会有点慢，因为要下载一些依赖。

   ```mvn
   mvn spring-boot:run
   ```

   

3. 通过 java -jar xxx.jar 方式运行，这种方式得需要现有一个SpringBoot项目得jar包。

   + 通过Maven打包该项目得到：springboot-start.jar 文件

     ```java
     // 这个表示测试失败导致的打包失败，解决方法就是跳过test打包。
     
     There are test failures.
         
     Please refer to E:\workspace\java\springBoot\code\springboot\springboot01-start\target\surefire-reports for the individual test results.
     Please refer to dump files (if any exist) [date].dump, [date]-jvmRun[N].dump and [date].dumpstream.
     ```

   + 运行 springboot-start.jar 文件

     ```bat
     java -jar .\springboot-start.jar
     ```

   

### SpringBoot jar包和普通jar包区别

​		Spring Boot 中默认打包成的 jar 叫做 可执行 jar，这种 jar 不同于普通的 jar，普通的 jar 不可以通过 java -jar xxx.jar 命令执行，普通的 jar 主要是被其他应用依赖，Spring Boot 打成的 jar 可以执行，但是不可以被其他的应用所依赖，即使强制依赖，也无法获取里边的类。但是可执行 jar 并不是 Spring Boot 独有的，Java 工程本身就可以打包成可执行 jar 。





## SpringBoot 配置文件

### SpringBoot 配置文件介绍

1. 当我们构建完Spring Boot项目后，会在resources目录下给我们一个默认的全局配置文件 application.properties，这是一个空文件，因为Spring Boot在底层已经把配置都给我们自动配置好了，当在配置文件进行配置时，会修改SpringBoot自动配置的默认值。

2. 配置文件名是固定的application.properties， 但是我们可以修改成application.yml，这两个文件本质是一样的，区别只是其中的语法略微不同

3. 项目中application.properties和application.yml同时存在情况下，优先使用application.properties，但是在实际开发中我们更青睐于application.yml文件，因为yml文件格式采用扁平化风格书写易于阅读。

4. properties 文件语法：key=value

   ```properties
   port=1001
   app.name=springboot-project
   ```

5. yml 文件语法：key:[空格]值

   ```yaml
   port: 1001
   app:
     name: springboot-project
   ```

   

### properties 文件

1. properties 文件注意事项

   + properties 文件中不会转义字符串里面的特殊字符。

2. properties 文件中各种数据类型的写法

   + 数字、字符串、布尔值

     ```properties
     port=1001
     app.name=springboot-project
     ```

     

   + 对象、Map（属性和值）（键值对）

     ```properties
     user.username=ilovesshan
     user.age=18
     user.address=四川巴中
     ```

     

   +  数组（List、Set）

     ```properties
     user.hobby[0]=running
     user.hobby[1]=read
     user.hobby[2]=code
     ```

     

### yml 文件

1. yml 文件注意事项

   + 注意空格

2. yml  文件中各种数据类型的写法

   + 数字、字符串、布尔值

     ```yaml
     port: 1001
     app:
       name: springboot-project
     ```

     

   + 对象、Map（属性和值）（键值对）

     ```yaml
     user:
       username: ilovesshan
       age: 18
       address: 四川巴中
     ```

     

   + 数组（List、Set）

     ```yaml
     student:
       hobby:
         - running
         - read
         - code
     ```

### 读取配置文件信息

1. springboot获取配置资源，主要分3种方式：@Value、 @ConfigurationProperties、Enviroment对象直接调用。

   + @Value、 @ConfigurationProperties底层实现原理，都是通过Enviroment对象方式实现的。
   + @Value 注入时、如果没找到对应的key并且也没有默认值，会报错！
   +  @ConfigurationProperties和Enviroment如果没获取到值就是null！

2. 通过@Value读取

   + 通过@Value("${key:默认值}")

     ```java
     @Value("${port}")
     private int port;
     
     @Value("${app.name}")
     private String name;
     
     @Value("${app.version: 0.0.1}")
     private String version;
     ```

     

3. 通过@ConfigurationProperties读取

   + 读取Map

     ```java
     @Configuration("user")
     @ConfigurationProperties(prefix = "user")
     public class User {
         private String username;
         private int age;
         private String address;
         
         // 省略了getter和setter...
     }
     ```

     ```java
     @Resource(name = "user")
     private User user;
     ```

     

   + 读取List

     ```java
     @Configuration("student")
     @ConfigurationProperties(prefix = "student")
     public class Student {
         private List<String> hobby;
         // 省略了getter和setter...
     }
     ```

     ```java
     @Resource(name = "student")
     private Student student;
     ```

     

4. 通过Environment对象直接调用

   + Environment对象是多个·配置文件组合的对象，也就是从这个对象中可以读取项目配置文件中的信息、系统环境信息等等，使用Environment对象，需要先注入到IOC容器中。

   + 读取配置文件信息

     ```java
     @SpringBootTest
     class EnvironmentTest {
     
         @Resource
         private Environment environment;
     
         @Test
         void testEnvironment() {
             // 读不到就是null
             String name = environment.getProperty("app.name");
             String username = environment.getProperty("user.username");
     
             // 读不到就使用默认值
             Integer port = environment.getProperty("port", int.class, 8080);
         }
     }
     ```

   + 读取系统环境变量信息

     ```java
     @SpringBootTest
     class EnvironmentTest {
         @Resource
         private Environment environment;
     
         @Test
         void testEnvironmentWithSystem() {
             // Key名称 不区分大小写
             String userdomainRoamingprofile = environment.getProperty("userdomain_roamingprofile");
             String processorLevel = environment.getProperty("PROCESSOR_LEVEL");
             String javaHome = environment.getProperty("JAVA_HOME");
         }
     }
     ```



### 多文件配置

1. 大型项目中，如果将所有的配置信息全部都放在application.yml中，那势必会将application.yml撑的很大，对于一些配置文件我们应该按模块单独进行抽离，例如redis、mysql配置文件等等等...，只需要在application.yml中导入这些文件即可！

2. 配置文件抽离

   + redis.yml

     ```yaml
     redis:
       host: 1270.0.1
       port: 6379
     ```

     

   + mysql.yml

     ```yaml
     mysql:
       driver: jdbc:mysql://localhost:3306/db
       username: admin
       password: 123465
     ```

     

   

3. 配日文件导入

   ```yaml
   # 导入配置文件, 多个配置文件使用 , 进行分割 
   spring:
     config:
       import: conf/redis.yml, conf/mysql.yml
   ```

   

4. 读取导入的配置文件

   ```java
   @Value("${redis.host}")
   private String redisHost;
   @Value("${redis.port}")
   private int redisPort;
   
   @Value("${mysql.driver}")
   private String mysqlDriver;
   ```

   

### 多环境配置

1. 什么是多环境？

   + 在开发过程中一般将环境会划分成多种，每个环境的配置信息都有可能不同，目的是在不同环境中运行保证程序的稳定性和可靠性，例如开发环境可能是一套配置文件、测试环境也是一套配置文件、线上环境又是另一套配置文件。
   + SpringBoot支持多环境配置，关于多环境配置文件命名有个约定
     + 开发 dev
     + 测试 test
     + 线上 prod
     + 新特性 feature

2. SpringBoot项目中定义多环境，直接在resources文件夹下新建这些文件即可!

   + application-dev.yml

     ```yaml
     spring:
       application:
         name: 开发环境
     
       config:
         activate:
           # 定义环境名称, 推荐环境名称和该文件名称application-xxx保持一致(方便阅读)
           on-profile: dev
     ```

     

   + application-test.yml

     ```yaml
     spring:
       application:
         name: 测试环境
     
       config:
         activate:
           # 定义环境名称, 推荐环境名称和该文件名称application-xxx保持一致(方便阅读)
           on-profile: test
     ```

     

   + application-prod.yml

     ```yaml
     spring:
       application:
         name: 线上环境
         
       config:
         activate:
           # 定义环境名称, 推荐环境名称和该文件名?
     ```

     

3. 在application.yml中激活某个环境

   ```yaml
   spring:
     config:
     	# 指定激活的环境名称(线上环境)
     	profiles:
         active: prod
   ```

4. 测试获取当前环境变量信息

   ![image-20230404141018450](../../.vuepress/public/image-20230404141018450.png)

   ```java
   @SpringBootTest
   public class ProfilesTest {
   
       @Value("${spring.application.name}")
       private String name;
   
       @Test
       void testProfile() {
           System.out.println("name = " + name); // name = 线上环境
       }
   }
   ```

   
