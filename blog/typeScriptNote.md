---
title: use TypeScript一些困惑
date: 2018/11/12
category: study
---


### use TypeScript一些困惑

以下示例均是在
typeScript 3.1.6   
@types/react 16.4.18  
版本的tsx中运行

##### 1.接口检测

```javascript

interface Params {
    x: string;
}

function x(value: Params) {}

const obj = {
    x: '1',
    size: 20
};
x(obj);  //works fine

x({ x: '1', a: 1 });  //error   

```
两个调用x函数的方式本质是一样的，但是第二种确实报错了

报的错误是`TS2345: Argument of type '{ x: string; a: number; }' is not assignable to parameter of type 'Params'.Object literal may only specify known properties, and 'a' does not exist in type 'Params'.`

##### 2.