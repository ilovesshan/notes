# SSM

## 跨域

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