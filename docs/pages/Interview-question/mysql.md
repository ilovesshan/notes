# MySQL

### 谈谈三大范式？

1. 三大范式是 Mysql 数据库设计表结构所遵循的规范和指导方法，目的是为了减少冗余，建立结构合理的数据库，从而提高数据存储和使用的性能。
2. 三大范式之间是具有依赖关系的，比如第二范式是在第一范式的基础上建设的、第三范式是在第二范式的基础上建设的。
3. 三大范式
   + 第一范式：**表中字段的数据，不可以再拆分**。
   + 第二范式：在满足第一范式的情况下，遵循唯一性，消除部分依赖。即，**表中任意一个主键或任意一组联合主键，可以确定除该主键外的所有的非主键值。**再说通俗点讲就是，**一个表只能描述一件事情**。
   + 在满足第二范式的情况下，消除传递依赖。即，**在任一主键都可以确定所有非主键字段值的情况下，不能存在某非主键字段 A 可以获取 某非主键字段 B**。
4. 参考地址：https://zhuanlan.zhihu.com/p/590135927



### 常见搜素引擎以及区别？

1. InnoDB
   + 支持事务
   + 使用的锁力度默认为行级别，可以支持更高的的并发，同时也支持表锁。
   + 支持外键约束，外键约束其实降低了表的查询速度，增加了表之间的耦合。
2. MyISAM
   + 不支持事务。
   + 只支持表锁。
   + 不支持外键。
3. Memory
   + 数据存储在内存中。
4. 区别
   + InnoDB：用于事务处理，具有ACID事务支持的特性。如果在应用中大量执行Insert或者Update操作应该选择InnoDB作为存储引擎。
   + MyISAM：管理非事务表，提高高速存储以及全文搜索能力，如果在应用中大量执行Select操作应该选择MyISAM作为存储引擎。

### 如何设计一张树形菜单表？

1. 可以通过建立一个parentId字段来进行节点的层级关联。

   ![image-20230423223017899](../../.vuepress/public/image-20230423223017899.png)



### 如何查询树形菜单表？

1. 通过自链接查询（适用于固定层级）

   ```sql
   select
          one.id            one_id,
          one.name          one_name,
          one.parentid      one_parentid,
          one.orderby       one_orderby,
          one.label         one_label,
          two.id            two_id,
          two.name          two_name,
          two.parentid      two_parentid,
          two.orderby       two_orderby,
          two.label         two_label
      from course_category one
               inner join course_category two on one.id = two.parentid
      where one.parentid = 1
        and one.is_show = 1
        and two.is_show = 1
      order by one.orderby,
               two.orderby
   ```

   

2. 通过递归查询（需要MySQL8.x支持，适用于非固定层级）

   ```sql
   with recursive t1 as (
       select * from  course_category p where  id= '1'
       union all
       select t.* from course_category t inner join t1 on t1.id = t.parentid
   )
   select *  from t1 order by t1.id, t1.orderby
   ```

   
