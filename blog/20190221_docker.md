---
title: docker常用命令
category: study
---

## docker常用命令

`docker`是一门强大的虚拟化技术。目前我只能初步使用它，要做到灵活掌握`docker`，还需要持续学习....

### Dockerfile

```bash

FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
CMD ['npm','start']
EXPOSE 3000

```
- FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。
- COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
- WORKDIR /app：指定接下来的工作路径为/app。
- RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- CMD ['npm','start']:执行 npm start
- EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

`.dockerignore`与`gitignore`类似，就不细写了。


### 项目部署

```javascript

docker build . -t [IMAGENAME]:[VERSION] // 进入到 Dockerfile 目录下 对项目按照 Dockerfile 描述的规则打包
docker image ls // 查看打包好的image
docker container run -p [port]:[port] -d -t [IMAGE ID]  // 运行image 其中 -p表示端口映射 比如80:3000 那么就可以通过server ip访问到项目监听的3000端口了 -d 持久化部署 -t 名字 后面还可以直接跟 CMD 命令 比如 npm start 不过cmd一般写在Dockerfile里了
docker container ls // 查看启动的容器们
docker stop [CONTAINER ID] // 停止容器运行
docker rmi [ImageId] //删除Image

```
#### 如果容器没有正常启动

```javascript

docker ps -a  // 查看已经挂掉的容器
docker logs [container id] // 查看启动日志

```

#### 如果容器没有正常运行


```javascript

docker inspect [CONTAINER ID] // 查看运行中的容器配置

```