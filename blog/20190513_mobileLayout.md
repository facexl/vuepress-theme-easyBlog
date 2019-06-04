---
title: 移动端屏幕适配解决方案
category: practice
---

## 移动端屏幕适配解决方案

### 1.rem 适配

`rem` 相对于网页根元素 (html) 的字体大小来计算，所以改变 html 字体大小就可以控制整个页面的元素尺寸。而 `em` 则是根据父元素的字体大小进行计算，所以 `rem` 更加简洁易用。以下是通过 `js` 监听屏幕大小及变化，动态改变 `html` 字体大小的示例。透明度的设置只是为了让改变的过程隐藏起来，加上动画效果更加。

```javascript

let docEl = document.documentElement;
let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
let recalc = function () {
    let clientWidth = docEl.clientWidth;
    let rem;
    rem = 100 * (clientWidth / 750);
    docEl.style.fontSize = rem + 'px';
    (docEl as any).style.opacity = 1;
};
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);
recalc();
docEl.style.opacity = 0;

```

手机淘宝团队在今年已经不用 rem 了，因为找到了更好的`vw`适配方案

### 2.vw 适配

9012年了可以看看 vw 的支持情况：

![](http://img.xlcool.cn/FikFEjj_LUuFWnKSa3BtPhkC2OV7)

可以看到形式已经相当不错，`1vw` 等于屏幕宽度的 `1%`，比如设计稿按 750px 设计，那么 75px 的宽度就可以设置为 0.1vw 。如果嫌弃计算太麻烦，可以使用 `postcss-px-to-viewport` 插件。  `vw`再我看来仍然有点小瑕疵，我注意到，手动改变屏幕宽度并不会触发重新计算，手机打开淘宝会发现，竖屏切换至横屏时，淘宝团队的做法是重新加载了整个页面。这看起来并不十分完美。