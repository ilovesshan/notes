# Spring

## Spring 启示录

### 分析三层架构代码

1. Dao层

   ```java
   public interface UserDao {
       void selectById(String userId);
   }
   ```

   ```java
   public class UserDaoImplForMySql implements UserDao {
       @Override
       public void selectById(String userId) {
           System.out.println("UserDaoImpl, 从MySql数据库中查询用户信息...");
       }
   }
   ```

   

2. Service层

   ```java
   public interface UserService {
       void selectUserById(String userId);
   }
   ```

   ```java
   public class UserServiceImpl implements UserService {
       UserDao userDao = new UserDaoImplForMySql();
   
       @Override
       public void selectUserById(String userId) {
           userDao.selectById(userId);
       }
   }
   ```

   

3. Controller层

   ```java
   public class UserController {
       UserService userService = new UserServiceImpl();
   
       public void selectUserByIdRequest(String userId) {
           userService.selectUserById(userId);
       }
   }
   ```

   

4. 客户端（测试）

   ```java
   public class Browser {
       public static void main(String[] args) {
           new UserController().selectUserByIdRequest("1");
       }
   }
   ```

5. 上面代码是一个常见的三层架构代码，执行流程没问题，执行结果也是预期的，那么分析一下这样写有什么弊端呢？

   + 违背了软件开发七大原则之一：开闭原则

     + 目前代码中UserServiceImpl层依赖了UserDaoImplForMySql，见名知意使用的是“MySql”数据库嘛，那现在有个需求项目升级使用“Oracle”数据库。

     + 之前使用“MySql”数据库，现在要使用“Oracle”数据库，代码该怎么设计呢？？很多人会像下面这样做

       + 编写一个类UserDaoImplForOracel，并实现UserDao。

         ```java
         public class UserDaoImplForOracle implements UserDao {
             @Override
             public void selectById(String userId) {
                 System.out.println("UserDaoImpl, 从Oracle数据库中查询用户信息...");
             }
         }
         ```

         

       + 在UserServiceImpl替换一下实现类。

         ```java
         public class UserServiceImpl implements UserService {
             // UserDao userDao = new UserDaoImplForMySql();
             UserDao userDao = new UserDaoImplForOracle();
         
             @Override
             public void selectUserById(String userId) {
                 userDao.selectById(userId);
             }
         }
         ```

       + 这样该，目的是达到了，但是违背了开闭原则

         

   + 违背了软件开发七大原则之一：依赖倒置原则

     + 现在的代码依赖关系很强，上层依赖下层。

       ![image-20230320132941403](../../.vuepress/public/image-20230320132941403.png)



### 开闭原则

1. 什么是开闭原则？

   + 开闭原则（OCP），O表示打开（Open），C表示关闭（Close），P表示原则（Principle），OCP原则又叫开闭原则。
   + 开什么？对拓展开放
   + 闭什么？对修改关闭

2. 符合OCP原则的代码设计

   + 当有一天，需要在原有功能上升级，如果添加新功能时，你修改了之前的代码，那就违背了OCP原则，这个设计是失败的！
   + 如果你没有修改之前的代码，那就符合OCP原则。

3. 软件开发的7大设计原则中，另外6个设计原则都是为了OCP原则而服务的。

   

### 依赖倒置原则 

1. 依赖倒置原则

   + 上面分析三层架构代码中，提到了依赖导致原则，并且分析了出了这个代码是有背于依赖倒置原则的。

2. 什么是依赖倒置原则？

   + 依赖倒置原则又叫做：DIP原则（Dependence Inversion Principle）

   + 依赖倒置原则另一个隐式含义叫做：面向接口编程。
   + 主要意思就是：上次不要依赖于下层，上层应该做到面向接口，面向抽象类，而不要面向具体的实现。

3. 符合依赖倒置原则的代码，拿Service层和Dao层来举例

   + UserService

     ```java
     public class UserServiceImpl implements UserService {
         // UserDao userDao = new UserDaoImplForMySql();
         // UserDao userDao = new UserDaoImplForOracle();
     
         // 摒弃上面的写法，不写具体的实现，让这个类中只存在一个UserDao对象，具体的实例对象由程序/框架提供。
         // Spring框架通过依赖注入就能实现这种技术
         private UserDao userDao;
     
         @Override
         public void selectUserById(String userId) {
             userDao.selectById(userId);
         }
     }

   + 在UserServiceImpl类中没有写具体的实现，面向接口编程，那是不是就满足了赖倒置原则？

   

### 控制反转

1. 上面三层架构代码中即违背了开闭原则又违背了依赖倒置原则，那怎么解决呢？通过“控制反转”的思想来解决

2. 什么是控制反转？Spring框架实现了这种思想。

   + 控制反转（Inversion of controller），控制反转是一种思想，也可以看作是一种设计模式。
   + 控制反转，反转的是什么呢？
     + 第一：不在程序中采用硬编码的方式new对象了（将new对象的权利交出去，程序员不在手动new了）
     + 第二：不在程序中采用硬编码的方式进行对象和对象的关系维护（将对象和对象之前的关系交出去，程序员不再手动维护）

3. 基于“控制反转”的思想，我们可以对web层和service的代码改造一下、

   ```java
   public class UserServiceImpl implements UserService {
       // UserDao userDao = new UserDaoImplForMySql();
       // UserDao userDao = new UserDaoImplForOracle();
   
       // 不依赖具体的实现（满足依赖倒置原则）
       // 不手动new对象（满足依赖注入思想）
       // 不维护 UserServiceImpl 和 UserDaoImplForMySql/UserDaoImplForOracle之间的关系（满足依赖注入思想）
       private UserDao userDao;
   
       @Override
       public void selectUserById(String userId) {
           userDao.selectById(userId);
       }
   }
   ```

   ```java
   public class UserController {
       // UserService userService = new UserServiceImpl();
   
       UserService userService;
       public void selectUserByIdRequest(String userId) {
           userService.selectUserById(userId);
       }
   }
   ```

+ 但是有个问题，这个程序虽然是满足了“控制反转”的思想，但是userService和userDao是null，结果肯定一运行就报错！
+ 怎么解决？？
  + 可以使用依赖注入的手段，来解决这个问题！
  + 依赖注入马上讲解！！



### 依赖注入

1. 依赖注入 DI（Dependence Inject），依赖注入是“控制反转”的一种实现方式！
2. 控制反转和依赖注入
   + 控制反转是一种编程思想
   + 依赖注入是一种实现，实现了控制反转这种编程思想
3. 依赖注入，依赖是什么意思？注入是什么意思？
   + 依赖：A对象和B对象之间的关系
   + 注入：是一种手段，通过这种手段可以让A对象和B对象之间产生关系
   + A对象和B对象之间的关系通过注入的手段来维护
4. 依赖注入，常见的注入方式
   + setter注入（通过setter方法给属性赋值）
   + 构造器注入（通过构造方法给属性赋值）

### 常见术语

1. OCP：开闭u原则（开发原则）
2. DIP：依赖倒置原则（开发原则）
3. IOC：控制反转（编程思想）
4. DI：依赖注入（控制反转的一种实现）



## Spring 概述

### Spring 简介

[Spring官网-国外](https://spring.io/)

[Spring官网-国内](https://spring.p2hp.com/)

1. Spring是一个轻量级的Java框架，目的是为了解决企业级应用开发的业务逻辑层和其他各层的耦合问题。
2. Spring为企业级开发提供了很多丰富的功能，但是这些功能的底层都是依赖于他的两个核心特点，“依赖注入”和“面向切面编程”！
3. Spring最根本的使命是：解决JavaEE企业级项目开发中的复杂性，简化开发。

### Spring 八大模块

1. Spring5版本之后是8个模块。在Spring5中新增了WebFlux模块。

![image-20230320153121862](../../.vuepress/public/image-20230320153121862.png)



### Spring 特点	

1. 轻量级、非侵入式
   + 轻量级：spring的核心jar包体积很小，但是功能很强大！
   + 非侵入式
     + 入侵式：你的代码需要依其他赖框架的代码，如果把框架拿掉或者换一个框架，就需要重新修改代码。
     + 非侵入式：Spring是一个非侵入式框架，它的运行不依赖其他三方框架。
2. 容器
   + Spring包含并管理应用对象的配置和生命周期，并且能够管理项目中所有的对象。
3. 控制反转
   + 降低代码中的耦合度，一个对象依赖其他对象会通过“注入”的方式传递进来，而不是程序员通过手动new对象的方式，将对象的创建权力交给Spring。
     + 注入方式，这里是指“依赖注入”，常见的注入方式：构造器注入、setter方法注入、根据注解注入。
   + Spring容器会根据配置文件去创建实例和维护各个对象之间的关系，使用到了反射的机制！！
4. 面向切面编程
   + 将纵向公共行为、重复的逻辑代码（权限认证、事务、日志）横向抽离出来封装成一个可重用的模块，这个模块被命名为 “切面”（Aspect）。
   + Spring框架应用了面向切面的思想，主要体现在为容器中管理的对象生成动态代理对象。



## Spring 入门程序

### Spring 版本说明

1. 项目使用Spring6.x，注意：使用Spring6.x时JDK版本需要>=17.x

2. 项目使用maven来管理依赖，直接引入spring-context就ok了，maven会自动依赖其他的相关依赖。

3. Spring6.x还未正式发布，可以使用以下配置来使用Spring6.x

   ```xml
   <!-- 使用内部仓库地址 -->
   <repository>
       <id>repository.spring.milestone</id>
       <name>Spring Milestone Repository</name>
       <url>https://repo.spring.io/milestone</url>
   </repository>
   
   ...
   
   <!-- 引入依赖-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>6.0.0-M2</version>
   </dependency>
   ```

   

4. 事实上，现在最新版本是spring6.0.6了，那就直接引入依赖就ok了

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>6.0.6</version>
   </dependency>
   ```

   

### Spring 第一个程序

1. 新建项目

2. 导入依赖

   + 导入spring-context依赖，spring-context又依赖了下面四个依赖项（maven已经帮我们自动导入了）
     +  lorg.springframework:spring-aop:6.0.4
     + org.springframeworkspring-beans:6.0.4
     + org.springframeworkspring-core:6.0.4
     + org.springframework:spring-expression:6.0.4
   + 导入junit依赖，做单元测试

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
           <version>6.0.4</version>
       </dependency>
   
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>4.13.2</version>
           <scope>test</scope>
       </dependency>
   </dependencies>
   ```

3. 建一个bean对象

   ```java
   public class User {
       public User() {
           System.out.println("User 无参方法被调用...");
       }
   }
   ```

4. 建立spring.xml配置文件（推荐使用IDEA内置的模板文件）

   + 选中resources资源文件夹右击，New -> XML Configuration File -> Spring Config

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
     
         <!--
             bean: bean对象，在beans标签中配置的所有的bean对象会被Spring容器管理，Spring容器管理会负责这些bean的创建、销毁以及bean与bean之间的关系维护。
             id: 能够“唯一标识”一个bean对象的字符序列
             class: 这个bean的全限定名称
         -->
         <bean id="userBean" class="com.ilovesshan.pojo.User"/>
     </beans>
     ```

     

5. 代码测试

   

   ```java
   @RunWith(JUnit4.class)
   public class UserBeanTest {
   
       @Test
       public void test1() {
           // 表示从类路径下加载 spring配置文件
           // new ClassPathXmlApplicationContext("spring配置文件地址")，spring配置文件地址推荐放在类路径下。
   
           // 当执行 new ClassPathXmlApplicationContext()的时候,
           // 1、创建Spring容器
           // 2、解析spring配置文件，根据配置文件去创建Bean对象实例以及维护Bean和Bean之间的关系
           // 3、将创建好的这个Spring容器返回，也就是这个app对象
           ApplicationContext app = new ClassPathXmlApplicationContext("spring.xml");
   
           // 我们可以通过Spring容器来获取容器中的Bean对象，通过app.getBean()方法
           // app.getBean()重载方法有点多，后面慢慢讲解
           Object userBean = app.getBean("userBean");
           System.out.println("userBean = " + userBean);
       }
   }
   ```



### Spring 入门程序细节分析

1. spring配置文件的名称和路径问题

   + spring配置文件的名称和路径问题都是可以完全自定义的！！

   + 两种方式加载spring配置文件

     + ClassPathXmlApplicationContext（类路径下加载文件，推荐的方式）

       ```java
       ApplicationContext app = new ClassPathXmlApplicationContext("spring.xml");
       ```

       

     + FileSystemXmlApplicationContext（通过绝对路径加载文件，不推荐的方式）

       ```java
       ApplicationContext app = new FileSystemXmlApplicationContext("file:///E:/workspace/xxx/spring.xml");
       ```

2. spring加载多个配置文件

   + springa.xml

     ```xml
     <bean id="userBean" class="com.ilovesshan.pojo.User"/>
     ```

   + springb.xml

     ```xml
     <bean id="studentBean" class="com.ilovesshan.pojo.Student"/>
     ```

   + ClassPathXmlApplicationContext是一个重载方法

     ```java
     public ClassPathXmlApplicationContext(String... configLocations) throws BeansException{}
     ```

     ```java
     @Test
     public void test3() {
         // 可以填写多个配置文件
         ApplicationContext app = new ClassPathXmlApplicationContext("springa.xml", "springb.xml");
         User userBean = app.getBean("userBean", User.class);
         Student studentBean = app.getBean(Student.class);
         System.out.println("userBean = " + userBean);
         System.out.println("studentBean = " + studentBean);
     }
     ```

     

3.  bean的id可以重复吗?

   + 不能重复，因为一个id只能标识一个bean

     ```xml
     <bean id="bean" class="com.ilovesshan.pojo.User"/>
     <bean id="bean" class="com.ilovesshan.pojo.Student"/>
     ```

     ![image-20230320181602148](../../.vuepress/public/image-20230320181602148.png)

   

4. application.getBean("beanId")，id不存在返回值是null还是要报错呢？

   + 不存在就直接报错了！！

     ```xml
     <bean id="userBean" class="com.ilovesshan.pojo.User"/>
     <bean id="studentBean" class="com.ilovesshan.pojo.Student"/>
     ```

     ```java
     Object userBean = app.getBean("userBean1");
     ```

     ![image-20230320181758871](../../.vuepress/public/image-20230320181758871.png)

   

5. bean只能配置自定义的Java对象吗？可不可以配置JDK中的内置对象？

   + 可以配置JDK中的内置对象，程序运行时OK的！！

     ```xml
     <bean id="dateBean" class="java.util.Date"/>
     ```

     ```java
     ApplicationContext app = new ClassPathXmlApplicationContext("spring.xml");
     Date date = app.getBean("dateBean", Date.class);
     String format = new SimpleDateFormat("yyy-MM-dd hh:mm:ss").format(date);
     System.out.println("format = " + format);
     ```

     

6. 如何确定从Spring容器中取出来的对象类型(不用强转)

   ```java
   // 这种方式获取的bean默认是Object类型
   Object userBean1 = app.getBean("userBean");
   
   
   // 先根据名称找bean、再根据Clazz类型确定最终的bean对象
   User userBean2 = app.getBean("userBean", User.class);
   
   // 直接根据Clazz类型确定最终的bean对象
   Student studentBean = app.getBean(Student.class);
   ```

7. bean对象是什么时候被创建出来的？如何创建出来的？

   + bean对象被创建的时机?

     + 可以观察日志，容器启动的时候，bena就会被创建，并且默认调用bean对象的无参构造方法！

       ```tex
       User 无参方法被调用...
       Student 无参方法被调用...
       
       userBean = com.ilovesshan.pojo.User@6aeb35e6
       studentBean = com.ilovesshan.pojo.Student@1283bb96
       ```

     + 需要被Spring容器管理的对象，就必须提供无参构造方法，否则会报错！！

     + 我们现在去掉User对象的无参构造，看一下报什么错？

       ```java
       public class User {
           // public User() { System.out.println("User 无参方法被调用...");}
           public User(String s){}
       }
       ```

       ![image-20230320182834520](../../.vuepress/public/image-20230320182834520.png)

   + bean对象是如何被创建出来的?

     + bean对象是通过反射创建出来的

       

8. 写一个简单版本的spring容器，模拟bean对象创建过程。

   + 新建一个bean.properties文件，用于配置bean

     ```properties
     userBean=com.ilovesshan.pojo.User
     studentBean=com.ilovesshan.pojo.Student
     ```

     

   + 编写核心代码 MySpring.class

     ```java
     public class MySpring {
     
         /**
          * 保存bean对象的容器
          */
         private Map<String, Object> containers = new HashMap<>();
     
     
         public MySpring(String config) {
             try {
                 // 获取 properties 文件
                 Properties properties = new Properties();
                 properties.load(ClassLoader.getSystemResourceAsStream("bean.properties"));
     
                 // 遍历 properties 文件
                 Iterator<Map.Entry<Object, Object>> iterator = properties.entrySet().iterator();
                 while (iterator.hasNext()) {
                     Map.Entry<Object, Object> bean = iterator.next();
                     Object beanId = bean.getKey(); // bean的key studentBean
                     Object beanClassName = bean.getValue(); // bean的value com.ilovesshan.pojo.Student
     
                     // 通过反射去构造对象实例
                     Class<?> aClass = Class.forName((String) beanClassName);
                     Object instance = aClass.getDeclaredConstructor().newInstance();
     
                     // 将bean的id作为map的key, bean的实例对象作为map的value
                     containers.put((String) beanId, instance);
                 }
             } catch (Exception e) {
                 e.printStackTrace();
             }
         }
     
         public Object getBean(String beanId) {
             Object o = containers.get(beanId);
             if (o == null) {
                 throw new RuntimeException("No Bean Named \"" + beanId + "\" available");
             }
             return o;
         }
     
         public <T> T getBean(String beanId, Class<T> tClass) {
             Object o = containers.get(beanId);
             if (o == null) {
                 throw new RuntimeException("No Bean Named \"" + beanId + "\" available");
             }
             return (T) o;
         }
     
         public <T> T getBean(Class<T> tClass) {
             Iterator<Map.Entry<String, Object>> iterator = containers.entrySet().iterator();
     
             Object findObject = null;
     
             while (iterator.hasNext()) {
                 Object value = iterator.next().getValue();
                 Class<?> aClass = value.getClass();
                 if (tClass == aClass) {
                     findObject = value;
                     break;
                 }
             }
             if (findObject == null) {
                 throw new RuntimeException("No Clazz type \"" + tClass + "\" available");
             }
             return (T) findObject;
         }
     }
     
     ```

     

   + 代码测试

     ```java
     @RunWith(JUnit4.class)
     public class MyContainerTest {
     
         @Test
         public void test1() {
             MySpring mySpring = new MySpring("bean.properties");
             Object userBean = mySpring.getBean("userBean");
             System.out.println("userBean = " + userBean);
     
             Student studentBean = mySpring.getBean("studentBean", Student.class);
             System.out.println("studentBean = " + studentBean);
     
             Student studentBean2 = mySpring.getBean(Student.class);
             System.out.println("studentBean2 = " + studentBean2);
         }
     }
     ```

     ```tex
     Student 无参方法被调用...
     User 无参方法被调用...
     
     userBean = com.ilovesshan.pojo.User@75bd9247
     studentBean = com.ilovesshan.pojo.Student@7d417077
     studentBean2 = com.ilovesshan.pojo.Student@7d417077
     ```



### Spring 集成日志框架

1. 集成logback

   + 导入依赖，额外引入了lombok

     ```xml
     <dependency>
         <groupId>ch.qos.logback</groupId>
         <artifactId>logback-classic</artifactId>
         <version>1.2.11</version>
     </dependency>
     
     <dependency>
         <groupId>org.projectlombok</groupId>
         <artifactId>lombok</artifactId>
         <version>1.18.24</version>
     </dependency>
     ```

     ```java
     @Slf4j
     public class Student {
         public Student() {
             log.debug("Student 无参方法被调用...");
         }
     }
     
     ```

   + 自定义logback.xml，配置日志信息

     + [参考地址](https://ilovesshan.github.io/pages/backend/myBatis.html#%E9%9B%86%E6%88%90%E6%97%A5%E5%BF%97%E6%A1%86%E6%9E%B6)

2. 集成log4j2（需要spring5.之后）

   + 导入依赖

     ```xml
     <dependency>
         <groupId>org.projectlombok</groupId>
         <artifactId>lombok</artifactId>
         <version>1.18.24</version>
     </dependency>
     
     <dependency>
         <groupId>org.apache.logging.log4j</groupId>
         <artifactId>log4j-slf4j2-impl</artifactId>
         <version>2.19.0</version>
     </dependency>
     
     <dependency>
         <groupId>org.apache.logging.log4j</groupId>
         <artifactId>log4j-core</artifactId>
         <version>2.19.0</version>
     </dependency>
     ```

     

   + 自定义配置文件，文件放在类路径下，叫：log4j2.xml 名字是固定的！！

     [log4j2.xml 配置文件详解](https://blog.csdn.net/weixin_40816738/article/details/111407832)

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <Configuration status="DEBUG">
         <Appenders>
             <Console name="Console" target="SYSTEM_OUT">
                 <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
             </Console>
         </Appenders>
         <Loggers>
             <Root level="debug">
                 <AppenderRef ref="Console"/>
             </Root>
         </Loggers>
     </Configuration>
     
     ```

   

## Spring 对IOC的实现

### 反转控制和依赖注入

1. 反转控制（一种编程思想）
   + 将对象的创建权交给Spring容器
   + 将对象和对象之间关系的维护权交给Spring容器
2. 依赖注入（反转控制的实现方式）
   + 通过注入的方式来维护对象和对象之间的关系，注入是一种手段，是值的传递。
   + 常见的注入方式有：set注入和构造器注入。

### 基于set注入

1. 基于set注入，见名知意就是通过setter方法注入呗，那肯定就要求这个bean必须提供setter方法。

   ```java
   public class UserController {
   
       private UserService userService;
   
       /**
        * 这里的setter方法可以自己随便写名称（随便写的前提是：方法名称开头必须是setXxxx,set不能丢了）
        *      我们写的setXxx会音响到<bean><bean/>标签中,property标签的name属性
        *       setAbc --> <property name="abc" ref="userServiceBean"/>
        *       setAxx--> <property name="xxx" ref="userServiceBean"/>
        *
        *       为了不给自己找麻烦， 推荐按照setter规范来写，使用的时候直接复制属性名称就ok了
        *       这样做的目的是：
        *          1、让代码更规范，更严谨
        *          2、避免出错
        *       setUserService--> <property name="userService" ref="userServiceBean"/>
        */
       public void setUserService(UserService userService) {
           this.userService = userService;
       }
   
       public void deleteUserRequest() {
           userService.deleteUser();
       }
   }
   
   ```

   ```java
   @Slf4j
   public class UserService {
   
       public void deleteUser() {
           log.debug("删除用户...");
       }
   }
   
   ```

   

2. xml书写方式

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans>
   
       <!-- UserService bean对象 -->
       <bean id="userServiceBean" class="com.ilovesshan.UserService"/>
   
       <!-- UserController bean对象 -->
       <bean id="userControllerBean" class="com.ilovesshan.UserController">
           <!--
               property标签：UserController bean对象中有一个属性，这个属性可以通过set方法进行赋值
               name: set方法名称（去掉set三个字母之后的单词首字母小写）
                       setAbc ==> abc
                       setXxx ==> xxx
                       setUserService  ==> userService
                       也就意味着：可以通过name属性，反推出来set方法嘛！
   
               ref: 引用(reference)的意思，表示set方法的参数
                      ref="userServiceBean"意思就是：把UserService bean对象实例当作参数传递给setUserService()方法
           -->
           <property name="userService" ref="userServiceBean"/>
       </bean>
   
   </beans>
   ```



### 基于构造器注入

1. 基于构造器注入那也就见名知意，被Spring容器多理的bean需要提供构造方法（带参数），由Spring容器来调用bean对象的构造方法从而给属性赋值。

   ```java
   @Slf4j
   public class StudentService {
       public void doSomething() {
           log.debug("StudentService doSomething...");
       }
   }
   
   @Slf4j
   public class TeacherService {
       public void doSomething(){
           log.debug("TeacherService doSomething...");
       }
   }
   
   ```

   ```java
   public class StudentController {
   
       private StudentService studentService;
       private TeacherService teacherService;
   
       // 提供构造方法给Spring调用，目的是给属性赋值
       public StudentController(StudentService studentService, TeacherService teacherService) {
           this.studentService = studentService;
           this.teacherService = teacherService;
       }
   
       public void HaveAClass() {
           studentService.doSomething();
           teacherService.doSomething();
       }
   }
   
   ```

   

2. 构造器注入可以分成三种方式

   + 通过构造方法形参名称注入

     ```xml
     <bean id="studentController1" class="com.ilovesshan.controller.StudentController">
         <!--
                 name: 指的是构造器方法对应的形参名称
                     例如:  public StudentController(StudentService studentService, TeacherService teacherService) {}
                     name的值就只能是: studentService/teacherService
                 ref: 已经用过了(不再解释)
             -->
         <constructor-arg ref="studentServiceBean" name="studentService"/>
         <constructor-arg ref="teacherServiceBean" name="teacherService"/>
     </bean>
     ```

     

   + 通过构造方法参数位置注入

     ```xml
     <bean id="studentController2" class="com.ilovesshan.controller.StudentController">
         <!--
                 index: 参数的位置，需要注意参数位置默认是从0开始
             -->
         <constructor-arg ref="studentServiceBean" index="0"/>
         <constructor-arg ref="teacherServiceBean" index="1"/>
     </bean>
     ```

     

   + 通过类型注入

     ```xml
     
     <bean id="studentController3" class="com.ilovesshan.controller.StudentController">
         <!--
                 不指定name也不指定index，那么Spring就会进行自动类型推断
                 注意: 如果ref指定的类型不符合构造器形参类型，那么会报错！
             -->
         <constructor-arg ref="studentServiceBean"/>
         <constructor-arg ref="teacherServiceBean"/>
     </bean>
     ```



### 基于set注入专题

1. 内部bean和外部bean注入，内部bean和外部bean注入效果是一样的，只不过配置方式不一样。

   ```java
   public class OrderController {
       private OrderService orderService;
   
       // 通过set方法注入
       public void setOrderService(OrderService orderService) {
           this.orderService = orderService;
       }
   
       public void createOrderRequest() {
           orderService.createOrder();
       }
   }
   
   ```

   ```java
   @Slf4j
   public class OrderService {
       public void createOrder() {
           log.debug("OrderService createOrder...");
       }
   }
   
   ```

   + 外部bena注入方式

     ```xml
     <bean id="orderControllerBean1" class="com.ilovesshan.controller.OrderController">
         <!--
                 property标签中使用了属性ref="xxx", 表示这是一个外部bean
             -->
         <property name="orderService" ref="orderServiceBean"/>
     </bean>
     ```

     

   + 内部bena注入方式

     ```xml
     <bean id="orderControllerBean2" class="com.ilovesshan.controller.OrderController">
         <!--
                property标签中使用了嵌套ref标签, 表示这是一个内部bean
                更推荐使用外部bean注入方式
                     1、更好的实现bean复用
                     2、代码层级简洁/易于阅读
            -->
         <property name="orderService">
             <ref bean="orderServiceBean"/>
         </property>
     </bean>
     ```

     

   

2. 简单类型注入

   + 如何判断在Spring容器中，那些数据类型是简单数据类型？

     + Spring源码中有一个工具类，里面提供了一个方法用来判断是不是简单数据类型！
     + org.springframework.beans.BeanUtils类中isSimpleValueType方法

     ```java
     public static boolean isSimpleValueType(Class<?> type) {
         return (Void.class != type && void.class != type &&
                 // 八大简单类型和包装类
                 (ClassUtils.isPrimitiveOrWrapper(type) ||
                  // 枚举
                  Enum.class.isAssignableFrom(type) ||
                  // 字符序列(String、StringBuilder、StringBuffer)
                  CharSequence.class.isAssignableFrom(type) ||
                  // Number
                  Number.class.isAssignableFrom(type) ||
                  // Date (java.util.Date)
                  Date.class.isAssignableFrom(type) ||
                  // jdk8.x之后出现的， 是一组时间对象的接口
                  Temporal.class.isAssignableFrom(type) ||
                  // URI 对象
                  URI.class == type ||
                  // URL 对象
                  URL.class == type ||
                  // Locale 对象
                  Locale.class == type ||
                  // Class 对象
                  Class.class == type));
     }
     ```

   + 简单测试一下

     ```java
     @Data
     @AllArgsConstructor
     @NoArgsConstructor
     public class User {
         private int i1;
         private Integer i2;
     
         private boolean b1;
         private Boolean b2;
     
         private char c1;
         private Character c2;
     
         private Direction direction;
     
         private Class aClass;
     
     }
     ```

     ```xml
     <bean id="userBean" class="com.ilovesshan.pojo.User">
         <!--
                 注意：
                     1、简单数据类型请使用 value="xxx"
                     2、复杂数据类型请使用 ref="xxx"
             -->
         <property name="i1" value="1"/>
         <property name="i2" value="100"/>
         <property name="b1" value="true"/>
         <property name="b2" value="false"/>
         <property name="c1" value="A"/>
         <property name="c2" value="B"/>
         <property name="direction" value="BOTTOM"/>
         <property name="AClass" value="com.ilovesshan.pojo.User"/>
     </bean>
     ```

     ```tex
     user = User(i1=1, i2=100, b1=true, b2=false, c1=A, c2=B, direction=BOTTOM, aClass=class com.ilovesshan.pojo.User)
     ```

     

     

3. Date类型注入

   + 由于Date类型比较特殊一点，单独开一节聊聊，通过阅读 `isSimpleValueType` 方法发现好像Date也是简单数据类型，是不是简单数据数据类型不妨写代码测一测

     ```java
     @Data
     @AllArgsConstructor
     @NoArgsConstructor
     public class User {
         private Date birth;
     }
     ```

     

   + 使用value方式

     ```xml
     <bean id="userBean" class="com.ilovesshan.pojo.User">
         <property name="birth" value="2023-6-20 12:00:00"/>
     </bean>
     ```

     ![image-20230321101123462](../../.vuepress/public/image-20230321101123462.png)

     直接就报错了，说一个字符串不能转换成一个java.util.Date对象

     注意：如果想把Date类型当作简单数据类型使用，那么在写 value="xxx"的时候， xxx必须遵守固定格式，例如：

     ```tex
     Tue Mar 21 10:13:38 CST 2023
     ```

     

   + 使用ref方式

     ```xml
     <bean id="d" class="java.util.Date"/>
     
     <bean id="userBean" class="com.ilovesshan.pojo.User">
         <property name="birth" ref="d"/>
     </bean>

   

4. 级联属性注入（用的很少）

   ```java
   public class Address {
       private String name;
   
       public void setName(String name) {
           this.name = name;
       }
   
       @Override
       public String toString() {
           return "Address{" +
               "name='" + name + '\'' +
               '}';
       }
   }
   ```

   

   ```java
   public class Student {
       private String name;
       private Address address;
   
       public void setName(String name) {
           this.name = name;
       }
   
       public void setAddress(Address address) {
           this.address = address;
       }
   
       // 使用级联属性赋值时，需要提供get方法
       public Address getAddress() {
           return address;
       }
   
       @Override
       public String toString() {
           return "Student{" +
               "name='" + name + '\'' +
               ", address=" + address +
               '}';
       }
   }
   ```

   ```xml
   <bean id="studentBean" class="com.ilovesshan.pojo.Student">
       <property name="name" value="张三"/>
       <property name="address" ref="addressBean"/>
       <!--
         使用级联属性赋值，注意，需要在Student类中提供getAddress()方法
        -->
       <property name="address.name" value="四川省巴中市"/>
   </bean>
   
   <bean id="addressBean" class="com.ilovesshan.pojo.Address">
       <!-- <property name="name" value="四川省成都市"/> -->
   </bean>
   ```

   

   

5. 数组注入

   ```java
   public class Start {
   
       // 数组(基本类型)
       private String[] jobs;
   
       // 数组(引用类型)
       private Address[] addresses;
   
       // 省略get方法
   }
   ```

   ```xml
   
   <bean id="address1" class="com.ilovesshan.pojo.Address">
       <property name="name" value="四川巴中"/>
   </bean>
   
   <bean id="address2" class="com.ilovesshan.pojo.Address">
       <property name="name" value="四川成都"/>
   </bean>
   
   <bean id="startBean" class="com.ilovesshan.pojo.Start">
       <property name="jobs">
           <!--
                   array: 表示这个属性的数据类型是一个数组
                   value: 简单数据类型使用value
               -->
           <array>
               <value>唱歌</value>
               <value>跳舞</value>
           </array>
       </property>
   
       <property name="addresses">
           <array>
               <!--
                      array: 表示这个属性的数据类型是一个数组
                      ref: 复杂数据类型
                           bean: 对应的beanId
                  -->
               <ref bean="address1"/>
               <ref bean="address2"/>
           </array>
       </property>
   </bean>
   ```

   

6. List/Set注入

   ```java
   public class Start {
       //List(基本类型)
       private List<String> hobbies;
   
       //Set(基本类型)
       private Set<String> phones;
   
       // 省略get方法
   
   }
   ```

   ```xml
   <bean id="startBean" class="com.ilovesshan.pojo.Start">
       <property name="hobbies">
           <!--
                    list: 表示这个属性的数据类型是一个列表
                    List有序可以重复
                       value: 简单数据类型
                       ref: 复杂数据类型
               -->
           <list>
               <value>抽烟</value>
               <value>抽烟</value>
               <value>喝酒</value>
               <value>打扑克</value>
               <value>打扑克</value>
           </list>
       </property>
   
       <property name="phones">
           <!--
                   注入Set对象
                   Set: 无需不能重复
               -->
           <set>
               <value>110</value>
               <value>120</value>
               <value>130</value>
               <value>130</value>
               <value>120</value>
               <value>110</value>
           </set>
       </property>
   </bean>
   ```

   

7. Map/Properties注入

   ```java
   public class Start {
       // Map
       private Map<String, Object> concatMap;
   
       // Properties
       private Properties info;
       
       // 省略get方法
   }
   ```

   ```xml
   <bean id="startBean" class="com.ilovesshan.pojo.Start">
       <property name="concatMap">
           <!--
                   注入Map<String,Object>
                   map标签属性(一般不写属性)
                       key-type: map的key的数据类型
                       value-type: map的value的数据类型
                   entry标签属性
                       key: map的key(简单数据源类型)
                       value: map的value(复杂数据源类型)
   
                       key-ref:map的key(简单数据源类型)
                       value-ref: map的value(复杂数据源类型)
               -->
           <map key-type="java.lang.String" value-type="java.lang.Object">
               <entry key="张三" value-ref="address1"/>
               <entry key="李四" value-ref="address1"/>
           </map>
       </property>
   
       <property name="info">
           <!--
             注入 Properties
            -->
           <props>
               <prop key="name">男明星</prop>
               <prop key="age">22</prop>
               <prop key="salary">9999999999999999999999999.99</prop>
           </props>
       </property>
   </bean>
   ```

   

8. 注入null或者空字符串

   ```java
   public class Car {
       String carName;
   
       public void setCarName(String carName) {
           this.carName = carName;
       }
   }
   ```

   

   + 注入null方法

     + 啥都不写 默认就是null

     + 使用\<null/>标签

       ```xml
       <property name="carName">
           <null/>
       </property>
       ```

       

     + 注意： 这不是注入了null, 而是注入了 null字符串

       ```xml
       <property name="carName" value="null"/>
       ```

       

   + 注入空字符串方法（两种方式）

     ```xml
       <property name="carName" value=""/>
     ```

     ```xml
     <property name="carName">
         <value/>
     </property>
     ```

   

9. 特殊字符注入

   ```java
   public class N {
       String n1;
       String n2;
       String n3;
       
       // 省略get方法
   }
   ```

   

   + 有时候需注入一些特殊字符，比如：`>、>=、<、<=、&`等等等..

   + 直接写会报错，编译都会不通过

     ```xml
     <bean id="nBean" class="com.ilovesshan.pojo.N">
         <property name="n1" value=" 5 < 3"/>
         <property name="n2" value=" 5 >= 3"/>
     </bean>
     ```

   + 解决办法一：

     + 使用转义字符

       ```xml
       <property name="n1" value=" 5 &lt; 3"/>
       <property name="n2" value=" 5 &gt;  3"/>
       <property name="n3" value=" 5 &amp;  3"/>
       ```

       

   + 解决办法二：

     + 使用\<![CDATA[<<特殊字符>>]]>

       ```xml
       <property name="n1">
           <value type="java.lang.String"><![CDATA[1 < 2]]></value>
       </property>
       
       <property name="n2">
           <value type="java.lang.String"><![CDATA[1 >= 2]]></value>
       </property>
       
       <property name="n3">
           <value type="java.lang.String"><![CDATA[1 & 2]]></value>
       </property>
       ```

       

### P命名空间注入

1. P命名空间注入主要是用来简化set注入的，既然是简化set注入的，那就要求需要提供set方法

   ```java
   public class School {
       private String name;
       private String address;
       // set 方法省略...
   }
   ```

2. 使用p命名空间的步骤

   + 在beans标签中添加 命名空间：xmlns:p="http://www.springframework.org/schema/p"

     ```xml
     <!--
             p 命名空间主要是用来简化set注入的，本质上还是set注入
             注入方式：
                 简单数据类型    p:属性名 = "属性值"
                 复杂数据类型    p:属性名-ref = "beanId"
         -->
     <bean id="schoolBean1" class="com.ilovesshan.pojo.School" p:name="school name" p:address="sichuan chengdu"/>
     ```

     

### C命名空间注入

1. c命名空间主要是用来简化构造器注入的，当然这个bean肯定就需要提供构造方法哈

   ```java
   public class School {
       private String name;
       private String address;
       // 构造方法省略...
   }
   ```

   

2. c命名空间注入使用步骤

   + 在beans标签中添加 命名空间：xmlns:p="http://www.springframework.org/schema/c"

     ```xml
     <!--
             c 命名空间注入
             注入方式：
                 简单数据类型
                     c:index index从0开始
                     c:name  name就是参数名称
                 复杂数据类型
                     c:index-ref index从0开始
                     c:name-ref  name就是参数名称
         -->
     <bean id="schoolBean2" class="com.ilovesshan.pojo.School" c:_0="school name" c:_1="sichuan chengdu"/>
     ```

     

### util命名空间注入复用配置

1. util命名空间注入主要功能是：复用配置

   ```java
   public class MySqlDataSource {
   
       private Properties properties;
   
       public void setProperties(Properties properties) {
           this.properties = properties;
       }
   }
   ```

   ```java
   public class OracleDataSource {
       private Properties properties;
   
       public void setProperties(Properties properties) {
           this.properties = properties;
       }
   }
   ```

   

2. util命名空间使用步骤

   + 在beans标签中添加 命名空间：xmlns:util="http://www.springframework.org/schema/util"

   + 在xsi:schemaLocation中添加： http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd

     ```xml
     <!--
         通过 util命名空间 可以复用配置
         可以处理以下几种类型
             list
             set
             map
             properties
             property-path
             constants
     -->
     <util:properties id="ds">
         <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
         <prop key="url"> jdbc:mysql://localhost:3306/spring</prop>
         <prop key="username">root</prop>
         <prop key="password">123456</prop>
     </util:properties>
     
     
     
     <!-- MySql数据源配置-->
     <bean id="mysqlDs" class="com.ilovesshan.datasources.MySqlDataSource">
         <property name="properties" ref="ds"/>
     </bean>
     
     <!-- Oracle数据源配置-->
     <bean id="oracleDs" class="com.ilovesshan.datasources.OracleDataSource">
         <property name="properties" ref="ds"/>
     </bean>
     ```

​				

### 自动装配

1. Spring提供了自动装配机制，可以根据名称或者类型进行自动装配，也相当于简化了注入配置，注意：不管是根据名称还是类型进行自动装配他们都是基于set注入的，所以说还是得提供set方法!

   ```java
   public class StudentController {
       private StudentService studentService;
       private TeacherService teacherService;
       // 省略了set方法
   }
   ```

   

2. 根据名称自动装配（byName）

   ```xml
   
   <bean id="teacherService" class="com.ilovesshan.service.TeacherService"/>
   <bean id="studentService" class="com.ilovesshan.service.StudentService"/>
   
   <!--
           autowire="byName": 表示根据名称进行自动装配
               要求: bean对象的id和被注入对象提供的set方法(去掉set剩余的字母，首字母小写)的值一样。
                   bean的Id = abc, 对应set方法: setAbc
                   bean的Id = teacherService, 对应set方法: setTeacherService
               但是建议开发中遵守开发规范，生成符合规范的set方法，那就可以保证属性名称和bean的id一样！！
       -->
   <bean id="studentController" class="com.ilovesshan.controller.StudentController" autowire="byName"/>
   ```

   

3. 根据类型自动装配（byType）

   ```xml
   <bean id="teacherService1" class="com.ilovesshan.service.TeacherService"/>
   <bean id="studentService" class="com.ilovesshan.service.StudentService"/>
   
   <!--
           autowire="byType": 表示根据类型进行自动装配
           使用autowire="byType"要求：
               1、保证容器中仅有一个相同类型的bean实例对象，会报错
               2、如果不存在需要的类型的bean实例对象， 会注入失败
       -->
   <bean id="studentController" class="com.ilovesshan.controller.StudentController" autowire="byType"/>
   ```



### 引入外部配置文件

1. 通常会将一些配置信息抽离成一个单独的配置文件，例如jdbc.properties专门用于配置数据库连接信息

2. 引入外部配置文件步骤

   + resources目录下新建 jdbc.properties文件

     ```properties
     jdbc.driver=com.mysql.cj.jdbc.Driver
     jdbc.url=jdbc:mysql://localhost:3306/spring?serverTimezone=UTC&characterEncoding=utf8&useUnicode=true&useSSL=false
     jdbc.username=root
     jdbc.password=123456
     ```

     

   + 在beans标签中添加context命名空间（推荐使用idea自动补充功能，不容易出错）

     ```xml
     <beans
            xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:context="http://www.springframework.org/schema/context"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
     
     </beans>
     ```

     

   + 引入外部属性文件

     ```xml
     <context:property-placeholder location="jdbc.properties"/>
     ```

   + 使用配置文件中的属性，通过 ${属性名}使用

     ```xml
     <bean class="com.ilovesshan.datasources.MyDataSource">
         <property name="url" value="${jdbc.url}"/>
         <property name="password" value="${jdbc.password}"/>
         <property name="username" value="${jdbc.username}"/>
         <property name="driver"  value="${jdbc.driver}"/>
     </bean>
     ```





## Spring Bean的作用域

### 单例bean和多实例bean

1. 默认情况下，Spring容器中的bean对象都是单例的，每个bean实例对象只会被创建一次。

2. 这些bean对象在spring容器构建阶段进行实例化，也就是调用 new ClassPathXmlApplicationContext("spring.xml")的时候。

3. 在bean标签中有一个scope属性，其中有两个值

   + singleton（单例）

     + bean标签的scope属性默认值就是 singleton。
     + spring容器中每个类型的实例仅存在一份。
     + spring容器在构建阶段，就会调用bean对象的构造方法创建实例对象。

   + prototype（多例/原型）

     + spring容器中每个类型的实例可以存在多份。
     + spring容器在构建阶段，不会调用bean对象的构造方法创建实例对象，具体的调用时机是：从spring容器中获取bean对象时，再调用该对象的构造方法，获取一次就会调用一次该bean的构造方法。

     

### Singleton

```java
public class User {
    public User() {
        System.out.println("User 对象 构造器被调用...");
    }
}
```

```xml
<!--
 	scope 属性默认就是 "singleton"
 	写了scope="singleton" 和不写没区别
-->
<bean id="user" class="com.ilovesshan.pojo.User" scope="prototype"/>
```

```java
@Test
public void testSingleton() {
    ApplicationContext app = new ClassPathXmlApplicationContext("spring.xml");

    User user1 = app.getBean("user", User.class);
    System.out.println("user1 = " + user1);

    User user2 = app.getBean("user", User.class);
    System.out.println("user2 = " + user2);

    User user3 = app.getBean("user", User.class);
    System.out.println("user3 = " + user3);
}
```

![image-20230321215204107](../../.vuepress/public/image-20230321215204107.png)

### Property

```xml
<bean id="user" class="com.ilovesshan.pojo.User" scope="prototype"/>
```

```java
@Test
public void testSingleton() {
    ApplicationContext app = new ClassPathXmlApplicationContext("spring.xml");

    User user1 = app.getBean("user", User.class);
    System.out.println("user1 = " + user1);

    User user2 = app.getBean("user", User.class);
    System.out.println("user2 = " + user2);

    User user3 = app.getBean("user", User.class);
    System.out.println("user3 = " + user3);
}
```

![image-20230321215248041](../../.vuepress/public/image-20230321215248041.png)



### Scope其他属性

scope属性的值不止两个，它一共包括8个选项：

- singleton：默认的，单例。
- prototype：原型。每调用一次getBean()方法则获取一个新的Bean对象。或每次注入的时候都是新对象。
- request：一个请求对应一个Bean。仅限于在WEB应用中使用。
- session：一个会话对应一个Bean。仅限于在WEB应用中使用。
- global session：portlet应用中专用的。如果在Servlet的WEB应用中使用global session的话，和session一个效果。（portlet和servlet都是规范。servlet运行在servlet容器中，例如Tomcat。portlet运行在portlet容器中。）
- application：一个应用对应一个Bean。仅限于在WEB应用中使用。
- websocket：一个websocket生命周期对应一个Bean。仅限于在WEB应用中使用。
- 自定义scope：很少使用。



