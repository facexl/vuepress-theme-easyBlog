---
title: fastClick的一个小坑
category: practice
---

## fastClick的一个小坑

### 前言

众所周知，移动端点击事件有300ms延迟，于是为了解决所谓`击穿`或者`反应慢`的问题，我在项目里引入了fastClick这个库

### 问题

在`钉钉浏览器`或者`QQ浏览器`，输入框聚焦会非常慢，加上这段代码就ok

```javascript

// 解决部分浏览器需要长按input
FastClick.prototype.focus = function(targetElement) {
  let length;
  let u = navigator.userAgent || '';
  let deviceIsIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // 兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
  // 这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    /* 修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘 */
    targetElement.focus();
  } else {
    targetElement.focus();
  }
};

```