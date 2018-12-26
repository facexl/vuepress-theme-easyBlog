---
title: 一个特别的登录需求
date: 2018/07/26
category: practice
---

## 一个特别的登录需求

### 场景
使用`vue、vuex、vux、vue-router`搭建的移动端网站
### 需求描述
- 登录为弹窗形式，不要跳页
- 检测到登录状态失效，当前页面直接需弹出登录框，登录完成后，页面重新渲染

?> 痛点：由于用了vuex状态管理，登录完成，直接刷新页面会导致vuex数据丢失，用户体验也很差，不可取。也不可能每个页面都去写登录的逻辑，这样开发体验不好

### 实现过程

1、先在App.vue塞一个写好的登录组件，子组件登录成功派发一个事件给父组件这里是`@logined`
```html
<Login @logined="refresh"></Login>
```
2、`store`里设置一个变量来控制`login`弹窗的显示还是隐藏。检查到未登录，改变这个字段即可  
3、那么`refresh`怎么来实现呢
- 方案1：每个页面组件都包装一个调用所有接口并且渲染数据的`refresh`方法。检测到未登录时，改变`store`中控制显示登录框的字段同时存一个回调函数在`store`里面，`App.vue`的`refresh`调用`store`里存的回调。这样确实可以，但是每个页面组件都要写这种代码，开发体验不好且难维护
- 方案2：给`router-view`外面包裹一层`div`并给一个`key`
```html
<div class="all-container" :key="pageKey">
    <router-view />
</div>
```
`pageKey`存在`store`里面，`App.vue`的`refresh`方法写成
```javascript
refresh() {
    console.log('change key');
    store.state.pageKey++;
}
```
这样每次登陆成功后，`key`的值改变，迫使`diff`算法认为这是一个全新的组件，重新走一遍生命周期，达到我们`刷新`的目的