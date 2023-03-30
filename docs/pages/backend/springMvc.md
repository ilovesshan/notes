# SpringMVC

## SpringMVC 简介

### MVC 架构模式

MVC 架构模式介绍：参考JavaWeb笔记中的 [MVC架构模式](https://ilovesshan.github.io/pages/backend/javaWeb.html#mvc%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%BC%8F-1) 章节

### SpringMVC框架介绍

1. [SpringMVC官网地址](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html)
2. SpringMVC属于Spring系列的一员，能够和Spring框架进行无缝整合。
3. SpringMVC是一种基于Spring实现了Web MVC设计模式的请求驱动类型的轻量级Web框架，使用了MVC的架构模式思想，将Web层进行指责解耦，并管理应用所需的生命周期，为简化日常开发，提供了很大便利。
4. SpringMVC提供了总开关DispatcherServlet;请求处理映射器（Handler Mapping）和处理适配器（Handler Adapter），视图解析器（View Resolver）进行视图管理;动作处理器Controller接口（包含ModelAndView，以及处理请求响应对象请求和响应），配置灵活，支持文件上传，数据简单转化等强大功能。

### SpringMVC框架特点

1. SpringMVC是一个轻量级框架能够和 Spring 其他框架无缝集成，是其它 Web 框架所不具备的。
2. 清晰的角色分配：前端控制器、 请求到处理器映射、处理器适配器、 视图解析器。
3. 支持各种请求资源的映射策略。并且支持RESTful 编程风格的请求。
4. 支持各种视图技术，比如：jsp、thymeleaf



## SpringMVC 入门案例

### 新建WEB项目

### 引入相关依赖

```xml
<!-- 注意WEB项目打包方式-->
<packaging>war</packaging>

<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>

<dependencies>
    <!-- SpringMVC核心依赖-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>6.0.6</version>
    </dependency>

    <!-- Servlet依赖-->
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <scope>provided</scope>
        <version>5.0.0</version>
    </dependency>

    <!-- thymeleaf模板引擎 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring6</artifactId>
        <version>3.1.1.RELEASE</version>
    </dependency>

    <!-- 日志-->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.4.6</version>
    </dependency>
</dependencies>
```



### web.xml中配置核心处理器

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--
        因为引入了SpringMVC框架, 我们将客户端发来的请求统一交给SpringMVC框架的DispatcherServlet类进行分发处理。
        注意: "统一" 二字， 是不是就是全部请求呢？？
            除了".jsp"的请求之外的请求，都可以交给SpringMVC框架的DispatcherServlet进行处理
            回顾一下JavaWEB中 url-pattern 拦截规则
                "/*": 可以匹配所有url，包括带扩展名的，一般只用在过滤器上
                "/" : 可以匹配所有url, 很多人理解成不能拦截带扩展名的，这种理解是错误的
                      它其实也能拦截“.js”，“.css”，".png"等静态资源的访问, 但是不会拦截.jsp

                过滤器的url-pattern一般配置: "/*"
                DispatcherServlet的url-pattern一般配置: "/"
    -->
    <servlet>
        <servlet-name>springMVC</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <!-- 指定springmvc配置文件的路径 -->
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>
        <!-- 当WEB项目被访问时，才将DispatcherServlet对象加载到内存中 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springMVC</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```



### 添加SpringMVC配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
                           http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd 
                           http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd
                           ">

    <!-- 配置包扫描路径-->
    <context:component-scan base-package="com.ilovesshan.springmvc.controller"/>

    <!-- 配置Thymeleaf视图解析器 -->
    <bean id="viewResolver" class="org.thymeleaf.spring6.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring6.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver">
                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>

                        <property name="templateMode" value="HTML"/>
                        <property name="characterEncoding" value="UTF-8"/>
                    </bean>
                </property>
            </bean>
        </property>
    </bean>
</beans>
```



### 准备静态资源文件

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/extras/spring-security"
      xmlns:shiro="http://www.pollix.at/thymeleaf/shiro">
    <head>
        <meta charset="UTF-8">
        <title>SpringMVC</title>
    </head>
    <body>
        <h2>Hi， SpringMVC</h2>
        <a th:href="@{/home}">访问首页</a>
    </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/extras/spring-security"
      xmlns:shiro="http://www.pollix.at/thymeleaf/shiro">
    <head>
        <meta charset="UTF-8">
        <title>this is home page</title>
    </head>
    <body>
        <p>this is home page</p>
    </body>
</html>
```



### 编写Controller层控制器

```java
@Controller
@RequestMapping("/")
public class HelloController {

    @GetMapping("/index")
    public String indexPage() {
        // 返回一个字符串时，会被springmvc配置文件中所配置的thymeleaf模板引擎所解析

        //   前缀                   返回字符串  后缀
        //   /WEB-INF/templates/   hello     .html

        // 通过请求转发方式，将请求和响应转发到/WEB-INF/templates/hello.html地址
        return "hello";
    }

    @GetMapping("/home")
    public String homePage() {
        return "home";
    }
}
```



## SpringMVC  请求映射详解

### @RequestMapping 介绍

1. RequestMapping 翻译成中文含义是：请求映射，什么是请求？什么是映射？

   + 请求：客户端发出的请求
   + 映射：将客户端发出的请求路径通过映射处理（DispatcherServlet类），最终映射到一个Controller上。

2. 说直接点，可以通过@RequestMapping 注解来定义一个请求路径，客户端通过请求路径可以访问到该类（Servlet）。

3. 看一下@RequestMapping 注解源码

   ```java
   // 可以用在类上或者方法上
   @Target({ElementType.TYPE, ElementType.METHOD})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   // @Mapping注解 是一个空注解
   @Mapping
   @Reflective({ControllerMappingReflectiveProcessor.class})
   public @interface RequestMapping {
       String name() default "";
   
       // 定义客户端的请求路径
       @AliasFor("path")
       String[] value() default {};
   
       // 定义客户端的请求路径
       @AliasFor("value")
       String[] path() default {};
   
       // RequestMethod 是一个枚举，里面内置了8中请求方式
       // method 主要用于定义客户端的请求方式 是GET还是POST还是其他类型的请求
       RequestMethod[] method() default {};
   
       // 客户端传递的params参数
       String[] params() default {};
   
       // 客户端传递的headers参数
       String[] headers() default {};
   
       //  客户端请求的提交内容类型（Content-Type），例如application/json, text/html;
       String[] consumes() default {};
   
       // 服务端返回给客户端内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
       String[] produces() default {};
   }
   ```

   ```java
   public enum RequestMethod {
       GET,
       HEAD,
       POST,
       PUT,
       PATCH,
       DELETE,
       OPTIONS,
       TRACE;
   
       private RequestMethod() {
       }
   
       @Nullable
       public static RequestMethod resolve(String method) {
           Assert.notNull(method, "Method must not be null");
           byte var2 = -1;
           switch(method.hashCode()) {
               case -531492226:
                   if (method.equals("OPTIONS")) {
                       var2 = 6;
                   }
                   break;
               case 70454:
                   if (method.equals("GET")) {
                       var2 = 0;
                   }
                   break;
               case 79599:
                   if (method.equals("PUT")) {
                       var2 = 3;
                   }
                   break;
               case 2213344:
                   if (method.equals("HEAD")) {
                       var2 = 1;
                   }
                   break;
               case 2461856:
                   if (method.equals("POST")) {
                       var2 = 2;
                   }
                   break;
               case 75900968:
                   if (method.equals("PATCH")) {
                       var2 = 4;
                   }
                   break;
               case 80083237:
                   if (method.equals("TRACE")) {
                       var2 = 7;
                   }
                   break;
               case 2012838315:
                   if (method.equals("DELETE")) {
                       var2 = 5;
                   }
           }
   
           RequestMethod var10000;
           switch(var2) {
               case 0:
                   var10000 = GET;
                   break;
               case 1:
                   var10000 = HEAD;
                   break;
               case 2:
                   var10000 = POST;
                   break;
               case 3:
                   var10000 = PUT;
                   break;
               case 4:
                   var10000 = PATCH;
                   break;
               case 5:
                   var10000 = DELETE;
                   break;
               case 6:
                   var10000 = OPTIONS;
                   break;
               case 7:
                   var10000 = TRACE;
                   break;
               default:
                   var10000 = null;
           }
   
           return var10000;
       }
   
       @Nullable
       public static RequestMethod resolve(HttpMethod httpMethod) {
           Assert.notNull(httpMethod, "HttpMethod must not be null");
           return resolve(httpMethod.name());
       }
   
       public HttpMethod asHttpMethod() {
           HttpMethod var10000;
           switch(this) {
               case GET:
                   var10000 = HttpMethod.GET;
                   break;
               case HEAD:
                   var10000 = HttpMethod.HEAD;
                   break;
               case POST:
                   var10000 = HttpMethod.POST;
                   break;
               case PUT:
                   var10000 = HttpMethod.PUT;
                   break;
               case PATCH:
                   var10000 = HttpMethod.PATCH;
                   break;
               case DELETE:
                   var10000 = HttpMethod.DELETE;
                   break;
               case OPTIONS:
                   var10000 = HttpMethod.OPTIONS;
                   break;
               case TRACE:
                   var10000 = HttpMethod.TRACE;
                   break;
               default:
                   throw new IncompatibleClassChangeError();
           }
           return var10000;
       }
   }
   
   ```

   ```java
   @Target({ElementType.ANNOTATION_TYPE})
   @Retention(RetentionPolicy.RUNTIME)
   public @interface Mapping {
   }
   ```

   

### @RequestMapping  value和path属性

1. 其实通过阅读源码发现，这两个值表达的含义是一样的，都是定义客户端请求路径。

   ```java
   @Controller
   public class UserController {
       @RequestMapping("/list")
       public String t1() {
           return "list";
       }
   }
   ```

### @RequestMapping 用在类和方法上

1. 用在方法上

   + @RequestMapping 用在方法上

     + 用在方法上，和方法名称没有任何关系，返回值就先暂时返回字符串吧，通过视图解析器转发到对应的界面！

     + 访问路径：http://localhost:8080/list

       ```java
       @Controller
       public class UserController {
           // 访问用户列表
           @RequestMapping("/list")
           public String t1() {
               return "user-list";
           }
       }
       ```

   + 思考？ICO容器中，如果出现两个请求路径都是 /list 的bean会怎么样？

     + 添加一个OrderrController，表示订单的模块，里面也有有一个接口，访问订单列表 /list

     + 访问路径：http://localhost:8080/list

       ```java
       @Controller
       public class OrderController {
           // 访问订单列表
           @RequestMapping("/list")
           public String t1() {
               return "order-list";
           }
       }
       ```

   + 当IOC容器中存在两个请求路径相同的bean时，编译就会报错，原因也简单：

     + DispatcherServlet在处理这个请求路径时，发现ICO容器里面有两个对象都是这个请求路径，那到底是让UserController还是OrderController来处理这次请求呢？压根无法抉择！

   + 编译的报错信息

     ```tex
     Caused by: java.lang.IllegalStateException: Ambiguous mapping. Cannot map 'userController' method 
     com.ilovesshan.controller.UserController#t1()
     to { [/list]}: There is already 'orderController' bean method
     ```

   + 怎么解决？

     + 在类上添加注解，含义是将两个模块进行区分，相当于在/list基础上各自再配一个父级路径
     + 例如
       + 访问访问订单列表
         + http://localhost:8080/order/list
       + 访问用户列表
         + http://localhost:8080/user/list

   

2. 用在类上

   + UserController 

     ```java
     @Controller
     @RequestMapping("/user")
     public class UserController {
     
         @RequestMapping("/list")
         public String t1() {
             return "user-list";
         }
     }
     ```

     

   + OrderController

     ```java
     @Controller
     @RequestMapping("/order")
     public class OrderController {
         // 访问订单列表
         @RequestMapping("/list")
         public String t1() {
             return "order-list";
         }
     }
     ```



### @RequestMapping method属性

1. 用于限定请求方式类型， 是GET还是POST还是其他类型的请求

   ```java
   @RequestMapping(value = "/list",method = RequestMethod.GET)
   ```

   ```java
   @RequestMapping(value = "/list",method = RequestMethod.POST)
   ```

2. 省略method属性，默认允许任意请求类型。

3. 如果写了method = RequestMethod.GET，表示该请求只能通过GET方式请求，否则服务端会抛出异常 405（方法不允许）。



### @RequestMapping  派生类

1. @RequestMapping 注解有几个派生注解，主要是简化开发，也是SpringMVC对[restful风格](https://zhuanlan.zhihu.com/p/334809573)的支持。

2. 下面这四个派生注解是比较常用的，注意：这些派生注解就没有method属性了！！

   + 专门处理GET请求

     ```java
     @GetMapping(value = "/list")
     public String t2() {
         return "user-list";
     }
     ```

     

   + 专门处理POST请求

     ```java
     @PostMapping(value = "/list")
     public String t3() {
         return "user-list";
     }

   + 专门处理DELETE请求

     ```java
     @PutMapping(value = "/list")
     public String t4() {
         return "user-list";
     }
     ```

     

   + 专门处理PUT请求

     ```java
     @DeleteMapping(value = "/list")
     public String t5() {
         return "user-list";
     }
     ```

3. 看一下GetMapping的源码

   ```java
   // @RequestMapping 派生注解只能用在方法上
   @Target({ElementType.METHOD})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   // @GetMapping 本质还是通过@RequestMapping()来标注该类的
   @RequestMapping(
       method = {RequestMethod.GET}
   )
   public @interface GetMapping {
       @AliasFor(
           annotation = RequestMapping.class
       )
       String name() default "";
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] value() default {};
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] path() default {};
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] params() default {};
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] headers() default {};
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] consumes() default {};
   
       @AliasFor(
           annotation = RequestMapping.class
       )
       String[] produces() default {};
   }
   
   ```

   

### @RequestMapping params属性

1. 限制客户端传递的params参数

2. 如果请求中，携带的请求参数不满足这些条件，服务端会抛出异常 400（客户端请求参数不正确）。

   + 请求参数中必须有username参数

     ```java
     @GetMapping(value = "/list", params = {"username"})
     ```

     

   + 请求参数中不能有username参数

     ```java
     @GetMapping(value = "/list", params = {"!username"})
     ```

     

   + 请求参数中username必须等于132

     ```java
     @GetMapping(value = "/list", params = {"username=123"})
     ```

     

   + 请求参数中username不能等于132，没有username参数也可以

     ```java
     @GetMapping(value = "/list", params = {"username!=123"})
     ```

   

### @RequestMapping headers属性

1.  限制客户端传递的headers参数，用法、规则和 params属性一模一样！！

### @RequestMapping consumes属性

1. 客户端请求的提交内容类型（Content-Type），例如application/json, text/html;

2. 客户端提交的参数只能是指定的格式，如果不满足条件服务端会抛出异常 415 （ 不支持的媒体类型）。

   ```java
   // JSON格式应该不陌生吧  { "username":"123456", "password":"123465"}
   @GetMapping(value = "/list", consumes = {"application/json"})
   ```

   ```java
   // 既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息；
   @GetMapping(value = "/list", consumes = {"application/x-www-form-urlencoded"})
   ```

   ```java
   //只能上传键值对，并且键值对都是间隔分开的,比如 name=java&age=23
   @GetMapping(value = "/list", consumes = {"multipart/form-data"})
   ```

   

### @RequestMapping produces属性

1. 服务端返回给客户端内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回

2. chrome浏览器 Request Header中的Accept属性值

   ```tex
   Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
   ```

3. postman工具 Request Header中的Accept属性值

   ```tex
   Accept: */*
   ```

4. produces属性 用的比较少（前后端分离开发的模式中，一般通过json数据格式进行前后端）

   ```java
   @GetMapping(value = "/list", produces = {"application/json"})
   ```

   ```java
   @GetMapping(value = "/list", produces = {"text/html"})
   ```



### @RequestMapping ant模式匹配

1. SpringMVC 提供了ant（AntPathMatcher）模式匹配规则，主要就是对@RequestMapping注解的value属性根据规则进行匹配。

2.  Spring中的具体实现： org.springframework.util.AntPathMatcher，ant模式匹配有三种规则

3. ant模式匹配有三种规则，[参考博客](https://blog.csdn.net/feiying0canglang/article/details/120678900)

   + ？，匹配一个字符。

     ```java
     @GetMapping(value = "/a?")
     ```

   + *，匹配0到多个字符。

     ```java
     @GetMapping(value = "/a*")
     ```

     

   + **，匹配多级目录。注意写法

     + 正确的写法： xxx/\*\*/xxx

       ```java
       @GetMapping(value = "/a/**/b")
       ```

     + 错误的写法：xxx/a\*\*a/，\*\* 直接被当成字符串解析了。

       ```java
       @GetMapping(value = "/a/b**c/d")
       ```

       

   + {spring:[a-z]+}，将正则表达式[a-z]+匹配到的值，赋值给名为 spring 的路径变量。

     ```java
     @RequestMapping("/index/{username:[a-b]+}")
     @ResponseBody
     public String index(@PathVariable("username") String username){
         System.out.println(username);
         return username;
     }
     ```

     ```tex
     index/ab           	true  输出 ab
     index/abbaaa    	true  输出 abbaaa
     index/a             false 404错误
     index/ac            false 404错误
     ```

     

### @RequestMapping 占位符匹配

1. 占位符匹配主要是在restful中用得比较多，根据URL的路径层级进行匹配。

2. 举个例子，根据用户ID查询用户详情信息

   + 原始写法：http://localhost:8080/selectUserInfo?userId=1
   + restful写法：http://localhost:8080/users/1

3. 看代码

   + 请求映射一层目录

     + 请求路径：localhost:8080/students/1

       ```java
       @Controller
       @RequestMapping("students/")
       public class StudentController {
           // 关于 @PathVariable注解：可以从@RequestMapping("{xxx}")中动态的把xxx值拿出来
           // @PathVariable 解析请求路径中的占位符并将值映射给控制器方法的参数
       
           // @PathVariable("key"), 对应 @RequestMapping("{key}")的key
           // @PathVariable("id") Integer userId 会将 @RequestMapping("{xxx}")中的值赋值给 userId
           @RequestMapping("{id}")
           public String selectUserById(@PathVariable("id") Integer userId) {
               System.out.println("userId = " + userId);
               return "user-detail";
           }
       }
       ```

   + 请求映射多层目录

     + 请求路径：localhost:8080/students/username/110

       ```java
       @Controller
       @RequestMapping("students/")
       public class StudentController {
       
           @RequestMapping("{username}/{id}")
           public String selectUserById(@PathVariable("username") String username, @PathVariable("id") Integer userId) {
               System.out.println("username = " + username);
               System.out.println("userId = " + userId);
               return "user-detail";
           }
       }
       ```

       

## SpringMVC  请求参数

### 原始Servlet 获取请求参数

1. 客户端发送的请求都交给前端控制器（DispatcherServlet）来进行处理，而前端控制器根据客户端请求路径去匹配@RequestMapping 注解修饰的控制器方法并执行方法，其实前端控制器还是一个Servlet，只不过是SpringMVC对Servlet进行了一层封装。

2. 请求路径：localhost:8080/users?username=admin&password=123&hobby=read&hobby=run&hobby=code

   ```java
   @Controller
   @RequestMapping("/users")
   public class UserController {
   
       @GetMapping
       public String userInfo(HttpServletRequest httpServlet) {
           // DispatcherServlet发现控制器方法需要一个HttpServletRequest对象， 那么它就会传给你。
           String username = httpServlet.getParameter("username"); // admin
           String password = httpServlet.getParameter("password"); // 123
           String[] hobby = httpServlet.getParameterValues("hobby"); // [read, run, code]
           return "index";
       }
   }
   ```

### @RequestParam 获取参数

1. 获取请求参数的简单方式

   + 请求路径：localhost:8080/users?username=admin&password=123&hobby=read&hobby=run&hobby=code

     ```java
     @GetMapping
     public String userInfo(String username, String password, String[] hobby) {
         return "index";
     }

   

2. @RequestParam注解主要处理：请求参数名称和控制器方法参数名称不一致情况

   + 请求路径：localhost:8080/users?user_name=admin&passWORD=123

     ```java
     @GetMapping
     public String userInfo(@RequestParam("user_name") String username, @RequestParam("passWORD") String password) {
         System.out.println("username = " + username);
         System.out.println("password = " + password);
         return "index";
     }
     ```

3. @RequestParams 注解源码解析

   + @RequestParam 注解只能用在方法参数上。
   + name 和 value 属性：都是相同的意思，通过name从请求参数中匹配对应值
   + required属性：该参数是否是必传的，默认是TRUE，如果不传该参数那么服务端会抛出异常 400 ，并且控制器方法的的形参默认值是NULL。
   + defaultValue属性：如果匹配值为NULL，那么就使用默认值。

   ```java
   @Target({ElementType.PARAMETER})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   public @interface RequestParam {
       @AliasFor("name")
       String value() default "";
   
       @AliasFor("value")
       String name() default "";
   
       boolean required() default true;
   
       String defaultValue() default "\n\t\t\n\t\t\n\ue000\ue001\ue002\n\t\t\t\t\n";
   }
   ```

### @RequestHeader 获取参数

1. 获取请求头中的信息，用法和@RequestParam 注解用法一样。

   ```java
   @GetMapping
   public String userInfo(@RequestHeader("User-Agent") String userAgent, @RequestHeader("Host") String host) {
       return "index";
   }
   ```

   

2. @RequestHeader 源码

   ```java
   @Target({ElementType.PARAMETER})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   public @interface RequestHeader {
       @AliasFor("name")
       String value() default "";
   
       @AliasFor("value")
       String name() default "";
   
       boolean required() default true;
   
       String defaultValue() default "\n\t\t\n\t\t\n\ue000\ue001\ue002\n\t\t\t\t\n";
   }
   ```

   

### @PathVariable 获取参数

1. @PathVariable注解用于 映射 URL 绑定的占位符，通过 @PathVariable 可以将 URL 中占位符参数绑定到控制器处理方法的入参中，

   URL 中的 {xxx} 占位符可以通过@PathVariable(“xxx”) 绑定到操作方法的入参中。

2. @PathVariable注解 用法

   ```java
   @RequestMapping("{username}/{id}")
   public String selectUserById(@PathVariable("username") String username, @PathVariable("id") Integer userId) {
       return "user-detail";
   }
   ```

   

3. @PathVariable 源码

   ```java
   @Target({ElementType.PARAMETER})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   public @interface PathVariable {
       @AliasFor("name")
       String value() default "";
   
       @AliasFor("value")
       String name() default "";
   
       boolean required() default true;
   }
   
   ```

   

### @CookieValue 获取参数

1. 获取cookie信息，用法和@RequestParam 注解用法一样。

   ```java
   @GetMapping
   public String userInfo(@CookieValue("JSESSIONID") String jSessionId) {
       return "index";
   }
   ```

   

2. @CookieValue 源码

   ```java
   @Target({ElementType.PARAMETER})
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   public @interface CookieValue {
       @AliasFor("name")
       String value() default "";
   
       @AliasFor("value")
       String name() default "";
   
       boolean required() default true;
   
       String defaultValue() default "\n\t\t\n\t\t\n\ue000\ue001\ue002\n\t\t\t\t\n";
   }
   ```

   

### 通过POJO获取参数

1. 如果客户端请求参数很多，那势必会写很多个@RequestParam 注解，这时候可以通过一个POJO对象来接收参数，DispatcherServlet会进行自动装配，底层通过反射对POJO对象属性赋值。

2. 新建一个POJO对象

   ```java
   @Data
   @NoArgsConstructor
   @AllArgsConstructor
   public class User {
       private String username;
       private String password;
   }
   ```

   

3. 编写控制器代码

   ```java
   @GetMapping
   public String userInfo(User user) {
       System.out.println("user = " + user);
       return "index";
   }
   ```

   + 请求路径：localhost:8080/users?username=ilovesshan&password=123456

     ```tex
     user = User(username=ilovesshan, password=123456)
     ```

   + 请求路径：localhost:8080/users?username=ilovesshan

     ```tex
     user = User(username=ilovesshan, password=null)
     ```



### 请求参数乱码问题

1. tomcat版本不同，每个版本的乱码情况也会有所不同，可以参考[tomcat版本乱码问题](https://ilovesshan.github.io/pages/backend/javaWeb.html#httpservletrequest%E8%AF%A6%E8%A7%A3)。

2. SpringMVC中处理乱码问题，再web.xml中配置一个CharacterEncodingFilter过滤器即可，CharacterEncodingFilter是SprinfMVC提供的。

   ```xml
   <filter>
       <filter-name>CharacterEncodingFilter</filter-name>
       <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
       <init-param>
           <param-name>encoding</param-name>
           <param-value>UTF-8</param-value>
       </init-param>
       <init-param>
           <param-name>forceResponseEncoding</param-name>
           <param-value>TRUE</param-value>
       </init-param>
   </filter>

3. CharacterEncodingFilter核心源码

   ```java
   public class CharacterEncodingFilter extends OncePerRequestFilter {
   
       @Nullable
       private String encoding;
   
       private boolean forceRequestEncoding = false;
   
       private boolean forceResponseEncoding = false;
   
       // 其他代码省略了...
   
       @Override
       protected void doFilterInternal(
           HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
           throws ServletException, IOException {
   
           // 核心代码
           String encoding = getEncoding();
           if (encoding != null) {
               if (isForceRequestEncoding() || request.getCharacterEncoding() == null) {
                   request.setCharacterEncoding(encoding);
               }
               if (isForceResponseEncoding()) {
                   response.setCharacterEncoding(encoding);
               }
           }
           filterChain.doFilter(request, response);
       }
   }
   ```

   