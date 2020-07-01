---
title: Koa2源码分析
category: study
---

## Koa2源码分析

`koa`是一个小而美的框架，主类继承了 nodejs 的 events 类，核心源码只有几百行。本文将分为`context`、`middleware`、
`request&response`、`application`介绍koa。

### constructor

koa 在 constructor 做了这几件事情:
- 1.初始化入参  
- 2.初始化 middleware 中间件数组  
- 2.初始化了一个`context`，还对context用`node-delegates`设置内部request、responese的委托访问  
- 3.初始化内部request、response对象  

### 执行流程

实例化一个 koa 类后，使用`use`方法注册中间件，它会把传入的函数`push`到`middleware`数组中，然后调用`listen`方法。listen 会执行node自带http
模块：
```js {6}

listen(...args){
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
// 创建服务时，执行 this.callback 合并中间件，然后返回一个处理原生request、response的函数
callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
```

### 中间件原理  

合并中间件使用的`koa-compose`包，它的源码很短:

```js

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

```
可以看到 compose 返回了一个`递归`执行 middleware 数组里的函数的函数。并且创建了一个闭包保存每个执行到的中间件索引。
由于这个函数调用时没有传入 next (
    第一次调用是在:
```js
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
```
)
所以当索引到最后一个中间件时，执行`if (i === middleware.length) fn = next`会因为`if (!fn) return Promise.resolve()`直接 return 掉。  
每一个 `dispatch` 都返回一个 promise 。所以每次 `await next()`，控制权都会交给下一个中间件

现在再来看官网这句描述:  
`当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。`  
是不是变得很好理解了呢。  

### respond

中间件执行完毕后，来到
```js
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
```
这里的`handleResponse`没有接受参数，所以在第一个中间件 return 些什么是没有用的。这时控制权交给`respond`。respond 是一个全局的工具类函数，进行一些
http状态的处理之后控制权交给原生的res.end方法

### 最后

koa2 中间件的设计，非常方便其他开发人员丰富框架的生态。
源码还有很多http相关的细节处理不作为本文的重点。