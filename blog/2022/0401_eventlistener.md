---
title: 关于移除匿名函数事件监听  
category: study  
---

## 关于移除匿名函数事件监听 

通常移除`EventTarget.addEventListener(type, listener, options?)`事件绑定，需要调用`EventTarget.removeEventListener`并提供三个相同的参数（其中可选参数`options/useCapture`只有`useCapture`必须保持一致），才能移除成功。当我们的`listener`是匿名函数的时候怎么移除呢？

### 头铁的解决方案

```javascript

EventTarget.prototype.betterAddEventListener = function(type,fn,options){
    this.addEventListener(type,fn,options);
    return ()=>{
        this.removeEventListener(type,fn,options)
    }
}

// eg:

const cancel = window.betterAddEventListener('scroll',_=>{
    console.log('trigger scroll')
})

cancel() // 取消监听  

```

这样保证了参数的一致性，可以做到取消，但是`不到万不得已的情况下是不能污染原生原型链的`。

### 未来的解决方案（兼容性不足）  

```javascript

const controller = new AbortController();
window.addEventListener("click", () => alert("window"), { signal: controller.signal });
document.addEventListener("click", () => alert("document"), { signal: controller.signal });

// 批量取消监听
controller.abort();

// 还可以定时取消  

const signal = AbortSignal.timeout(3000);

// 3秒钟后自动失效
window.addEventListener("click", () => alert("window"), { signal });

```  

不过兼容性堪忧  [具体见](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal#browser_compatibility)