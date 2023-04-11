# Dcoker

## 容器技术

### 容器技术的起源

1. 程序员开发代码时需要从零搭建一套开发环境，开发完成转交测试时，测试人员又需要从零搭建一套测试环境，测试完成之后达到了上线的标准，这时会将程序交给运维人员，那么运维人员又需要从零搭建一套运行环境，我靠？？这么麻烦光是搭建环境就要搭建三次？？
2. 解决这种办法也有，那就是开发人员在虚拟机上搭建一套环境，然后再将虚拟机COPY给测试和运维，貌似这也是一个解决办法（在没有容器技术之前）！但是这种方式确实没有那么好~~

### 容器技术 vs 虚拟机

1. 虚拟机

   + 虚拟机（virtual machine）是在操作系统中模拟硬件设备，然后运行另一个操作系统，比如在 Windows 系统里面运行 Ubuntu 系统，这样就可以运行任意的Ubuntu应用了。

2. 容器技术

   + 容器一词的英文是container，其实container还有集装箱的意思。
   + 现代软件开发的一大目的就是隔离，应用程序在运行时相互独立互不干扰，这种隔离实现起来是很不容易的，其中一种解决方案就是上面提到的虚拟机技术，通过将应用程序部署在不同的虚拟机中从而实现隔离。

3. 容器技术（容器是一种通用技术，Dcoker只是其中的一种实现，下面介绍Dcoker）和虚拟机的差异：

   + 容器技术（Dcoker）是一个系统进程
   + 虚拟机是在操作系统中的操作系统
   + Dcoker体积小、启动速度快、性能好
   + 虚拟机体积大、启动速度慢、性能一般

   ![image-20230411102555096](../../.vuepress/public/image-20230411102555096.png)



##  初识 Dcoker 

### Dcoker 简介

1. 容器是一种通用技术，Dcoker只是其中的一种实现。

2. Dcoker是一个用Go语言实现的开源项目，可以让我们方便的创建和使用容器，Dcoker将程序以及程序所有的依赖都打包到Dcoker container，这样你的程序可以在任何环境都会有一致的表现，Dcoker可以屏蔽环境差异，也就是说，只要你的程序打包到了Dcoker中，那么无论运行在什么环境下程序的行为都是一致的。

3. Dcoker的另一个好处就是快速部署，这是当前互联网公司最常见的一个应用场景，一个原因在于容器启动速度非常快，另一个原因在于只要确保一个容器中的程序正确运行，那么你就能确信无论在生产环境部署多少都能正确运行。

4. Dcoker特点总结

   + 可以将程序及其依赖、运行环境一起打包为一个镜像，可以迁移到任意Linux操作系统。
   + 运行时利用沙箱机制形成隔离容器，各个应用互不干扰。
   + 启动、移除都可以通过一行命令完成，方便快捷。

   

### Dcoker 镜像和容器

1. Dcoker将应用程序及其所需的依赖、函数库、环境、配置等文件打包在一起，称为镜像。

2. 镜像中的应用程序运行后形成的进程就是容器，只是Dcoker会给容器做隔离，对外不可见。

   

###  DcokerHub

1. DcokerHub：DcokerHub是一个Dcoker镜像的托管平台。这样的平台称为Dcoker Registry。

2. 国内也有类似于DcokerHub 的公开服务，比如 网易云镜像服务、阿里云镜像库等。

   

### Dcoker 架构

1. Dcoker是基于CS架构模式，分成服务端(server)和客户端(client)。
2. 服务端(server)：Dcoker守护进程，负责处理Dcoker指令，管理镜像、容器等。
3. 客户端(client)：通过命令或RestAPI向Dcoker服务端发送指令。可以在本地或远程向服务端发送指令。



## Docker 简单操作

1. Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE 即企业版，强调安全，付费使用，支持周期 24 个月。
2. Docker CE 分为 `stable` `test` 和 `nightly` 三个更新频道。官方网站上有各种环境下的 [安装指南](https://docs.docker.com/install/)，这里主要介绍 Docker CE 在 CentOS上的安装。
3. Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，我使用的CentOS 8。

### CentOS安装Docker

1. 卸载（可选）

   + 如果之前安装过旧版本的Docker，可以使用下面命令卸载：

     ```shell
     yum remove docker \
                       docker-client \
                       docker-client-latest \
                       docker-common \
                       docker-latest \
                       docker-latest-logrotate \
                       docker-logrotate \
                       docker-selinux \
                       docker-engine-selinux \
                       docker-engine \
                       docker-ce
     ```

     

   

2. 安装docker

   + 首先需要虚拟机联网，安装yum工具

     ```shell
     yum install -y yum-utils \
                device-mapper-persistent-data \
                lvm2 --skip-broken
     ```

   + 然后更新本地镜像源

     ```shell
     # 设置docker镜像源
     yum-config-manager \
         --add-repo \
         https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
         
     sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
     
     yum makecache fast
     ```

   + 然后输入命令，docker-ce为社区免费版本。稍等片刻，docker即可安装成功。

     ```shell
     yum install -y docker-ce
     ```

   

3. 启动docker

   + Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！

     启动docker前，一定要关闭防火墙后！！

     启动docker前，一定要关闭防火墙后！！

     启动docker前，一定要关闭防火墙后！！

     ```shell
     # 关闭
     systemctl stop firewalld
     # 禁止开机启动防火墙
     systemctl disable firewalld
     ```

   + 通过命令启动docker

     ```shell
     systemctl start docker  # 启动docker服务
     
     systemctl stop docker  # 停止docker服务
     
     systemctl restart docker  # 重启docker服务
     ```

   + 然后输入命令，查看docker是否启动成功（两种方式）

     + 查看docker版本

       ```shell
       docker -v
       ```

       

     + 查看docker状态

       ```shell
       systemctl status docker
       ```

       ![image-20230411115449814](../../.vuepress/public/image-20230411115449814.png)

   

4. 配置镜像加速

   + docker官方镜像仓库网速较差，我们需要设置国内镜像服务，参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors。

   + 通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

     ```shell
     sudo mkdir -p /etc/docker
     sudo tee /etc/docker/daemon.json <<-'EOF'
     {
       "registry-mirrors": ["https://jxa7jhwn.mirror.aliyuncs.com"]
     }
     EOF
     sudo systemctl daemon-reload
     sudo systemctl restart docker
     ```

     

### Docker 操作镜像常用命令

1. dockerhub镜像网站：https://hub.docker.com/

2. 关于docker镜像命名问题

   + 镜像名称一般分两部分组成：[repository]:[tag]，在没有指定tag时，默认是latest，代表最新版本的镜像。

     ```java
     [repository]:[tag] ----> mysql:8.0.30
     ```

3. docker命令有很多，了可以通过 `docker --help` 来获取帮助，下面介绍几个常用的命令。

   + docker pull [repository]:[tag]，从dockerhub中拉起镜像

     ```shell
     # 从dockerhub中 拉取nginx镜像(未指定tag时，默认是latest)
     docker pull nginx
     ```

   + docker push：将本地镜像推到远程仓库

   +  docker images：查看本地镜像列表

     ![image-20230411121606257](../../.vuepress/public/image-20230411121606257.png)

     

   + docker save： Save one or more images to a tar archive (streamed to STDOUT by default)（将镜像导出成一个tar文件）

     ```shell
     docker save -o ./nginx.tar nginx:latest
     ```

     

   + docker load：Load an image from a tar archive or STDIN（将tar文件加载成镜像文件）

     ```shell
      docker load -i ./nginx.tar -q
     ```

     

   + docker rmi：Remove one or more images（删除镜像）

     ```shell
     docker rmi nginx:latest
     ```

     

### 拉取redis镜像练习

1. 从dockerhub中拉取redis镜像

   ```shell
   docker pull redis
   ```

   

2. 查看redis镜像名称和版本信息

   ```shell
   docker images
   ```

   ```shell
   redis        latest    7614ae9453d1   15 months ago   113MB
   ```

   

3. 将redis镜像打包成一个redis.tar文件

   ```shell
   docker save -o ./redis.tar redis
   ```

   

4. 删除本地redis镜像文件

   ```shell
   docker rmi redis
   ```

   

5. 将redis.tar文件加载到本地镜像列表中

   ```shell
   docker load -i ./redis.tar 
   ```

   

### Docker 操作容器常用命令

1. docker run： 启动容器
2. docker pause：容器从`运行状态`切换到`暂停状态`
3. docker unpause：容器从`暂停状态`恢复到`运行状态`
4. docker stop：容器从`运行状态`切换到到`停止状态`（进程被干掉）
5. docker start：将容器状态切换为`运行状态`（容器被stop情况下）
6. docker rm：删除指定容器
7. docker ps：查看所有运行的容器和状态
8. docker logs：查看指定容器运行日志
9. docker exec：进入容器内部执行命令

### 创建运行Nginx容器练习

1. 可以参考dockerhub中关于操作nginx容器的命令：https://hub.docker.com/_/nginx

   ```shell
   docker run --name nginxContainer -p 80:80 -d nginx
   ```

   + docker run：创建容器
   + --name ：容器名称
   + -p 8080:80， 端口映射（左边是宿主机端口，右边是容器端口）
   + -d：后台运行
   + nginx：镜像名称

2. 查看nginx运行日志

   + -f 持续查看日志

   ```shell
   docker logs nginxContainer -f
   ```

3. 停止容器

   ```shell
    docker stop nginxContainer
   ```

   

