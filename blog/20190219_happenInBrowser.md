---
title: 网页访问全过程概述
category: study
---

## 网页访问全过程概述

### 基本过程

- 1.在用户输入url后，客户端会先把域名发送至DNS服务器，服务器会返回此域名对应的IP地址,`当然也可能直接命中浏览器DNS缓存`。DNS(Domain Name System),即[域名解析系统](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)
- 2.客户端通过IP地址锁定目标服务器，然后与服务器建立TCP网络连接。[传输控制协议（Transmission Control Protocol，缩写：TCP）](https://zh.wikipedia.org/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)
- 3.随后客户端向服务端抛出客户端的HTTP请求
- 4.服务端处理完客户端的请求之后，把目标数据放在 HTTP 响应里返回给客户端，拿到响应数据的浏览器就可以开始走一个渲染的流程。
- 5.渲染完毕，页面便呈现给了用户，并时刻等待响应用户的操作

### 浏览器渲染过程(敲黑板)

#### 浏览器内核
浏览器内核可以分成两部分：渲染引擎（Layout Engine 或者 Rendering Engine）和 JS 引擎。渲染引擎又包括了 `HTML 解释器、CSS 解释器、布局、网络、存储、图形、音视频、图片解码器等等零部件`。浏览器内核决定了浏览器解释网页语法的方式。常见的浏览器内核可以分为四种：`Trident（IE）、Gecko（火狐）、Blink（Chrome、Opera）、Webkit（Safari）`。其中Blink 其实也是基于 Webkit 衍生而来的一个分支。所以以 Webkit 为例，对现代浏览器的渲染过程进行剖析。

#### 渲染过程概念

简单来说，渲染引擎根据 HTML 文件描述构建相应的数学模型，调用浏览器各个零部件，从而将网页资源代码转换为图像结果，这个过程就是渲染过程，具体如下(`有一些操作是并行进行`)：
- `解析 HTML`  
在这一步浏览器执行了所有的加载解析逻辑，在解析 HTML 的过程中发出了页面渲染所需的各种外部资源请求。
- `计算样式`  
浏览器将识别并加载所有的 CSS 样式信息与 DOM 树合并，最终生成页面 render 树（:after :before 这样的伪元素会在这个环节被构建到 DOM 树中）。
- `计算图层布局`  
页面中所有元素的相对位置信息，大小等信息均在这一步得到计算。
- `绘制图层`  
在这一步中浏览器会根据我们的 DOM 代码结果，把每一个页面图层转换为像素，并对所有的媒体文件进行解码。
- `整合图层，得到页面`  
最后一步浏览器会合并合各个图层，将数据由 CPU 输出给 GPU 最终绘制在屏幕上。（复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层）。

::: tip
🌲解析Html会得到DOM树（DOM tree）。  
🌲解析 CSS（包括外部 CSS 文件和样式元素）创建的是 CSSOM 树.`CSSOM 的解析过程与 DOM 的解析过程是并行的。`    
🌲CSSOM 与 DOM 结合，之后我们得到的就是渲染树（Render tree ）。  
🌲从根节点递归调用，计算每一个元素的大小、位置等，给每个节点所应该出现在屏幕上的精确坐标，我们便得到了基于渲染树的布局渲染树（Layout of the render tree）。  
🌲绘制渲染树: 遍历渲染树，每个节点将使用 UI 后端层来绘制。整个过程叫做绘制渲染树（Painting the render tree）。
:::

简单总结:首先是基于 HTML 构建一个 DOM 树，这棵 DOM 树与 CSS 解释器解析出的 CSSOM 相结合，就有了布局渲染树。最后浏览器以布局渲染树为蓝本，去计算布局并绘制图像，我们页面的初次渲染就大功告成了。

之后每当一个新元素加入到这个 DOM 树当中，浏览器便会通过 CSS 引擎查遍 CSS 样式表，找到符合该元素的样式规则应用到这个元素上，然后再重新去绘制它。

### css阻塞

DOM 和 CSSOM 合力才能构建渲染树。这一点会给性能造成严重影响：默认情况下，CSS 是阻塞的资源。浏览器在构建 CSSOM 的过程中，不会渲染任何已处理的内容。即便 DOM 已经解析完毕了，只要 CSSOM 不 OK，那么渲染这个事情就不 OK（这主要是为了避免没有 CSS 的 HTML 页面丑陋地“裸奔”在用户眼前）。
即:`CSS 是阻塞渲染的资源。需要将它尽快地下载到客户端，以便缩短首次渲染的时间。`

关于这点我做了测试,
准备好简单的代码。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
<link rel="stylesheet" href="https:xxxx/css/app.8c13afb71dd90515886feb84f270afd4.css">
</head>
<body>
    123
</body>
</html>
```
然后打开chrome无痕模式，打开控制台，右上角三个点->more tools->network conditions->设置network throttling为slow 3g，然后打开这个html文件就会看到加载了好一会儿才会渲染出来。说明浏览器在遇到link就开始构建CSSOM树，在构建过程中，阻塞了页面的渲染。

### js阻塞

`JS 引擎是独立于渲染引擎存在的。`我们的 JS 代码在文档的何处插入，就在何处执行。当 HTML 解析器遇到一个 script 标签时，它会暂停渲染过程，将控制权交给 JS 引擎。除了把script标签写在末尾，也可以使用`defer 和 async`合理规避  
- async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会立即执行。  
- defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。  
::: tip
从应用的角度来说，一般脚本与 DOM 元素和其它脚本之间的依赖关系不强时，会选用 async；当脚本依赖于 DOM 元素和其它脚本的执行结果时，会选用 defer。
:::

### reference

https://juejin.im/book/5b936540f265da0a9624b04b