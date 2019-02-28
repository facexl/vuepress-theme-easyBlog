---
title: 移动端屏幕适配解决方案
date: 2018/08/24
category: practice
---

## 移动端屏幕适配解决方案

### rem适配

```javascript

/**
 * doc document
 * win window
 */
const setRem =  (doc, win) => {

  let docEl = doc.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function () {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    win.__docW = clientWidth;
    win.__docH = docEl.clientHeight;
    if (clientWidth < 750) {
      let rem = (20 * clientWidth * 1.6 / 750);
      docEl.style.fontSize = rem + 'px';
      win.REM = rem;
    } else {
      docEl.style.fontSize = '32px';
      win.REM = 32;
    }
    docEl.style.opacity = 1;
  };
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  recalc();
  docEl.style.opacity = 0;
  win.rem2px = function(f) { return parseFloat(f) * win.REM };
  win.px2rem = function(f) { return parseFloat(f) / win.REM };

};

export default setRem;

```

### 1px问题

由于不同设备的dpr不一样（[什么是dpr?](https://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)）,1px的边框渲染出来，有的设备（dpr高的设备）会粗一些。解决方案:
```css
.border { border: 1px solid #999 }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border { border: 0.5px solid #999 }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border { border: 0.333333px solid #999 }
}
```