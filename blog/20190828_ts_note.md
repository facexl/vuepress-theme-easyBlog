---
title: typeScript系统化学习_笔记
category: study
---

## 缘起

随着各大框架使用`typeScript`重构，其地位属实芝麻开花节节高。之前也在用 ts 写一些项目，但是很多盲区都是翻文档临时解决，最近决定系统性的好好学习一下 ts ，下面附上一些笔记。

### 基础类型

#### array

```javascript

const list:number[] = [1,2,3]
const list:any[] = ['1',2,{a:1}]

// 泛型方式
const list:Array<number> = [1,2,3]

const list:ReadonlyArray<number> = [1] // list将不能改变，不能修改值 也不能 push 等等

```

#### touple (元组:表示一个已知元素数量和类型的数组)

```javascript

const x:[string,number] = ['1',2]

// 在 typescript 2.7 之前 元组越界时会使用联合类型

x[2] = 3 // 3属于 (string|number) 所以正常

// 在 typescript 2.7 之后 将产生一个错误

x[2] = 3 // 不能将类型“3”分配给类型“undefined”

// 但是可以 push (string|number)

x.push(4)

```
[ Typescript 2.7（Fixed Length Tuples 一节中）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html)

#### enum

```javascript

enum Color{
    red = 1,
    blue = 7
}

// 编译成 js 就是

var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["blue"] = 7] = "blue";
})(Color || (Color = {}));

// 即 Color 变成了

{
    red:1,
    blue:7,
    1:'red',
    7:'blue'
}

// 所以可以通过 Color.red 取到值 1 也可以通过 Color[1] 取到字符串 'red'

```

#### null undefined void any

`null undefined` 是其他所有类型的子类型，把他们赋值给比如`number`类型的变量也不会出错，除非 `tsc xx.ts --strictNullChecks`

`any`表示任何类型，`void`与其相反

### 接口

```javascript

interface Config {
    a?:number
    [propName:string]:any
}

let b:Config = {
    a:2,
    c:3
}

// 函数接口

interface aFunc{
    (source:string,key:string):boolean
}

const fn : aFunc = (a,b)=>{
    return true
}

interface StringArray{
    [index:number]:string
}

let a :StringArray = ['1','2']

interface ReadonlyStringArray{
    readonly [index:number]:string
}

const a :ReadonlyStringArray = ['1']

```
```javascript

// 类有两个类型  实例类型 构造器类型

// 实例接口
interface ClockInterface{
    tick()
}
// 构造器接口
interface ClockConstructor{
    new(h:number,m:number):ClockInterface
}
function createClock(ctor:ClockConstructor,h:number,m:number):ClockInterface{
    return new ctor(h,m)
}
class DigitalClock implements ClockInterface{
    constructor(h:number,m:number){

    }
    tick(){
        console.log('go go')
    }
}
const a = createClock(DigitalClock,1,2)
a.tick()

```
```javascript

// 接口继承

// 混合类型
interface A{
    a:number
}
interface B{
    b:string
}
interface C extends A,B{
    c:string
}

let a = {} as C
a.a = 1
a.b = ''
a.c = ''

```

```javascript
// 混合类型

// 函数类型 同时具有 interval 属性和 reset 方法
interface Counter{
    (start:number):string
    interval:number
    reset():void
}

function getCounter():Counter{
    let counter = (function(start:number){

    }) as Counter

    counter.interval = 123
    counter.reset = ()=>{}
    return counter
}

let c = getCounter()

c(10)

c.reset()

```

```javascript
// 接口继承类
class Control{
    private state:any
}

interface SelectableControl extends Control{
    select()
}

class Button extends Control implements SelectableControl{
    select(){}
}
```

### 类
```javascript
 class Test {
    protected constructor(){}
 }
 let a = new Test()  // 报错，构造函数受保护 仅能在类声明中访问

 // 参数属性 简化赋值
 class Test {
    constructor(readonly name:string){}
}
const john = new Test('xiaolang')

console.log(john.name)

// 存取器
class Person{
    _fullName:string
    constructor(name:string){
        this._fullName = name
    }
    get fullName():string{
        return this._fullName+' get success'
    }
    set fullName(v){
        this._fullName = `${v}_shower`
    }
}

const lang = new Person('xiaolang')

console.log(lang.fullName)

lang.fullName = '666'

console.log(lang.fullName)

// 编译注意  tsc 默认编译到 es3 因为 Object.defineProperty es3 不能 polyfill  

// tsc xx.ts --target es5

// 实际被打包成 Object.defineProperty

// 抽象类

abstract class Department{
    name:string
    constructor(name:string){
        this.name = name
    }
    printName():void{
        console.log(this.name)
    }
    abstract printMeeting():void // 抽象方法 派生类必须中实现
}

class AccountingDepartant extends Department {
    b:string
    constructor(name,b){
        super(name)
        this.b = b
    }
    printMeeting(){
        console.log('week report'+this.name+this.b)
    }
}

const a:AccountingDepartant = new AccountingDepartant('a','b')

console.log(a.printMeeting())
```

### 函数

```javascript
// 完整类型写法 由于类型推断，左右两边选写一个即可
let x:(a:number,b:number)=>number = function(c:number,d:number):number{
    return c+d
}
// 不确定参数个数
function Test(a:string, ...restProp:string[]):void{}
Test('a','b','c','d')
```

#### 函数 this

```javascript
// 先看个例子
const Test = {
    a:1,
    f1(){
        return function(){
            console.log(this.a)
        }
    },
    f2(){
        return ()=>{
            console.log(this.a)
        }
    }
}

const fn1 = Test.f1()
const fn2 = Test.f2()

fn1() // undefined  因为 function 的 this 由执行的上下文确定
fn2() // 1  箭头函数的 this 创建时已经确定，即外层 this

// 提问 为什么 ts 没有提示错误

// 因为这里 this 没有办法推断 可以换下面这种写法

// 显示提供 this 参数 这是个假参数 占据第一个参数的位置

interface TestInterface{
    a:number
    f(this:TestInterface):()=>void
}
const Test:TestInterface = {
    a:1,
    f(this:TestInterface){
        return ()=>{
            console.log(this.a)
        }
    }
}

const fn = Test.f()

fn()

```

#### 函数重载
```javascript
function reCheck(a){
    switch(typeof a){
        case 'string':
            return [{ a }]
        case 'number':
            return a
    }
}
// 如何对参数进行类型检查
console.log(reCheck({}))

// 使用函数重载:
function reCheck(a:string):{a:string}[]
function reCheck(a:number):number
function reCheck(a){
    switch(typeof a){
        case 'string':
            return [{ a }]
        case 'number':
            return a
    }
}

reCheck('1')
reCheck({}) // 报错
```
#### 泛型

```javascript
// 泛型变量
function test<T>(arg:T):T{
    return arg
}

function test2<T>(arg:T[]):T[]{
    console.log(arg.length)
    return arg
}

// 泛型类型
function test<T>(arg:T):T{
    return arg
}

interface G<T>{
    (arg:T):T
}

let fn:G<number> = test
// 泛型类
class GenericNumber<T>{
    arg:T
    method(x:T):T{
        return x
    }
}
let a = new  GenericNumber<number>()

console.log(a.method(0))
```
```javascript
// 泛型约束
interface LT{
    length:number
}
function test<T extends LT>(arg:T):T{
    console.log(arg.length) // 不报错
    return arg
}

// keyof :

// function getProperty<T>(Obj:T,key){} // 希望约束 key 必须存在于 Obj:

function getProperty<T,K extends keyof T>(Obj:T,key:K){
    return Obj[key]
} 

getProperty({a:1},'a')


// eg;

class DogKeeper{
    nametag:string
}
class CatKeeper{
    sound:string
}

class Animal {
    nums:number
}

class Dog extends Animal{
    keeper:DogKeeper
}

class Cat extends Animal {
    keeper:CatKeeper
}

function createAnimal<T extends Animal>(c:{ new():T }):T{
    return new c()
}

createAnimal(Dog).keeper.nametag  // 推导成员
createAnimal(Cat).keeper.sound
```

### 高级类型

#### 交叉类型

```javascript
function assign<T,U>(a:T,b:U):T&U{
    return Object.assign(a,b)
}
```
#### 联合类型
```javascript
function Z(a:string|number){
    console.log(a.length)  // 强行访问会报错 因为联合类型只会取 string/number 的公共部分  比如 valueOf
}
function Z(a:string|number){
    if(typeof a === 'string'){
        console.log(a.length)  // 编译通过  得益于 ts 会识别 typeof判断基础类型时 为一种类型保护机制
    }
}
```
#### 类型保护
```javascript
class A{
    a:number
    c:number
}
class B{
    b:number
    c:number
}

function x(a:A|B){
    console.log(a.c)  // 联合类型只取公共部分
}
// 类型谓词
function isA(arg:A|B):arg is A{
    return !!(arg as A).a
}

function x2(a:A|B){
    if(isA(a)){
        return a.a
    }else{
        // 自动推导现在是 B
        return a.b
    }
}
// instanceof 类型保护
function x3(a:A|B){
    if(a instanceof A){
        return a.a
    }else{
        return a.b
    }
}
// null 
function A(a:string|null){
    function B(t:string){
        return t!.charAt(0) // !断言 t 不是 Null
    }
    const s = a || '1'
    return B(s)
}

A('1')

tsc xx --strictNullChecks // 编译通过
```
```javascript
// 字符串字面量类型
// type 定义一个类型
type mString = 'ease-in' | 'ease-out' | 'ease'
function animate(a:mString){
    switch(a){
        case 'ease':
        return 1
        case 'ease-in':
        return 2
        case 'ease-out':
        return 3
    }
}

animate('ease')
```