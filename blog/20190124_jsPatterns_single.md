---
title: js设计模式之单例模式及其ts实现
category: study
---

## js设计模式之单例模式

### 理想单例模式

- 对象只需要实例化一次
- 惰性实例化
- 禁止修改属性（可选）...`因为共享一个示例 如果擅自修改对象属性 影响比较大`

### 方式1：实例挂载在构造函数上

```javascript
const $ = function() {
    this.name = 'xiao lang'
    if ($.instance) {
        return $.instance;
    } else {
        $.instance = this;
    }
};

$.prototype.a = 1;

// test
const a = new $();
const b = new $();
console.log(a === b, a.a, b.a); // true , 1, 1

`为防止有人修改$.instance 可使用symbol`

let $;
(() => {
    const sym = Symbol('instance');
    $ = function() {
        this.name = 'xiao lang';
        if ($[sym]) {
            return $[sym];
        } else {
            $[sym] = this;
        }
    };
})();
//test
const a = new $();
const b = new $();
console.log(a === b); //true

`希望不要修改自有属性 可使用proxy`

let $;
(() => {
    let sym = Symbol('instance');
    $ = function() {
        this.name = 'xiao lang';
        if ($[sym]) {
            return $[sym];
        } else {
            $[sym] = this;
            $[sym] = new Proxy($[sym], {
                set() {
                    throw new Error('can not rewrite it');
                }
            });
            return $[sym];  //注意此处不能默认让构造函数return this 了  因为$[sym]加了proxy  this并没有加
        }
    };
})();

const a = new $();
const b = new $();
console.log(a === b); //true
$.prototype.a = 1
console.log(a.a)    //1
a.test = '666'  // error:can not rewrite it
```

### 方式2：闭包 & 重写构造函数

```javascript

let $ = function() {
    this.name = 'xiao lang';
    let instance = this;
    $ = function() {
        return instance;
    };
};
const a = new $();
const b = new $();
// test
console.log(a === b) // true
// 但是原型
$.prototype.test = 1
console.log(a.test) // undefined  因为原来的$已经被重写 而instance还是原来的实例

`尝试解决上面这个问题`

let $ = function() {
    this.name = 'xiao lang';
    let instance = this;
    const temp = $.prototype
    $ = function() {
        return instance;
    };
    $.prototype = temp
    instance.constructor = $;
};
// test
const a = new $();
const b = new $();
$.prototype.c = 1;
console.log(a === b, a.c, a instanceof $, a.constructor === $); //true 1 true true

`加上proxy禁止改动`

let $ = function() {
    this.name = 'hongfa';
    let instance = this;
    instance = new Proxy(instance, {
        set(target, key, value, proxy) {
            if (key === 'constructor') return Reflect.set(target, key, value, proxy);
            throw new Error('can not rewrite it');
        }
    });
    const temp = $.prototype
    $ = function() {
        return instance;
    };
    $.prototype = temp
    instance.constructor = $;
    return instance;  // 注意手动return
};

const a = new $();
const b = new $();
$.prototype.c = 1;
console.log(a === b, a.c, a instanceof $, a.constructor === $); //true 1 true true

a.name = 'test' // error

`不用proxy实现属性只读`

let $ = function() {
    const prop = {
        name:'xiaolang'
    }
    this.getProp=(key)=>{
        return prop[key]
    }
    let instance = this;
    const temp = $.prototype
    $ = function() {
        return instance;
    };
    $.prototype = temp
    instance.constructor = $;
};

const a = new $()
const b = new $()

console.log(a===b,a.getProp('name')) // true xiaolang

```

## ts实现

```javascript

`ts实现私有属性就简单多了`

class Single {
    private static instance: any;
    readonly name: string = 'xiaolang'
    constructor() {
        if (Single.instance) {
            return Single.instance;
        } else {
            Single.instance = this;
        }
    }
}

const a = new Single();
const b = new Single();

console.log(a===b) //true

`扩展属性 使用继承的方式`

class newSingle extends Single {
    x: string = 'test'
}

const a = new A();
const b = new A();

console.log(a === b, a.x); //true,test

```

### 参考资料

- https://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html
- https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/singleton.html
