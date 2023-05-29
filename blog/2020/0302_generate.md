---
title: Generator
category: study
---

## Generator

#### 首先写一个简单的 Generator Function

```javascript
    function* A(){
        yield 'hello'
        yield 'world'
        return 'end'
    }
    const a = A()
```

#### 检查它的类型
```javascript
    Object.prototype.toString.call(A) // "[object GeneratorFunction]"

    Object.prototype.toString.call(a) //"[object Generator]"

```

#### 原型
```javascript
// 它的构造函数的原型
A.__proto__ // GeneratorFunction{}  
// 普通函数的__proto__是 Function.prototype

A.prototype // Generator {}

// 而普通函数的 prototype 是一个具有 constructor 属性且值就是该函数的对象
// 这是为什么 new A() 会报错

a.__proto__ //  Generator {} 这就好像 a 是 A 的实例，我姑且理解为，Generator Function 执行，就会得到它的"实例"

```

#### 原型上的方法

```javascript
A.prototype // next、return、throw
```

#### 调用原型上的方法

```javascript
// a 直接打印 {<suspended>} (暂停状态)
a.next() // {value: "hello",done: false}
a.throw('123') // error:Uncaught 123
a.next() // {value: undefined,done: true} // 由于执行throw
// 此时 a 直接打印 {<closed>} (关闭状态)

a.return() // {value: undefined,done: true} 同样会让函数处于"关闭"状态
```

#### babel 会把 Generator Function 转换成什么

##### before babel 

```javascript
function* A(){
    yield 'hello'
    yield 'world'
    return 'end'
}
```
##### after babel 
```javascript
// after babel
"use strict";
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(A);

function A() {
  return regeneratorRuntime.wrap(function A$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return 'world';

        case 4:
          return _context.abrupt("return", 'end');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

#### regeneratorRuntime 是什么

源码地址 `https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js`(竟然出自facebook!)
总共 729 行，不算多，我把它拷下来看看。

#### regeneratorRuntime 源码分析

这是我 fork 的版本:`https://github.com/facexl/regenerator/blob/master/runtime.js`.

```javascript

// 我们看到 babel 后，首先是把 A 传进 mark 方法

var _marked = regeneratorRuntime.mark(A);

// mark 源码:
exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
    Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
    genFun.__proto__ = GeneratorFunctionPrototype;
    if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
    }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
};

```
- 上面的操作怎么理解呢？  
##### 背景知识
我们知道，在 `js` 中，函数也是对象，对象是"名/值"对的集合，并拥有一个连到原型对象的`隐藏连接`(部分浏览器实现为`__proto__`)。对象字面量产生的对象连接到 `Object.prototype`。函数对象连接到 `Function.prototype`。但是函数在创建的时候还会配一个`prototype`属性，它的值是一个拥有`constructor`属性且值就是该函数的对象。这和隐藏链接到`Function.prototype`完全不同。这是因为函数可以被 `new` 调用，而调用结果就是得到一个`__proto__`指向函数的`prototype` 的对象。
##### 理解mark

首先把`genFun`(传进来的函数)的构造函数的原型设置为`GeneratorFunctionPrototype`，
然后把`genFun`的`prototype`属性设置为`Object.create(Gp);`

##### 理解 regeneratorRuntime.wrap

```javascript
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
```

wrap 会返回一个对象，核心是 `makeInvokeMethod` 做了什么

::: danger
源码看吐了有点绕 战术性放弃 改日再战 先停留在使用阶段吧
:::

