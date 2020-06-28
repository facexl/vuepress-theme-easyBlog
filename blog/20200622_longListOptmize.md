---
title: 记一次长列表优化
category: practice
---

## 记一次长列表优化

### 缘起

理论上不停上拉加载列表，如果不处理，都会随着数据量的增大而变卡。平时的开发中，由于极少会有人上拉那么多数据，一般不会被人发现这个问题。但是就在今天
，用户反馈我们的电商首页在部分安卓机上巨卡，虽然首页不是我写的，但由于种种原因，最后还是艾特到我了。

### 背景

Vue写的移动端电商商城

### 分析

页面卡顿，我第一反应是 `dom` 节点数量问题。于是在控制台一看：
![](http://img.xlcool.cn/B5F1B15B074B0E68D09CCC5024FD86C6.jpg)  
好家伙，刚进去就有将近7000节点。这下问题应该是锁定了。  
看了下页面请求，请求了四个不同的商品列表，每个列表都是全量返回没有分页，梳理了下要实现的需求，发现这个不分页是刻意而为之，于是
长列表优化成了不得不做的事情。  

目前的页面结构如下：

```javascript

<template>
    <some banners />
    <some nav />
    <锚点tab混合组件 />  // 有两个独立tab和两个锚点，两个锚点点击可以定位到任意列表 也可以随页面滚动到合适位置自然激活 这是列表没有分页的主要原因
    <list1 title />
    <list1 v-for />
    <list2 title />
    <list2 v-for />
    <list3 title />
    <list3 v-for />
    <list4 title />
    <list4 v-for />
</template>

```

每个`list item`都包裹了厚厚的子节点，列表实际节点数 = 列数 * item子节点数 

![](http://img.xlcool.cn/WX20200622-214951%402x.png)

我们立刻想到，能有效减少 list item 节点数便可以大幅度降低 dom 渲染的开销，达到性能优化的目的

### 方案

页面组件拿到滚动条高度，传递给子组件，子组件自己判断自己是不是该渲染自身的子节点。

```javascript

// 页面组件 滚动事件肯定要监听
mounted(){
    window.addEventListener('scroll', this.onScroll)
},
// 务必记得移除
destroy () {
    window.removeEventListener('scroll', this.onScroll)
},
methods:{
    onScroll(){
        // 获取滚动条高度的兼容写法
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    }
}


```

我们知道可视区域高度加上滚动条高度=已经漏过脸的dom高度，如果这个高度大于元素的 offsetTop 则表示元素必须要渲染了  

list item component:

```javascript
<template>
    // 为了撑开容器 固定高度的外层 div 是必须的
    <div>
        <template v-if="showChildNodeList">
            <some nodelist />
        </template>
    </div>
</template>
computed:{
    showChildNodeList(){
        // 加300目的是可以提前300px就渲染 优化体验
        const totalHeight = this.scrollTop + clientHeight + 300
        const calc = totalHeight - this.offsetTop
        return calc > 0 && calc < (clientHeight + 300)  // 大于0表示已经该出来了，小于可视高度+偏移量表示元素又从顶部离开了可视区域可以隐藏起来了
    }
},
mounted() {
    this.offsetTop = this.$el.offsetTop
},

```

### 最终效果

滚动不再卡顿，我们检查dom节点：

![](http://img.xlcool.cn/WX20200622-220858%402x.png)

不管我们如何滚动 即便滚动到页面底部，节点数都在一个可接受范围内

### 暴力测试

我去除掉优化的代码，故意组装数据把list加到超长，

![](http://img.xlcool.cn/WX20200622-221457%402x.png)

节点数达到10w+，页面已经卡住不动，没一会儿我电脑都开始抗议(fu~ fu~ fu~ 的散热声

加上优化后的代码：

![](http://img.xlcool.cn/WX20200622-221712%402x.png)

节点维持在3000左右，滚动依然没什么问题。  

检查元素可以发现，不被渲染的地方，只剩下一个 div 壳子

![](http://img.xlcool.cn/WX20200622-222215%402x.png)

不过也说明一个问题，这种方案并不支持无限滚动的场景，毕竟每增加一列，还是会增加一个div

### 缺点及优化

虽然当前场景基本解决了，但明显普适性不够，缺点非常明显：
- 1.每列必须固定高度
- 2.如果页面因为一些交互导致整个页面高度变了，需要重置每个列的offsetTop
- 3.并不是真正意义的无限，毕竟每增加一列，还是会增加一个div