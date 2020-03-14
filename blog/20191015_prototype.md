---
title: 理解 prototype
category: study
---

## 对 prototype 的理解

### 概念

[`es2019`语言规范](https://www.ecma-international.org/ecma-262/10.0/)是这么描述的：  

`object that provides shared properties for other objects`
> When a constructor creates an object, that object implicitly references the constructor's prototype property for the purpose of resolving property references. The constructor's prototype property can be referenced by the program expression constructor.prototype, and properties added to an object's prototype are shared, through inheritance, by all objects sharing the prototype. Alternatively, a new object may be created with an explicitly specified prototype by using the Object.create built-in function.  

即一个给其他对象提供共享属性的对象  

所以我们知道，prototype 就是个对象，只不过被赋予了给其他对象共享属性的职责。在 js 中，我认为理解原型先要了解 `function`

### function

函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码，并且，每个函数对象会随配一个 `prototype` 属性。它的值是一个拥有 constructor 属性的对象。    

从这种 javacript 连线图来看，function 在其中扮演了非常重要的角色

![](http://ww1.sinaimg.cn/large/00729zFjgy1gcs9gcvv2jj30yg168ale.jpg)

```javascript

// 验证

function a(){}

a.prototype.constructor === a

a.__proto__ === Function.prototype

typeof Function.prototype  // "function"

Function.__proto__ === Function.prototype !!!

Function.prototype.__proto__ === Object.prototype

Array.__proto__ === Function.prototype

Object.__proto__ === null

```

对象的不同创建方式,会有不同的原型

### 对象创建方式

1. 通过对象字面量创建的对象，它的 constructor 就是内置函数 Object ,所以它有一个隐式引用，指向 Object.prototype

```javascript

const o = {}

o.constructor === Object

o.__proto__ === Object.prototype

// 我们知道 prototype 本身也是对象，它的原型:

Object.prototype.__proto__ === null

```
2. 通过 new constructor 创建:  

得到的对象的原型就是 constructor.prototype

```javascript

function A(){}

const a = new A()

a.__proto__ === A.prototype

A.__proto__ === Function.prototype

// 我们知道 prototype 本身也是对象，它的原型:

A.prototype.__proto__ === Object.prototype

```

3. 通过 Object.create 创建

得到的对象的原型就是参数

```javascript

let a = {}

let b = Object.create(a)

b.__proto__ === a

```

### 访问原型

既然原型是给目标对象提供共享属性的，那么他是怎么访问的呢?  

我们可以写个函数模仿他的行为：

```javascript

function findProp(o,key){
    var current = o
    while(!current.hasOwnProperty(key)){
        if(current.__proto__===null){
            return '没得这些东西'
        }
        current = current.__proto__
    }
    return current[key]   
}

let a = { prop:1 }
let b = Object.create(a)

findProp(b,'prop') // 1

findProp(b,'hasOwnProperty') // function

findProp(b,'test') // '没得这些东西'

```

### 模拟 new 的行为

```javascript

function createNew(fn,...args){
    let o = Object.create(fn.prototype)
    A.call(o,...args)
    return o
}

function A(a){
    this.a = a
}

A.prototype.b = 2

let instance = createNew(A,100)

instance.a // 100
instance.b // 2

```

### prototype chain

es2019 语言规范这么描述原型链：  

`a prototype may have a non-null implicit reference to its prototype, and so on; this is called the prototype chain.`

很简单一句话，，其实就像是基于原型的特性，自然而然就这样了。  

很容易发现原型链非常像`单向链表`:  

```javascript

// 定义一个链表

let o = {
    a:1,
    next:{
        b:2,
        next:{
            c:3,
            next:null
        }
    }
}

// 把模拟原型查找属性的函数稍微改改
function findProp(o,key){
    var current = o
    while(!current[key]){
        if(current.next===null){
            return '没得这些东西'
        }
        current = current.next
    }
    return current[key]   
}

findProp(o,'c') // 3

```