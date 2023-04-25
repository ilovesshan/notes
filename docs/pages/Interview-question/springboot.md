# SpringBoot

### 如何处理项目中发生的异常？

1. 自定义全局异常处理器通过@RestControllerAdvice（@ControllerAdvice+@ResponseBody）和@ExceptionHandler注解配合实现。
2. 自定义定义一个或者多个（按功能/模块划分）的异常类，然后进行捕获异常从而响应给前端信息，为了项目的健壮性和容错性一般情况下会捕获异常基类Exception，目的是处理根(容错)异常。
