---
title: 记录一些糟糕实践  
category: practice
---

## 记录一些糟糕实践  

从错误中吸取教训吧  

### 1.vue keep alive meta 配置  

接触过 vue keep-alive 组件的人多少见过这种使用方式:
``` javascript
// route:
{
    path: '/xx',
    name: 'xx',
    meta: { title: '精选', keepAlive: true },
    component: () => import('@/xx.vue')
}

// 然后 入口文件  app.vue

<keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
</keep-alive>

<router-view v-if="!$route.meta.keepAlive" />

```

这样一来就可以方便的写路由时就配置这个页面缓存与否  

事实证明在某些场景下这很糟糕  

问题就是一旦被缓存就很难逆转。如果某个页面使用了 keepAlive 然后我们希望在前进是继续保留缓存，后退离开这个页面时清除掉它的缓存，这时候可能会写出这种代码  
 
``` javascript
beforeRouteLeave (to, from, next) {
    //  后退
    if(to.name==='Home'){
        this.$destroy()
    }
    next()
}
```
很遗憾这会导致这个组件再也不会被缓存了  

又或是这种写法  

``` javascript
    beforeRouteEnter (to, from, next) {
        to.meta.keepAlive = true
        next()
    },
    beforeRouteLeave (to, from, next) {
        // 后退
        if(to.name==='Home'){
            from.meta.keepAlive = false
        }
        next()
    },
```

这种情况测试完发现是无法卸载的  

最后只有这种手段成功了  

```javascript
    name:'test007',
    beforeRouteEnter (to, from, next) {
        next()
    },
    beforeRouteLeave (to, from, next) {
        // 后退
        if(to.name==='Home'){
            const cache = this.$vnode.parent.componentInstance.cache
            console.log(cache)
            let cacheIndex = 0
            let cacheKey = 0
            Object.keys(cache).forEach((it, i) => {
                if (cache[it].tag.includes('test007')) {
                    cacheIndex = i
                    cacheKey = it
                }
            })
            // 删除掉对应的缓存
            this.$vnode.parent.componentInstance.keys.splice(cacheIndex, 1)
            delete this.$vnode.parent.componentInstance.cache[cacheKey]
        }
        next()
    },
```

#### 如果没有采用那种方式而是  

```javascript

<keep-alive :include="cache">
        <router-view />
</keep-alive>

```

cache 存在 vuex 中，动态操作`cache`控制组件是卸载还是继续缓存，`则没有任何问题` 

### 2.hash 路由  

`hash`路由利用的是`hashchange`事件，所以可以兼容到`ie8` ，而 `history`路由用到了`window.history.pushState`，所以必须`ie10+`支持，这是选择 hash 路由的原因。  
如果你的应用要嵌入到微信，将会遇到由哈希路由引发的很多问题  
分享地址校验、分享配置、支付地址校验等等、、凡是和地址有关的，`hash`会表现出各种诡异问题，甚至在 ios 和 android 的微信上表现都是不一样的  
当然我并不确定 history 路由没有那些问题，因为没有实践过，以后会尝试  

### 3.与缓存的斗争  

在各种设备微信里运行的网页，绕不开缓存问题。  
即使配置了 `nginx` 不让浏览器缓存，  
部分机型仍然会表现出问题  
而一旦访问了缓存的 html 文件，然后请求到过时的资源，就会白屏  
解决方案:  

1.入口文件配置`nginx`告诉浏览器不要缓存   
2.入口地址加上时间戳  
3.兜底方案，服务器上多保存几个版本的资源文件，让进到缓存文件的浏览器不至于请求不到静态资源，当然如果你的代码每次都传到了七牛云，则不需要考虑  

我们的应用之前每次发版都有用户喊白屏了，直到这三板斧安排上~  

