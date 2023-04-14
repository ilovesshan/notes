# ElasticSearch

## 初识 ElasticSearch

### ElasticSearch 简介

1. ElasticSearch 是一款非常强大的开源搜索引擎，能够帮助我们从海量数据中找到所需要的数据。

2. elasticsearch结合kibana、Logstash、Beats，也就是elastic stack（ELK）。被广泛应用在日志数据分析、实时监控等领域。

3. elasticsearch是elastic stack的核心，负责存储、搜索、分析数据。

4. 举几个生活中的例子，这些都可以体现出是从海量数据中找到满足条件的数据。

   + 在浏览器上搜索信息

     ![image-20230413103203455](../../.vuepress/public/image-20230413103203455.png)

     

   + 逛GitHub

     ![image-20230413103428842](../../.vuepress/public/image-20230413103428842.png)

     

   + 京东/淘宝网站上搜索商品

     ![image-20230413103324704](../../.vuepress/public/image-20230413103324704.png)



### 正向索引和倒排索引

1. 正向索引：比如说传统的关系型数据库（MySQL）采用正向索引。

   ![image-20230413113804992](../../.vuepress/public/image-20230413113804992.png)

2. 倒排索引：由两部分组成文档（一般记录文档ID）和词条。

   + 文档：一个文档对应一条数据记录。
   + 词条：由文档按照语义划分的词语。

   ![image-20230413113820423](../../.vuepress/public/image-20230413113820423.png)



### ES和MySQL区别

1. 先看几个概念

   + ES是面向文档数据结构存储的，一个文档对数据库表中一条记录，ES中文档存储格式是通过json方式存储的，和传统数据库（MySQL）是有差别的。	
   + ES中索引和映射的概念
     + 索引（index）就是相同类型的文档集合，就类似于MySQL的一张表。
     + 映射（mapping）就是来规定文档类型（字段信息）的，就类似于MySQL表结构约束。

2. 总结一下ES和MySQL区别

   | MySQL  | ElasticSearch | 说明                                                         |
   | ------ | ------------- | ------------------------------------------------------------ |
   | table  | index         | 索引（index）就是文档集合，类似于数据库的表（table）         |
   | row    | document      | 文档（document）是按照json格式存储的，类似于数据库的一行数据（row） |
   | column | field         | 字段（field）定义json文档中的字段，类似于数据库的一列数据（column） |
   | schema | mapping       | 映射（mapping）索引中文档的约束（字段类型约束），类似于数据库的表结构（schema）。 |
   | sql    | dsl           | dsl是es提供的json风格的请求语句，用来操作es实现crud。        |

3. ES和MySQL的使用场景

   + MySQL擅长事务类型操作，可以确保数据的安全和一致性。
   + ES擅长海量数据的搜索、分析、计算。

   ![image-20230413124925665](../../.vuepress/public/image-20230413124925665.png)

## ElasticSearch 简单使用

### ElasticSearch 安装

1. 创建网络，因为我们还需要部署kibana容器，因此需要让es和kibana容器互联。

   ```shell
   docker network create es-net
   ```

   

2. 加载镜像，需要加载elasticsearch 和 kibana，注意两者请保持版本一致。

   ```shell
   docker pull elasticsearch:7.12.1
   ```

   ```shell
   docker pull kibana:7.12.1
   ```

3. 部署单点es

   + `-e "cluster.name=es-docker-cluster"`：设置集群名称
   + `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
   + `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
   + `-e "discovery.type=single-node"`：非集群模式
   + `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
   + `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
   + `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
   + `--privileged`：授予逻辑卷访问权
   + `--network es-net` ：加入一个名为es-net的网络中
   + `-p 9200:9200`：端口映射配置

   ```shell
   docker run -d \
   	--name es \
       -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
       -e "discovery.type=single-node" \
       -v es-data:/usr/share/elasticsearch/data \
       -v es-plugins:/usr/share/elasticsearch/plugins \
       --privileged \
       --network es-net \
       -p 9200:9200 \
       -p 9300:9300 \
   elasticsearch:7.12.1
   ```

   

4. 浏览器输入：http://192.168.186.129:9200/，如果可以看到一串json那就表示es安装成功了。

   ```json
   {
       "name": "c1a40b9a677a",
       "cluster_name": "docker-cluster",
       "cluster_uuid": "lgR4ksNgQXmBPApJHsxZpg",
       "version": {
           "number": "7.12.1",
           "build_flavor": "default",
           "build_type": "docker",
           "build_hash": "3186837139b9c6b6d23c3200870651f10d3343b7",
           "build_date": "2021-04-20T20:56:39.040728659Z",
           "build_snapshot": false,
           "lucene_version": "8.8.0",
           "minimum_wire_compatibility_version": "6.8.0",
           "minimum_index_compatibility_version": "6.0.0-beta1"
       },
       "tagline": "You Know, for Search"
   }
   ```

   

5. 部署kibana，kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。

   + `--network es-net` ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中。
   + `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch
   + `-p 5601:5601`：端口映射配置

   ```shell
   docker run -d \
   --name kibana \
   -e ELASTICSEARCH_HOSTS=http://es:9200 \
   --network=es-net \
   -p 5601:5601  \
   kibana:7.12.1
   ```

6. 浏览器访问：http://192.168.186.129:5601/，如果可以看到界面就表示kibnana安装成功了~

7. 介绍一下kibnana工具，[Dev tools](http://192.168.186.129:5601/app/dev_tools#/console)，可以使用这个工具对es数据进行增删改查，而且代码提示也很友好。

   + `GET /` 则是模拟了 http://192.168.186.129:9200/ 接口返回的数据。

   ![image-20230413124111478](../../.vuepress/public/image-20230413124111478.png)



### ES默认分词器

1. 默认情况下es会对用户输入的信息和建立倒排索引时进行分词，但是es的默认分词规则对中文支持很不友好，在kinaba的DevTool中测试。

   + 语法说明：
     + POST：请求方式
     + /_analyze：请求路径，这里省略了http://192.168.150.101:9200，有kibana帮我们补充
     + 请求参数，json风格：
       + analyzer：分词器类型，这里是默认的standard分词器
       + text：要分词的内容

   ```json
   POST _analyze
   {
     "analyzer": "standard",
     "text": ["我喜欢学习Java~"]
   }
   ```

### IK分词器

1. 如果要处理中文分词器，一般会使用IK分词器，[官网地址](https://github.com/medcl/elasticsearch-analysis-ik)：https://github.com/medcl/elasticsearch-analysis-ik

2. IK分词器默认有两种类型

   + ik_smart：最少切分，粗粒度
     + 优点：占内存少，可以缓存更多的词条。
     + 缺点：搜索内容不全面。
   + ik_max_word：最细切分，细粒度。
     + 优点：粒度细，搜索结果更全面。
     + 缺点：比较占用内存。

3. IK分词器安装

   + 安装IK分词器的方式（两种）

     + 在线（较慢）

       ```shell
       # 进入容器内部
       docker exec -it es /bin/bash
       
       # 在线下载并安装
       ./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip
       
       #退出
       exit
       #重启容器
       docker restart es
       ```

       

     + 离线（推荐）

       + 安装插件需要知道elasticsearch的plugins目录位置，而我们用了数据卷挂载，因此需要查看elasticsearch的数据卷目录。

         ```shell
         docker volume inspect es-plugins
         ```

       + 将本地的ik分词器压缩包解压并重命名为ik，将ik文件夹上传到es容器的插件数据卷中。

       + 重启容器

         ```shell
         docker restart es
         ```

4. IK分词器安装好了，就可以测试了。

   + 使用 ik_smart（最少切分，粗粒度）

     ```json
     GET /_analyze
     {
       "analyzer": "ik_smart",
       "text": "后端程序员需要会SSM框架~"
     }
     ```

     

   + 使用 ik_max_word（最多切分，细粒度）

     ```json
     GET /_analyze
     {
       "analyzer": "ik_smart",
       "text": "后端程序员需要会SSM框架~"
     }
     ```

   + 测试发现，使用两种不同模式的分词器类型运行结果也不一样。

### IK分词库拓展和停用

1. IK分词库拓展，需要定义一些自定义热词（近期的网络热词）。

   + 要拓展ik分词器的词库，只需要修改一个ik分词器目录中的config目录中的IkAnalyzer.cfg.xml文件。

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
     <properties>
         <comment>IK Analyzer 扩展配置</comment>
         <!--用户可以在这里配置自己的扩展字典 *** 添加扩展词典-->
         <entry key="ext_dict">ext.dic</entry>
     </properties>
     ```

     

   + ext.dic

     ```tex
     白嫖
     大怨种
     ```

     

2. IK分词库停用，屏蔽一些关键词，敏感词以及一些毫无意义的词。

   + 要停用ik分词器的词库，只需要修改一个ik分词器目录中的config目录中的IkAnalyzer.cfg.xml文件。

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
     <properties>
         <comment>IK Analyzer 扩展配置</comment>
         <!--用户可以在这里配置自己的扩展字典-->
         <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典 添加停用词词典-->
         <entry key="ext_stopwords">stopword.dic</entry>
     </properties>
     ```

   + stopword.dic文件已经存在了，就在同级目录下（如果没有就自己创建吧）。

     ```tex
     SB
     啊
     嗯
     呃
     的
     DSB
     HMP
     ```

     

### 索引库新增

1. Mapping主要是进行索引中文档字段的约束，类似于定义数据表结构。

2. Mapping常见属性

   + type（数据字段类型）
     + text（可分词的文本，参与索引倒排）、keyword（精准值）
     + byte、shoot、integer、login、float、double
     + boolean
     + date
     + object
   + index：是否创建索引，默认为true
   + annalyzer：使用哪种分词器（默认是standard）
   + proerties，嵌套字段（该字段的子字段）

3. 练习，中通过Restful请求操作索引库

   ```json
   {
       "code": 200,
       "message": "查询成功",
       "data": {
           "desc": "我们支持订阅啦~",
           "imagePath": "https://www.wanandroid.com/blogimgs/42da12d8-de56-4439-b40c-eab66c227a4b.png",
           "title": "玩Android API",
           "url": "https://www.wanandroid.com/blog/show/3352"
       }
   }
   ```

   ```json
   PUT /article
   {
     "mappings": {
       "properties": {
         "code": {
           "type": "integer"
         },
         "message": {
           "type": "keyword",
           "index": false
         },
         "data": {
           "properties": {
             "desc": {
               "type": "text",
               "analyzer": "ik_smart"
             },
             "title": {
               "type": "text",
               "analyzer": "ik_smart"
             },
             "url": {
               "type": "keyword",
               "index": false
             },
             "imagePath": {
               "type": "keyword",
               "index": false
             }
           }
         }
       }
     }
   }
   ```



### 索引库查询

1. 索引库查询查询语法很简单

   ```shell
   GET /索引库名称
   ```

2. 查询刚刚新建的article索引库

   ```json
   GET /article
   ```

   

### 索引库更新

1. 需要注意，索引库更新不能更新原有字段（更新会报错），只能是新添加字段，更新索引库的语法

   ```json
   PUT /索引库名称/_mapping
   "properties":{
       "新字段名":{
           "type": "数据类型"
       }
   }
   ```

2. 在article索引库中新添加一个时间字段

   ```json
   PUT /article/_mapping
   {
     "properties":{
       "time":{
         "type":"date"
       }
     }
   }
   ```

   

### 索引库删除

1. 删除索引库语法也很简单

   ```json
   DELETE /索引库名称
   ```

   

2. 删除article索引库

   ```json
   DELETE /article
   ```



### 文档新增

1. 语法

   ```json
   PUT /索引库名称/_doc/文档Id(文档ID不指定则默认生成)
   {
       "字段名":"字段值",
       "字段名":"字段值"
   }
   ```

   

2. 练习

   ```json
   PUT /article/_doc/1
   {
       "code": 200,
       "message": "查询成功",
       "data": {
           "desc": "我们支持订阅啦~",
           "imagePath": "https://www.wanandroid.com/blogimgs/42da12d8-de56-4439-b40c-eab66c227a4b.png",
           "title": "玩Android API",
           "url": "https://www.wanandroid.com/blog/show/3352"
       }
   }
   ```

   

### 文档查询

1. 语法

   ```json
   GET /索引库名称/_doc/文档Id
   ```

   

2. 练习

   ```json
   GET /article/_doc/1
   ```

   

### 文档删除

1. 语法

   ```json
   DELETE /索引库名称/_doc/文档Id
   ```

   

2. 练习

   ```json
   DELETE /article/_doc/1
   ```

   

### 文档更新

1. 更新语法有两种

   + 覆盖更新，使用PUT方式（ID存在就先删除之前存在的文档，再将当前文档新增进去，ID不存在就新增）。

     ```json
     PUT /索引库名称/_doc/文档Id
     {
         "字段名":"字段值",
         "字段名":"字段值"
     }
     ```

     

   + 局部更新使用POST方式（只更新部分字段）

     ```json
     POST /索引库名称/_update/文档Id
     {
         "doc":{
             "字段名":"字段值",
             "字段名":"字段值"
         }
     }
     ```

     

2. 练习

   + 覆盖更新

     ```json
     PUT /article/_doc/1
     {
         "code": -200,
         "message": "查询失败",
         "data": {
             "desc": "~",
             "imagePath": "",
             "title": "",
             "url": ""
         }
     }
     ```

     

   + 局部更新

     ```json
     POST /article/_update/1
     {
         "doc": {
             "code": 500,
             "data":{
                 "title":"Android 项目教程~~"
             }
         }
     }
     ```

     

## RestClient 

### RestClient 简介

1. ES官方提供了各种不同语言的客户端来操作ES，这些客户端本质就是组装DSL语句，通过HTTP请求发送给ES，官方文档地址：https://www.elastic.co/guide/en/elasticsearch/client/index.html

   ![image-20230413175237265](../../.vuepress/public/image-20230413175237265.png)



### 编写创建索引库DSL

1. 分析以下SQL语句

   ```sql
   DROP TABLE IF EXISTS `tb_hotel`;
   CREATE TABLE `tb_hotel`  (
       `id` bigint(20) NOT NULL COMMENT '酒店id',
       `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店名称',
       `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店地址',
       `price` int(10) NOT NULL COMMENT '酒店价格',
       `score` int(2) NOT NULL COMMENT '酒店评分',
       `brand` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店品牌',
       `city` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所在城市',
       `star_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '酒店星级，1星到5星，1钻到5钻',
       `business` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商圈',
       `latitude` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '纬度',
       `longitude` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '经度',
       `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '酒店图片',
       PRIMARY KEY (`id`) USING BTREE
   ) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;
   ```

   

2. 根据SQL语句创建索引库

   + ES中支持两种地理坐标数据类型：

     + geo_point：由纬度（latitude）和经度（longitude）确定的一个点。例如："32.8752345, 120.2981576"
     + geo_shape：有多个geo_point组成的复杂几何图形。例如一条直线，"LINESTRING (-77.03653 38.897676, -77.009051 38.889939)"
     + 字段拷贝可以使用copy_to属性将当前字段拷贝到指定字段。

     ```json
     PUT /hotel
     {
         "mappings": {
             "properties": {
                 "all": {
                     "type": "text",
                     "analyzer": "ik_smart"
                 },
                 "id": {
                     "type": "keyword"
                 },
                 "name": {
                     "type": "text",
                     "analyzer": "ik_smart",
                     "copy_to": "all"
                 },
                 "address": {
                     "type": "text",
                     "analyzer": "ik_smart"
                 },
                 "price": {
                     "type": "float"
                 },
                 "score": {
                     "type": "float"
                 },
                 "brand": {
                     "type": "keyword"
                 },
                 "city": {
                     "type": "keyword",
                     "index": false
                 },
                 "star_name": {
                     "type": "keyword"
                 },
                 "business": {
                     "type": "text",
                     "analyzer": "ik_smart",
                     "copy_to": "all"
                 },
                 "location": {
                     "type": "geo_point"
                 },
                 "pic": {
                     "type": "keyword",
                     "index": false
                 }
             }
         }
     }
     ```

     



### 初始化RestHighLevelClient

1. 引入依赖

   ```xml
   <dependency>
       <groupId>org.elasticsearch.client</groupId>
       <artifactId>elasticsearch-rest-high-level-client</artifactId>
   </dependency>
   ```

   

2. 因为SpringBoot默认elasticsearch版本是7.6.2，而服务端的elasticsearch版本是7.12.1，需要保持两边同步，这里对SpringBoot中定义的版本做覆盖。

   ```xml
   <properties>
       <elasticsearch.version>7.12.1</elasticsearch.version>
   </properties>
   ```

   

3. 初始化RestHighLevelClient

   ```java
   @SpringBootTest
   class HotelDemoApplicationTests {
   
       private RestHighLevelClient client;
   
       @BeforeEach
       public void beforeEach() {
           // 初始化
           client = new RestHighLevelClient(RestClient.builder(HttpHost.create("http://192.168.186.129:9200")));
       }
   
       @AfterEach
       public void afterEach() throws IOException {
           // 释放资源
           client.close();
       }
   }
   ```



### RestClient 创建索引库

```java
@Test
void testCreateIndex() throws IOException {
    // 创建请求对象
    CreateIndexRequest request = new CreateIndexRequest("hotel");

    // HotelConstants.HOTEL_MAPPING 就是DSL字符串, 类型是JSON
    request.source(HotelConstants.HOTEL_MAPPING, XContentType.JSON);

    // 发送DSL语句
    client.indices().create(request, RequestOptions.DEFAULT);
}
```



### RestClient 删除索引库

```java
@Test
void testDeleteIndex() throws IOException {
    DeleteIndexRequest request = new DeleteIndexRequest("hotel");
    client.indices().delete(request, RequestOptions.DEFAULT);
}
```



### RestClient 判断索引库是否存在

```java
@Test
void testIndexExists() throws IOException {
    GetIndexRequest request = new GetIndexRequest("hotel");
    boolean exists = client.indices().exists(request, RequestOptions.DEFAULT);
    System.out.println(exists ? "hotel 索引库存在！" : "hotel 索引库不存在！");
}
```



### RestClient 新增文档

1. 将数据从数据库中查询出来，再添加到es中

   ```java
   @Test
   void testAddDocument() throws IOException {
       // 从数据库中查询出来的数据
       Hotel hotel = service.getById(47066L);
       // HotelDoc 保证和ES中Index数据结构一致
       HotelDoc hotelDoc = new HotelDoc(hotel);
   
       // 创建Request对象
       IndexRequest indexRequest = new IndexRequest("hotel").id(String.valueOf(hotelDoc.getId()));
       // 添加数据源(JSON字符串)
       indexRequest.source(JSON.toJSONString(hotelDoc), XContentType.JSON);
       // 发送请求
       client.index(indexRequest, RequestOptions.DEFAULT);
   }
   ```

2. 可以在kibnana的Dev-Tool中执行文档查询请求，查看是否添加成功。

   ```tex
   GET /hotel/_doc/47066
   ```



### RestClient 查询文档

```java
@Test
void testSelectDocument() throws IOException {
    GetRequest request = new GetRequest("hotel", "47066");
    GetResponse response = client.get(request, RequestOptions.DEFAULT);

    // 通过FastJson将字符串转成JavaBean
    HotelDoc hotelDoc = JSON.parseObject(response.getSourceAsString(), HotelDoc.class);
    System.out.println("hotelDoc = " + hotelDoc);
}
```

### RestClient 更新文档

+ 局部更新

  ```java
  @Test
  void testUpdateDocumentWithLocal() throws IOException {
      // 创建request对象
      UpdateRequest request = new UpdateRequest("hotel", "47066");
  
      // 更新的字段信息(局部更新)
      HashMap<String, Object> data = new HashMap<String, Object>() {{
          put("price", 999);
          put("starName", "五钻");
          put("score", 86);
      }};
      request.doc(data);
  
      // 发送请求
      client.update(request, RequestOptions.DEFAULT);
  }
  ```

+ 全部更新（和新增代码一样，ID已经存在就会覆盖，不存在就新增）。

  ```java
  @Test
  void testUpdateDocumentWithGlobal() throws IOException {
      // 从数据库中查询出来的数据、并做更新
      Hotel hotel = service.getById(47066L);
      HotelDoc hotelDoc = new HotelDoc(hotel);
      hotelDoc.setStarName("二钻,");
      hotelDoc.setScore(42);
      hotelDoc.setPrice(159);
  
      // 创建request对象
      IndexRequest request = new IndexRequest("hotel").id(String.valueOf(47066));
      request.source(JSON.toJSONString(hotelDoc), XContentType.JSON);
      // 发送请求
      client.index(request, RequestOptions.DEFAULT);
  }
  ```

### RestClient  删除文档

```java
@Test
void testDeleteDocument() throws IOException {
    DeleteRequest request = new DeleteRequest("hotel", "47066");
    client.delete(request, RequestOptions.DEFAULT);
}
```



### RestClient  批量导入文档

