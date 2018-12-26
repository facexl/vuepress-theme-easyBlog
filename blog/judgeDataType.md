---
title: 如何简单粗暴判断js的数据类型
date: 2018/07/29
category: study
---

## 如何简单粗暴判断js的数据类型
### 常用的typeof
`typeof`并不能精准的判断出操作数的数据类型，比如`typeof Null`是'`boject'`,`typeof []` 也是`'object'`，
有个特点是typeof表示的未经计算的操作数类型，即 typeof a,即使a未定义，也不会报错，而是返回字符串'undefined',在es2015之前总是不会报错，但是在有`let`、`const`之后，typeof a;let a;会报*Uncaught ReferenceError: a is not defined*；这是因为`块作用域变量在块的头部处于“暂时死区”，直到被初始化，在这期间，如果变量被访问将会引发错误。`

?> 总结：`typeof`是检查基本数据类型的最佳工具，即判断操作数是`字符串、数值、布尔值、undefined`的最佳工具
### 犀利的Object.prototype.toString.call
以下是使用`object.prototype.toString.call`检测数据类型的结果
```javascript
toString.call([])  
"[object Array]"  
toString.call(null)  
"[object Null]"  
toString.call(()=>1)
"[object Function]"
toString.call(document)
"[object HTMLDocument]"
toString.call(new Error())
"[object Error]"
toString.call(window)
"[object Window]"
toString.call(1)
"[object Number]"
toString.call(true)
"[object Boolean]"
toString.call(Symbol())
"[object Symbol]"
toString.call(new Map)
"[object Map]"
toString.call(new Set)
"[object Set]"
```
?> `object.prototype.toString.call`访问的是对象的`[[Class]]`属性的值，`[[Class]]`是一个内部属性，所有的对象(原生对象和宿主对象)都拥有该属性。除了通过`Object.prototype.toString`方法之外,没有提供任何其他方式来让程序访问该属性的值。我们可以使用它来精准判断操作数的类型。

!> 注意`ie`下直接使用`toString.call(obj)`会报错，建议使用`object.prototype.toString.call`
### [Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)

然而随着es2015 引入 `Well-Known Symbols` 以后,这种方式也没那么严谨了

```javascript
const a = {}
a[Symbol.toStringTag] = '酸菜鱼'
Object.prototype.toString.call(a) => '[object 酸菜鱼]'
```