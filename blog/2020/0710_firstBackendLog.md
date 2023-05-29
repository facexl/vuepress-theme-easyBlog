---
title: 后端攻坚之koa2搭建后端服务记录
category: practice
---

## koa2搭建后端服务记录

### 启动    

- 开发阶段使用`nodemon`修改文件自动重启
- 线上环境使用`pm2`，pm2 类似 nodemon，不同之处是当系统奔溃 pm2 会重启 app。当 app 需要多核处理时，pm2 内部集成负载均衡可以指定运行多少实例(pm2 start app.js -i max)

### 参数接收  

- post 请求使用 `koa-bodyparser`解析参数，post 请求 `ctx.request.body`，get 请求直接 `ctx.request.query`

### 密码存储与验证  

`bcrypt`是单向hash加密算法，不可反向破解生成明文，在 node 中可以这样使用：  

```shell

npm i bcrypt --save

```

```javascript
const bcrypt = require('bcrypt');
//生成salt的迭代次数(默认10次)
const saltRounds = 10;
//随机生成盐值
const salt = bcrypt.genSaltSync(saltRounds);
// 把密码(123456)加密成hash值
const hash = bcrypt.hashSync('123456', salt);
// hash 存入数据库，下次用户登录，用以下方式比较:
bcrypt.compareSync('password', 'passwordHash') // true or false

```

### 登录&鉴权

考虑了 jwt 的验证方式然后放弃了，原因之一是服务端不保存状态会导致无法强行让某个 token 失效  

### 错误处理  

### 数据库交互

`sequelize`

`sequelize-cli`

### 数据解析  

### 业务逻辑层  