---
title: Proxy
category: study
---  

## Proxy

`Proxy`可以创建一个代理对象，能实现对其他对象的代理。其中代理指的是对对象的基本语义的代理。 

### 先了解对象  

什么是对象？根据[ECMAscript262](https://262.ecma-international.org/12.0/)规范，`javascript` 存在两种对象，即`常规对象`和`异质对象`。任何不属于常规对象的对象都是异质对象。

#### 对象必要的内部方法  

| 内部方法                 |签名                                                  | proxy 代理方法    |   
| ---------------------- | ---------------------------------------------------- | ------------------|
| `[[GetPrototypeOf]]`   | ( ) -> Object \| null                                | getPrototypeOf(target) |
| `[[SetPrototypeOf]]`   | ( Object \| null ) -> Boolean                        |setPrototypeOf(target, proto)|
| `[[IsExtensible]]`     | ( ) -> Boolean                                       |isExtensible(target)|
| `[[PreventExtensions]]`| ( ) -> Boolean                                       |preventExtensions(target)|
| `[[GetOwnProperty]]`  | ( propertyKey ) -> Undefined \| PropertyDescriptor   |getOwnPropertyDescriptor(target, propKey)|
| `[[DefineOwnProperty]]`| ( propertyKey,PropertyDescriptor ) -> Boolean        |defineProperty(target, propKey, propDesc)|
| `[[HasProperty]]`      | ( propertyKey ) -> Boolean                           |has(target, propKey)|
| `[[Get]]`              | ( propertyKey,Receiver ) -> any                      |get(target, propKey, receiver)|
| `[[Set]]`              | ( propertyKey,value,Receiver ) -> Boolean            |set(target, propKey, value, receiver)|
| `[[Delete]]`           | ( propertyKey ) -> Boolean                           |deleteProperty(target, propKey)|
| `[[OwnPropertyKeys]]`  | ( ) -> List of propertyKey                           |ownKeys(target)|

#### 额外的必要内部方法

| 内部方法                 |签名                                                    |proxy 代理方法    |   
| ---------------------- | ------------------------------------------------------ |------------------|
| `[[Call]]`             | ( any, a List of any) -> any                           |apply(target, object, args)|
| `[[Construct]]`        | ( a List of any,Object) -> Object                      |construct(target, args)|

常规对象就是指:

- 对于必要的内部方法,必须使用 ECMA 规范 10.1.x 节给出的定义实现
- 对于 `[[Call]]`,必须使用 ECMA 规范 10.2.1 节给出的定义实现
- 对于 `[[Construct]]`,必须使用 ECMA 规范 10.2.2 节给出的定义实现

所有不符合以上三点的都是异质对象。

### 拦截举例

```javascript

const obj = {
    foo:1
}
var p = new Proxy(test,{
    getPrototypeOf(target){
        console.log('getPrototypeOf')
        return Reflect.getPrototypeOf(target)
    },
    setPrototypeOf(target, proto){
        console.log('setPrototypeOf')
        return Reflect.setPrototypeOf(target, proto)
    },
    has(target, propKey){
        console.log('has')
        return Reflect.has(target, propKey)
    },
    get(target, propKey, receiver){
        console.log('get',target, propKey, receiver)
        return Reflect.get(target, propKey, receiver)
    },
    set(target, propKey, value, receiver){
        console.log('set',target, propKey, value, receiver)
        return Reflect.set(target, propKey, value, receiver)
    },
    deleteProperty(target, propKey){
        console.log('del')
        return Reflect.deleteProperty(target, propKey)
    }
})

// 挨个触发：
Object.getPrototypeOf(p) 
Object.setPrototypeOf(p,Number) 
'foo' in p 
p.foo 
p.foo = 2 
delete p.foo 

function Fn(){
    console.log('trigger')
    return this
}

const fnProxy = new Proxy(Fn,{
    apply(target,thisArg,argArray){
        console.log('调用成功')
        return Reflect.apply(target,thisArg,argArray)
    },
    construct(target, args){
        console.log('new')
        return Reflect.construct(target, args)
    }
})

fnProxy() 
new fnProxy()

```

 ### 参考

 - vuejs 设计与实现(霍春阳)
 - [es6阮一峰](https://es6.ruanyifeng.com/#docs/proxy)
 - [ECMAscript262](https://262.ecma-international.org/12.0/)规范