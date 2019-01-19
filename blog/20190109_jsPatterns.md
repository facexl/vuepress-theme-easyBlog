---
title: js设计模式以及ts实现
category: study
---

## js设计模式

### 单例模式

要实现的效果通常是  
`我需要用到某个类 使用时就实例化它 当再次要用到这个类时 就不需要再实例化一次了`   
按照这个要求，类实例化后，一定需要保存在内存中，否则再次使用时是不能直接拿到的  
按照这个想法，很容易想到一个实现方式：  
创建一个全局变量 类实例化后就赋值给这个变量  
每次用到类时，使用这个变量就行了  
但明显这样做污染了全局，且这样做不是惰性的  
于是我们最好利用Js的闭包来‘保存’这个实例  
以下是一个有问题的实现  
```javascript
class Singleton {
    public static instance: any
    public name: string;
    public constructor() {
        this.name = 'hehe';
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b); // true
```
上面这种方式实现了单例模式，但是我们获取它时都不是通过习惯的`new`的形式，而是通过代码内部的`getInstance`方法，就是说不去看类的实现，都不知道要怎么使用，这显然不够友好，还会影响后期维护。  
我们希望每次都通过`new`调用实例化一个类，同时达到单例模式的效果，那么：
```javascript

class Singleton {
    public name: string
    constructor(name: string) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
const CreateSingleton: any = (() => {
    let a: object;
    return (x: string) => {
        if (!a) {
            a = new Singleton(x);
        }
        return a;
    };
})();

const c = new CreateSingleton('a');
const d = new CreateSingleton('b');

console.log(c === d); //true
c.getName();  // 'a'
d.getName();  // 'a'

```
实现了使用`new`来实例化的单例模式，但是注意`getName`方法都是输出`a`，这说明单例模式的类，最好不要过分的去支持定制化、个性化，因为这种类往往是公用的。

#### 参考资料

- https://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html
- https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/singleton.html
