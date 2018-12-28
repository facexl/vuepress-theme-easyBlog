---
title: 学习nginx
date: 2018/09/02
category: study
---

## 学习nginx

[为什么要学习Nginx](https://juejin.im/post/5bacbd395188255c8d0fd4b2?utm_medium=fe&utm_source=weixinqun)

Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。

### 安装

```javascript

brew install nginx

nginx
 
localhost:8080  //能访问则启动成功

pkill -9 nginx //关闭nginx

nginx -s reload // 重启

```

### 修改配置

```javascript

/usr/local/etc/nginx/nginx.conf  //配置目录

```

### 配置日志目录

```javascript 

cd  /usr/local/etc/nginx
mkdir log 

//然后在nginx.conf中配置日志路径

error_log  /usr/local/etc/nginx/logs/error.log;

access_log  /usr/local/etc/nginx/logs/access.log  main;

```

### 路由配置

以下是一个SPA项目重构的配置，新版与老版兼容共存，使用同一个域名访问，nginx根据路径响应不同的SPA应用主页面

当用户访问 http://localhost:8080 时，访问 crm-web/dist 下的 index.html

当用户访问 http://localhost:8080/v2 时，访问 crm-web-v2/dist 下的 index.html

```javascript

listen       8080;
location /v2/static {
  alias  /Users/xxx/work/crm-web-v2/dist/static;
}

location /v2/ {
  alias /Users/xxx/work/crm-web-v2/dist/;
}

location / {
  root   /Users/xxx/work/crm-web/dist;
  index  index.html index.htm;
}

```