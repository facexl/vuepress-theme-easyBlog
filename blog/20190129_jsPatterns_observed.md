---
title: js设计模式之观察者模式及其ts实现
category: study
---

## js设计模式之观察者模式

观察者模式又叫发布/订阅模式，定义了一种依赖关系，解决了主体对象与观察者之间的耦合

```typescript
`简单的观察者模式`

// 观察者队列内部结构
interface CallBacksItem {
    index: number; //观察者编号
    cb: Function; //回调
}

class Observed {
    // 观察者队列
    private callBacks: Array<CallBacksItem> = []
    // 计数 用于给新的观察者添加唯一标识
    private count: number = 0
    // 发布消息
    publish(msg: string) {
        this.callBacks.forEach((it: CallBacksItem) => {
            it.cb(msg);
        });
    }
    // 订阅
    subscription(cb: Function) {
        this.callBacks.push({
            index: ++this.count,
            cb
        });
        return this.count;
    }
    // 退订
    cancel(index: number) {
        this.callBacks = this.callBacks.filter((it: CallBacksItem) => it.index !== index);
    }
}

const instance = new Observed();
// 订阅后回返回此观察者编号  可以用来取消订阅  (当然也可以直接返回用于取消的函数)
const A = instance.subscription((msg: string) => {
    console.log(`A ${msg}`);
});

instance.subscription((msg: string) => {
    console.log(`B ${msg}`);
});

instance.publish('is subscribed'); // A is subscribed   B is subscribed

// 取消A的订阅
instance.cancel(A);

instance.publish('is subscribed');// B is subscribed
```

## 参考资料

- https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/observer.html