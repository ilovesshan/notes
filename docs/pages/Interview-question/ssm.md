# SSM

## Spring

### 简单介绍一下Spring框架？

1. Spring是一个轻量级的开源的J2EE框架，它是⼀个容器框架⽤来装javabean（Java对象），可以让我们的企业开发更快、更简
2. Spring的两大特点就是：控制反转（IOC）和⾯向切⾯（AOP）。



### 谈谈你的IOC和DI的理解？

1. 控制反转（Inversion of controller），控制反转是一种思想，也可以看作是一种设计模式。
2. 控制反转，反转的是什么呢？
   + 不在程序中采用硬编码的方式new对象了（将new对象的权利交出去，程序员不在手动new了）。
   + 不在程序中采用硬编码的方式进行对象和对象的关系维护（将对象和对象之前的关系交出去，程序员不再手动维护）。
3. 创建对象不通过开发人员手动new了，那对象怎么赋值呢？这个时候依赖注入就出来了。
   + 依赖注入 DI（Dependence Inject），依赖注入是“控制反转”的一种实现方式，控制反转是一种编程思想，依赖注入是一种实现，实现了控制反转这种编程思想。
4. 依赖注入，依赖是什么意思？注入是什么意思？
   + 依赖：A对象和B对象之间的关系。
   + 注入：是一种手段，通过这种手段可以让A对象和B对象之间产生关系。
   + A对象和B对象之间的关系通过注入的手段来维护。
5. 依赖注入，常见的注入方式
   - setter注入（通过setter方法给属性赋值）
   - 构造器注入（通过构造方法给属性赋值）



### 谈谈你对AOP的理解？

1. AOP（Aspect Oriented Programming）， 面向“切面”编程，AOP是一种技术。
2. 什么是切面？什么是面向切面编程？
   + 切面：把一些公共的、通用的非业务代码（交叉业务）抽离出来，封装成一个组件，这个组件就可以叫做一个切面。
   + 面向切面编程：把这些组件通过横向的方式织入到纵向的业务代码中，这一织入的过程就可以叫做面向切面编程。
3. 交叉业务？
   + 交叉业务就是非业务代码，比如：事务管理、日志记录、安全校验等等，这些模块基本上每个系统都会用到。
   + 其实既然很多系统都要用到这些非业务代码，显而易见这些非业务代码中的代码都是大同小异的，那为什么不抽取成一个切面呢？
4. AOP是对OOP的扩展，AOP底层使用的是动态代理技术。
5. Spring中的 AOP的实现
   + Spring中的 AOP底层是使用 JDK动态代理 + CGLIB动态代理实现的，如果目标对象有实现接口，那么Spring会采用JDK动态代理，如果目标对象没有实现接口那么Spring底层会自动切换成CGLIB动态代理。
   + 也可以通过配置的方式来确定要使用JDK动态代理 还是 CGLIB动态代理。



### Spring⽀持的⼏种bean的作⽤域？

1.  singleton：
   + Spring容器中默认的bean就是singleton类型，每个容器中只有⼀个bean的实例，单例的模式由BeanFactory⾃身来维护。
   + 该对象的⽣命周期是与Spring IOC容器⼀致的（但在第⼀次被注⼊时才会创建）。
2. prototype：每次注⼊时都会创建⼀个新的对象。
3. request：每个HTTP请求中创建⼀个单例对象，也就是说在单个请求中都会复⽤这⼀个单例对象。
4.  session：与request范围类似，确保每个session中有⼀个bean的实例，在session过期后，bean会随之失效。
5. application：在ServletContext的⽣命周期中复⽤⼀个单例对象。



### Spring事务的实现⽅式和原理？

1. 在使⽤Spring框架时，可以有两种使⽤事务的⽅式，⼀种是编程式的，⼀种是申明式的，
   + @Transactional注解就是申明式的。
   + 在xml中配置就属于编程式。
2. ⾸先，事务这个概念是数据库层⾯的，Spring只是基于数据库中的事务进⾏了扩展，以及提供了⼀些能让程序员更加⽅便操作事务的⽅式。⽐如我们可以通过在某个⽅法上增加@Transactional注解，就可以开启事务，这个⽅法中所有的sql都会在⼀个事务中执⾏，统⼀成功或失败。
3. 在⼀个⽅法上加了@Transactional注解后，Spring会基于这个类⽣成⼀个代理对象，会将这个代理对象作为bean，当在使⽤这个代理对象的⽅法时，如果这个⽅法上存在@Transactional注解，那么代理逻辑会先把事务的⾃动提交设置为false，然后再去执⾏原本的业务逻辑⽅法，如果执⾏业务逻辑⽅法没有出现异常，那么代理逻辑中就会将事务进⾏提交，如果执⾏业务逻辑⽅法出现了异常，那么则会将事务进⾏回滚。



### Spring事务及隔离级别？

1. spring事务隔离级别就是数据库的隔离级别，额外多了一个默认隔离级别：DEFAULT。
   + read uncommitted（读未提交）
   + read committed（读已提交）
   + repeatable read（可重复读）
   + serializable（可串⾏化）
2. 当数据库的配置隔离级别是Read Commited,⽽Spring配置的隔离级别是Repeatable Read，请问这时隔离级别是以哪⼀个为准？
   + 以Spring配置的为准，如果spring设置的隔离级别数据库不⽀持，效果取决于数据库。



### Spring事务传播机制？

1. 多个事务⽅法相互调⽤时，事务如何在这些⽅法间传播，⽅法A是⼀个事务的⽅法，⽅法A执⾏过程中调⽤了⽅法B，那么⽅法B有⽆事务以及⽅法B对事务的要求不同都会对⽅法A的事务具体执⾏造成影响，同时⽅法A的事务对⽅法B的事务执⾏也有影响，这种影响具体是什么就由两个⽅法所定义的事务传播类型所决定。
2. 、事务传播类型
   + REQUIRED(Spring默认的事务传播类型)：如果当前没有事务，则⾃⼰新建⼀个事务，如果当前存在事务，则加⼊这个事务。
   + REQUIRES_NEW：创建⼀个新事务，如果当前存在事务，则挂起该事务。
   + SUPPORTS：当前存在事务，则加⼊当前事务，如果当前没有事务，就以⾮事务⽅法执⾏。
   + NOT_SUPPORTED：以⾮事务⽅式执⾏,如果当前存在事务，则挂起当前事务。
   + MANDATORY：当前存在事务，则加⼊当前事务，如果当前事务不存在，则抛出异常。
   + NEVER：不使⽤事务，如果当前事务存在，则抛出异常。
   + NESTED：如果当前事务存在，则在嵌套事务中执⾏，否则REQUIRED的操作⼀样（开启⼀个事务）。



### Spring事务什么时候会失效?

1. 发⽣⾃调⽤，类⾥⾯使⽤this调⽤本类的⽅法（this通常省略），此时这个this对象不是代理类，⽽是UserService对象本身。
2. ⽅法不是public的：@Transactional 只能⽤于 public 的⽅法上，否则事务不会失效，如果要⽤在⾮public ⽅法上，可以开启 AspectJ 代理模式。
3. 数据库不⽀持事务。
4. 没有被spring管理。
5. 异常被吃掉，事务不会回滚(或者抛出的异常没有被定义，默认为RuntimeException)。



### 什么是bean的⾃动装配，有哪些⽅式？

1. 自动装配概念：

   + Spring 容器能够自动装配相互合作的bean，这意味着容器不需要配置，能通过Bean工厂自动处理bean之间的协作。
   + 开启⾃动装配，只需要在xml配置⽂件中定义“autowire”属性。

   

2. autowire属性有五种装配的⽅式

   + no：缺省情况下，⾃动配置是通过value或ref属性⼿动设定 。
   + byName：根据bean的属性名称进⾏⾃动装配。
   + byType：根据bean的类型进⾏⾃动装配。
   + constructor：类似byType，不过是应⽤于构造器的参数。如果⼀个bean与构造器参数的类型形同，则进⾏⾃动装配，否则导致异常。
   + autodetect：如果有默认的构造器，则通过constructor⽅式进⾏⾃动装配，否则使⽤byType⽅式进⾏⾃动装配。

   

3. @Autowired⾃动装配bean，可以在字段、setter⽅法、构造函数上使⽤。



### SpringBean创建的⽣命周期有哪些步骤？

1. 生命周期简单理解：一个对象从创建到销毁的过程，作为开发人员来说，我们仅仅关心一个对象在什么时候什么方法会被调用，我们可以在恰当的时机做一些事情。

   

2. Spring中的Bean生命周期五步

   + bean实例创建
   + 属性赋值
   + 调用init-method配置的方法
   + 使用bean
   + 调用destroy-method配置的方法

   

3. Spring中的Bean生命周期七步

   + bean实例创建
   + 属性赋值
   + 调用 bean后处理器的before方法【多出的步骤】
   + 调用init-method配置的方法
   + 调用 bean后处理器的after方法【多出的步骤】
   + 使用bean
   + 调用destroy-method配置的方法



1. Spring中的Bean生命周期十步
   + bean实例创建
   + 属性赋值
   + 查看是否实现了Aware相关接口，如果实现了就调用对应方法【多出的步骤】
   + 调用 bean后处理器的before方法
   + 查看是否实现了InitializingBean相关接口，如果实现了就调用对应方法【多出的步骤】
   + 调用init-method配置的方法
   + 调用 bean后处理器的after方法
   + 使用bean
   + 查看是否实现了DisposableBean相关接口，如果实现了就调用对应方法【多出的步骤】
   + 调用destroy-method配置的方法



### Spring中Bean是线程安全的吗？

1. Spring本身并没有针对Bean做线程安全的处理，分下面情况：
   + 如果Bean是⽆状态的，那么Bean则是线程安全的
   + 如果Bean是有状态的，那么Bean则不是线程安全的



### BeanFactory、FactoryBean区别？

1. BeanFactory（bean工厂），BeanFactory是Spring容器的的顶级父类，BeanFactory是一个工厂，主要用于创建bean对象。
2. FactoryBean（工厂bean），actoryBean也是一个bean对象，只不过这是一个特殊的bean对象，它能够辅助Spring容器创建bean对象。
3. Spring中，bean对象分分为两种：普通bean和工厂bean，区别就是：它能够辅助Spring容器创建bean对象。



### @AutoWired 和 @Recurce区别？

1. 查找机制
   + @AutoWired：根据类型(byType) -> 属性作为名称(byName)
   + @AutoWired + @Qualifier("beanName") -> 根据类型(byType) + 名称(byName)
   + @Recurce：bean名称(byName) -> 属性名称作为name -> 根据类型 (byType)
2. 作用范围
   + @AutoWired：属性、方法(setter)、方法参数(构造器)、构造器、注解。
   + @Recurce：类、属性、方法(setter)。



### AOP常见术语有哪些？

1. 连接点 JiontPoint：在程序流程执行过程中，切面可以织入的位置，方法执行前后，异常抛出之后等位置。
2. 切点 PointCut：在程序流程执行过程中，真正织入的切面方法（一个切点对应多个连接点）。
3. 通知 Advice：具体要执行的增强的代码
   + 前置通知（before）：在调用目标方法之前执行。
   + 后置通知（afterReturing）：在调用目标方法之后执行。
   + 环绕通知（around）：在调用目标方法之前和之后执行。
   + 异常通知（afterThrowing）：无论程序发生什么，都会执行。
   + 最终通知（after）：程序发生异常时执行。
4. 切面 Aspect：切点 + 通知 构成一个切面。
5. 织入 Weaving：把通知应用到目标对象的过程。
6. 代理对象 Proxy：个目标被织入通知之后产生的新对象。
7. 目标对象 Target：被织入通知的对象。



### 如何解决Spring的循环依赖问题？

1. 什么是循环依赖？

   + 假如有两个对象A和B，A对象中依赖B对象，而B对象中又依赖A对象，你依赖我我也依赖你，这就产生了循环引用！

2. 那些注入方式会产生或者不会产生循环依赖问题？

   + setter注入 + singleton模式其实不会产生循环依赖问题
     + 当是setter注入 + singleton模式下，Spring容器创建bean实例会分成两步，分成了：实例创建（曝光）与属性赋值。

   + setter注入 + prototype模式下，两个bean是scope="prototype"就会产生循环依赖，其中一个bean是singleton也不会产生循环依赖问题。
   + constroctor注入 + singleton模式这种模式必定会产生循环依赖。

3. Spring为了解决单例的循环依赖问题，使用了三级缓存。

   + Spring首先从一级缓存singletonObjects中获取。
   + 如果获取不到，并且对象正在创建中，就再从二级缓存earlySingletonObjects中获取。
   + 如果还是获取不到且允许singletonFactories通过getObject()获取，就从三级缓存singletonFactory.getObject()(三级缓存)获取。



### Spring的三级缓存？

1. singletonObjects（一级缓存）
   - 完整的单例bean对象，该bean对象已经给属性赋值了。
2. earlySingletonObjects（二级缓存）
   - 早期的单例bean对象，该对象的属性还未赋值，存放的仅仅是每个bean的实例对象。
3. singletonFactories（三级缓存）
   - 创建bean对象的单例工厂对象，每个单例bean都会对应一个单例工厂对象。





## SpringMVC



### Spring MVC ⼯作流程核心组件？

1. DispatcherServlet（前端处理器）
   - 作用：接收请求、响应结果，相当于转发器，有了DispatcherServlet 就减少了其它组件之间的耦合度。
2. HandlerMapping（处理器映射器）
   - 根据请求的URL来查找Handler
3. HandlerAdapter（处理器适配器）
   - 负责调用Handler
4. Handler（处理器）
   - Handler就是程序员开发的控制器方法
5. ViewResolver（视图解析器）
   - 进行视图的解析，根据视图逻辑名解析成真正的视图（view）
6. View（视图）
   - View是一个接口， 它的实现类支持不同的视图类型（jsp，freemarker，pdf等等）。



### Spring MVC ⼯作流程？

1. ⽤户发送请求⾄前端控制器 DispatcherServlet。

   

2. DispatcherServlet 收到请求调⽤ HandlerMapping 处理器映射器，处理器映射器找到具体的处理器(可以根据 xml 配置、注解进⾏查找)，⽣成处理器及处理器拦截器(如果有则⽣成)⼀并返回给 DispatcherServlet。

   

3. DispatcherServlet 调⽤ HandlerAdapter 处理器适配器，HandlerAdapter 经过适配调⽤具体的处理器(Controller，也叫后端控制器)。Controller 执⾏完成返回 ModelAndView。

   

4. HandlerAdapter 将 controller 执⾏结果 ModelAndView 返回给 DispatcherServlet。

   

5. DispatcherServlet 将 ModelAndView 传给 ViewReslover 视图解析器，ViewReslover 解析后返回具体 View。

   

6. DispatcherServlet 根据 View 进⾏渲染视图（即将模型数据填充⾄视图中）。

   

7. DispatcherServlet 响应⽤户。



### 什么情况会出现跨域？

1. 由于受到浏览器的安全限制策略（同源策略），所以在浏览器中发送AJAX请求会出现跨域问题。
2. 同源策略，在一串IP地址中，只要以下任意一个条件不同就会产生跨域。
   + 协议不同
   + 域名不同
   + IP端口不同
3. 浏览器的同源策略不是说拒绝发送AJAX请求，而是不接收跨域请求的响应数据。



### 如何解决跨域？

1. 通过JSONP（利用script标签不跨域的特点，但是只支持GET）

   ```javascript
   // 前端实现
   <script type="text/javascript" src="https://jsonp.com/data?callback=handleResponse"><script/>
   <script type="text/javascript">
   	function handleResponse(data){
   	}
   <script/>
   ```

   ```java
   // 后端实现
   @GetMapping("/data")
   public Dictionary handleData() {
       return "handleResponse('这是响应内容')"
   }
   ```

   

2. 前端配置webpack代理

   ```javascript
   module.exports = {
       devServer: {
           proxy: {
               '/api/**': {
                   target: 'http://10.10.17.64:8082/',
                   changeOrigin: false,
                   secure: false,
                   pathRewrite: {
                       '^/api': ''
                   }
               }
           }
       }
   }
   ```

   

3. 后端设置 CORS Header

   | CORS Header属性                  | 解释                                                         |
   | :------------------------------- | :----------------------------------------------------------- |
   | Access-Control-Allow-Origin      | 允许http://www.xxx.com域（自行设置，这里只做示例）发起跨域请求 |
   | Access-Control-Max-Age           | 设置在86400秒不需要再发送预校验请求                          |
   | Access-Control-Allow-Methods     | 设置允许跨域请求的方法                                       |
   | Access-Control-Allow-Headers     | 允许跨域请求包含content-type                                 |
   | Access-Control-Allow-Credentials | 设置允许Cookie                                               |

   ```java
   @Configuration
   public class CorsConfig {
       @Bean
       public CorsFilter corsFilter() {
           CorsConfiguration corsConfiguration = new CorsConfiguration();
           // 允许白名单域名进行跨域调用
           corsConfiguration.addAllowedOrigin("*");
           // 允许跨越发送cookie
           corsConfiguration.setAllowCredentials(true);
           // 放行全部原始头信息
           corsConfiguration.addAllowedHeader("*");
           // 允许所有请求方法跨域调用
           corsConfiguration.addAllowedMethod("*");
           UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
           configurationSource.registerCorsConfiguration("/**", corsConfiguration);
           return new CorsFilter(configurationSource);
       }
   }
   ```

   

4. 通过nginx代理





## MyBatis

### Mybatis的优缺点？

1. 优点
   + Mybatis是一个优秀的持久层框架，它支持自定义Sql，存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO为数据库中的记录。
   + 简而言之：Mybatis的出现就是来解决JDBC缺点，本质上Mybatis的底层还是JDBC，只不过Mybatis开发人员是对JDBC进行了一层封装。对于我们开发者来说，MyBatis简单易用，功能强大，开发效率更高，免除了繁琐的配置！
2. 缺点：
   +  SQL 语句的编写⼯作量较⼤， 尤其当字段多、关联表多时， 对开发⼈员编写SQL 语句的功底有⼀定要求。
   +  SQL 语句依赖于数据库， 导致数据库移植性差， 不能随意更换数据库。





### MyBatis分页插件原理

1. 使用 RowBounds 对象进行分页，它是针对 ResultSet 结果集执行的内存分页，而非物理分页。

2. 首先将分页参数放入到ThreadLocal中，拦截执行的SQL，再根据数据库类型添加对应的分页语句重写SQL。

   ```sql
   # 原始SQL
   select * from users where name like 'admin'
   
   # 转换后的SQL
   select * from users where name like 'admin' limit offset, pageSize;
   select count(*) from users where name like 'admin';
   ```

3. MyBatis使用分页插件

   ```java
   @Configuration
   public class MybatisPlusConfig {
       @Bean
       public MybatisPlusInterceptor mybatisPlusInterceptor() {
           MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
           PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
           paginationInnerInterceptor.setDbType(DbType.MYSQL);
           interceptor.addInnerInterceptor(paginationInnerInterceptor);
           return interceptor;
       }
   }
   ```



### #{} 和 ${} 区别

1. #{}：先进行SQL预编译，再进行占位符赋值，底层基于Preparedstatement实现，可以避免SQL注入。
2. ${} ：直接进行sql语句拼接，再编译sql语句，底层基于Statement实现的，不能够防止sql注入，使用场景比较少，通常用于sql语句中特殊关键字进行处理。



### collection 和 association 区别？

1. collection 和 association 区别

   + collection标签：用于 一对多的关系，“ofType”属性，用于指定及集合中元素的类型。
   + association标签：用于 多对一的关系，“javaType”属性，用于指定实体类属性类型。

   

2. collection 和 association 相同点

   + “property”属性，用于指定实体类属性名称。
   + “fetchType”属性，用于设置是否启用延迟加载。
   + “select”属性，用于指定执行某个SQL的ID。
   + columns”属性，向执行的SQL语句传递参数。注意注意： 在处理组合键时，您可以使用column= “{prop1=col1,prop2=col2}”这样的语法，设置多个列名传入到嵌套查询语句。这就会把*prop1*和*prop2*设置到目标嵌套选择语句的参数对象中。



### 简单聊聊MyBatis 缓存机制？

1. 缓存含义：将数据缓存在内存中，使用时直接从内存中取，减少IO操作。

2. MyBatis 缓存分为：一级缓存和二级缓存。

3. 一级缓存

   + mybatis默认开启一级缓存，作用域范围是SqlSession，当SqlSession被 flush（刷新）或者 close（关闭）之后，SqlSession中所有缓存就会被清空。
   + 在参数和SQL语句完全一样的情况下，通过同一个SqlSession对象调用同一个Mapper的方法，Mybatis往往只会发送一次SQL语句到数据库，原因是：因为第一次执行SQL之后，会将数据放在缓存中，如果SqlSession没有刷新/关闭/缓存没有超时的情况下，第二次查询就直接从缓存中取，就不会再次发送SQL语句到数据库。

4. 二级缓存

   + MyBatis 二级缓存（全局缓存）其实也是默认开启的，仅仅在于你用不用的问题。在xml文件中添加A\<cache>标签就表示开启二二级缓存了。
   + MyBatis 二级缓存作用域范围是SqlSessionFactory，前面说过SqlSession是通过SqlSessionFactory造出来的，也就意味着，MyBatis 二级缓存中的缓存数据是被同一个SqlSessionFactory对象造出来SqlSession共享的。

5. 自定义缓存

   + 继承 org.mybatis.caches.ehcache.AbstractEhcacheCache 抽象类。

     ```java
     public class MyCache extends AbstractEhcacheCache {
         // 需要实现AbstractEhcacheCache中的抽象方法
     }
     ```

   + 使用自定义缓存

     ```xml
     <mapper namespace="com.ilovesshan.mapper.CarMapper">
         <!-- 使用自定义缓存-->
         <cache type="com.ilovesshan.cache.MyCache"/>
     </mapper>
     ```

     

6. 集成三方缓存

   + 引入依赖
   + 编写配置文件



### MyBatis 一二级缓存总结

1. 一级、二级缓存不同点
   - 作用域不同
     - 【一级】SqlSession，不是同一个SqlSession对象即使调用相同接口Mapper的方法也不走缓存。
     - 【二级】SqlSessionFactory
   - 缓存机制不同
     - 【一级】缓存的是SQL语句
     - 【二级】缓存的是数据结果
2. 什么时候走缓存？
   - 【一级缓存】同一个SqSession对象调用同一个Mapper接口的方法
   - 【二级缓存】同一个SqSessionFactory造出来的SqSession对象，并且调用同一个Mapper接口的方法。
3. 什么时候缓存会失效？
   - 【一级/二级缓存】在两次查询之间，执行DML语句（INSERT、DELETE、UPDATE）。
   - 【一级缓存】手动清空缓存。
4. 使用二级缓存的注意点
   - 需要commit事务或者关闭sqlSession之后才会生效
   - 如果使用的是默认缓存，那么结果集对象需要实现序列化接口(Serializable)







### ResultMap和ResultType区别

1. 数据库表中的字段名和实体类中的属性完全一致时使用ResultMap。

2. ResultMap和ResultType的功能类似，但是ResultMap更强大一点，ResultMap可以实现将查询结果映射为复杂类型的pojo。

   + ResultMap标签的id属性是唯一的，和select标签的resultMap一致。

   + association标签用来实现一对一的关系。
   + collection标签用来实现一对多的关。

