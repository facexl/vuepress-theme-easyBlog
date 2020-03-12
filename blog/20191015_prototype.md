---
title: 大白话说 prototype
category: study
---

## 对 prototype 的理解

### 概念

`es2019`语言规范是这么描述的：  

`object that provides shared properties for other objects`
> When a constructor creates an object, that object implicitly references the constructor's prototype property for the purpose of resolving property references. The constructor's prototype property can be referenced by the program expression constructor.prototype, and properties added to an object's prototype are shared, through inheritance, by all objects sharing the prototype. Alternatively, a new object may be created with an explicitly specified prototype by using the Object.create built-in function.  

即一个给其他对象提供共享属性的对象  

所以我们知道，prototype 就是个对象，只不过被赋予了给其他对象共享属性的职责。在 js 中，我认为理解原型先要理解 `function`

### function

函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码，并且，每个函数对象会随配一个 `prototype` 属性。它的值是一个拥有 constructor 属性的对象。  
这里讲 `prototype` :   

所有的函数都直接或隐式由 `Function` 创建，`Function`本身也是函数， `new Funtion()` 或字面量创建函数都会得到一个同时具有`__proto__`和`prototype`属性的函数。

```javascript

function a(){}

a.prototype.constructor === a

a.__proto__ === Function.prototype

typeof Function.prototype  // "function"

Function.prototype.constructor === Function

Function.__proto__ === Function.prototype !!!

Function.prototype.__proto__ === Object.prototype

Array.__proto__ === Function.prototype

Object.__proto__ === null

```

### 对象创建

1. 通过对象字面量创建的对象，它的 constructor 就是内置函数 Object ,所以它有一个隐式引用，指向 Object.prototype

```javascript

const o = {}

o.constructor === Object

o.__proto__ === Object.prototype

// 我们知道 prototype 本身也是对象，那么也应有自己的原型:

Object.prototype.__proto__ === null

```
2. 通过 new constructor 创建:

```javascript

function A(){}

const a = new A()

a.__proto__ === A.prototype

// 我们知道 prototype 本身也是对象，那么也应有自己的原型:

A.prototype.__proto__ === Object.prototype



```