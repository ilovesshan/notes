# JDK 新特性

## JDK10

### var 

1. var介绍

   + var不是关键字，它相当于是一种动态类型。
   + var动态类型是编译器根据变量所赋的值来推断类型。
   + var 没有改变Java的本质，var只是一种简便的写法，就是说在定义局部变量时，任意什么类型都可以用var定义变量的类型会根据所赋的值来判断。

2. Java中var是Java10版本新出的特性，用它来定义局部变量。使用var 定义变量的语法： var 变量名 = 初始值；

   ```java
   // 这样的代码会报错 显示int到double的转换，Java是强类型语言，每个变量都有固定的变量类型。
   var a = 20;
   var a = 8.9;
   ```

3. 用var声明变量的注意事项

   + var只能在方法内定义变量，不允许定义类的成员变量。
   + var 定义变量必须赋初始值，------》以后不能在赋初始值。
   + var每次只能定义一个变量，不能复合声明变量。

4. 使用var定义变量的优缺点

   + 优点：使代码简洁和整齐。
   + 缺点：降低了程序的可读性。

5. 什么时候该用var定义变量

   + 如果你定义变量时，给变量赋给一个直观的值，这时就可以使用var定义变量。

6. 最不能使用var定义变量

   + 给var定义的变量赋给一个很复杂的表达式时，这样使表达式的返回值不直观，不能用var定义变量。
   + var定义的变量作用域很长时，方法长和var变量影响较大时，不用var定义变量。

## JDK12

### Switch

1. 箭头表达式、新的case标签

   ```java
   @Test
   public void test01() {
       int week = 5;
       String result = "";
   
       switch (week) {
           case 1, 7 -> result = "不上班，休息日...";
           case 2, 3, 4, 5, 6 -> result = "要上班，工作日...";
           default -> throw new RuntimeException("没有这个星期...");
       }
   
       System.out.println("result = " + result);
   }
   ```

   

2. yield返回值

   ```java
   @Test
   public void test02() {
       int week = 10;
       String result = switch (week) {
           case 1, 7:
               yield "不上班，休息日...";
           case 2, 3, 4, 5, 6:
               yield "要上班，工作日...";
           default:
               yield "没有这个星期...";
       };
       System.out.println("result = " + result);
   }
   ```

   

3. 代码块 + yield返回值

   ```java
   @Test
   public void test03() {
       int week = 5;
       String result = switch (week) {
           case 1, 7 -> {
               System.out.println("(1, 7) 执行额外代码...");
               yield "不上班，休息日...";
           }
           case 2, 3, 4, 5, 6 -> {
               System.out.println("(2, 3, 4, 5, 6) 执行额外代码...");
               yield "要上班，工作日...";
           }
           default -> {
               System.out.println("(default) 执行额外代码...");
               yield "没有这个星期...";
           }
       };
       System.out.println("result = " + result);
   }
   ```

   

4. Java Record（JDK19才支持该语法）

   + 定义三个Record

     + 直线 Line(int x, int y)

       ```java
       public record Line(int x, int y) {}
       ```

     + 矩形 Rectangle(int width, int height)

       ```java
       public record Rectangle(int width, int height) {}
       ```

     + 圆 Circle(int radius)

       ```java
       public record Circle(double radius) {}
       ```

       

   + 用switch根据类型进行配置

     - 匹配到Line， 返回值是 x + y
     - 匹配到Rectangle， 返回值是 ( width + height) * 2
     - 匹配到Circle， 返回值是 Math.PI * radius * radius

     ```java
     @Test
     public void test05() {
     
         Line line = new Line(10, 20);
         Rectangle rectangle = new Rectangle(10, 20);
         Circle circle = new Circle(10);
     
         Object o = line;
         int week = 5;
         int result = switch (o) {
             case Line(int x, int y) -> {
                 System.out.println("当前形状: Line");
                 yield x + y;
             }
             case Rectangle(int width, int height) -> {
                 System.out.println("当前形状: Rectangle");
                 yield (width + height) *2;
             }
             case Circle(int radius) -> {
                 System.out.println("当前形状: Circle");
                 yield Math.PI * radius * radius;
             }
             default -> {
                 System.out.println("当前形状: 不能识别");
                 yield 0;
             }
         };
         System.out.println("result = " + result);
     }
     ```

     

   

## JDK14

### Record 类型

1. Record 简介

   + Java中Record类型是Java14中预览函数引入的，并且应作为普通的、不可变数据类，用于在类和应用程序之间进行数据传输。
   + 像`Enum `一样，Record也是一个特殊的Java类，它旨在用于仅创建类以充当普通数据载体的地方。
   + 类(Class)与记录(Record)之间的重要区别
     + Record：从实例获取数据所需的所有代码，Record将这种责任转移给生成编译器。
     + Class：从实例获取数据所需的所有代码，由程序员负责编写。

2. Record 语法

   + 使用关键字 `record` 在Java中创建此类Record类。就像我们在构造函数中所做的一样，我们需要在Record中声明属性和对应类型。

   + 下面示例中，Student用于保存用户信息。

     ```java
     package com.ilovesshan;
     
     public record Student(Long id, String name, int age,  String email) {
     }
     ```

     

3. 创建 Record，调用其构造函数并在其中传递所有字段信息。

   ```java
   @Test
   public void test01() {
       // 创建Record
       Student ilovesshan = new Student(100L, "ilovesshan", 20, "ilovesshany@gmail.com");
       // 打印Record
       System.out.println("ilovesshan = " + ilovesshan);
   }
   ```

   ```tex
   ilovesshan = Student[id=100, name=ilovesshan, age=20, email=ilovesshany@gmail.com]
   ```

   

4. 访问 Record属性和方法

   ```java
   public record Student(Long id, String name, int age, String email) {
       // 实例方法
       public void showStudentInfo() {
           System.out.println("id = " + id + ", name = " + name + ", age = " + age + ", email = " + email);
       }
   
       // 静态方法
       public static String toUpperCase(String value) {
           return value.toUpperCase();
       }
   }
   ```

   ```java
   @Test
   public void test02() {
       // 创建Record
       Student ilovesshan = new Student(100L, "ilovesshan", 20, "ilovesshany@gmail.com");
   
       // 访问Record的属性
       String name = ilovesshan.name();
       System.out.println("name = " + name);
       String email = ilovesshan.email();
       System.out.println("email = " + email);
   
       // 调用Record的实例方法
       ilovesshan.showStudentInfo();
   
       // 调用Record的静态方法
       String toUpperCaseValue = Student.toUpperCase("hi,record!");
       System.out.println("toUpperCaseValue = " + toUpperCaseValue);
   
   }
   ```

   ```tex
   name = ilovesshan
   email = ilovesshany@gmail.com
   id = 100, name = ilovesshan, age = 20, email = ilovesshany@gmail.com
   toUpperCaseValue = HI,RECORD!
   ```

   

5. Record 构造方法

   + 构造方法类型

     + 规范型：构造方法是所有成员作为参数
     + 自定义型：构造方法是自定义成员作为参数
     + 紧凑型：没有任何参数甚至没有括号

     ```java
     public record User(Integer userId, String userName, String password) {
     
         // 紧凑型构造器
         public User {
             if (userId < 10) {
                 throw new RuntimeException("UserId It has to be greater than 10");
             }
         }
     
         // 自定义构造器
         public User(Integer userId, String userName) {
             this(userId, userName, null);
         }
     }
     ```

     

   + 测试构造方法

     ```java
     @Test
     public void test01() {
         // 调用规范型构造方法
         User user1 = new User(100, "tom", "123456");
         System.out.println("user1 = " + user1);
     
         // 调用自定义构造方法(id<10会抛出异常)
         User user2 = new User(1, "jack");
         System.out.println("user = " + user2);
     }
     ```

     

   + Record编译之后的代码

     ```java
     public record User(Integer userId, String userName, String password) {
         // 将规范型和自定义型构造器合并了
         public User(Integer userId, String userName, String password) {
             if (userId < 10) {
                 throw new RuntimeException("UserId It has to be greater than 10");
             } else {
                 this.userId = userId;
                 this.userName = userName;
                 this.password = password;
             }
         }
     
         public User(Integer userId, String userName) {
             this(userId, userName, (String)null);
         }
     
         public Integer userId() {
             return this.userId;
         }
     
         public String userName() {
             return this.userName;
         }
     
         public String password() {
             return this.password;
         }
     }
     ```

     

6. Java Record 和 Lombok

   + Java Record 
     + Java Record 是语言级别的，一种语义特性，简单理解就是提供了通用的数据类，充当数据载体，用于类和应用程序之间传递数据。
   + Lombok
     + Lombok 提供了语法的便利性，通常预装了一些代码模板，根据你加入到类中的注解自动执行代码模板。这样的库纯粹是是为了方便实现POJO对象，通过预编译模板将代码模板加入到class中。
   + JavaRecord 是创建不可变对类以及减少样板代码的好方法，Lombok是一种减少样板代码的工具，两者有表面上的重叠部分。

   

7. Record 实现接口

   + 定义Phone接口

     ```java
     public interface Phone {
         public void cll();
     }
     ```

     

   + 定义Record类，实现Phone接口并实现接口中的方法

     ```java
     public record XiaoMiPhone() implements Phone {
         @Override
         public void cll() {
             System.out.println("小米手机打电话...");
         }
     }
     ```

     

   + 单元测试

     ```java
     @RunWith(JUnit4.class)
     public class XiaoMiPhoneTest {
     
         @Test
         public void test01() {
             Phone xiaoMiPhone = new XiaoMiPhone();
             xiaoMiPhone.cll(); // 小米手机打电话...
         }
     }
     ```

     

   

8. Local Record 

   +  Local Record（ 局部 Record），可以在方法中定义Record，局部Record可以用于临时存储数

   ```java
   @RunWith(JUnit4.class)
   public class LocalRecordTest {
   
       @Test
       public void test01() {
           // 定义局部Record 用于存储临时数据
           record logRecord(String logId, Integer requestCode, String userId, String message) { }
           logRecord logRecord = new logRecord("223-04-03-1101", 400, "UU4581512", "下单成功");
   
           // 访问 Record
           System.out.println("logRecord = " + logRecord);
       }
   }
   ```

   

9. 嵌套 Record

   + 使用嵌套 Record来描述一个员工信息 Employee

     + 员工基本信息（BaseInfo），姓名、性别、手机号。
     + 员工地址信息（AddressInfo），省市区地址、详细地址。
     + 员工工资信息（SalaryInfo），每个月基本工资、补贴工资。

     ```java
     public record BaseInfo(String username, String gender, String phoneNumber) {}
     ```

     ```java
     public record AddressInfo(String baseAddress, String detailAddress) {}
     ```

     ```java
     public record SalaryInfo(Double baseSalary, Double otherSalary) {}
     ```

     ```java
     public record Employee(BaseInfo baseInfo, AddressInfo addressInfo, SalaryInfo salaryInfo) {}
     ```

   + 单元测试

     ```java
     @RunWith(JUnit4.class)
     public class EmployeeTest {
     
         @Test
         public void test01() {
             BaseInfo baseInfo = new BaseInfo("张大彪", "男", "15778632144");
             AddressInfo addressInfo = new AddressInfo("四川省成都市武侯区", "石羊街道1789号5幢12A");
             SalaryInfo salaryInfo = new SalaryInfo(999999.00, 1111.00);
     
             Employee employee = new Employee(baseInfo, addressInfo, salaryInfo);
     
             // 访问外层嵌套Record
             System.out.println("employee = " + employee);
     
     
             // 访问内层Record 属性
             String username = employee.baseInfo().username();
             System.out.println("username = " + username);
             String baseAddress = employee.addressInfo().baseAddress();
             System.out.println("baseAddress = " + baseAddress);
         }
     }
     ```

     ```tex
     employee = Employee[baseInfo=BaseInfo[username=张大彪, gender=男, phoneNumber=15778632144], addressInfo=AddressInfo[baseAddress=四川省成都市武侯区, detailAddress=石羊街道1789号5幢12A], salaryInfo=SalaryInfo[baseSalary=999999.0, otherSalary=1111.0]]
     username = 张大彪
     baseAddress = 四川省成都市武侯区
     ```

     

10. Record Instanceof

    + 编写一个Computer Record

    + 编写一个ComputerService

      + 定义一个方法判断Record类型是否是Computer Record
      + 如果是并判断该Computer 的价格是否小于等于8000

    + ComputerService中的语法只有JDK19才支持！！！

      ```java
      public record Computer(Double price) {
      }
      ```

      ```java
      public class ComputerService {
          public boolean isExpensive(Object object){
              if(object instanceof Computer(Double price)){
                  if(price <= 8000){
                      return true;
                  }else {
                      return false;
                  }
              }
          }
      }
      ```

      

11. Record 总结

    + java.lang.Record 是一个抽象类，并且Record 类是所有Record的父类。

    + Record 类支持java.io.Serializable 序列化或者反序列化。

    + Record 类支持泛型，例如：public record Person\<T>(T type) { }。

    + java.lang.class提供了两个与Record相关的方法

      + 是否是Record对象

        ```java
        @Test
        public void test02() {
            User user = new User(100, "tom", "123456");
            Class<? extends User> aClass = user.getClass();
            boolean isRecord = aClass.isRecord();
            System.out.println("isRecord = " + isRecord);
        }
        ```

        ```tex
        isRecord = true
        ```

        

      + 获取gaiRecord的所有记录组件

        ```java
        @Test
        public void test02() {
            User user = new User(100, "tom", "123456");
            Class<? extends User> aClass = user.getClass();
            RecordComponent[] recordComponents = aClass.getRecordComponents();
            for (RecordComponent recordComponent : recordComponents) {
                System.out.println("recordComponent = " + recordComponent);
            }
        }
        ```

        ```tex
        recordComponent = java.lang.Integer userId
        recordComponent = java.lang.String userName
        recordComponent = java.lang.String password
        ```

        

### TextBlock 文本块

1. 文本块介绍

   + 处理多行文本时省时省力，不用使用单引号、+、换行符等等符号进行拼接处理。

2. 文本块基本使用

   ```java
   @Test
   public void test01() {
       String s1 = """
           这是正确定义文本块的方式             
           """;
   
           String s2 = """
           这是正确定义文本块的方式""";
   
           String s3 = """这是不正确定义文本块的方式""";
   
       String s4 = """这是不正确定义文本块的方式
           """;
   }
   ```

3. 文本块空白

   + 按住TAB键进行缩进，输出空白
   + 通过调用API进行缩进，输出空白

   ```java
   @Test
       public void test02() {
           String s1 = """
                   未缩进
                   星期一           
                   星期二           
                   星期三           
                   星期四           
                   星期五           
                   星期六           
                   星期七           
                   """;
   
           String s2 = """
                           通过TAB键进行缩进
                           星期一           
                           星期二           
                           星期三           
                           星期四           
                           星期五           
                           星期六           
                           星期七           
                   """;
   
           String s3 = """
                   调用API进行缩进
                   星期一           
                   星期二           
                   星期三           
                   星期四           
                   星期五           
                   星期六           
                   星期七           
                   """;
   
           String indentStr = s3.indent(5);
   
           System.out.println(s1);
           System.out.println(s2);
           System.out.println(indentStr);
       }
   ```

   ```tex
   未缩进
   星期一
   星期二
   星期三
   星期四
   星期五
   星期六
   星期七
   
           通过TAB键进行缩进
           星期一
           星期二
           星期三
           星期四
           星期五
           星期六
           星期七
   
        调用API进行缩进
        星期一
        星期二
        星期三
        星期四
        星期五
        星期六
        星期七
   ```

   

4. 文本块方法 formatted()

   ```java
   @Test
   public void test03() {
       String s1 = """
               大家好，我叫%s,我来自%s,今年%d岁！        
               """;
       String formattedStr = s1.formatted("jack", "中国北京", 10);
       System.out.println("formattedStr = " + formattedStr);
   }
   ```

   ```tex
   formattedStr = 大家好，我叫jack,我来自中国北京,今年10岁！
   ```

   

5. 文本块转义字符

   +  \ 单独使用可以作为空格（书写上可以使用 \ 将其换行，但是s1字符串再被解析时是不会换行的）
   + \ 和 "配合使用 会变成转义字符

   ```java
   @Test
   public void test04() {
       String s1 = """
           大家常说的\"SSM\"框架分别是:\
                   Spring \
                   SringMVC \
                   MyBatis \
                   您学到那里来了呢?   
           """;
           System.out.println("s1 = " + s1);
   }
   ```

   ```tex
   s1 = 大家常说的"SSM"框架分别是:Spring SringMVC MyBatis 您学到那里来了呢?
   ```

6. 文本块总结

   + 文本块提供了一种创建多行字符串的便捷方式。
   + 文本块创建的字符串与原来的字符串完全一样。
   + 创建文本块，只需用 **"""**。开始必须新起一行；结尾可以新起一行。
   + 文本块自动删除行尾空格和行开始的共有空格，仅保留相对缩进。行结尾进行统一。
   + 增加了新格式化方法formatted
   + Java 13中的预览功能，需要明确启用。

