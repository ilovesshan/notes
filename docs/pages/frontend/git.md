# Git

## Gti常用命令

### Git 创建仓库

1. **git init**：初始化一个git仓库
2. **git clone**：clone一个git仓库

### Git 基本指令

1. **git config**：配置信息

   ```shell
   git config --global user.name '你的用户名'
   git config --global user.email '你的邮箱'
   ```

   

2. **git add**：添加文件到缓存命令

3. **git status**：查看文件的状态命令

4. **git diff**：查看更新的详细信息命令

   + 尚未缓存的改动：**git diff**
   + 查看已缓存的改动： **git diff --cached**
   + 查看已缓存的与未缓存的所有改动：**git diff HEAD**
   + 显示摘要而非整个 diff：**git diff --stat**

5. **git commit**：提交命令

   ```shell
   git commit -m "第一次版本提交"
   ```

   ```shell
   # 如果你觉得 每次 commit之前要add一下，想跳过add这一步，可以直接使用 -a选项
   git commit -am "第一次版本提交"
   ```

   

6. **git reset HEAD**：取消缓存命令

7. **git rm**：删除命令

   

### Git的分支管理

1. **git branch**：查看分支命令

   ```shell
   git branch
   ```

   

2. **git branch (branchname)**：创建分支命令

   ```shell
   git checkout branchname
   ```

   

3. **git checkout (branchname)**：切换分支命令

   ```shell
   git checkout branchname
   ```

   

4. **git merge**：合并分支命令

   ```shell
   # dev分支合并到mater分支 先切换到mater分支再merge dev分支
   git merge branchname
   ```

   

5. **git branch -d (branchname)**：删除分支命令

   ```shell
   git branch -d branchname
   ```

### Git查看提交历史

1. **git log**：查看提交历史
   + –oneline ：查看历史记录的简洁版本
   + –graph ：查看历史中什么时候出现了分支、合并
   + –reverse ：逆向显示所有日志
   + –author ：查找指定用户的提交日志
   + –since、–before、 --until、–after： 指定帅选日期
   + –no-merges ：选项以隐藏合并提交

### Git 标签

1.  **git tag -a vx.x**：创建一个标签

   ```shell
   git tag -a v1.0
   ```

   

2. **git tag**： 查看标签

   ```shell
   git tag
   ```

   

3. 指定标签信息命令

   ```shell
   git tag -a <tagname> -m "某某标签"
   ```

   

4. PGP签名标签命令

   ```shell
   git tag -s <tagname> -m "某某标签"
   ```

### Git 远程仓库

1. **git remote add**：添加远程仓库

   ```shell
   # git remote add [alias] [url]
   git remote add origin https://github.com/ilovesshan/xczx.git
   ```

   

2. **git remote**：查看当前的远程仓库

   ```shell
   # 查看分支别名
   git remote 
   
   # 查看分支地址
   git remote -v
   ```

   

3. **git fetch**、**git pull**：提取远程仓库

   + git pull：相当于是从远程获取最新版本并merge到本地。
   + git fetch：相当于是从远程获取最新版本到本地，不会自动合并。

4. **git push**：推送到远程仓库

   ```shell
   # git remote rm [别名] [分支名称]
   git push origin mater
   ```

   

5. **git remote rm**：删除远程仓库

   ```shell
   # git remote rm [别名]
   git remote rm origin
   ```

