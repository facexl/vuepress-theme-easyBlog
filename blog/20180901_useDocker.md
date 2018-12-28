---
title: docker
date: 2018/09/01
category: study
---

## docker

### 1.docker是什么

要了解docker首先要知道Linux的一种虚拟化技术：`Linux 容器（Linux Containers，缩写为 LXC）`。,Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。或者说，在正常进程的外面套了一个保护层。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。
`docker属于 Linux 容器的一种封装，提供简单易用的容器使用接口`

### 2.image

`image`就是`Docker`的容器模板，只有通过`image`才能生产`docker`容器。

```bash

docker image ls //列出本机所有image文件

docker image rm [imageName] //删除image

```

### 3.docker run 🌰

```javascript

docker pull nginx

docker run -p 8080:80 -d nginx // -p端口映射，让docker容器的80端口映射到本地8080端口，-d是允许程序直接返回(即把这个container作为守护进程执行)  访问locahost:8080可以看到nginx的首页

docker ps //可以看到正在运行的container
docker ps -a //可以看到所有的container（包括已关闭）

//事先编写一个index.html

//docker cp用与在Host和contaier之间拷贝文件
docker cp index.html 790d34f7885f(容器id)://usr/share/nginx/html //再次访问locahost:8080可以看到index.html已经修改(cp=拷贝)

docker stop 790d34f7885f(容器id) //停止该container的运行

//这个时候再次

docker run -p 8080:80 -d nginx //会发现还是Nginx的首页，因为docker在容器内做的改动都是暂时的 要想保存原来的index.html 可以如下操作

docker cp index.html  198f43ae56bf://usr/share/nginx/html  
docker commit -m "test" 198f43ae56bf nginx-test //事实上会产生一个新的叫做nginx-test的imgae

//下次
docker run -p 8080:80 -d nginx-test //即可以访问编写的Index.html

//删除Image
docker rmi [ImageId]

//删除container
docker rm [ContainerId]

```

### 4.Dockerfile文件

先编写`.dockerignore`忽略一些不需要打包进`image`的文件

```bash

.git
node_modules
npm-debug.log

```

新建文件`Dockerfile`,编写

```bash

FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000

```
- FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。
- COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
- WORKDIR /app：指定接下来的工作路径为/app。
- RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。



