---
title: 基于docsify搭建博客
date: 2018/07/25
category: chat
---

### canvas实现双重广告效果    //标题
```

##### 可能出现的错误

```bash

throw er; // Unhandled 'error' event
Error: listen EADDRINUSE :::35729

```
这是因为端口被占用了，解决方式：
```bash

//win:

netstat -aon | findstr 35729
taskkill /f -pid 上面进程id

//mac:

lsof -i TCP:35729
kill -9  上面的pid

```

