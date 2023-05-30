---
title: chrome 插件开发之使用 shadow dom 避免全局 css 污染
category: study  
---  

## chrome 插件开发之使用 shadow dom 避免全局 css 污染

最近开发了chatGpt chrome 插件 [`AI-chat`](https://github.com/facexl/AI-chat)，在开发 chrome 插件的过程中，难免会往用户页面插入自己的 dom，这时候如果没有特殊处理，很容易遇到 css 全局污染的问题，
下面介绍使用 shadow-dom 解决这个问题。

### shadow dom  

shadow dom 可以将一个隐藏的、独立的 DOM 附加到一个元素上。它包含四个概念:

- Shadow host：一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM 内部的 DOM 树。
- Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- Shadow root: Shadow tree 的根节点。

### 以下是 chrome 插件 shadow root 源码（vue3）:

其中的 mode，用来控制是否可以被外部访问。  

```javascript
const prod = ()=>{
  const el = document.createElement('div')

  const shadow = el.attachShadow({mode: 'open'})

  shadow.innerHTML = `
        <link href="${chrome.runtime.getURL('style.css')}" rel="stylesheet">
        <div id="ai-chat"></div>
        `

  document.documentElement.insertBefore(el, null);

  createApp(App).mount((el.shadowRoot)!.getElementById('ai-chat') as Element)
}

const dev = ()=>{
  const el = document.createElement('div')

  el.id = 'ai-chat'

  document.documentElement.insertBefore(el, null);

  createApp(App).mount(el)
}

// prod()

isProd?prod():dev()

```

(由于开发环境的 css 引入不一样，采用了 dev 和 build 两种模式)

### shadow dom 的事件(mode:open):  

- 当事件在组件外部捕获时，shadow DOM 中发生的事件将会以 host 元素作为目标。

- 使用 event.composedPath() 获得原始事件目标的完整路径以及所有 shadow 元素  

这在判断点击事件发生在shadow内部还是外部尤其有用  比如下面的插件源码:

分别处理的线上环境的 shadow dom 的情况和开发环境普通 dom 的情况

```javascript
const down = (event)=>{
  const target = state.showtrans?panel.value.$el:icon.value;

  // shadow dom 和 普通 dom 这里判断不一样
  const isClickInsideTargetDiv = isProd?event.composedPath().includes(target):target?.contains(event.target);

  if (!isClickInsideTargetDiv) {
    state.showicon = false

    state.showtrans = false

    document.removeEventListener('mousedown',down)
  }
}
```