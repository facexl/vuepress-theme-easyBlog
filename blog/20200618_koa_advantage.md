---
title: Koa2源码分析
category: study
---

## Koa2源码分析

`koa`是一个小而美的框架，主类继承了 nodejs 的 events 类，核心源码只有几百行。本文将分为`context`、`middleware`、
`request&response`、`application`介绍koa。

### context  

koa 在 constructor 初始化了一个`context`