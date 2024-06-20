---
title: 使用 jenkins 搭建CI/CD
category: study  
---  

## 使用 jenkins 搭建CI/CD


### 首先用 docker 安装jenkins  

进入 /etc/docker 目录下，修改 daemon.json 文件，添加如下内容，主要包括一些镜像源：

```json
{
  "registry-mirrors": [
	    "https://cf-workers-docker-io-d5y.pages.dev",
      "https://kfwkfulq.mirror.aliyuncs.com",
      "https://2lqq34jg.mirror.aliyuncs.com",
      "https://pee6w651.mirror.aliyuncs.com",
      "https://registry.docker-cn.com",
      "http://hub-mirror.c.163.com",
      "https://do11tfdm.mirror.aliyuncs.com"
],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
    }
}
修改此文件需要重启docker服务
systemctl start docker

```

### 编写docker file

```sh

cd /opt 

mkdir docker

cd docker && mkdir jenkins && cd jenkins  

编写 jenkins.yml:

version: "3.4"
services:
  jenkins:
    hostname: jenkins
    image: jenkins/jenkins:2.387.3
    network_mode: "bridge"
    ports:
      - 8080:8080
      - 50000:50000
    restart: always
    privileged: true
    container_name: jenkins
    volumes:
      - ./jenkins_home:/var/jenkins_home

```

### 构建docker镜像  

```sh

docker compose -f jenkins.yml up -d // up启动-d后台启动

docker ps // 查看镜像  

docker start b102124d029a(CONTAINER ID)  启动jenkins  

可能失败 没有目录权限 jenkins_home 

chomd -R 777 jenkins_home

```


### 打通gitee

- 安装 gitee 插件

- 安装 Generic Webhook Trigger 插件  

- gitee 填写 api?token=(Generic Webhook Trigger在用户管理-用户-设置里面生成的token)
- webhook 密码 填写jenkins创建项目那里的密码  



### docker 容器内部 sh 操作其他服务器   

webhook触发后我们执行sh会发现此时在docker容器内部 需要登录到其他服务器进行操作  

```sh

# 以下注释由AI生成

# (如果没有rsa密钥 可以 ssh-keygen生成一下)

cp id_rsa /opt/docker/jenkins/jenkins_home/  # 将id_rsa私钥文件复制到Docker容器挂载的Jenkins主目录下

cat authorized_keys # 查看当前的authorized_keys文件内容，里面存储了允许通过SSH公钥认证登录的公钥。

cat id_rsa.pub >> authorized_keys # 将公钥文件id_rsa.pub的内容追加到authorized_keys文件中，以便允许使用该公钥进行SSH认证

cd /opt/docker/jenkins/jenkins_home/ # 切换到Jenkins主目录，假设这是Jenkins在Docker容器中的数据卷挂载点

ls # 列出当前目录下的文件和目录，以检查内容是否如预期

docker ps -a # 列出所有Docker容器，包括正在运行的和已经停止的。

docker exec -it b102124d029a bash # 进入指定ID为b102124d029a的Docker容器内部，并启动一个交互式bash shell

cd /var/jenkins_home/ # 在Docker容器内切换到Jenkins的实际主目录

ls # 看下有没有 rsa 


- 配置SSH公钥认证，以便让Jenkins实例能够通过SSH无密码访问其它系统或服务。
- 验证并管理Jenkins在Docker容器内的数据

```

### jenkins 执行脚本举例

```sh

ssh -i /var/jenkins_home/id_rsa root@(宿主机器内网IP或者其他服务器的公网IP) "git or build 指令"

# 这时候可能发现会失败 原因是没有权限访问 /var/jenkins_home/id_rsa

# 宿主机执行下

chmod 777 /opt/docker/jenkins/jenkins_home/id_rsa

```









