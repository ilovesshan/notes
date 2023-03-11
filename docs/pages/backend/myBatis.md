# MyBatis

## MyBatis概述

### 什么是框架

1. freamwork被译为”框架”一词。

2. 什么是框架？

   + 一个框架是一个半成品，简单理解就是：把通用的、公共的一部分代码进行封装，封装成一大堆类和接口提供给开发者调用。
   + 为什么是半成品？因为框架仅仅提供了一些提高发者开发效率、简化开发配置的类库，但是实际开发中业务会很复杂，我们开发者通常都是基于这些框架进行开发。
   + 一个框架提供的一大堆类和接口通常会被打包成一个 jar文件，通常我们说的 jar包。项目中引入这些jar包就可以使用这些框架进行开发了。

3. java常见的框架有哪些？

   + Spring

   + SpringMVC

   + MyBatis

   + SpringBoot

     .....

### JDBC的缺点

1. 先看一段代码

   ```java
   //1.注册数据库的驱动
   DriverManager.registerDriver(new com.mysql.jdbc.Driver());
   //2.通过 DriverManager获取数据库连接
   String url=”jdbc:mysql://localhost:3306/chapter01”;
   String usernames=”root”;
   String password=”itcast”;
   Connection conn=DriverManager.getConnection(url, username, password);
   //3.通过 Connection对象获取 Statement对象
   Statement stmt= conn.createStatement();
   //4.使用 Statement执行SQL语句
   String sql=”select * from users”;
   ResultSet rs=stmt.executeQuery(sql);
   //5、操作 ResultSet结果集
   System.out.println(”id|name|password|email|birthday”);
   while (rs.next()) {
       //通过列名获取指定字段的值
       int id=rs.getInt(”id”);     
       String name=rs.getString(”name”);
       String psw=rs.getString(”password”);
       String email=rs.getString(”email”);
       Date birthday=rs.getDate(”birthday”);
       System.out.println(id+”|”+name+”|”+psw+”|”+email+”|”+birthday); 
   }
   //6、回收数据库连接
   if(rs!=null) {
       try {
           rs.close();
       }catch (SQLException e) {
           e.printStackTrace();
       }
       rs=null;
   }
   if(stmt!=null) {
       try {
           stmt.close();
       }catch (SQLException e) {
           e.printStackTrace();
       }
       stmt=null;
   }
   if(conn!=null) {
       try {
           conn.close();
       } catch (SQLException e) {
           e.printStackTrace();
       }
       conn=null;
   }
   ```

   

2. 总结JDBC缺点，引出Mybatis

   + 注册数据库的驱动、获取数据库连接、回收数据库连接这中繁琐又没技术含量的代码内能不能交给机器去完成？不用我们程序员来编写！
   + 编写的SQL语句直接和Java代码耦合在一起了，如果要更改Sql语句，那势必要改Java代码吧，违背了OCP原则不说还得重新编译打包部署！！
   + 通过列名获取指定字段的值这种代码能不能让机器通过反射去做？这里有5个字段就要写5个rs.getXxx()，万一有100个字段那不是要写100次rs.getXxx()？？

### ORM思想

1. ORM：Object Relational Mapper （对象关系映射），ORM主要是一种思想，使O（jvm中的java对象）和 R（关系型数据库）之间互相映射。

   ![image-20230311162016560](../../.vuepress/public/image-20230311162016560.png)

2. MyBatis是一个半自动化ORM，Hibernate是一个全自动化ORM。

### Mybatis简介

[Mybatis3-中文文档  传送门](https://mybatis.org/mybatis-3/zh/index.html)

[Mybatis3-英文文档  传送门](https://blog.mybatis.org/)

[MyBatis3-Github  传送门](https://github.com/mybatis/mybatis-3)

1. Mybatis简介
   + Mybatis是一个框架，它就是我们常听说的SSM框架中的M（MyBatis）。
   + Mybatis是一个优秀的持久层框架，它支持自定义Sql，存储过程以及高级映射。
   + MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。
   + MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO为数据库中的记录。
   + Mybatis本是Apache的一个开源项目Ibatis，2010年这个项目由Apache software foundation迁移到了Google Code，并改名为Mybatis。2013年11月迁移到Github
2. Mybatis和JDBC
   + 简而言之：Mybatis的出现就是来解决JDBC缺点，本质上Mybatis的底层还是JDBC，只不过Mybatis开发人员是对JDBC进行了一层封装。
   + 对于我们开发者来说，MyBatis简单易用，功能强大，开发效率更高，免除了繁琐的配置！
3. Mybatis在三层架构的位置
   + 三层架构：Controller（视图层）、Service（业务逻辑层）、Dao（数据持久层）
   + 刚刚说过：Mybatis是一个优秀的持久层框架，那自然就是处于三层架构中的数据持久层了。



## MyBatis 入门案例

仅仅入门而已，不懂没关系，后面会一一讲解，先感受一下MyBatis 这个框架的强大！

### 数据库准备

```sql
create database powernode_mybatis;

use powernode_mybatis;

create table t_car(
    id bigint primary key auto_increment,
    car_num varchar(50) comment '汽车编号',
    brand varchar(50) comment '品牌',
    guide_price decimal(10,2) comment '厂家指导价',
    produce_time char(10) comment '生产日期',
    car_type varchar(20) comment '汽车类型'
);

insert into 
t_car(car_num, brand, guide_price, produce_time, car_type) 
values 
('10010', '奔驰',500000.00, '2018-10-15', '燃油车'),
('10011', '宝马',400000.00, '2022-05-10', '电动车'),
('10012', '奥迪',290000.00, '2021-11-10', '电动车');

select car_num, brand, guide_price, produce_time, car_type from t_car;
```



### 新建项目并添加依赖

1. 使用IDEA新建Maven项目

2. 添加mybatis和mysql驱动依赖

   + 在pom.xml文件中添加相关依赖，并刷新，第一次下载会有点慢！！

     ```xml
     <dependencies>
     
         <!-- mybatis框架依赖-->
         <dependency>
             <groupId>org.mybatis</groupId>
             <artifactId>mybatis</artifactId>
             <version>3.5.10</version>
         </dependency>
     
         <!-- mysql数据库驱动依赖-->
         <dependency>
             <groupId>com.mysql</groupId>
             <artifactId>mysql-connector-j</artifactId>
             <version>8.0.31</version>
         </dependency>
     
     </dependencies>
     ```

### Mybaits基本使用五部曲

1. 五部曲

   + 第一步：添加mybatis依赖

   + 第二步：编写mybatis核心配置文件
   + 第三步：编写xxxMapper.xml
   + 第四步：在mybatis核心配置文件中关联xxxMapper.xml
   + 第五步：编写Java代码，对表进行CRUD

2. 具体实现步骤

   + 第二步：编写mybatis核心配置文件

     + 这里我叫做”mybatis-config.xml”（取名随意），大家都比较喜欢将mybatis核心配置文件命名成”mybatis-config.xml”，那我们也就遵循这些大家都遵循的规范吧。

     + 配置文件里面的信息建议到[mybatis中文官网](https://mybatis.org/mybatis-3/zh/getting-started.html)复制粘贴，再按需求进行更改，手写很容易出错！

       ```xml
       <?xml version=”1.0” encoding=”UTF-8” ?>
       <!DOCTYPE configuration
           PUBLIC ”-//mybatis.org//DTD Config 3.0//EN”
           ”https://mybatis.org/dtd/mybatis-3-config.dtd”>
       <configuration>
           <environments default=”development”>
               <environment id=”development”>
                   <transactionManager type=”JDBC”/>
                   <dataSource type=”POOLED”>
                       <!-- 这部分内容换成自己mysql的配置信息-->
                       <property name=”driver” value=”com.mysql.cj.jdbc.Driver”/>
                       <property name=”url”
                                 value=”jdbc:mysql://localhost:3306/powernode_mybatis?serverTimezone=UTC&amp;characterEncoding=utf8&amp;useUnicode=true&amp;useSSL=false”/>
                       <property name=”username” value=”root”/>
                       <property name=”password” value=”123456”/>
                   </dataSource>
               </environment>
           </environments>
           <mappers>
               <mapper resource=”org/mybatis/example/BlogMapper.xml”/>
           </mappers>
       </configuration>
       ```

       

   + 第三步：编写xxxMapper.xml

     + 编写carMapper.xml映射文件，叫carMapper.xml原因：一般情况xxxMapper.xml文件就对应一张表，xxx就对应着表的名称，大家都遵循这种命名规范
     + 文件名称和文件存放路随意（我这里放在resources文件下）

     ```xml
     <?xml version=”1.0” encoding=”UTF-8” ?>
     <!DOCTYPE mapper
             PUBLIC ”-//mybatis.org//DTD Mapper 3.0//EN”
             ”https://mybatis.org/dtd/mybatis-3-mapper.dtd”>
     
     <!-- namespace 命名空间，暂时先不管-->
     <mapper namespace=”xxxxxxxxx”>
     
         <!-- 这里编写sql语句, 每个标签代都表着对应的sql语法-->
         <!-- id属性，到时候需要根据id来找到需要执行sql语句-->
         <select id=”select”>
             select car_num, brand, guide_price, produce_time, car_type from t_car
         </select>
     
         <update id=”update”>
             update 
             `powernode_mybatis`.`t_car`
             SET 
             `id`='3', `car_num`='10012', `brand`='奥迪', `guide_price`='290000.00', `produce_time`='2021-11-10', `car_type`='电动车'
             WHERE 
             (`id`='3');
         </update>
         
         <delete id=”delete”>
     
         </delete>
         <insert id=”insert”>
     
         </insert>
     </mapper>
     ```

     

   + 第四步：在mybatis核心配置文件中关联xxxMapper.xml

     ```xml
     <configuration>
         <mappers>
             <!--  这个mapper标签对应一个XxxMapper.xml映射文件-->
             <!--  resource表示: 这个文件从resource文件夹下查找 -->
             <mapper resource=”carMapper.xml”/>
         </mappers>
     </configuration>
     ```

     

   + 第五步：编写Java代码，对表进行增删改查

     + 从 XML 中构建 SqlSessionFactory
     + 从 SqlSessionFactory 中获取 SqlSession
     + 通过SqlSession对表进行CRUD

     ```java
     // 从 XML 中构建 SqlSessionFactory
     InputStream inputStream = Resources.getResourceAsStream(”mybatis-config.xml”);
     SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
     
     // 从 SqlSessionFactory 中获取 SqlSession
     SqlSession sqlSession = sqlSessionFactory.openSession();
     
     
     // xxxxxxxxx 对应着xxxMapper.xml文件的namespace
     // select 对应xxxMapper.xml文件中标签的id
     
     // 执行DQL语句 返回查询结结果
     List<Object> list = sqlSession.selectList(”xxxxxxxxx.select”);
     System.out.println(”list.size() = ” + list.size()); //3 对应着t_car表中的三条数据
     
     // 执行DML语句 返回表中受影响的行数
     int affectRows = sqlSession.update(”xxxxxxxxx.update”);
     System.out.println(”affectRows = ” + affectRows);
     
     // 如果执行DML语句， 需要手动提交事务
     sqlSession.commit();
     sqlSession.close();
     ```

### Mybaits使用细节

1. 关于xxxMapper.xml文件中的sql语句“;”问题，sql语句结束其实加不加“;”都可以！

2. Resources.getResourceAsStream(”mybatis-config.xml”)

   + Resources是ibatis提供的一个类，本质底层还是通过ClassLoader去加载文件的。之后如果是看到getResource或者xxxtResource之类的方法或者类，那一般都表示是从类路径下加载资源。

   + Resources.getResourceAsStream(”mybatis-config.xml”)返回一个InputStream流，还有其他方式去加载mybatis配置文件

     + 通过ClassLoader去类路径下加载资源（推荐方式）

       +  InputStream inputStream = ClassLoader.getSystemClassLoader().getResourceAsStream(”mybatis-config.xml”);

       + InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(”mybatis-config.xml”);

         

     + 通过 FileInputStream输入流去加载文件（不推荐，移植性太差了）

       + InputStream inputStream = new FileInputStream(”磁盘绝对路径\\mybatis-config.xml”);

       

3. mybatis核心配置文件和xxxMapper.xml文件

   + 关于命名和路径都是随意的！！

4.  \<mapper resource=”xxxMapper.xml”/>

   + \<mapper resource=”xxxMapper.xml”/>：从类路径下加载资源
   + \<mapper url=”file:///d:/work/xxxMapper.xml”/>：通过绝对路径加载资源（不推荐，移植性太差了）

### Mybaits事务管理器

[事务管理器（transactionManager）](https://mybatis.org/mybatis-3/zh/configuration.html#environments)

在 MyBatis 中有两种类型的事务管理器（也就是 type="[JDBC|MANAGED]"），也就是\<transactionManager type="JDBC"/>标签的types属性值

+ JDBC ：将事务管理权交给mybatis来管理，这个配置底层是使用了 JDBC 的提交和回事务功能

  + SqlSession sqlSession = sqlSessionFactory.openSession(); 

    底层代码表现形式：

    openSessionFromDataSource() -> newTransaction() ->  new JdbcTransaction() -> JdbcTransaction类的setDesiredAutoCommit()方法

    ```java
    protected void setDesiredAutoCommit(boolean desiredAutoCommit) {
        if (this.connection.getAutoCommit() != desiredAutoCommit) {
            if (log.isDebugEnabled()) {
                // ...
            }
            this.connection.setAutoCommit(desiredAutoCommit);
        }
    }
    ```

    

  + SqlSession sqlSession = sqlSessionFactory.openSession(false); 

    + 表示不开启事务，实际上setDesiredAutoCommit方法中的 this.connection.setAutoCommit(true);不会执行，因为JDBC的AutoCommit默认就是true，那个IF语句进不去。

      ```java
      protected void setDesiredAutoCommit(boolean desiredAutoCommit) {
          // true != true ==> false
          if (this.connection.getAutoCommit() != desiredAutoCommit) {
              // ...
              // IF语句不成立， 这句话压根不执行
              this.connection.setAutoCommit(desiredAutoCommit);
          }
      }
      ```

      

  + sqlSession.commit(); 底层代码表现形式：

    ```java
    public void commit() throws SQLException {
        // this.connection.getAutoCommit() 默认是false
        if (this.connection != null && !this.connection.getAutoCommit()) {
            if (log.isDebugEnabled()) {
                log.debug("Committing JDBC Connection [" + this.connection + "]");
            }
            // IF语句不成立， 下面这句话不执行。
            this.connection.commit();
        }
    }
    ```

    

+ MANAGED： 这个配置几乎没做什么，意思就是 mybatis不负责管理事务了，而是将事务管理权交给其他容器管理，例如：spring

  \<transactionManager type="MANAGED"/>表示：不开启事务，因为 mybatis不负责管理事务了，目前我们项目没有spring容器，没人来接管管理事务这个事。

总结：关于autoCommit

+ 值为false：表示开启事务，不自动提交事务，提交事务的控制权由程序员来控制。
+ 值为true：表示自动提交事务，提交事务的控制权不由程序员来控制。

### 完整的MyBatis示例代码

```java
public class Test02 {
    public static void main(String[] args) {
        SqlSession sqlSession = null;
        try {
            // 从 XML 中构建 SqlSessionFactory
            InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

            // 从 SqlSessionFactory 中获取 SqlSession
            sqlSession = sqlSessionFactory.openSession();

            // 执行DML语句 返回表中受影响的行数
            int affectRows = sqlSession.update("xxxxxxxxx.update");
            System.out.println("affectRows = " + affectRows);

            // 如果执行DML语句， 需要手动提交事务
            sqlSession.commit();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```



