---
title: 记一次对列表以及详情的优化
category: practice
---

## 记一次对列表以及详情的优化
### 场景  
基于vue/vue-router/vux/vuex的移动端网站
### 需求分析
- 希望列表跳详情后返回不要重新加载列表
- 返回后的视图要停留在点击的位置
- 再次进入相同的详情不要重新加载详情数据

### 痛点
 如何及时更新缓存的数据，如何抽出这样一个功能，让其他页面想要缓存也能很简单的复用

### 解决方案
#### 对于列表  

页面跳转时，会销毁当前的vue实例，导致后退时又要新建这个实例，如果使用`locaStorage`储存加载的数据，同时还要记录点击的位置，后退时恢复过来，是相当麻烦的，这里推荐使用官方组件`keep-alive`，这样在组件切换时，vue实例不会销毁，自然列表还在那，且位置也是对的。  
`关于数据更新`:keep-alive后的组件，展现时会触发`activated`生命周期，我们可以在这里请求新的数据与已有数据进行比较，有变化就重新渲染，这样数据加载在后台悄悄进行，对于用户是无感知的。下面是代码示例
```javascript
//路由设置一个meta字段表示是否需要keep-alive
{
    path: '/orderList',
    name: 'orderList',
    meta: { keepAlive: true },
    component: orderList
}
```
`router-view`加上判断
```html
<keep-alive>
    <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />
```
缓存数据如何更新示例
```javascript
 activated() {
    if (this.orderList.length === 0) return;
    $fetch('getOrderList', Object.assign(this.filterParam, { pageNo: 1, pageSize: this.orderList.length })).then(e => {
      if (JSON.stringify(this.orderList) === JSON.stringify(e.data.result || [])) return;
      this.orderList = e.data.result;
      this.totalPage = e.data.totalPage;
    });
  },
```
#### 对于详情  

  如果详情也使用`keep-alive`，一是用户进了A详情，再进B时会短暂显示A的内容，体验不好；二是每次要去`activited`生命周期写更新逻辑，比较麻烦。于是我放弃了`keep-alive`，自己设置了一种保存、更新数据的机制。简单的说是把数据存在`vux`中，下面是具体实现:  
对请求进行封装，先提取关键代码，后面会贴出完整代码
```javascript

  // 如果该请求需要缓存，那么下次请求前尝试获取缓存内容(储存数据的key都是___apiName的形式)
  // 判断缓存是否已经存在，以及请求参数是否一致,都符合的话直接调用传入的cacheCallBack渲染数据，请求仍然继续执行
  if (store.state[`___${apiName}`] && JSON.stringify(store.state[`___${apiName}`].params) === JSON.stringify(params)) {
    apiConfig.needLoading && Vue.$vux.loading.hide();
    apiConfig.cacheCallBack(JSON.parse(JSON.stringify(store.state[`___${apiName}`].data)));
  }
//请求完成
//判断数据是否有更新，有的话再次调用cacheCallBack渲染数据
//以___apiName为key储存新数据和请求的参数
if (apiConfig.needCache) {
    if (
    !store.state[`___${apiName}`]
    || JSON.stringify(store.state[`___${apiName}`].params) !== JSON.stringify(params)
    || JSON.stringify(store.state[`___${apiName}`].data) !== JSON.stringify(res.data)
    ) {
    apiConfig.cacheCallBack(JSON.parse(JSON.stringify(res.data)));
    }
    store.state[`___${apiName}`] = {
    data: res.data,
    params: params
    };
}

```
下面是封装请求的完整代码，使用了`vux`作为ui组件,`axios`发送请求,`vuex`作状态管理
```javascript
import axios from 'axios';
import apis from './apis';
import store from '@/store';
import Vue from 'vue';
import baseConfig from '../config';

axios.defaults.timeout = 55000;// 后端默认60秒返回504 安卓腾讯x5内核巨坑之 连接超时自动重新请求 容易引起严重的重复下单、支付等问题，
// 所以这里设置55秒 在返回504之前直接中断掉

/**
 *
 * @param {string} apiName {string} apiName apis.js里的一个key
 * @param {object} params 请求参数
 * @param {object} config 请求配置(默认如下)
 * loginIntercept: true, // 登录拦截
   errorIntercept: true, // 错误提示（弹窗）
   needLoading:false     // 是否需要全屏Loading
   loadingText:'加载中'   // loading文字提示
   needCache: false,     // 是否需要缓存
   cacheCallBack: null,  // 缓存回调
   isThirdApi: false,    // 是否为第三方的API
 */
const $fetch = (apiName, params = {}, config = {}) => {
  let apiConfig = Object.assign({
    loginIntercept: true, // 登录拦截
    errorIntercept: true, // 错误提示（弹窗）
    needLoading: false,
    loadingText: '加载中',
    needCache: false,
    cacheCallBack: null,
  }, config);

  // 显示Loading
  apiConfig.needLoading && Vue.$vux.loading.show({ text: apiConfig.loadingText });

  // 获取缓存内容
  if (store.state[`___${apiName}`] && JSON.stringify(store.state[`___${apiName}`].params) === JSON.stringify(params)) {
    apiConfig.needLoading && Vue.$vux.loading.hide();
    apiConfig.cacheCallBack(JSON.parse(JSON.stringify(store.state[`___${apiName}`].data)));
  }

  let arr = apis[apiName].split(' ');
  let apiParam = {};
  switch (arr[0]) {
    case 'get':
      apiParam = { params };
      break;
    case 'post':
      apiParam = params;
  }

  return axios[arr[0]](arr[1], apiParam).then(res => {
    apiConfig.needLoading && Vue.$vux.loading.hide();
    if (apiConfig.isThirdApi) return res.data;

    // 未登录
    if (apiConfig.loginIntercept && Number(res.data.code) === 2) {
      // app环境出去登录
      if (store.state.orderBaseInfo.platform === 2) {
        location.href = baseConfig.outLoginUrl;
        return res.data;
      }
      store.state.showLoginModal = true;
      return res.data;
    }
    // 后端错误提示
    if (apiConfig.errorIntercept && !res.data.success) {
      Vue.$vux.alert.show({
        title: '提示',
        content: res.data.message || res.data.errDesc,
      });
      throw res.data;
    }
    if (res.data.success) {

      if (apiConfig.needCache) {
        if (
          !store.state[`___${apiName}`]
        || JSON.stringify(store.state[`___${apiName}`].params) !== JSON.stringify(params)
        || JSON.stringify(store.state[`___${apiName}`].data) !== JSON.stringify(res.data)
        ) {
          apiConfig.cacheCallBack(JSON.parse(JSON.stringify(res.data)));
        }
        store.state[`___${apiName}`] = {
          data: res.data,
          params: params
        };
      }
      return res.data;
    }

    throw res.data;
  }).catch(errs => {
    apiConfig.needLoading && Vue.$vux.loading.hide();
    console.log(errs);
    if (typeof errs.success !== 'undefined') {
      throw errs;
    } else {
      throw { message: '服务器异常' };
    }
  });
};

export default $fetch;

```
调用方式示例
```javascript
$fetch('getOrderDetail', { transportOrderNo: this.orderno }, {
        needLoading: true,
        needCache: true,
        cacheCallBack: this.handleData
      });
```
一个配置就实现了缓存，完成了需求的同时完成了可复用的目标