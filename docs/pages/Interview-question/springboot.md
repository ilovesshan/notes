# SpringBoot

### Spring Boot ⾃动配置原理？

1. 通过@Import + @Configuration + Spring spi机制实现了⾃动配置。
2. ⾃动配置类由各个starter提供，使⽤@Configuration + @Bean定义配置类，放到`METAINF/spring.factories`下。
3. 使⽤Spring spi扫描META-INF/spring.factories下的配置类使⽤@Import导⼊⾃动配置类。



### 如何理解 Spring Boot 中的 Starter？

1. starter就是定义⼀个starter的jar包，写⼀个@Configuration配置类、将这些bean定义在⾥⾯，然后在starter包的META-INF/spring.factories中写⼊该配置类，springboot会按照约定来加载该配置类。
2. 开发⼈员只需要将相应的starter包依赖进应⽤，进⾏相应的属性配置（使⽤默认配置时，不需要配置），就可以直接进⾏代码开发，使⽤对应的功能了，⽐如mybatis-spring-boot--starter，springboot-starter-redis。



### Spring Boot中常⽤注解及其底层实现？

1. @SpringBootApplication注解：这个注解标识了⼀个SpringBoot⼯程，它实际上是另外三个注解的组合，这三个注解是：
   +  @SpringBootConfiguration：这个注解实际就是⼀个@Configuration，表示启动类也是⼀个配置类。
   + @EnableAutoConfiguration：向Spring容器中导⼊了⼀个Selector，⽤来加载ClassPath下SpringFactories中所定义的⾃动配置类，将这些⾃动加载为配置Bean。
   +  @ComponentScan：标识扫描路径，因为默认是没有配置实际扫描路径，所以SpringBoot扫描的路径是启动类所在的当前⽬录。
2. @Bean注解：⽤来定义Bean，类似于XML中的\<bean>标签，Spring在启动时，会对加了@Bean注解的⽅法进⾏解析，将⽅法的名字做为beanName，并通过执⾏⽅法得到bean对象。
3. @Controller、@Service、@ResponseBody、@Autowired等等。



### Spring Boot是如何启动Tomcat的？

1. ⾸先，SpringBoot在启动时会先创建⼀个Spring容器。
2. 在创建Spring容器过程中，会利⽤@ConditionalOnClass技术来判断当前classpath中是否存在Tomcat依赖，如果存在则会⽣成⼀个启动Tomcat的Bean。
3. Spring容器创建完之后，就会获取启动Tomcat的Bean，并创建Tomcat对象，并绑定端⼝等，然后启动Tomcat。



### 如何处理项目中发生的异常？

1. 自定义全局异常处理器通过@RestControllerAdvice（@ControllerAdvice+@ResponseBody）和@ExceptionHandler注解配合实现。
2. 自定义定义一个或者多个（按功能/模块划分）的异常类，然后进行捕获异常从而响应给前端信息，为了项目的健壮性和容错性一般情况下会捕获异常基类Exception，目的是处理根(容错)异常。
