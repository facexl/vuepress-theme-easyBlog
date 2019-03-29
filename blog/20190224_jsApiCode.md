---
title: 手写js原生API_训练场_持续更新
category: practice
---

## 手写js原生API训练场

为什么写这个？因为好玩。没事做就写着打发时间。

### Function.prototype.call

```javascript
Function.prototype._call = function(_this){
    const ctx = _this || window
    const sym = Symbol('call_ctx')
    const args = [...arguments]
    args.shift()
    ctx[sym] = this
    const res = ctx[sym](...args)
    delete ctx[sym]
    return res
}
// test
const a = function(b,c){
    console.log(this.a,b);
    return c 
}
const o = {a:1};
a._call(o,'b',['c']) // console 1,'b' return ['c']
console.log(o) // { a:1 }
```

### Function.prototype.bind

```javascript
Function.prototype._bind = function(_this){
	const ctx = _this || window
	const args = [...arguments].slice(1)
    const instance = this
	return function F(){
        if(this instanceof F){
            return new instance(...args,...arguments)
        }
		return instance.apply(_this,args.concat(...arguments))
	}
}
```

### Array.prototype.push

```javascript
Array.prototype._push = function(){
    const l = this.length
    const args = arguments
    for(let i=0,len=args.length;i<len;i++){
        this[l+i] = args[i]
    }
    return this.length
}
```

### Array.prototype.pop

```javascript
Array.prototype._pop = function(){
    const l = this.length
    if(l){
        const value = this[l-1]
        this.length = l-1
        return value
    }
    return undefined
}
```

### Array.prototype.forEach

```javascript
Array.prototype._forEach = function(fn){
    const len = this.length
    let i = 0
    while(i<len){
        fn(this[i],i,this)
        i++
    }
}
```

### Array.prototype.map

```javascript
Array.prototype._map = function(fn){
    const len = this.length
    const arr = []
    let i = 0
    while(i<len){
        arr.push(fn(this[i],i,this))
        i++
    }
    return arr
}
```

### Promise

按照[Promise/A+](http://www.ituring.com.cn/article/66566)规范。