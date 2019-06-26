---
title: vue 常用组件插件化
category: practice
---

## vue 常用组件插件化

### 概述

最近在使用 `vuetifyjs` 这个组件库，发现它并不像 `vux`、`element` 等组件库一样对常用组件插架化，于是自己尝试了下组件变插件。

### 举个🌰

首先编写一个正常的组件，比如写个 loading

```html

<template>
    <div class="common-loading" v-show="show">
         <v-progress-circular indeterminate :color="color"></v-progress-circular>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            color: 'red',
        };
    },
};
</script>

```

### 插件代码

```javascript

import comloading from '@/components/loading.vue';
import { mergeOptions } from './helper';

let $vm;
const plugin = {
    install(vue, options) {
        const Loading = vue.extend(comloading);
        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div'),
            });
            document.body.appendChild($vm.$el);
        }
        const loading = {
            show(opts = {}) {
                mergeOptions($vm, Object.assign({
                    show: true,
                }, opts));
            },
            hide() {
                $vm.show = false;
            },
        };
        // 自己写的插件 集中在一个对象上
        // 挂在全局 让一些没有 vm 实例的地方也能用
        if (vue.$xl) {
            vue.$xl.loading = loading;
        } else {
            vue.$xl = { loading };
        }
        // 混入当前实例
        vue.mixin({
            created() {
                this.$xl = vue.$xl;
            },
        });
    },
};

export default plugin;
export const { install } = plugin;

```

其中的 mergeOptions 

```javascript
const mergeOptions = function ($vm, options) {
    const defaults = {};
    for (const i in $vm.$options.props) {
        if (i !== 'value') {
            defaults[i] = $vm.$options.props[i].default;
        }
    }
    const _options = Object.assign({}, defaults, options);
    for (const i in _options) {
        $vm[i] = _options[i];
    }
};

export {
    mergeOptions,
};
```

最后在入口文件(`main.js`)注册下就好了
```javascript
import { loading } from '@/plugins/index';

Vue.use(loading)

```

### 调用

```javascript

this.$xl.loading.show()

// 或

Vue.$xl.loading.show()

```

例子比较简单，实际开发中 可以在（比如上面的`show`方法）里对 `vm` 进行各种操作，包括注册 `watcher`等等。






