---
title: koa2搭建后端服务记录
category: practice
---

## koa2搭建后端服务记录

### 基本  

- 开发阶段使用`nodemon`修改文件自动重启
- 线上环境使用`pm2`，pm2 类似 nodemon，不同之处是当系统奔溃 pm2 会重启 app。当 app 需要多核处理时，pm2 内部集成负载均衡可以指定运行多少实例(pm2 start app.js -i max)

### 目录  

### 路由  

### 登录校验  

### 数据解析  