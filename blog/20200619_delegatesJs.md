---
title: 后端攻坚之node-delegates
category: study
---

## node-delegates

`node-delegates`是 `TJ` 大神写的一个应用在 koa2 中的一个 npm 包，最近研究 koa2 源码，有幸看到了。
作者在 readme 的介绍里就一句话----节点方法和访问者委托实用程序。

### 基本使用

也就是 delegates 是用来方便实现委托模式的。delegates 有四个基本方法。
- method 允许通过委托访问的方法
- getter 允许通过委托访问的属性
- setter 允许通过委托设置的属性
- access 等于 getter + setter

```javascript

// 示例
const delegates = require('delegates')

const proto = {}
const other = {
    a:1,
    b:2,
    c(){
        console.log(123)
    },
    d:3
}

delegates(proto,'other')
.getter('a')
.setter('b')
.method('c')

proto.other = other

console.log(proto.a) // 1
console.log(proto.b) // undefined
proto.c()            // 123
proto.b = 666
console.log(proto.other.b) // 666

```

- fluent 意为流利的，使用它可以让我们像下面这样设置/访问属性

```javascript

delegates(proto,'other')
.getter('a')
.setter('b')
.method('c')
.fluent('d')

proto.d('789') // 传值表示设置

console.log(proto.d()) // 不传表示获取 输出 789

```

### node-delegates 源码

```javascript
// 初始化
function Delegator(proto, target) {
  // 让使用者省略 new 操作 即 new Delegator(proto, target) 等于 Delegator(proto, target)
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  // 四个数组记录委托操作
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}
// 所有方法都`return this`是为了实现链式调用
// method
Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function(){
                                    // 确保访问时 this 正确
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};
// getter
Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);
  // 注意这里其实更推荐  Object.defineProperty
  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

// setter 与 getter 实现类似，access 是他俩的组合

```

### 总结  

源码不复杂，重要的是委托的思想。



