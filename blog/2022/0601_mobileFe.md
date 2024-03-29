---
title: 移动端开发总结(一)  
category: study  
---  

## 移动端开发总结  

### 1.Meta  

以下是各种各样的特殊功能的`meta`标签:

```html
    <meta charset="UTF-8" />
    <!-- 优先使用最新版本 IE 和 Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
    <!-- 禁止屏幕旋转 -->
    <meta name="screen-orientation" content="portrait">
    <!-- 全屏显示 -->
    <meta name="full-screen" content="yes">
    <!-- UC应用模式，使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示 -->
    <meta name="browsermode" content="application">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">         
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">  
    <!-- 关闭电话自动识别 -->
    <meta name="format-detection" content="telephone=no" />
    <!-- 关闭邮箱自动识别 -->
    <meta content="email=no" name="format-detection" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"/>
    <!-- 拒绝各种缓存 未亲测是否有效 -->
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    <!-- 添加到主屏后的标题（IOS） -->
    <meta name="apple-mobile-web-app-title" content="AMSZ"> 
    <!-- 启用 WebApp 全屏模式（IOS）:当网站添加到主屏幕后再点击进行启动时，可隐藏地址栏（从浏览器跳转或输入链接进入并没有此效果 -->
    <meta name="apple-mobile-web-app-capable" content="yes" /> 
    <meta name="apple-touch-fullscreen" content="yes" /> 
    <!-- 百度禁止转码:通过百度手机打开网页时，百度可能会对你的网页进行转码，往你页面贴上它的广告，非常之恶心。不过我们可以通过这个meta标签来禁止它： -->
    <meta http-equiv="Cache-Control" content="no-siteapp" />
```

其中最重要的`viewport`单独解释:
```html
<meta 
    name="viewport" 
    content="
        width=device-width,(定义视口的宽度，单位为像素,正整数或设备宽度device-width)
        initial-scale=1.0,(定义网页初始缩放值) 
        user-scalable=no, (定义用户是否可以缩放) 
        minimum-sacle=1, (定义缩放最小值)
        maximum-scale=1,  (定义缩放最大值)
        viewport-fit=cover 刘海安全区域适配
    "
>
```

### 2.点击事件  

#### 下面将验证 

- 没设置 viewport 
- 设置 viewport 
- 使用 fastclick  

下面用这段代码来测试:
```vue
<template>
    <button @click="click" @touchstart="touch">click here</button>
    <div>click time:{{count}}</div>
    <div>touch time:{{count2}}</div>
    <div>difference:{{count-count2}}</div>
</template>
<script setup lang="ts">
const count = ref(0)
const count2 = ref(0)
const click = _=>{
    count.value = +new Date()
}
const touch = _=>{
    count2.value = +new Date()
}
</script>
<style>
button {
  width:200px;
  height:100px;
}
</style>

```
#### 测试结果：
![](http://tva1.sinaimg.cn/large/00729zFjly1h3npogk0f5j30bw0a6mxu.jpg)  
可以看到`click`相比`touchstart`有大概`300ms`的延迟，这是因为浏览器要判断用户是否是双击缩放操作，预留了300ms时间判断。
根据这个原因，我们可以在html中加入以下代码禁掉缩放：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
#### 测试结果:
![](http://tva1.sinaimg.cn/large/00729zFjly1h3npw3fiwrj30d60a2t9e.jpg)  
差距被缩减到`50ms`左右,人眼已经很难分辨。  

使用 `fastclick`:
```javascript
import FastClick from 'fastclick';
FastClick(document.body)
```
这种情况下`html`不加入禁止缩放同样可以实现差距`50ms`左右  

![](http://tva1.sinaimg.cn/large/00729zFjly1h3nqd6hxdbj308w07gwer.jpg)

#### 总结：  

`由于fastclick有一些潜在的 bug ,加上现代浏览器加上 viewport 已经有较好的体验，建议只需要设置 viewport就行`

### 3.屏幕适配  

`viewport`即视窗宽度，移动端默认`980px`，可以通过`meta`标签设置`viewport`

```html
<meta 
    name="viewport" 
    content="
        width=device-width,(定义视口的宽度，单位为像素,正整数或设备宽度device-width)
        initial-scale=1.0,(定义网页初始缩放值) 
        user-scalable=no, (定义用户是否可以缩放) 
        minimum-sacle=1, (定义缩放最小值)
        maximum-scale=1,  (定义缩放最大值)
        viewport-fit=cover 刘海安全区域适配
    "
>
```
#### rem
rem依然是最常见的屏幕适配方案，它的缺点是`在大屏设备（Pad）上，元素尺寸会很大，页面显示更少的内容。`,简单的`setRem`:  
注意这段代码放在`head`标签，因为`DOMContentLoaded`事件需要提前绑定
```javascript
var docEl = document.documentElement;
var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
var recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    var value = 16 * (clientWidth / 375);
    docEl.style.fontSize = `${value}px`;
};
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener("DOMContentLoaded", recalc, false);

```

可以通过 webpack 插件`postcss-pxtorem`或`postcss-plugin-px2rem`自动转换 px 为 rem 单位  

微信的关怀模式会在body上强行加入内联样式`-webkit-text-size-adjust:140%;`放大字体；我们在全局样式加上这个`-webkit-text-size-adjust:100% !important;`覆盖掉即可  

针对大屏改进方案：  
- 1.限制 rem 的最大值，
- 2.通过媒体查询，限制内容最大宽度  

#### 其他适配方案  

比如`vw/vh`、百分比布局、通过媒体查询响应式布局、px 为主，搭配 vw/vh、媒体查询与 flex 进行布局。暂不做详细介绍。  

### 4.常用 css

- 禁止ios和android用户选中文字 `-webkit-user-select:none`
- 禁止ios长按时触发系统的菜单，禁止ios&android长按时下载图片`-webkit-touch-callout: none`
- webkit去除表单元素的默认样式`-webkit-appearance:none`
- 修改webkit表单输入框placeholder的样式`input::-webkit-input-placeholder{color:#AAAAAA;}input:focus::-webkit-input-placeholder{color:#EEEEEE;}`
- 去除android a/button/input标签被点击时产生的边框 & 去除ios a标签被点击时产生的半透明灰色背景`a,button,input{-webkit-tap-highlight-color:rgba(255,0,0,0);}`
- ios使用-webkit-text-size-adjust禁止调整字体大小`body{-webkit-text-size-adjust: 100%!important;}`
- android 上去掉语音输入按钮`input::-webkit-input-speech-button {display: none}`
- 区域性 overflow: scroll | auto 滚动时使用原生效果：`-webkit-overflow-scrolling: touch `（ios8+，Android4.0+）android
- 使用伪类放大小图标点击区域  `.expand--click{position: relative;}` `  .expand--click::after{
    position: absolute;
    content:' ';
    left:-20px;
    right:-20px;
    top:-20px;
    bottom:-20px;
  }`
- 1px 细线：
```css
  .border1 {
    border-width: 1px;
    border-style: solid;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border1 {
      border-width: 0.5px;
    }
  }
  
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border1 {
      border-width: 0.333333px;
    }
  }
```

### 5.滑动穿透  
弹窗背景有滚动条时，可以在弹窗本身上阻止掉`touchmove`的默认事件，从而不引起背景滚动，如以下代码所示：  
```vue
<template>
    <div style="height:200vh">
        <div @touchmove.prevent class="popup">
            <div class="popup-mask"></div>
            <div class="popup-body popup-bottom">
                <div class="header">我是标题</div>
                <div class="content">
                <div>0</div>        
                <div>1</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.popup-mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 998;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.popup-body {
  padding: 0 50px 40px;
  background-color: #fff;
  position: fixed;
  z-index: 999;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>
```

### 6.动画硬件加速  

现代浏览器都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，最显著的特征的元素的3D变换。

在一些情况下，我们并不需要对元素应用3D变换的效果，这时候我们可以使用个小技巧“欺骗”浏览器来开启硬件加速。

虽然我们可能不想对元素应用3D变换，可我们一样可以开启3D引擎。例如我们可以用transform: translateZ(0); 来开启硬件加速 。

```css
.div {
   transform: translateZ(0);
   /* Other transform properties here */
}
```