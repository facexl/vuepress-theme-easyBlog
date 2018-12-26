---
title: 《深入浅出nodejs》阅读笔记
date: 2018/08/16
category: study
---

## 《深入浅出nodejs》阅读笔记

### 1.优势

- 优秀的异步IO处理能力，适合I/O密集场景
- 保持了js在浏览器中单线程的特点，不用像多线程那样处处在意状态的同步问题，没有死锁存在，也没有上下文交换所带来的性能开销

### 2.缺点

- 无法利用多核CPU
- 错误会引起整个应用的退出，应用的健壮性值得考验
- 大量计算占用CPU导致无法继续调用异步I/O

### 3.模块

### 3.1 模块书写
require()在分析不包含文件拓展名的标志符时，Node会按`.js .json .node`的次序补足扩展名，依次尝试，尝试过程中，需要调用fs模块同步阻塞式判断文件是否存在，小诀窍是`如果是.node或者.json文件，传递给require()时就带上扩展名，能加快一点速度,另一个我诀窍是同步配合缓存，可以大幅度环节node单线程中阻塞式调用的缺陷`

### 3.2 模块编译

每个模块中存在`require exports module __fileName __dirname`这些变量，是因为在编译过程中，Node对获取js文件内容进行了头尾包装。一个正常的js文件会被包装成：
```javascript
(function(require,exports,module,__fileName,__dirname){
    // some code
})
```

?> 执行之后。模块的`exports`属性被返回给了调用方，`exports`属性上的任何方法和属性都可以被外部调用到。此外`exports`对象是通过形参形式传入的，直接赋值形参会改变形参的引用，但并不能改变作用域外的值。如果要达到引入一个类的效果，请赋值给`modeule.exports`对象 

### 3.3 AMD/CMD

`CommonJS`为后端js制定的规范并不完全适合前端的应用场景，于是出现了`AMD`以及玉伯定义的`CMD`规范

#### 3.3.1 AMD

`define(id?,dependencies?,factory)`id和依赖均为可选参数，factory为实际代码。举个🌰：
```javascript
define(['dep1','dep2'],function(dep1,dep2){
    return function(){}
})
```
即`AMD`需要声明模块的时候指定所有依赖

#### 3.3.2 CMD

`define(factory)`，`CMD`支持动态导入依赖，举个🌰：
```javascript

define(function(require,exports,module){
    //随时调用require引用即可
})

```

### 3.4 兼容多种模块规范

为了让一个模块可以运行在前后端，类库开发者需要将类库代码包装在一个闭包内。举个🌰，将`hello()`定义到不同环境：

```javascript

(function(name,definition){
    //检测上下文环境是否为AMD/CMD
    var hasDefine = typeof define === 'function',
    //检测上下文环境是否为Node
    hasExports = typeof module !== 'undefined' && module.exports
    if(hasDefine){
        //AMD/CMD
        define(definetion);
    }else if(hasExports){
        //定义为普通Node模块
        module.exports = definition()
    }else{
        //将模块执行结果挂载在window变量中，在浏览器中this指向window对象
        this[name] = definition()
    }
})('hello',function{
    var  hello = function(){}
    return hello
})

```

### 4. 异步I/O

Node是单线程的，这里的单线程指的是js运行在单线程中罢了，内部完成I/O任务的另有线程池。
`事件循环`、`观察者`、`请求对象`、`I/O线程池`四者共同构成了Node异步I/O模型的基本要素。

?>对于计算机内核I/O而言，`异步/同步`和`阻塞/非阻塞`实际上是两回事。操作系统内核对于I/O只有两种方式：`阻塞与非阻塞`。调用阻塞I/O时，应用程序需要等待I/O完成才返回结果。非阻塞I/O调用之后会立即返回。由于完整的I/O没有完成，立即返回的并不是业务层需要的数据，为了获取完成的数据，应用程序需要重复调用I/O来确认是否完成。这种重复判断的技术叫做`轮询`。轮询满足了非阻塞I/O确保获取完整数据的需求，但是对于应用程序而言，他仍然只能算是一种同步，因为应用程序还是要等待I/O完全返回。

对于Node的异步I/O调用而言，js发起异步调用到执行完I/O操作，存在一种中间产物，即`请求对象`。第一阶段就结束了，js线程可以继续执行后续操作，当前的I/O操作在线程池中等待执行，不管它是否阻塞I/O，都不会影响js线程的后续执行。如此就达到了异步的目的。`请求对象`是重要的中间产物，所有状态都保存在这个对象中，包括送入线程池等待执行以及I/O操作完毕后的回调处理。组装好请求对象，送入I/O线程池等待执行，是异步I/O的第一部分，`回调通知`是第二部分。`事件循环`的每次TICK执行，会调用相关系统方法检查线程池中是否有执行完的请求，如果存在，会将请求对象加入到I/O`观察者`队列，然后将其当做事件处理。至此，整个异步I/O流程完全结束。

### 5.非I/O的异步API

即`setTimeout()`、`setInterval()`、`setImmediate()`、`process.nextTick()`。
setTimeout()和setInterval()实现原理与异步I/O类似，只是不需要I/O线程池的参与，调用这两个API创建的定时器会被插入到`定时器观察者`内部的一个`红黑树`中，每次`事件循环(Tick)`执行时，从该红黑树中取出定时器对象，检查是否超时，超时就形成一个事件，他的回调函数立即执行。  
想立即异步执行一个任务可以这样调用：
```javascript
setTimeout(()=>{

},0)
```
但是采用定时器需要动用红黑树，创建定时器对象和迭代等操作，较为浪费性能，`process.nextTick()`操作较为轻量
```javascript
process.nextTick(()=>{
    console.log('立即执行')
})
```
`setImmediate()`与`process.nextTick`功能十分相似，其中`process.nextTick`的优先级更高。原因是事件循环对观察者的检查是有先后顺序的，process.nextTick属于`idle`观察者，setImmediate属于`check`观察者。具体实现上，process.nextTick的回调保存在一个数组中，每轮循环会将数据中的回调函数全部执行，而setImmediate的回调函数保存在链表中，每轮循环只执行链表中的一个回调函数。

>`事件循环`是异步实现的核心，他与浏览器中的执行模型基本保持了一致。

### 6.异步编程解决方案

### 6.1.事件发布/订阅模式
Node自身提供的`events`模块是发布订阅模式的一个简单实现，不存在事件冒泡，也不存在`preventDefault()、stopPropagation()、stopImmediatePropagetion()`等控制事件传递的方法
示例：
```javascript
emitter.on('event1',function(msg){
    console.log(msg)
})
emitter.emit('event1','i am msg')
```
通过emit()发布事件后，消息会立即传递给当前事件的所有侦听器执行，侦听器可以很灵活的添加和删除，使得事件与逻辑之间可以轻松的关联和解耦
### 6.2.promise/deferred模式

