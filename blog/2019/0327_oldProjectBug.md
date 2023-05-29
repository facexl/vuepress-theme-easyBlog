---
title: 老项目踩坑记(vue)
category: practice
---

## 老项目踩坑记(vue)

### 背景

- `vue`驱动的管理后台。
- 用到了 `keep-alive` 缓存子组件。
- 一种年代比较久远、但是很好用的交互方式，即 每点击一个菜单项，主容器页面就会产生一个 `tab`，就像浏览器那样。`tab`的`router-view`用`keep-alive`组件包裹起来。

### Bug 1

刷新页面，不会重新请求数据，导致没有数据展示。    
`原因：`看了下所有的`keep-alive`包裹的子路由页面，都是在`activated`生命周期中初始化的数据(请求数据)。  而刷新页面并不会触发`activated`，就是这么秀，点开菜单会触发，切换`tab`回触发，偏偏刷新页面就是不触发。      
`解决方案：`乍看一眼很简单，把`activated`换成`created`就完事了。但问题这是老项目，很多交互都依赖了切换`tab`触发`activated`更新数据的操作。所以不能这么粗暴。    
那么问题来了，如何让刷新的时候也更新数据呢？有一种方案是在`created`中通过逻辑判断，是否抓取数据。同时保留原来的`activated`。但项目已经过于庞大，这种改动依然不够优雅。而且一个个纯粹的页面加些这种代码，看着也难受。    
`秀儿的解决方案：`经过一番探索，我在承载子`router-view`的页面里，给`router-view`外的`keep-alive`外再包裹了一层`div`，并且在这个`div`上绑定了一个`key`，然后在这个`vue`实例的`created`里更新这个`key`。大概代码如下：
```javascript

<div :key="key">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>  
</div>
...
created(){
    setTimeout(()=>{
        this.key++
    },0)
}

```

至此总共几行代码解决了疑难杂症。改变`key`可以迫使`diff`算法认为这是全新的组件，重新实例化，`setTimeout`可以让改变`key`成为异步操作，从而在子组件实例化后再改变`key`，默默触发了子组件的`activated`



### Bug 2
同样的路由不同的路由参数(id不一样)，都打开后，用`tab`去切换它们，数据不会更新，永远都是用最后一个`tab`的数据。  
`原因：`只是路由参数的变化，实例化过的`vue`不会重新实例化，导致 `data`还是老的、生命周期也不走了。  
`解决方案：`想过监听`$route`来重新拉数据更新识图，代码如下：
```javascript
watch:{
    '$route':{
        handler(){
            this.init()
        }
    }
}
```
`缺点：`不是所有状态都要靠请求的，比如添加和编辑用的同一个路由不同参数，先打开添加，再打开编辑，这时候切到添加页面，编辑的数据就清理不掉了，因为添加是不需要请求数据初始化的。也想过使用`Object.assign(this.$data, this.$options.data())`初始化`data`。但还是觉得麻烦，有了解决上一个问题的基础，想想其实我们可以继续利用`key`  
```javascript

// vuex
state = {
    tabKey:0
}
// main.js
Vue.prototype.$refreshTab = ()=>{
    store.state.tabKey++
}
// main container
<div :key="key">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>  
</div>

...

computed(){
    key(){
        return store.state.key
    }
}

// business component
'$route':{
    handler(){
        this.$refreshTab()
    }
}

```
解决了这个问题之后，惊讶的发现，这个`this.$refreshTab()`还有很多巧妙的用法，比如我列表上一个弹窗的编辑，正常我们编辑完点保存，会在回调里去请求列表数据、关闭弹窗、清理弹窗数据至少三个操作，但是有了这个方法，直接在保存成功时`this.$refreshTab()`更新下`key`，瞬间解放双手！