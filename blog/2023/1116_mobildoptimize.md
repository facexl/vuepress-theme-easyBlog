---
title: 移动端开发总结(二)    
category: practice  
---  

## 移动端 h5 spa 的几个通用优化( vue3 )    

### 1.模拟原生 app 页面跳转刷新逻辑  

原生描述：A页面->B页面->C页面   
前进时刚进每个页面都会刷新，C后退到B，`C会销毁`，B不会刷新，`并且保持滚动位置`  

```javascript 

// 1.路由加上页面层级  
// ...
meta: { title: "首页", keepAlive: true, index: 0 },
meta: { title: "列表", keepAlive: true, index: 10 },
meta: { title: "详情", keepAlive: true, index: 20 },
// ...  
// 2.数据初始化
export const AppAlivePage = reactive<{
  raw:{
    name:string,
    meta:any,
    path:string
  }[],
  names:string[],
  scroll:{
    [key:string]:number
  },
  init:(routes:any)=>void
    }>({
      raw:[],
      names:[],
      scroll:{},
      init(routes){
        this.raw = routes.filter(it=>it.meta.keepAlive).map(it=>{
          return {
            name:it.name,
            meta:it.meta,
            path:it.path
          }
        })
        this.names = this.raw.map(it=>it.name)
      }
    })
AppAlivePage.init(RouterList)

// 3.记录keep-alive页面的滚动位置并且恢复   

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: RouterList,
  scrollBehavior(to, from) {
    let res = { x: 0, y: 0 };
    if (AppAlivePage.names.includes(to.name as string)) {
      res = {
        x: 0,
        y: AppAlivePage.scroll[to?.name as string] || 0,
      };
    }
    // tab之间没有动画不需要延时
    if (!from.matched.length || to.meta.index === from.meta.index) {
      return res;
    }
    // 0.3s的 transform 动画和直接滚动会造成半屏白屏卡顿(商品详情回到滚动过的keep-alive首页非常明显)
    // 所以延时 0.3s 滚动
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res);
      }, 300);
    });
  },
});

router.beforeEach(async (to, from, next) => {
    if (AppAlivePage.names.includes(from?.name as string)) {
      AppAlivePage.scroll[from?.name as string] =
        document.documentElement.scrollTop || document.body.scrollTop;
    }
})

// 4.app.vue 配置 keep-alive组件
<transition :name="state.transitionName">
    <keep-alive :include="AppAlivePage.names">
        <router-view />
    </keep-alive>
</transition>
const state = reactive({
    currentIndex:0
})
// 5.监听路由变化
watch(route,(to, from)=>{
  state.currentIndex = to.meta.index || 0
  AppAlivePage.names = AppAlivePage.raw.filter(it=>{
    if(it.meta.index<=state.currentIndex){
      return true
    }else{
      // 真实设备重新进入目标页面还可能滚动到之前位置(可能是接口很快的情况下)  重置下滚动  
      AppAlivePage.scroll[it.name] = 0
    }
  }).map(it=>it.name)
})

```

### 2.模拟原生 app 页面切换动画  

- 注意点1：使用`transform3D`硬件加速动画  
- 注意点2：后退恢复页面滚动时注意不能和动画阻塞 (见前面vue-router部分代码)  

```javascript
// app.vue
<transition :name="state.transitionName">
    <keep-alive :include="AppAlivePage.names">
        <router-view />
    </keep-alive>
</transition>
watch(route,(to, from)=>{
    if (!from.matched.length || to.meta.index === from.meta.index) {
        this.transitionName = "";
        return;
    }
    if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
    } else {
        this.transitionName = "slide-right";
    }
})

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

### 3.模拟原生 app 手势操作  

由于有的页面左右滑动是前进后退，有的页面是tab切换，需要支持定制，首页做一个全局的封装：

```javascript

export const touchEvent:{
  left:(()=>void) | null,
  right:(()=>void) | null,
} = {
  left:null,
  right:null
}
export const useTouch = ()=>{
  let xDown:number|null = null;
  let yDown:number|null = null;
  const dis = 50;
  let direction:'left'|'right'|'' = ''
  onMounted(()=>{
    bind()
  })
  onUnmounted(()=>{
    unbind()
  })
  const bind = ()=>{
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }
  const unbind=()=>{
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }
  const handleTouchStart = (event:TouchEvent)=>{
    // console.log('start')
    const firstTouch = event.changedTouches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  const handleTouchMove = (event:TouchEvent)=>{
    // console.log('ing')
    if (!xDown || !yDown) {
      xDown = 0
      yDown = 0
      return;
    }
    const xDiff = event.changedTouches[0].clientX - xDown;
    const yDiff = event.changedTouches[0].clientY - yDown;

    if (Math.abs(xDiff) < Math.abs(yDiff)) {
      if(direction){
      // console.log("中途上下滑动");
      // 中途上下滑动
      }else{
      // console.log("上下滑动 不管");
      // 一开始就上下滑动
        return
      }
    }

    // 第一时间判断是左还是右
    if(!direction){
      if (xDiff > dis) {
        console.log("手指向右，左滑");
        direction = 'right'
        touchEvent.left?touchEvent.left():window.history.go(-1)
        handleTouchEnd()
      } else if (xDiff < -dis) {
        console.log("手指向左，右滑");
        direction = 'left'
        touchEvent.right?touchEvent.right():window.history.go(1)
        handleTouchEnd()
      }
    }
  }
  const handleTouchEnd = ()=>{
    // console.log('end')
    xDown = 0
    yDown = 0
    direction = ''
  }
}


// 不传参的话等于关闭默认全局手势事件
export const useTabTouch = (left?,right?)=>{
  onActivated(()=>{
    bind()
  })
  onMounted(()=>{
    bind()
  })
  onUnmounted(()=>{
    unbind()
  })
  onDeactivated(()=>{
    unbind()
  })
  const bind = ()=>{
    touchEvent.left = ()=>{
      left && left()
    }
    touchEvent.right = ()=>{
      right && right()
    }
  }
  const unbind=()=>{
    touchEvent.left = null
    touchEvent.right = null
  }
}
```