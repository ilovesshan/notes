# JavaWeb

## Servlet

### 系统架构模式

1. 系统架构模式

   + C/S 架构（Client / Server）
   + B/S 架构（Browser / Server）

2. C/S 架构

   + C/S架构优点
     + 响应速度快、体验好、安全性较高
   + C/S架构缺点
     + 升级维护比较麻烦

3. B/S 架构

   + B/S架构优点

     + 免安装、升级维护成本小

   + B/S架构缺点

     + 安全性较低、响应速度较慢，体验较差

     

### BS系统架构通信原理

1. web系统访问流程

   + 打开浏览器
   + 输入要访问的地址
   + 按下会回车
   + 等待浏览器展示目标地址的资源

2. 域名/网址

   + https://www.baidu.com/index.html 是一个网址

   + www.baidu.com 是一个域名

   + 一个域名本质上是对应着一个ip地址，反过来说：一个ip地址可以被多个域名映射，但是一个域名只能映射一个ip地址。

     ![image-20230301171420702](../../.vuepress/public/image-20230301171420702.png)

3. IP地址/端口

   + IP地址，通过一个ip地址可以确定一台计算
   + 端口，通过一个端口可以确定一个服务（应用程序）
   + 通过IP地址+端口就可以确定某台计算机上的某个应用程序

4. 一个web系统的通信流程

   + 打开浏览器输入目标地址（URL）
   + 通过域名解析系统进行域名解析，https://110.242.68.66:80/index.html
   + 浏览器在网络中送搜索 110.242.68.66 这台主机，并且找到他
   + 80 端口得知浏览器想从服务器获取 index.html 这个资源
   + 服务器将 index.html 这个资源返回给浏览器
   + 浏览器收到来自服务器响应的资源（HTML、CSS、JS）
   + 浏览器解析并执行这些代码，最后再渲染出来

   ![image-20230301194227808](../../.vuepress/public/image-20230301194227808.png)

### WEB服务器

1. 常见的WEB服务器（这些软件都是提前开发好的）

   + tomcat（WEB服务器）
   + jetty（WEB服务器）
   + JBoss（应用服务器）
   + WebLogic（应用服务器）

2. WEB服务器和应用服务器服务器区别

   + 应用服务器实现了JavaEE的所有规范（JavaEE有13个规范）
   + WEB服务器只实现了 Servlet 和 JSP规范
   + 由此可得出：应用服务器中就包含了WEB服务器

3. Tomcat下载

   + [apache官网](https://apache.org/)：https://apache.org/

   + [Tomcat官网](https://tomcat.apache.org/)：https://tomcat.apache.org/

   + Tomcat是一个轻量级的WEB服务器，它是apache基金会下的一款开源产品，特点是：开源免费、体积小（只实现了 Servlet + JSP规范）、运行速度快。

   + Tomcat还有另一个名字：Catalina

   + 要想运行 Tomcat需要JRE，所以先安装一个JDK吧

     + [JDK下载地址](http://www.codebaoku.com/jdk/jdk-oracle-jdk1-8.html)：http://www.codebaoku.com/jdk/jdk-oracle-jdk1-8.html

     + JAVA_HOME = E:\workspace\env\jdk\jdk-17.0.1
     + path中添加：%JAVA_HOME %\bin

4. Tomcat服务器安装和配置

   + 官网下载[Tomcat10.x](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.6/bin/apache-tomcat-10.1.6.zip)，解压后直接即可。顺便下载一份源码[Tomcat10.x](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.6/src/apache-tomcat-10.1.6-src.zip)。

   + 启动Tomcat

     + 进入到Tomcat的安装目录下的bin目录下

       ```bash
       # 启动Tomcat服务
       startup.bat
       # 启动之后，在浏览器中输入：http://localhost:8080/ 如果可以看到一只猫，就表示这个服务器启动成功了
       
       # 停止Tomcat服务, 方便记忆修改了一下文件名称 shutdown.bat -> stop.bat
       stop.bat
       ```

     + 浅析一下 startup.bat 目录的执行流程

       + startup.bat 文件中有一行代码

         ```shell
         # 38行 意思大概是： 执行CATALINA_HOME目录下的bin\catalina.bat文件
         set "EXECUTABLE=%CATALINA_HOME%\bin\catalina.bat"
         ```

         

       + 找到 catalina.bat文件，分析一下

         ```bash
         # 238行 告诉我们主类是 org.apache.catalina.startup.Bootstrap
         set MAINCLASS=org.apache.catalina.startup.Bootstrap
         ```

         

       + 阅读org.apache.catalina.startup.Bootstrap 类

         434行 - 513行 可以看到main函数, 而且也有注释标明这就是Tomcat容器启动的入口函数

         ```java
         /**
         * Main method and entry point when starting Tomcat via the providedA scripts.
         *
         * @param args Command line arguments to be processed
         */
         public static void main(String args[]) {
         
             synchronized (daemonLock) {
                 if (daemon == null) {
                     // Don't set daemon until init() has completed
                     Bootstrap bootstrap = new Bootstrap();
                     try {
                         bootstrap.init();
                     } catch (Throwable t) {
                         handleThrowable(t);
                         t.printStackTrace();
                         return;
                     }
                     daemon = bootstrap;
                 } else {
                     // When running as a service the call to stop will be on a new
                     // thread so make sure the correct class loader is used to
                     // prevent a range of class not found exceptions.
                     Thread.currentThread().setContextClassLoader(daemon.catalinaLoader);
                 }
             }
             // ...
         }
         ```

     + Tomcat 目录分析

       + bin：Tomcat命令文件，例如 startup.bat、shutdown.bat 等，bin目录下主要存放两大类：.sh 和 .bat 结尾的文件。
       + conf：Tomcat的配置文件。例如：server.xml中（可以配置Tomcat容器运行的端口，默认8080）。
       + lib：Tomcat核心包，因为Tomcat是纯Java语言编写的，所以 lib 包下也是全部存放的Java文件，只不过这些Java文件被打包成  jar包了。
       + logs：Tomcat的日志文件，记录Tomcat从启动到运行到停止运行的日志信息，如果Tomcat启动失败，可以到logs文件下面排查错误日志信息。
       + temp：Tomcat临时目录，存放一些临时文件。
       + webapps：这是一个很重要的文件夹，我们编写的app应用程序就必须要放在该目录下面，不然Tomcat不会识别你的app应用程序，这是规则必须遵循。
       + work：JSP文件被编译成的Java文件和源Java文件被编译后生成的class文件。

### 编写一个WEBApp应用

1. 编写一个WEBApp应用，运行在部署在Tomcat服务器上面。

   + 在 webapps 目录下新建一个文件夹 ，和项目名称一样（oa ）。

   + 在 oa 目录下新建 一个index.html 文件。

     ```html
     <!DOCTYPE html>
     <html lang="en">
     
         <head>
             <meta charset="UTF-8">
             <meta http-equiv="X-UA-Compatible" content="IE=edge">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>First App</title>
         </head>
     
         <body>
             <h2>First App</h2>
         </body>
     
     </html>
     ```

     

   + 浏览器中输入一下地址： http://localhost:8080/oa/index.html，能看到 First App 几个英文字母，就表示OK了。

2. 用a标签来实现 在浏览器中地址栏中输入 URL 的效果。

   + 新建一个 login.html 和 user/test/test.html 文件。

     ```html
     <h2>Login App</h2>
     ```

     ```html
     <h2>Test App</h2> 
     ```

     

   + 在index. html 文件中添加 a 标签。实现页面跳转。

     ```html
     <a href="http://localhost:8080/oa/login.html">Login App Page</a>
     <a href="http://localhost:8080/oa/user/test/test.html">Test App Page</a>
     
     <!-- 使用绝对路径, 注意前面的"/"别漏了,"/"后面跟的是项目名称-->
     <!-- 如果是多层文件夹, 那么按照文件夹层次写即可-->
     <a href="/oa/login.html">Login App Page</a>
     <a href="/oa/user/test/test.html">Test App Page</a>
     ```

3. 动态网页

   + 目前访问的页面都是一些静态网页资源，如何能访问到动态网页呢？（动态网页就是跟随数据库的数据变化而变化，这些数据是动态从数据库查询出来的，不是在htmnl文件中写死的数据），这就牵涉到需要连接数据库了（JDBC）。

   

### BS架构系统角色和协议

+ BS架构系统通信原理详细图

  ![image-20230301222854594](../../.vuepress/public/image-20230301222854594.png)

  

+ BS架构系统角色和协议

  + BS架构系统相关角色

    + browser 浏览器开发团队，（google、360浏览器，Edge、fireFix...）

    + webserver 服务器开发团队，（Tomcat、Jetty、JBoss，webLogic...）

    + dbservewr 数据库服务器开发团队，（MySql、Oracle、SqlServe、H2...）

    + webapp web应用开发团队

      

  + BS架构系统相关协议

    + 浏览器开发团队 和 服务器开发团队遵循 Http 协议，超本文传输协议。
    + 服务器开发团队 和  web应用开发团队遵循 Servlet 规范，Servlet 规范属于 JavaEE 规范之一。
    + 数据库服务器 和  web应用开发团队遵循 JDBC 规范，JDBC 规范属于 JavaEE 规范之一。

    ![image-20230301224839647](../../.vuepress/public/image-20230301224839647.png)



### 模拟Servlet本质

1. 充当 Servlet开发者

   ```java
   public interface Servlet {
       void service();
   }
   ```

   

2. 充当web服务器（Tomcat）开发者

   ```java
   public class Tomcat {
       public static void main(String[] args) throws IOException, NoSuchMethodException, ClassNotFoundException, InvocationTargetException, InstantiationException, IllegalAccessException {
           System.out.println("Tomcat 服务器开始运行...");
   
           // 通过Scanner类模拟用户在浏览器中输入URL地址
           Scanner scanner = new Scanner(System.in);
   
           System.out.print("请输入URL地址：");
           String path = scanner.nextLine();
   
           // 通过读取配置文件来解析path和Servlet的对应关系
           Properties properties = new Properties();
           InputStream resourceAsStream = ClassLoader.getSystemClassLoader().getResourceAsStream("web.properties");
           properties.load(resourceAsStream);
   
           // 得到Servlet的全限定名称
           String className = properties.getProperty(path);
   
           // 通过发射加载这个类
           if (!"".equals(className) && className != null) {
               Class<?> aClass = Class.forName(className);
               // 应为我们知道 web服务器和webapp开发者都要实现Servlet规范，这里巧妙利用多态的思想。
               Servlet servletInstance = (Servlet) aClass.getDeclaredConstructor().newInstance();
               servletInstance.service();
           } else {
               System.out.println("错误的URL地址");
           }
       }
   
   ```

   

3. 充当webapp开发者

   ```java
   public class LoginServlet implements Servlet {
       @Override
       public void service() {
           System.out.println("LoginServlet...");
       }
   }
   ```

   ```java
   public class UserListServlet implements Servlet {
       @Override
       public void service() {
           System.out.println("UserListServlet...");
       }
   }
   ```

4. 总结

   + web应用开发者和webapp开发者都应该遵循Servlet规范。
   + Servlet规范这一套规范是提前开发好的，里面的配置文件名称、配置文件路径等等信息在开发的时候已经制定好了。
   + 这就要求webapp开发者不能一定要按照Servlet规范来进行开发，比如：配置文件名称不能乱改、文件路径不能乱发。

### JavaEE和JakartaEE

+ 目前JavaEE的版本是8。
+ JavaEE被Oracle捐献了，Oracle将JavaEE规范捐献给apache了，apache公司就对JavaEE进行改名，叫做 JarkartaEE。
+ JavaEE8版本升级之后的“JavaEE 9”，不再是“JavaEE9”这个名字了，叫做JakartaEE9。
+ Tomcat9-的版本全部使用的是JavaEE，而Tomcat9+使用的是JarkartaEE，可以看Servlet包名就能得出这个结论：
  + Tomcat9- ，Servlet所在包：javax.servlet.Servlet
  + Tomcat10+，Servlet所在包：jakarta.servlet.Servlet（包名都换了）

### 开发一个Servlet应用程序

1. 开发步骤（遵循Servlet规范）

   + 第一步：在Tomcat目录下的 webapps 目录下新建一个文件夹，和项目名称一样，这里叫做：crm

   + 第二步：在 crm 文件夹中新建 WEB-INF 目录，文件夹名称是固定的，不能自己改。

   + 第三步：在 WEB-INF 文件夹下面新建 classes 目录，改目录下用于存Java文件编译之后的字节码文件。

   + 第四步：在 WEB-INF 文件夹下面新建 lib 目录（不是必须的），改目录下存放webpaa依赖的jar包。

   + 第五步：在 WEB-INF 文件夹下面新建 web.xml 文件（建议复制其他文件夹下的web.xml文件，自己手写防止出错），记住，记住文件名称一定是 web.xml，不能自己乱更改。

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                                  https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
              version="5.0"
              metadata-complete="true">
     
     </web-app>
     ```

   + 第六步：编写 Servlet 代码，实现具体的业务逻辑功能，将编译之后的class文件放到classes文件夹中就ok了

     ```java
     package com.webapp;
     
     
     import jakarta.servlet.*;
     
     import java.io.IOException;
     
     public class TestServlet implements Servlet {
         @Override
         public void init(ServletConfig servletConfig) throws ServletException {
             System.out.println("TestServlet init...");
         }
     
         @Override
         public ServletConfig getServletConfig() {
             System.out.println("TestServlet getServletConfig...");
             return null;
         }
     
         @Override
         public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
             System.out.println("TestServlet service...");
         }
     
         @Override
         public String getServletInfo() {
             System.out.println("TestServlet getServletInfo...");
             return null;
         }
     
         @Override
         public void destroy() {
             System.out.println("TestServlet destroy...");
         }
     }
     
     ```

     

   + 第七步：在 web.xml 中注册 Servlet ，目的是配置Servlert 的访问路径关系。

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                                  https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
              version="6.0"
              metadata-complete="true">
     
     
         <!-- 注册 Servlet, 一个 Servlet对应一个 servlet-mapping-->
         <servlet>
             <servlet-name>TestServlet</servlet-name>
             <servlet-class>com.webapp.TestServlet</servlet-class>
         </servlet>
     
         <!--
                 servlet-name 名字和上面保持一致就好啦 
                 url-pattern配置映射路径，就是配置浏览器中访问的路径 
             -->
         <servlet-mapping>
             <servlet-name>TestServlet</servlet-name>
             <url-pattern>/test</url-pattern>
         </servlet-mapping>
     </web-app>
     
     ```

     

   + 第八步：浏览器输入：http://localhost:8080/crm/test，进行测试。

     

2. 处理Tomcat控制台乱码

   ```java
   // conf/logging.properties
   // 将UTF-8改成GBK
   java.util.logging.ConsoleHandler.encoding = GBK
   ```

   

3. 向浏览器响应一段HTML代码

   ```java
   // 设置响应类型为文本类型或者html
   servletResponse.setContentType("text/html");
   // 获取输出流 Returns a <code>PrintWriter</code> object that can send character text to the client.
   PrintWriter writer = servletResponse.getWriter();
   writer.flush();
   writer.write("<h2>TestServlet service...</h2>");
   ```



### Servlet中连接数据库

1. 很简单，直接编写连接数据相关代码即可，注意：新的Servlet需要在 web.xml 中注册。

   ```java
   @Override
   public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws IOException {
       servletResponse.setContentType("text/html");
   
       String url = "jdbc:mysql://localhost:3306/javaweb?serverTimezone=UTC&characterEncoding=utf8&useUnicode=true&useSSL=false";
       String username = "root";
       String pwd = "123456";
   
       StringBuilder builder = new StringBuilder();
       try {
           // 注册驱动
           Class.forName("com.mysql.cj.jdbc.Driver");
   
           // 通过DriverManger 获取连接对象
           connection = DriverManager.getConnection(url, username, pwd);
   
           // 获取 PreparedStatement对象
           prepareStatement = connection.prepareStatement("select * from user;");
   
           // 执行sql语句, 处理执行结果
           query = prepareStatement.executeQuery();
           while (query.next()) {
               String id = query.getString("id");
               String account = query.getString("account");
               String password = query.getString("password");
               String createTime = query.getString("create_time");
               builder.append("id = ")
                   .append(id)
                   .append(", account = ")
                   .append(account)
                   .append(", password = ")
                   .append(password)
                   .append(", createTime = ")
                   .append(createTime)
                   .append("<br>");
           }
   
       } catch (ClassNotFoundException e) {
           e.printStackTrace();
       } catch (SQLException e) {
           e.printStackTrace();
       } finally {
           // 关闭资源
       }
   
       // 将信息响应给 客户端
       PrintWriter writer = servletResponse.getWriter();
       writer.write(builder.toString());
       writer.flush();
   }
   ```

   ![image-20230302151017097](../../.vuepress/public/image-20230302151017097.png)



### Servlet 生命周期

1. 什么是生命周期？

   + 生命周期就是一个对象从创建到销毁经历的一个过程。
   + 简单理解就是：一个人从出生、上小学、成年、结婚...，经历的这一个过程。

2. servlet的生命周期由谁来管理？我们自己new一个servlet对象会被管理servlet容器所管理吗？

   + servlet的生命周期由Tomcat容器来管理的。

   + 我们自己new一个servlet对象不会被Tomcat容器来管理。原因很简单：Tomcat底层应该有一个HashMap来维护 一个servlet的全限定名称和客户端访问地址，我们自己new的servlet对象并没有放到这个集合中，自然不会被tomcat所管理。

     ![image-20230302184956344](../../.vuepress/public/image-20230302184956344.png)

3. tomcat容器启动时，servlet对象会被实例化吗？

   + tomcat容器启动时，servlet对象不会被实例化。
   + 这个设计也是合理的，如果tomcat容器启动时就把所有的servlet加载到内存中，这样就导致某些servlet压根没被用户访问也被加载在内存中了，这会浪费大量的内存资源。
   + 为了验证这个结果，也可以在servlet中进行代码测试。

4. tomcat容器启动时，怎么可以让某些servlet被加载在内存中呢？

   + 其实我们可以通过 <load-on-startup>0</load-on-startup> 标签来指定servlet加载时机。使用<load-on-startup>0</load-on-startup>标签之后，tomcat启动时会调用servlet的无参构造紧接着就调用init方法

     ```xml
     <servlet>
         <servlet-name>servletA</servlet-name>
         <servlet-class>com.ilovesshan.servlet.ServletA</servlet-class>
         <!--
                 1、告诉tomcat启动时，就把这个servlet对象加载到容器中，
                 2、load-on-startup的值是一个正整数，值越小优先级越高
             -->
         <load-on-startup>0</load-on-startup>
     </servlet>
     <servlet-mapping>
         <servlet-name>servletA</servlet-name>
         <url-pattern>/a</url-pattern>
     </servlet-mapping>
     ```

     

5. Servlet 生命周期是怎么一个过程？

+ tomcat容器启动时：

  + 看是否配置<load-on-startup>0</load-on-startup>标签

+ tomcat容器中的servlet被第一次访问时：

  + servlet构造方法（生命周期中，只会被调用一次，如果容器启动时调用了，那么这一次就不调用了）

  + init 方法被调用（生命周期中，只会被调用一次，如果容器启动时调用了，那么这一次就不调用了）
  + service 方法会被调用一次（生命周期中可能会被调用多次）

+ tomcat容器中的servlet再次被访问时：

  + 客户端再访问一次servlet，那么servlet的service 方法就会被再调用一次，客户端访问100次，service方法也会被调用100次

+ tomcat容器销毁时：

  + destroy 方法被调用（生命周期中，只会被调用一次）

+ 思考：

  + servlet的destroy 方法被调用的时候，servlet还存在于内存中吗？
    + 肯定还是存在内存中的，如果不存在内存中了那还怎么调用destroy方法呢？
  + 这些方法都是被谁调用的呢？
    + 这些方法都是tomcat容器来进行调用的，我们要做的事就是在合适的时机在合适的方法中干合适的事。
  + servlet是单例吗？
    + 通过观察servlet生命周期来看，servlet是一个单例的，但是这个单例并不符合Java规范（Java中的单例模式起码构造器是被私有化了的），这是一个伪单例。
    + 造成伪单例的原因是：tomcat内部管理这个servlet时，并不会多次去构造这个对象，至始至终只有一个实例。
  + servlet的构造方法和init方法都只会被执行一次，先执行构造方法再执行init方法，那么为啥还要设计一个init方法呢？把一些初始化的工作放在构造器中可以吗？
    + 在servlet规范中，不建议我们去显式的去使用构造器做一些初始化工作，原因是：如果构造器使用不正确（写了一个/多个有参构造，就导致默认无参构造被干掉了），此时tomcat就不能正确将servlet实例化，会报错。
    + 在保证构造器正确使用的前提下，可以在构造器做一些初始化工作，但是不推荐，不推荐，我们作为webapp开发者应该尽可能的去遵循servlet规范。

  6. init、service、destroy方法
     + init：使用得便较少，通常做一些初始化操作（只需要初始化一次），比如：初始化数据库连接池，初始化线程池等等...
     + service：用的最多，service方法用来处理具体得业务逻辑
     + destroy：使用得便较少，通常做一些善后得操作，比如：释放资源，关闭数据库连接等等...

### 适配器模式改造Servlet

1. 分析一下现在写的servlet文件有什么不足？

   + 每一个servlet类都是需要实现servlet接口的，servlet接口中一共有5个方法

     ```java
     public interface Servlet {
         void init(ServletConfig var1) throws ServletException;
     
         ServletConfig getServletConfig();
     
         void service(ServletRequest var1, ServletResponse var2) throws ServletException, IOException;
     
         String getServletInfo();
     
         void destroy();
     }
     ```

     

   + servlet接口中这5个方法就只有service是用得最多的。其余四个方法用得很少，可以看到每个实现了servlet接口的类都要实现这5个方法，是不是很不优雅？我就只想用service方法，其余四个基本上不用，换句话说，就没必要实现了。

     ```java
     public class ServletA implements Servlet {
     
         @Override
         public void init(ServletConfig servletConfig) throws ServletException {
         }
     
     
         @Override
         public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
         }
     
     
         @Override
         public void destroy() {
     
         }
     
     
         @Override
         public ServletConfig getServletConfig() {
             return null;
         }
     
         @Override
         public String getServletInfo() {
             return null;
         }
     
     }
     ```

     

2. 使用适配模式来改造

   + 什么是适配器？
     + 适配器好比一个充电器，我们手机是不能直接插在220v的电线上吧？我们需要一个充电器来做一个适配。
     + 再举个例子：用户新买了一件两孔插座的电器，但是家里只有一个三孔插座，这个时候怎么办呢？可以再买一个插座适配器，来做转化，把适配器插到三孔插座上，用户直接把电器插到适配器即可。

   + 改造servlet采用接口适配器模式，接口适配器模式主要就是使用场景就是：一个接口有很多方法，但是我们仅仅需要使用其中一两个方法，而剩余的方法不使用，不使用的这部分方法及没必要提供实现，那么我们可以定义一个抽象类实现这个接口，将子类需要的方法作抽象方法留给子类实现，而剩余的用的少的那部分方法做一个默认实现即可。

   + 新建一个GenericServlet文件，来充当适配器

     ```java
     public abstract class GenericServlet implements Servlet {
         @Override
         public void init(ServletConfig servletConfig) throws ServletException {}
     
         @Override
         public ServletConfig getServletConfig() {
             return null;
         }
     
         /**
          * 将service方法留给子类去实现
          */
         @Override
         public abstract void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException;
     
     
         @Override
         public String getServletInfo() {
             return null;
         }
     
         @Override
         public void destroy() {}
     }
     
     ```

     ```java
     // 通过继承GenericServlet类，代码看起来就会优雅很多
     public class ServletA extends GenericServlet {
         @Override
         public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
             System.out.println("ServletA service方法被调用...");
         }
     }
     ```

     

### GenericServlet改造

1. 通过接口适配器设计模式将Servlet接口改造成了GenericServlet，那么分析一下，GenericServlet还有没有必要再继续改造？如果需要改造，改造的目的是什么？该怎么改造？

   + 先看一下init方法，init放啊有一个ServletConfig类型参数servletConfig，那么这个servletConfig是谁传给我们的呢？很显然，谁调用init方法那么这个参数就是谁传给我我们的，前面已经说了，是tomcat调用的哈！

   + ServletConfig接口

     ```java
     public interface ServletConfig {
         // 获取Servlet名称
         String getServletName();
     
         // 获取Servlet的上下文环境
         ServletContext getServletContext();
     
         // 通过key获取初始化参数值
         String getInitParameter(String var1);
     
         // 获取初始化参数的ley
         Enumeration<String> getInitParameterNames();
     }
     ```

     

   + 模拟一下tomcate调用Servlet对象方法的时机

     ```java
     public class Tomcat {
         public static void main(String[] args) throws Exception {
             // 做一些Tomcat内部初始化工作
     
             // 通过反射创建Servlet实例对象
             Class<?> name = Class.forName("com.ilovesshan.servlet.LoginServlet");
             Servlet loginServlet = (Servlet) name.getDeclaredConstructor().newInstance();
     
             // 创建ServletConfig对象
             ServletConfig servletConfig = new jakarta.servlet.ServletConfig();
     
             // 调用init方法
             loginServlet.init(servletConfig);
     
             // 其他处理...
         }
     }
     ```

   2. init方法被调用时，tomcat会传递过来一个参数servletConfig，但是这个参数只能在init方法中使用，那如果其他方法中也要使用这个对象怎么办？比如：service也要使用这个方法。

      + 其实也很简单，先定义一个私有的成员变量（定义成私有的，体现封装性），再在init方法中进行赋值就ok啦！

        ```java
        public abstract class GenericServlet implements Servlet {
            private ServletConfig servletConfig;
        
            @Override
            public void init(ServletConfig servletConfig) throws ServletException {
                this.servletConfig = servletConfig;
            }
        
            @Override
            public ServletConfig getServletConfig() {
                return null;
            }
        
            // 剩下的方法省略了...
        }
        ```

      + 这个时候 GenericServlet类中的所有方法就都可以使用这个参数啦，妙啊！！，但是子类如果也要使用怎么办？学习Java的权限修饰符可以知道，私有成员只能在本类中访问到，子类就访问不到了，有没有发现 我们实现Servlet接口的时候，实现了一个 getServlketConfig方法，这个方法要求我们返回一个 ServletConfig对象，好巧，这不就是为我们定义的私有成员变量提供了一个getter方法吗？这里会感觉到指定Servlet的开发团队设计真的是巧妙！！

        ```java
        public abstract class GenericServlet implements Servlet {
            private ServletConfig servletConfig;
        
            @Override
            public void init(ServletConfig servletConfig) throws ServletException {
                this.servletConfig = servletConfig;
            }
        
            // 提供了getter方法， 子类也就能够访问了
            @Override
            public ServletConfig getServletConfig() {
                return servletConfig;
            }
        
            // 剩下的方法省略了...
        }
        ```

   3. 这样改造了，貌似init方法中tomcat传递那个参数就都可以使用了，但是有个问题，子类如果在重写了init方法，那么父类的init方法不就被干掉了，那么servletConfig这个线就断了。

      + 很简单，我们可以通过final关键字来限制一下，子类不允许重写这个init方法。

        ```java
        public abstract class GenericServlet implements Servlet {
            private ServletConfig servletConfig;
        
            @Override
            public final void init(ServletConfig servletConfig) throws ServletException {
                this.servletConfig = servletConfig;
            }
        }
        
        ```

        

   4. 某些业务场景下，子类不得不重写init方法怎么办??

      + 我们可以再定义一个无参的init方法，我们在有参数的init方法中来调用这个无参数的init方法，让子类来重写这个无参数的init方法就ok啦！！！

        ```java
        public abstract class GenericServlet implements Servlet {
            private ServletConfig servletConfig;
        
            // final修饰的方法 不允许被子类重写
            @Override
            public final void init(ServletConfig servletConfig) throws ServletException {
                this.servletConfig = servletConfig;
                this.init();
            }
        
            // 该方法提供给子类重写
            public void init() {
            }
        }
        
        ```

   5. 我们经过千辛万苦编写的GenericServlet类，其实jakartaEE已经为我们提供好了，我们只是写了一个简易版本的伪代码，实际上这种思想我们的代码中已经深有体现。



### ServletConfig 详解

1. ServletConfig 是什么？

   + ServletConfig 中文意思：Servlet配置信息

   + ServletConfig 是一个接口，ServletConfig 也是属于Servlet规范之一

   + 一个ServletConfig 本质上是对应 web.xml中的一个 <servlet></servlet>标签中的属性，我们可以通过ServletConfig 来获取这些信息。

     ```xml
     <servlet>
         <servlet-name>aServlet</servlet-name>
         <servlet-class>com.ilovesshan.servlet.ServletA</servlet-class>
         
         <!-- 可能还有其他的属性...  -->
         <load-on-startup>1</load-on-startup>
     </servlet>
     ```

   + 由此可见，一个 <servlet></servlet>标签就会存在一个对应的ServletConfig 对象，web.xml中肯定不止一个 <servlet></servlet>标签吧?那也就意味着，每个servlet中获取到的ServletConfig 对象肯定是不一样的，验证一下结果。在浏览器分别访问两个Servlet。

     ![image-20230303184919844](../../.vuepress/public/image-20230303184919844.png)

   + 其实可以根据打印信息来判断，这个两个Servlet是不一样的。

     ```tex
     org.apache.catalina.core.StandardWrapperFacade@51a61719
     org.apache.catalina.core.StandardWrapperFacade@3ff56cfb
     ```

2. ServletConfig是谁创建的？是什么时候创建的？

   + ServletConfig对象是tomcat创建的，根据上面打印的信息，可以发现ServletConfig对象就是：org.apache.catalina.core.StandardWrapperFacade类，肯定是StandardWrapperFacade实现了ServletConfig接口。

     ```java
     public final class StandardWrapperFacade implements ServletConfig {}
     ```

   + ServletConfig对象是tomcat调用init之前创建的，因为调用init方法是吧ServletConfig当作方法参数传进去了。

     源码路径： org.apache.jasper.servlet.JspServletWrapper

     ```java
     public Servlet getServlet() throws ServletException {
         if (getReloadInternal() || theServlet == null) {
             synchronized (this) {
                 if (getReloadInternal() || theServlet == null) {
                     destroy();
     
                     final Servlet servlet;
     
                     try {
                         // 通过config配置信息去获取一个Servlet实例对象
                         InstanceManager instanceManager = InstanceManagerFactory.getInstanceManager(config);
                         servlet = (Servlet) instanceManager.newInstance(ctxt.getFQCN(), ctxt.getJspLoader());
                     } catch (Exception e) {
                         Throwable t = ExceptionUtils .unwrapInvocationTargetException(e);
                         ExceptionUtils.handleThrowable(t);
                         throw new JasperException(t);
                     }
                     // 调用servlet的init方法 将config（ServletConfig）作为参数传入
                     servlet.init(config);
     
                     if (theServlet != null) {
                         ctxt.getRuntimeContext().incrementJspReloadCount();
                     }
     
                     theServlet = servlet;
                     reload = false;
                 }
             }
         }
         return theServlet;
     }
     
     ```

     

3. ServletConfig有哪些方法？每个方法有啥作用？

   + getServletName

     + public  String getServletName();

     + getServletName主要获取<servlet-name>标签中的值

       

   + getServletContext

     + public  ServletContext getServletContext();

     + getServletContext主要获取当前servlet的上下文环境（后面研究）

       

   + getInitParameter 

     + public  String getInitParameter(String var1);

     + getInitParameter 主要获取<servlet>标签中的配置的参数名称

       

   + getInitParameterNames

     + public  Enumeration<String> getInitParameterNames();
     + getInitParameterNames主要获取<<servlet>标签中的配置的参数名称对应的值

4. 修改一下web.xml配置文件，验证ServletConfig中的方法。

   ```xml
   <servlet>
       <servlet-name>aServlet</servlet-name>
       <servlet-class>com.ilovesshan.servlet.ServletA</servlet-class>
       <load-on-startup>1</load-on-startup>
       <init-param>
           <param-name>url</param-name>
           <param-value>jdbc:mysql://localhost/userdb</param-value>
       </init-param>
       <init-param>
           <param-name>username</param-name>
           <param-value>ilovesshan</param-value>
       </init-param>
       <init-param>
           <param-name>password</param-name>
           <param-value>1234565</param-value>
       </init-param>
   </servlet>
   
   <servlet-mapping>
       <servlet-name>aServlet</servlet-name>
       <url-pattern>/a</url-pattern>
   </servlet-mapping>
   ```

   ```java
   public class ServletA extends GenericServlet {
       @Override
       public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
           ServletConfig config = getServletConfig();
           // 获取servlet配置信息
           String servletName = config.getServletName();
           System.out.println("servletName = " + servletName);
           
           Enumeration<String> initParameterNames = config.getInitParameterNames();
           while (initParameterNames.hasMoreElements()) {
               String parameterName = initParameterNames.nextElement();
               // 获取参数名称
               String parameterValue = config.getInitParameter(parameterName);
               // 根据参数名称获取参数值
               System.out.println(parameterName + "=" + parameterValue);
           }
       }
   }
   ```

   ![image-20230303192022252](../../.vuepress/public/image-20230303192022252.png)

5. 可以发现，GenericServlet抽象类不仅实现了Servlet接口还实现了ServletConfig接口，高兴的是：GenericServlet帮我们实现了ServletConfig接口中的方法，那我们在子类中是不是就可以通过this直接调用ServletConfig接口中的方法啦，不用通过getServletConfig来获取ServletConfig配置信息，因为GenericServlet类中也是通过ServletConfig来调用那些方法的。

   ```java
   public abstract class GenericServlet implements Servlet, ServletConfig, Serializable {
       private static final long serialVersionUID = 1L;
       private transient ServletConfig config;
   
       public String getInitParameter(String name) {
           return this.getServletConfig().getInitParameter(name);
       }
   
       public Enumeration<String> getInitParameterNames() {
           return this.getServletConfig().getInitParameterNames();
       }
   
       public ServletConfig getServletConfig() {
           return this.config;
       }
   
       public ServletContext getServletContext() {
           return this.getServletConfig().getServletContext();
       }
       // ...
   }
   ```

   

### ServletContext 详解

1. ServletContext是什么？

   + ServletContext 也是Servlet规范之一，ServletContext 是一个接口。

   + ServletContext 翻译理解就是：Servlet的一个上下文环境
   + 其实一个ServletContext就好比一个web.xml文件，web.xml中有很多个<servlet> 和 <servlet-mapping>标签信息。
   + 一个webapp项目中只存在一web.xml呗，ServletContext那是不是也只有一个呢？后面代码验证！！
   + 再举一个例子：
     + 一个宿舍睡8个人，每个人是一个Servlet对象，那么这间宿舍就是一个ServletContext 
     + 宿舍中的洗漱间，空调，洗衣机大家都是公用的吧？那么放在ServletContext 中的信息或者数据，对于每个Servlet来说也是公用的呗！！

2. ServletContext 是谁创建的？什么时候创建的？

   + ServletContext 也是Tomcat来创建的，org.apache.catalina.core.ApplicationContextFacade接口实现了ServletContext 接口。
   + 创建时机

3. 每个Servlet中的ServletContext 是同一个吗？

   + 一个webapp项目中只存在一web.xml，一个ServletContext就好比一个web.xml文件，由此可得：每个Servlet中的ServletContext 是同一个，也可以通过代码验证。

     

     ![image-20230303194828976](../../.vuepress/public/image-20230303194828976.png)

4. ServletContext 常用方法

   + String getContextPath();

     +  获取项目的根路径(常用)

     ```java
     ServletContext application = getServletContext();
     String contextPath = application.getContextPath();
     System.out.println("contextPath = " + contextPath);
     // contextPath = /servlet04
     ```

   

   

   

   + String getRealPath(String var1);

     + 获取文件的绝对路径
     +  加 "/"和不加"/"没啥区别（推荐加上，更利于阅读），加不加都是从根路径下出发开始寻找文件

     ```java
     // 获取根目录
     String realPath = application.getRealPath("/");
     System.out.println("realPath = " + realPath);
     
     // 这是一个真实存在的文件
     String realPath1 = application.getRealPath("/pages/index.html");
     System.out.println("realPath1 = " + realPath1);
     
     // 这是一个不存在的文件
     String realPath2 = application.getRealPath("/index.html");
     System.out.println("realPath2 = " + realPath2);
     
     // realPath = E:\workspace\java\JavaWeb\code\out\artifacts\servlet04_war_exploded\
     // realPath1 =E:\workspace\java\JavaWeb\code\out\artifacts\servlet04_war_exploded\pages\index.html
     // realPath2 =E:\workspace\java\JavaWeb\code\out\artifacts\servlet04_war_exploded\index.html
     ```

   

   

   

   + void log(String var1);

   + void log(String var1, Throwable var2);

     + 日志打印方法，该条日志会被记录在tomcat的logs文件夹下面
     +  IDEA存放日志的位置会特殊一点，如果没有通过IDEA运行项目，那么日志信息就会存在Tomcat的logs文件夹下面，IDEA中可以创建多个Tomcat，那么这些日志文件存放的路径和IDEA的目录有关系，具体的存放目录，可以在Tomcat启动时，观察IDEA窗口的日志信息。其中 CATALINA_BASE 就是IDEA存放当前tomcat的一些信息（包括日志）

     + 进到对应文件夹的目录中，有三个文件
       + catalina.2023-03-03.log，和IDEA中启动Tomcat时控制台输出的日志信息一样
       + localhost.2023-03-03.log，Servlet运行中的一些日志信息
       + localhost_access_log.2023-03-03.txt，Tomcat的访问日志信息

   

   

   + String getInitParameter(String var1);

     + 获取servletContext的初始化参数

   + Enumeration<String> getInitParameterNames();

     + 获取servletContext的全部参数名称

     在web.xml的<web-app >标签中添加配置信息

     ```xml
     <web-app >
         <context-param>
             <param-name>pageSize</param-name>
             <param-value>10</param-value>
         </context-param>
     
         <context-param>
             <param-name>PageNum</param-name>
             <param-value>1</param-value>
         </context-param>
     </web-app>
     ```

     通过servletContext对象获取相关参数

     ```java
     ServletContext servletContext = getServletContext();
     
     Enumeration<String> initParameterNames = servletContext.getInitParameterNames();
     while (initParameterNames.hasMoreElements()) {
         // 获取参数
         String key = initParameterNames.nextElement();
         String value = servletContext.getInitParameter(key);
         System.out.println(key + " = " + value);
     }
     
     // PageNum = 1
     // pageSize = 10
     ```

     

     

     

   + void setAttribute(String var1, Object var2);

     +  向application中存放数据

   + Object getAttribute(String var1);

     + 从application中获取数据

   + void removeAttribute(String var1);

     + 从application中删除数据

   + Enumeration<String> getAttributeNames();

     + 从application获取所有的参数名称

     ```java
     // Aservlet 存放数据
     application.setAttribute("userInfo", new User(UUID.randomUUID().toString(), "ilovesshan", "123456"));
     application.setAttribute("tag", "ServletC");
     ```

     ```java
     // BServlet 获取数据
     Enumeration<String> attributeNames = application.getAttributeNames();
     while (attributeNames.hasMoreElements()) {
         // 获取参数(有一部分参数是Tomcat放入的)
         String name = attributeNames.nextElement();
         System.out.println("name = " + name);
     }
     
     
     Object userInfo = application.getAttribute("userInfo");
     Object tag = application.getAttribute("tag");
     
     System.out.println("userInfo = " + userInfo);
     System.out.println("tag = " + tag);
     
     
     // name = userInfo
     // name = org.apache.catalina.resources
     // name = org.apache.catalina.webappVersion
     // name = org.apache.tomcat.InstanceManager
     // name = org.apache.catalina.jsp_classpath
     // name = jakarta.servlet.context.tempdir
     // name = jakarta.websocket.server.ServerContainer
     // name = tag
     // name = org.apache.jasper.compiler.TldCache
     // name = org.apache.tomcat.JarScanner
     
     
     // userInfo = User{uid='53c5d6c3-5a87-4176-8500-52147b32a44f', uname='ilovesshan', upwd='123456'}
     // tag = ServletC
     ```



### Http协议

1. 什么是协议？
   + 协议就是双方都遵循的一个约定，规范！
   + 我说的话你能听懂，你说的话我也能听懂，我们双方都遵循这个协议，都遵循普通话协议。
   
2. http是什么？
   + 超文本是：不仅仅可以传输文本数据，还可以传输图片、音频、视频等等...
   + http是超文本传输协议，也就意味着http不仅仅可以传输文本数据，还可以传输图片、音频、视频等等...
   
3. http协议是什么？
   + Http协议是W3C制定的，主要用于B / S 端的通信协议，B端需要遵循这个协议，当然S端也需要遵循这个协议！
   
4. http协议详解

   + http协议分为两大部分

     + 请求协议，请求协议一共分为四部分

       + 请求头：主要包括第三部分：请求方式、请求URI、请求协议
       + 请求行：主要包括浏览器的一些参数信息，比如：cookie、accept、accept-language、accept-encoding、user-agent...
       + 请求空行：主要用于分割请求行和请求体
       + 请求体：发送给S端的数据

     + 响应协议，响应协议一共分为四部分

       + 响应状态：主要包括第两部分：响应协议、响应状态码

         + [HTTP状态码表](https://blog.csdn.net/m0_46243410/article/details/108323404)

         + 响应状态码：200，表示请求成功
         + 响应状态码：400，表示客户端请求的语法错误，服务器无法理解
         + 响应状态码：404，表示资源未找到，大多数情况是客户端请求路径有误
         + 响应状态码：500，表示服务器程序发生错误
         + 响应状态码：501，表示客户端请求方式有误，例如：服务端需要POST，客户端发送GET

       + 响应头：S端响应给浏览器的头部配置信息比如：Content-Type、Content-Length、Keep-Alive...

       + 响应空行：主要用于分割响应头和响应体

       + 响应体：S端响应给浏览器的数据，浏览器负责编译执行最终展示在界面上

   + 请求协议请求方式分类：

     + HTTP协议的请求方式有八种，分别是OPTIONS、GET、POST、HEAD、PUT、DELETE、CONNECT、TRACE，其中GET和POST最常用。

   + 请求协议中POST和GET区别

     + POST请求：将数据放在请求体中
     + GET请求：将数据会URI后面，通过"?"来衔接
     + 不管是POST还是GET区，他们携带数据的格式都是一样的："key1=values1&key2=values2"
     + 那既然这样，web服务器（tomcat）是不是就可以通过这个格式来处理我们的请求参数了！！妙啊

   + URI和URL区别

     + URI：统一定位资源符
     + URL：统一资源定位器
     + URL可以确定某个资源在网络中的位置，URI仅仅是标识这个资源在服务器中的位置（相对路径），URI并不能确定某个资源在网络中的具体位置
     + 这是一个URL（统一资源定位器）http://localhost:8080/servlet05/postRequest/index.html
     + 这是一个URI（统一资源资源符）/servlet05/postRequest/index.html

5. POST和GET的区别

   + POST请求发送的数据放在请求体，GET请求发送的数据放在请求头的URI后面，通过"?"衔接。
   + POST请求可以发送流媒体文件，比如：音频、视频、图片等等，GET请求只能发送文本数据。
   + W3C中有这样说过：POST请求一般用于向服务器提交数据，GET请求一般用于向服务器获取数据。
   + POST请求发送的数据不受大小限制，GET请求发送的数据会受到浏览器的限制，各个浏览器不同。
     + IE：对URL的最大限制为2083个字符，若超出这个数字，提交按钮没有任何反应。大概是4KB。
     + Firefox：对Firefox浏览器URL的长度限制为：65536个字符，大概是128KB。
     +  Safari：URL最大长度限制为80000个字符，大概是156KB。
     +  Opera：URL最大长度限制为190000个字符，大概是371KB。
     + Chrome：URL最大长度限制为8182个字符，大概是15KB。
   + GET请求是绝对安全的因为GET请求仅仅是从服务端获取资源，如果路径输错了那就意味着获取不到呗，不会对服务器造成啥影响。而POST是要向服务器提交数据的，服务器要对这些数据进行处理，有些情况不能防止用户从后门提交一些数据去攻击服务器，这对服务器来说非常不安全，因此服务端拦截一般都是对POST进行拦截。
   + GET请求有缓存，POST请求没有缓存。
     + GET请求每次请求时、会先看浏览器缓存中有没有缓存，如果有就直接取出来，没有再去服务器请求。相当于每一个GET请求(URL不同)就会对应一个缓存。
     + POST请求不会有缓存，因为POST请求大多数是用于向服务器提交数据。
     + 如何解决GET缓存问题呢？造成缓存原因还不是两个URL相同呗！很简单在URL后面加一个时间戳就好啦！

### 模板方法设计模式

1. 什么是设计模式？

   + 解决问题固定的模板或者套路(代码可以复用)

2. 常见的设计模式有那些？

   + JavaEE设计模式
   + GOF（四人帮，全拼 Gang of Four）设计模式，也就是常听说的23种设计模式

3. 模板方法设计模式

   + 类中提供一个模板，类中的方法（抽取共性，预留不同）可以延迟到子类来实现，这个类一般是抽象类
   + 类中提供一个模板设计方法，定义核心算法骨架（可以用final修饰，让子类不能随便更改核心算法代码）
   + 父类中提供模板并定义核心算法骨架，保留共性将不同的实现延迟到子类去实现。

4. 不使用模板设计模式

   ```java
   public class Student {
   
       /**
        * 定义核心算法骨架，与Teacher类的算法骨架相同
        */
       public void day() {
           getup();
           haveBreakfast();
           work();
           haveDinner();
           sleep();
       }
   
       public void getup() {
           System.out.println("起床了...");
       }
   
       public void haveBreakfast() {
           System.out.println("吃早餐...");
       }
   
       public void work() {
           System.out.println("到教室学习了...");
       }
   
       public void haveDinner() {
           System.out.println("吃晚餐...");
       }
   
       public void sleep() {
           System.out.println("睡觉了...");
       }
   }
   
   
   
   public class Teacher {
   
       /**
        * 定义核心算法骨架，与Student类的算法骨架相同
        */
       public void day() {
           getup();
           haveBreakfast();
           work();
           haveDinner();
           sleep();
       }
   
       public void getup() {
           System.out.println("起床了...");
       }
   
       public void haveBreakfast() {
           System.out.println("吃早餐...");
       }
   
       public void work() {
           System.out.println("到教室给学生上课...");
       }
   
       public void haveDinner() {
           System.out.println("吃晚餐...");
       }
   
       public void sleep() {
           System.out.println("睡觉了...");
       }
   }
   
   ```

   

5. 使用模板设计模式

   ```java
   public abstract class Person {
       /**
        * 定义核心算法骨架，使用final修饰不让子类修改
        */
       public void day() {
           getup();
           haveBreakfast();
           work();
           haveDinner();
           sleep();
       }
   
       public void getup() {
           System.out.println("起床了...");
       }
   
       public void haveBreakfast() {
           System.out.println("吃早餐...");
       }
   
       /**
        * 抽象方法延迟到子类去执行
        */
       public abstract void work();
   
       public void haveDinner() {
           System.out.println("吃晚餐...");
       }
   
       public void sleep() {
           System.out.println("睡觉了...");
       }
   }
   
   ```

   ```java
   public class Student extends Person {
       public void work() {
           System.out.println("到教室学习了...");
       }
   }
   
   ```

   ```java
   public class Teacher {
       public void work() {
           System.out.println("到教室给学生上课...");
       }
   }
   ```

   

### HttpServlet源码分析

1. 目前为止，接触到了那些关于Servlet的接口或者类（抽象类）

   + jakarta.servlet.Servlet（接口）

     + Servlet是一个接口，定义了一系列规范接口

   + jakarta.servlet.GenericServlet（抽象类）

     + 是一个标准的Servlet，GenericServlet实现了Servlet接口，GenericServlet中包含了适配器设计模式（接口适配器设计模式）

   + jakarta.servlet.ServletConfig（接口）

     + Servlet 配置信息（web.xml中<servlet>标签中的配置）

   + jakarta.servlet.ServletContext（接口）

     + Servlet 上下文环境（相当于web.xml包含的信息配置）

   + jakarta.servlet.ServletRequest（抽象类）

     + Servlet 请求信息

   + jakarta.servlet.ServletResponse（抽象类）

     + Servlet 响应信息

     

2. HttpServlet类主要作用？

   + BS架构的系统中，通信协议是HTTP，而HttpServlet中封装了大量关于HTTP的方法和参数信息
   + 简单理解就是HttpServlet把请求协议中和响应协议中的信息做了一层封装，让webapp开发者获取数据和响应数据更简单
   + HttpServlet类中采用经典设计模式，模板方法设计模式

3. HttpServlet类和Servlet关系？

   ```java
   public interface Servlet{}  // 爷爷
   public abstract class GenericServlet implements Servlet{} // 儿子
   public abstract class HttpServlet extends GenericServlet{} // 孙子
   ```

4. 回顾Servlet生命周期

   + 第一访问Servlet
     + 调用Servlet无参构造方法
     + 调用Servlet的init方法
     + 调用Servlet的service方法
   + 第二访问Servle
     + 调用Servlet的service方法
   + 第三访问Servle
     + 调用Servlet的service方法
   + 第n访问Servle
     + 调用Servlet的service方法
   + Tomcat容器销毁
     + 调用Servlet的destroy方法

   

5. HttpServlet执行流程

   + 定义一个Servlet继承HttpServletRequest

     ```java
     public class HelloServlet extends HttpServlet {}
     ```

   + 构造器调用的执行流程

     ```java
     public abstract class HttpServlet extends GenericServlet {
         // 1、首先调用HttpServlet的无参构造方法
         // 调用HttpServlet的无参构造原因是：HelloServlet没有显式定义无参构造(默认存在一个哈)
         public HttpServlet() {
         }
     }
     
     public abstract class GenericServlet implements Servlet, ServletConfig, Serializable {
         // 2、再调用GenericServlet的无参构造
         public GenericServlet() {
         }
     }
     ```

   + init方法调用的执行流程

     ```java
     // HelloServlet和HttpServlet类中都没重写init方方法，所以直接就调用GenericServlet的init方法(有参数的)
     public abstract class GenericServlet implements Servlet, ServletConfig, Serializable {
         public void init(ServletConfig config) throws ServletException {
             this.config = config;
             // 调用无参数的init方法
             this.init();
         }
     
         // 子类重写最好重写该方法
         public void init() throws ServletException {
         }
     }
     ```

   + service方法调用的执行流程

     ```java
     // HelloServlet类中没有重写service方法
     // GenericServlet类中的service方法作为抽象方法预留给了子类去实现，子类就是HttpServlet
     // 也就意味着，先调用HttpServlet的service(ServletRequest req, ServletResponse res)方法，
     public abstract class HttpServlet extends GenericServlet {    
         public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
             HttpServletRequest request;
             HttpServletResponse response;
             try {
                 // 对req和res进行类型转换
                 // HttpServletRequest和HttpServletResponse中封装了大量的关于HTTP协议相关联的信息
                 request = (HttpServletRequest)req;
                 response = (HttpServletResponse)res;
             } catch (ClassCastException var6) {
                 throw new ServletException(lStrings.getString("http.non_http"));
             }
             // 掉用 service(HttpServletRequest req, HttpServletResponse resp)
             this.service(request, response);
         }
     
         // service方法中采用了经典设计模式，模板方法设计模式
         // HttpServlet类是一个模板类，提供了一系列模板方法，doHead()、doPost()、doPut()...
         // service方法就是一个核心算法骨架
         protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
             // 获取当前请求的方法，可能是7中请求方法中的一种
             // GET、POST、DELETE、PUT、HEAD、OPTIONS、PATCH
             String method = req.getMethod();
             long lastModified;
             if (method.equals("GET")) {
                 lastModified = this.getLastModified(req);
                 if (lastModified == -1L) {
                     // 如果是GET 就调用 doGet()方法
                     this.doGet(req, resp);
                 } else {
                     long ifModifiedSince;
                     try {
                         ifModifiedSince = req.getDateHeader("If-Modified-Since");
                     } catch (IllegalArgumentException var9) {
                         ifModifiedSince = -1L;
                     }
     
                     if (ifModifiedSince < lastModified / 1000L * 1000L) {
                         this.maybeSetLastModified(resp, lastModified);
                         this.doGet(req, resp);
                     } else {
                         resp.setStatus(304);
                     }
                 }
             } else if (method.equals("HEAD")) {
                 lastModified = this.getLastModified(req);
                 this.maybeSetLastModified(resp, lastModified);
                 // 如果是HEAD则调用 doHead() 
                 this.doHead(req, resp);
             } else if (method.equals("POST")) {
                 // 如果是POST则调用 doPost() 
                 this.doPost(req, resp);
             } else if (method.equals("PUT")) {
                 this.doPut(req, resp);
             } else if (method.equals("DELETE")) {
                 this.doDelete(req, resp);
             } else if (method.equals("OPTIONS")) {
                 this.doOptions(req, resp);
             } else if (method.equals("TRACE")) {
                 this.doTrace(req, resp);
             } else {
                 // 如果不是上述方法中的其中一种，那就抛一个异常呗！！
                 String errMsg = lStrings.getString("http.method_not_implemented");
                 Object[] errArgs = new Object[]{method};
                 errMsg = MessageFormat.format(errMsg, errArgs);
                 resp.sendError(501, errMsg);
             }
     
         }
     }
     
     // 一部分模板方法
     // 如果子类没有重写这些方法，而客户端通过对应的请求方式发送了请求，那么这些方法肯定会被执行，那就直接405了!!
     // 简单理解就是：只要HttpServlet中的这些方法执行了，那就必定405!!
     protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
         String msg = lStrings.getString("http.method_post_not_supported");
         this.sendMethodNotAllowed(req, resp, msg);
     }
     
     protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
         String msg = lStrings.getString("http.method_put_not_supported");
         this.sendMethodNotAllowed(req, resp, msg);
     }
     
     protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
         String msg = lStrings.getString("http.method_delete_not_supported");
         this.sendMethodNotAllowed(req, resp, msg);
     }
     
     
     private void sendMethodNotAllowed(HttpServletRequest req, HttpServletResponse resp, String msg) throws IOException {
         String protocol = req.getProtocol();
         if (protocol.length() != 0 && !protocol.endsWith("0.9") && !protocol.endsWith("1.0")) {
             resp.sendError(405, msg);
         } else {
             resp.sendError(400, msg);
         }
     }
     ```

   6. 子类可以重写HttpServlet中的service方法吗？
      + 当然可以重写，但是如果重写service方法那就享受不到Http协议501的服务了。
      + 继承HttpServlet时，重写doGet()、doPost()方法，可以有效限制客户端请求方法，例如登录请求使用POST，服务端就之重写了doPost()方法，如果客户端使用其他请求方式那么不好意思，服务端就只能给你405了！！

   

   

### Wbe欢迎页面

1. 什么是Wbe欢迎页面？

   + 访问一个网站/根路径时，默认看到的界面叫做：Wbe欢迎页面！！

2. 在tomcat中如何配置欢迎页面？

   + 通过配置web.xml中的<welcome-file-list>标签来实现web欢迎界面，<welcome-file-list>标签可以配置多个欢迎界面，加载顺序从上到下。

     ```xml
     <welcome-file-list>
         <!--如果pages/index.html找不到，则向下找index.html，以此类推-->
         <!-- 注意: 这里配置的路径不加 "/",也不加 "项目名"  -->
         <welcome-file>pages/index.html</welcome-file>
         <welcome-file>index.html</welcome-file>
     </welcome-file-list>
     ```

   + web.xml中的<welcome-file-list>是局部的，还有一个全局的配置，在apache-tomcat-10.0.23\conf\web.xml中4737行，项目配置的叫做局部，tomcat文件夹下面的叫做全局，查找顺序采用就近原则（先找局部，再看全局，最终找不到就报错了）。

     ```xml
     <welcome-file-list>
         <welcome-file>index.html</welcome-file>
         <welcome-file>index.htm</welcome-file>
         <welcome-file>index.jsp</welcome-file>
     </welcome-file-list>
     ```

3. web欢迎页展示Servlet

   + 新建Servlet类继承HttpServlet抽象类
   + 配置<servlet> 和    <servlet-mapping>标签
   + 配置 <welcome-file-list> 标签

   ```java
   public class HelloServlet extends HttpServlet {
       @Override
       protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
           response.setContentType("text/html");
           PrintWriter responseWriter = response.getWriter();
           responseWriter.write("<h2>this is a web application</h2>");
       }
   }
   ```

   ```xml
   <web-app>
       <welcome-file-list>
           <welcome-file>hello</welcome-file>
       </welcome-file-list>
   
       <servlet>
           <servlet-class>com.ilovesshan.servlet.HelloServlet</servlet-class>
           <servlet-name>hello</servlet-name>
       </servlet>
       <servlet-mapping>
           <servlet-name>hello</servlet-name>
           <!-- 注意: 这里的路径不加 "项目名", 需要加一个 "/"  -->
           <url-pattern>/hello</url-pattern>
       </servlet-mapping>
   </web-app>
   ```



### 关于WEB-INF目录

1. 放入WEB-INF目录下的资源文件，例如：HTML文件、CSS文件、js文件都是不能通过浏览器直接访问，这是tomcat规定的。
2. 通常我们把一些不对外开放（不能直接访问）的资源文件会放到WEB-INF目录下，一些静态资源会放到WEB-INF目录外。

### HttpServletRequest详解

1. HttpServletRequest 是什么？有哪些用途？

   + HttpServletRequest 是一个接口，HttpServletRequest继承了ServletRequest接口。
   + HttpServletRequest 也是Servlet规范的一员。
   + org.apache.catalina.connector.RequestFacade 类实现了HttpServletRequest 接口，可见tomcat也实现了Servlet规范。

2. HttpServletRequest 有哪些常用的方法？

   + 获取客户端提交的数据信息

     ```java
     // 根据name获取value（根据据键获取值）
     public String getParameter(String name) {}
     
     // 获取所有的键
     public Enumeration<String> getParameterNames() {}
     
     // 根据name获取values（根据据键获取值，这个值是一个字符串数组）
     public String[] getParameterValues(String name) {}
     
     // 获取全部的请求参数(键值对)
     public Map<String,String[]> getParameterMap() {}
     
     // 获取query参数
     public String getQueryString() {}
     
     // 获取请求的URL
     public StringBuffer getRequestURL() {}
     
     // 获取请求的URI  带项目名
     public String getRequestURI() {}
     
     // 获取Servlet path  不带项目名
     public String getServletPath() {}
     ```

     

   + 准备一个html文件，并在Servlet中获取这些参数信息。

     ```html
     <!doctype html>
     <html lang="en">
         <head>
             <meta charset="UTF-8">
             <title>USER SUBMIT INFO</title>
         </head>
         <body>
             <h2>Please, Write Your information!!</h2>
             <form action="/servlet07/collect/information?t=123456789" method="post">
                 username: <input name="username" type="text" value="ilovesshan"/>
                 <br>
                 password: <input name="username" type="password" value="ilovesshan@12345"/>
                 <br>
                 hobbies:
                 eat<input name="hobby" checked type="checkbox" value="eat"/>
                 drink<input name="hobby" checked type="checkbox" value="drink"/>
                 play<input name="hobby" checked type="checkbox" value="play"/>
                 sleep<input name="hobby" type="checkbox" value="sleep"/>
                 write code<input name="hobby" type="checkbox" value="write code"/>
                 <br>
                 <input type="submit" value="submit">
             </form>
         </body>
     </html>
     ```

     ```java
     public class UserInformation extends HttpServlet {
         @Override
         protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     
             String username = request.getParameter("username");
             System.out.println("username = " + username);
     
             Enumeration<String> parameterNames = request.getParameterNames();
             while (parameterNames.hasMoreElements()) {
                 String element = parameterNames.nextElement();
                 System.out.print(element + ",\t");
             }
             System.out.println();
     
     
             String[] hobbies = request.getParameterValues("hobby");
             System.out.println("hobbies = " + Arrays.toString(hobbies));
     
     
             Map<String, String[]> parameterMap = request.getParameterMap();
             Iterator<Map.Entry<String, String[]>> iterator = parameterMap.entrySet().iterator();
             while (iterator.hasNext()) {
                 Map.Entry<String, String[]> next = iterator.next();
                 String key = next.getKey();
                 String[] value = next.getValue();
                 System.out.print(key + "=" + Arrays.toString(value) + ",\t");
             }
             System.out.println();
     
     
             String queryString = request.getQueryString();
             System.out.println("queryString = " + queryString);
     
     
             String requestURI = request.getRequestURI();
             System.out.println("requestURI = " + requestURI);
     
     
             StringBuffer requestURL = request.getRequestURL();
             System.out.println("requestURL = " + requestURL);
         }
     }
     ```

     ```tex
     username = ilovesshan
     
     t,	username,	hobby,	
     
     hobbies = [eat, drink, play]
     
     t=[123456789],	username=[ilovesshan, ilovesshan@12345],	hobby=[eat, drink, play],	
     
     queryString = t=123456789
     
     requestURI = /servlet07/collect/information
     
     requestURL = http://localhost:8080/servlet07/collect/information
     ```

3. 如果客户端向服务端发送数字"100"，那么在服务端收到的数据类型是字符串类型。

4. HttpServletRequest生命周期

   + 一次请求就是一个新的HttpServletReques，请求结束那么这个HttpServletReques就销毁了。
   + 那么HttpServletResponse也和HttpServletReques生命周期一样，一次响应就是一个新的HttpServletReques，响应结束那么这个HttpServletReques就销毁了。

5. servlet也是一个域对象，叫做请求域对象。请求域对象和应用域对象区别？

   + 应用域对象
     + 所有Servlet共享的数据
     + 数据体积比较小
     + 数据基本上不做修改
     + 应用域对象的生命周期是伴随着一个webapp的生命周期的
   + 请求域对象
     + 请求域对象存放的数据仅仅在一次请求中有效。
     + 请求域对象的生命周期是伴随着一个HttpServletRequest的。
   + 请求域对象和应用域对象底层都是维护了一个Map，用来保存数据。
   + 请求域对象和应用域对象都比较适合存储一些轻量级的数据。

6. 向请求域对象中（设置、获取、删除）数据

   + 相关的方法，这些方法来自 ServletRequest接口，HttpServletRequest继承ServletRequest，本质是org.apache.catalina.connecto.RequestFacade 实现HttpServletRequest接口并实现了相关方法。

     ```java
     // 从请求域中获取数据
     Object getAttribute(String var1);
     // 从请求域中删除数据
     void removeAttribute(String var1);
     // 向请求域中放入数据
     void setAttribute(String var1, Object var2);
     ```

     ```java
     public class ServletA extends HttpServlet {
         @Override
         protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
             response.setContentType("text/html;charset=utf-8");
     
             // 向请求域中放入数据
             request.setAttribute("username", "ilovesshan");
             request.setAttribute("userId", UUID.randomUUID().toString());
             request.setAttribute("currentTime", new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(Calendar.getInstance().getTime()));
     
     
             // 从请求域中获取数据
             Object username = request.getAttribute("username");
             Object userId = request.getAttribute("userId");
             Object currentTime = request.getAttribute("currentTime");
     
             PrintWriter printWriter = response.getWriter();
     
             printWriter.print("<h2>username = "+ username+"</h2>");
             printWriter.print("<h2>userId = "+ userId+"</h2>");
             printWriter.print("<h2>currentTime = "+ currentTime+"</h2>");
         }
     }
     
     ```

7. 请求转发（一次请求）

   + 请求域对象存放的数仅仅只对一次请求有效，比如：在ServletA中放入数据"username=ilovesshan"，在ServletA中通过Attribute("username")获取数据，没问题肯定可以获取到。但是在ServletB中通过Attribute("username")获取数据那肯定就获取不到啦，因为压根不是同一个请求，因为两个HttpServletRequest不一样（可以写代码试一试！！）。

   + 如果想ServletA中放入的数据在ServletB可以取到，那是不是只要保证两次的请求HttpServletRequest 是同一个就可以啦？？想一下从下面这种方法可以吗？？

     ```java
     public class ServletA extends HttpServlet {
         @Override
         protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
             // 向请求域中放入数据
             request.setAttribute("username", "ilovesshan");
     
             // new一个ServletB实例
             // 再调用ServletB实例的doGet()方法，把当前这个request和response传进去不就好了吗？
             ServletB servletB = new ServletB();
             servletB.doGet(request,response);
         }
     }
     
     ```

     答案是：不可以的，因为我们自己new的Serevlet不受Tomcat容器管理，不受Tomcat容器管理也就意味着没有标准Servlet处理和响应请求的能力。当你写下 new ServletB();就错了，输在了起跑线，Servlet我们不能自己new，自己new的Servlet和一个普通类区别不大。

   + 说到底，我们还是要通过请求转发的技术来实现这种需求！！

     ```java
     // ok 一行代码搞定
     // "/b" 就是再 web.xml中 <url-pattern>标签配置的值
     // request, response 当前这次请求的请求对象和响应对象
     request.getRequestDispatcher("/b").forward(request, response);
     ```

   + 请求转发的目标地址不一定是Serevlet，也可以是一个html/jsp文件。

     ```java
     request.getRequestDispatcher("/index.html").forward(request, response);
     ```

     

8. 请求乱码问题

   + tomcat10.x
     + 请求（数据包含中文）：POST 无乱码、GET 无乱码
     + 响应（数据包含中文）：无乱码

   + tomcat9.x 、tomcat8.x 

     + 请求（数据包含中文）：POST 乱码、GET 无乱码
     + 响应（数据包含中文）：乱码

   + 解决POST请求乱码问题（tomcat9.x之前，包括9.x）

     ```java
     // 设置请求体的字符集
     request.setCharacterEncoding("utf-8");
     ```

   + 解决响应乱码问题（tomcat9.x之前，包括9.x）

     ```java
     // 设置响应字符集
     response.setContentType("text/html;charset=utf-8");
     ```

     

### 纯Servlet单表增删改查

1. 功能分析

   + 欢迎界面
   + 部门列表展示
   + 新增部门
   + 删除部门
   + 修改部门
   + 查询部门

2. 准备数据库sql文件

   ```sql
   drop table if exists dept;
   create table dept(
       id int primary key,
       name varchar(30),
       address varchar(255),
       minister_name varchar(3),
       minister_phone varchar(11)
   );
   
   insert into 
   	dept 
   values
       (1, '研发部', '成都', '张三', '13145786541'),
       (2, '销售部', '北京', '李四', '15321547788'),
       (3, '后勤部', '上海', '王五', '15987845511'),
       (4, '宣传部', '上海', '赵六', '18154578823');
   
   select id, name, address, minister_name, minister_phone from dept;
   ```

   

3. 准备前端界面代码

   + iindex.html （首页）
   + list.html（部门列表）
   + add.html（新增部门）
   + update.html（更新部门）
   + detail.html（部门详情）

4. 搭建oa项目

   + 搭建webapp工程

   + 导入相关jar包

     + mysql-connector-java-8.0.26.jar
     + servlet-api.jar

   + 编写数据库工具类

     ```properties
     # src目录平级新建 jdbc.properties
     driver=com.mysql.cj.jdbc.Driver
     url=jdbc:mysql://localhost:3306/javaweb?serverTimezone=UTC&characterEncoding=utf8&useUnicode=true&useSSL=false
     username=root
     password=123456
     ```

     ```java
     public class DBUtil {
         private static final ResourceBundle resourceBundle = ResourceBundle.getBundle("jdbc");
         private static final String driver = resourceBundle.getString("driver");
         private static final String url = resourceBundle.getString("url");
         private static final String username = resourceBundle.getString("username");
         private static final String password = resourceBundle.getString("password");
     
         static {
             try {
                 Class.forName(driver);
             } catch (ClassNotFoundException e) {
                 e.printStackTrace();
             }
         }
     
         public Connection getConnection() throws SQLException {
             return DriverManager.getConnection(url, username, password);
         }
     
         public void close(Connection conn, Statement stat, ResultSet res) {
             if (res != null) {
                 try {
                     res.close();
                 } catch (SQLException e) {
                     e.printStackTrace();
                 }
             }
     
             if (stat != null) {
                 try {
                     stat.close();
                 } catch (SQLException e) {
                     e.printStackTrace();
                 }
             }
     
             if (conn != null) {
                 try {
                     conn.close();
                 } catch (SQLException e) {
                     e.printStackTrace();
                 }
             }
         }
     }
     ```



### 深度剖析请求转发和重定向

1. 请求转发和重定向

   + 代码上

     + 请求转发（ 服务器内部行为）

       ```java
       // 路径直接填写 web.xml中 对应servlet的<url-pattern> 标签值即可
       // 调用forward方法将request,response对象传递给下一个servlet，保证两个servlet的request和response对象是同一个
       request.getRequestDispatcher("/oa/a").forward(request,response);
       ```

       

     + 重定向（浏览器行为）

       ```java
       // 这是一个浏览器的行为
       // 填写的路径需要带上项目名称和web.xml中 对应servlet的<url-pattern>值
       response.sendRedirect("/servlet01/oa/a");
       ```

       

   + 行为上

     + 请求转发
       + 服务器内部行为
       + 只发送一次请求
       + 浏览的标题不会发生变化
     + 重定向
       + 浏览器行为
       + 发送两个次请求
       + 浏览的标题会发生变化

2. 请求转发和重定向的使用场景

   + 请求转发：在当前请求域中存入数据，如果下个servlet中需要使用到当前域存放的数据情况下那就用请求转发。
   + 重定向：上诉情况除外都可以用重定向。

3. 请求转发和重定向区别总结

   + 请求转发一次请求，重定向两次请求
   + 请求转发服务器行为，重定向浏览器行为
   + 请求转发地址栏不会发生变化，重定向地址栏会发生变化
   + 请求转发存在缓存，重定向不存在缓存





















