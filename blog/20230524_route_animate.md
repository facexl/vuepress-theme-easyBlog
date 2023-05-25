---
title: 移动端路由切换动画以及踩坑  
category: study  
---  

## 移动端路由切换动画  

### 1.简单的页面切换动画  

下面代码实现了页面前进时左滑,后退时右滑的效果

```javascript
<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="saveScrollRoute">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { saveScrollRoute } from "./router/index";
export default {
  data() {
    return {
      transitionName: "",
      saveScrollRoute,
    };
  },
  watch: {
    $route(to, from) {
      // index 是配置在路由meta上的层级  
      if (!from.matched.length || to.meta.index === from.meta.index) {
        this.transitionName = "";
        return;
      }
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
};
</script>
<style>

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;

  /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
  transform-style: preserve-3d;
  /*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
  backface-visibility: hidden;
}

.slide-right-enter {
  opacity: 0.3;
  /* 开启硬件加速 */
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0.3;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0.3;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0.3;
  transform: translate3d(-100%, 0, 0);
}
</style>


```

### 2.滚动问题  

出于体验的考虑，tab页面一般会使用`keep-alive`的方式保存当前实例，从其他页面后退到tab页才会更加的流畅，正常`keep-alive`页面跳转到普通页面再回退，是会保持原来的滚动条状态的，但是两个`keep-alive`的tab页面，互相切换会共用滚动条，于是需要手动保存滚动位置  

```javascript

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: RouterList,
  scrollBehavior(to, from) {
    let res = { x: 0, y: 0 };
    if (saveScrollRoute.includes(to.name as string)) {
      res = {
        x: 0,
        y: saveScrollRouteHash[to?.name as string] || 0,
      };
    }
    return res
  },
});

// 修正keep-alive页面滚动条

export const saveScrollRoute = RouterList.filter((it) => it.meta.keepAlive).map(
  (it) => it.name
);
const saveScrollRouteHash = {};

router.beforeEach((to, from, next) => {
  if (saveScrollRoute.includes(from?.name as string)) {
    saveScrollRouteHash[from?.name as string] =
      document.documentElement.scrollTop || document.body.scrollTop;
  }
  next();
});

```

然后发现，从一个页面后退到 `keep-alive`页面的时候，由于动画和滚动同时进行，滚动会导致页面重排，页面出现了短暂的半屏白屏闪烁。
搞清楚了原因很好处理：

```javascript
const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: RouterList,
  scrollBehavior(to, from) {
    let res = { x: 0, y: 0 };
    if (saveScrollRoute.includes(to.name as string)) {
      res = {
        x: 0,
        y: saveScrollRouteHash[to?.name as string] || 0,
      };
    }
    // tab之间没有动画不需要延时
    if (!from.matched.length || to.meta.index === from.meta.index) {
      return res;
    }
    // 0.3s的 transform 动画和直接滚动会造成半屏白屏卡顿(商品详情回到滚动过的keep-alive首页非常明显)
    // 所以延时 0.3s 滚动
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(res);
      }, 300);
    });
  },
});


```

