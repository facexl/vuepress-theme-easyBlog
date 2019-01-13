---
title: 设计模式
category: study
---

## js设计模式

### 单例模式

即保证类只有一个实例。

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