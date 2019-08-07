---
title: canvas 小记
category: practice
---

## canvas 小记

### 缘起

h5 需要动态生成图片给用户保存

### 1.生成的 canvas 在 Rinta 屏上会很模糊

解决方案，根据 `dpr` 来绘制

```javascript

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

// 假设视图宽高
const w = 350 
const h = 450

// canvas绘制范围
canvas.width = dpr * w
canvas.height = dpr * h
// canvas实际宽高
canvas.style.width = w + 'px'
canvas.style.height = h + 'px'

// 假设 dpr 为 2  那么结果就相当于绘制一个两倍的 canvas 然后进行了缩放 效果会清晰很多

ctx.drawImage(img, dpr * x, dpr * y, dpr * 100, dpr * 60)

```

### 2.转化成图片给用户保存时，调用 `canvas.toDataURL('image/png')`报错

`DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported`

这是因为在`canvas`中使用了跨域的图片，污染了画布，`canvas`一旦被污染就不能使用`toBlob(), toDataURL() 和 getImageData()`等方法。

解决方案:

```javascript

img  = new Image()
img.onload = ()=>{
    // canvas draw
}
img.src = 'xx'
img.setAttribute('crossOrigin', 'Anonymous')  //这样一来就可以正常导出图片了

```

