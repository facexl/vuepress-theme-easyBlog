---
title: 一些有趣的题目
date: 2018/08/23
category: practice
---

### 一些有趣的题目

#### Q1. 请说出以下代码的执行顺序

```javascript
new Promise(res=>{
    res(1)
    Promise.resolve().then(()=>console.log(2))
    console.log(4)
}).then(console.log)
console.log(3)
```

?> 要弄懂这道题首先必须明白`Promise.then回调`是异步执行。js引擎遇到第一个`.then`，由于是异步的，把事件推进队列，即`console.log(2)`，遇到`console.log(4)`同步代码立即执行，输出4，遇到第二个`.then`推进队列,即`console.log(1)`,遇到`console.log(3)`同步代码立即执行。同步代码执行完毕，队列里的事件`先进先出`,所以答案是`4321`。[关于`Promise.then回调`为何是异步执行请戳](https://www.zhihu.com/question/57071244)

#### Q2. 浏览器环境执行下面的代码会输出什么(谷歌面试题)

```javascript

const a = { a:1,b(){ console.log(this.a) } };
( a && a.b )()  

```

?> 逻辑运算符返回的是指定操作数的`值`，`this`发生改变指向`window`,由于`const`是块级作用域，变量`a`不会挂载到`window`上，所以输出`undefined`如果改为`var`定义`a`，那么会输出`a`这个对象

#### Q3. 执行下面的代码输出什么（考hosting机制的题基本可以立碑了，不过还是留个纪念)

```javascript

fn()

var fn

function fn(){
    console.log(1)
}

fn = function fn(){
    console.log(2)
}

fn()

```

> 输出1，2