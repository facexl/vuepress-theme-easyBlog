---
title: 渲染10w长度列表解决方案  
category: practice
---

## 渲染10w长度列表解决方案  

### 开头  

之前写了一篇[长列表卡顿优化](/blog/20200622_longListOptmize.html)，由于比较着急，紧急解决了问题，文章也指出了不足之处。

```javascript
虽然当前场景基本解决了，但明显普适性不够，缺点非常明显：
- 1.每列必须固定高度
- 2.如果页面因为一些交互导致整个页面高度变了，需要重置每个列的offsetTop
- 3.并不是真正意义的无限，毕竟每增加一列，还是会增加一个div
```

好巧不巧，另外一个系统又出现这种问题，还是B端的，商品sku排列组合，很容易组合出了上万条数据，浏览器变得非常卡。这次换了新的，真正支持无限滚动的方案，下面的抽出来的核心逻辑 demo (vue2.0版)

```javascript

<template>
  <div class="box">
    <div :style="{ height: topHeight + 'px' }" class="top"></div>
    <div
      class="item"
      :style="{ height: itemHeight + 'px' }"
      :key="item"
      v-for="item in list"
    >
      {{ item }}
    </div>
    <div :style="{ height: bottomHeight + 'px' }" class="bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      originList: new Array(100000).fill(0).map((it, i) => i + 1),
      list: [],
      maxItems: 0,
      topHeight: 0,
      bottomHeight: 0,
      itemHeight: 60
    };
  },
  mounted() {
    this.maxItems = Math.ceil(
      document.documentElement.clientHeight / this.itemHeight
    );
    if (this.originList.length <= this.maxItems) {
      this.list = this.originList;
      return;
    }
    window.addEventListener("scroll", this.calculate);
    window.addEventListener("resize", this.resize);
    this.calculate();
  },
  methods: {
    resize() {
      this.maxItems = Math.ceil(
        document.documentElement.clientHeight / this.itemHeight
      );
      this.calculate();
    },
    calculate() {
      const scrollTop = document.documentElement.scrollTop;
      const len = this.originList.length;
      let start = 0;
      let end = 0;

      start = Math.floor((scrollTop - this.$el.offsetTop) / this.itemHeight);
      if (start + this.maxItems > len) {
        start = len - this.maxItems;
      }
      end = start + this.maxItems;

      this.list = this.originList.slice(start, end);

      this.topHeight = start * this.itemHeight;

      this.bottomHeight =
        this.originList.length * this.itemHeight -
        (this.maxItems * this.itemHeight + this.topHeight);
      console.log(
        `start`,
        start,
        `end`,
        end,
        "topHeight",
        this.topHeight,
        "bottomHeight",
        this.bottomHeight
      );
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.calculate);
    window.removeEventListener("resize", this.resize);
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
  color: blueviolet;
}
</style>


```

### 说下过程  

事实上解决这次的性能问题过程比 `demo` 体现出来的看起来复杂得多。  

首先，我接到的问题描述十分精炼  

`你看看这个页面怎么这么卡?`  

我一点开，等了5分钟，得亏浏览器没有奔溃，我才看到一点页面头子，想滚动还不行，滚一下卡几十秒，完全不能分析，只能硬啃代码。  

还好性能优化是有门道的，从页面白屏时间远远超出请求时间来看，绝对不光是渲染列表问题，大概率还有 js 耗时问题。  

代码打开就注意到了显眼的双重 `forEach`  

虽然列表长度只有 1000 多，双循环直接就变成了执行 1000^2 次！  

这种复杂度O(n2)的写法真应该禁止掉  

最开始想着怎么快怎么解决，结果只是换成了 `for` ，再加上一些条件下 `break`，这样一来确实减少了函数创建时间和循环执行次数，然而明显
算法复杂度没有变，并没有什么卵用。

索性换了算法，把其中一个循环体换成了 hash ,用空间换来了时间  

然后才进入到长列表渲染问题...  