---
title: 编写一个 vite 插件预处理 vue3 代码  
category: practice    
---

## 编写一个 vite 插件预处理 vue3 代码  

### 前言  

[上一篇文章](/blog/20220408_scriptsetupadvise.html)说到,在把`setup`重构成`script setup`过程中遇到一点小麻烦，我给`vuejs/core`项目提出了建议，如预期被驳回了，`vue3`团队维护人员表示`不考虑在核心源码库实现这种功能，实在需要建议以 vite 插件的形式`，并给了一个插件[例子](https://github.com/antfu/unplugin-auto-import)。我十分理解过多的语法糖、编译宏可能会让`vue`项目变得更加混乱，但这并不影响我们自己折腾。

### 需求分析  

- 添加一个编译宏使`return toRefs`解构的写法可以继续使用  
- 编译期间自动`import missing dependencies`  
- 编译期间检查编译后可以造成的语法错误（`duplicate key`），并中断编译抛出错误  

### 开发  

#### vite plugin 示例

一个`vite`的`plugin`可以像下面这样简单  

```javascript
import type { Plugin } from 'vite'
const fileRegex = /\.vue$/
export default function fn():Plugin {
  return {
    name: 'pluginName',
    transform(src, id):any {
      if (fileRegex.test(id)) {
        return {
          code: transformFile(src),
        }
      }
    }
  }
}
```
只需要编写`transformFile`就行，其中`src`是文件内容字符串。  

#### Ast 转换  

由于编程的写法多变，很难直接处理字符串达到目的，通常需要借助`ast语法树分析`。  
我们知道`bable`就是通过`babylon`生成`AST语法树`,然后使用`babel-traverse`对其遍历，然后进行添加、更新及移除等操作。然后通过`babel-generator`再将`ast`转换为`js`代码。实现 es6 转换成 es5 的强大功能。`babel-core`整合了这些功能暴露出相关`Api`我们可以直接使用。  
但是`.vue`文件是特殊的文件，并不能直接使用`babel-core`，还好尤大单独导出了`vue/compiler-sfc`，暴露了转换`.vue`文件的`api`。  

```javascript
import { parse,babelParse } from 'vue/compiler-sfc'

function transformFile(src){

    const { descriptor } = parse(src) // 得到解析sfc后的对象 

    const scriptAst = babelParse(descriptor.scriptSetup.content, { // 取出 script setup 标签中的 js 代码 转换为 ast  
        plugins:[],
        sourceType: 'module'
    }).program

    // do whatever you want to do and return result  
}

```

###  以下是我实现 defineReactive 宏的代码，[完整仓库链接](https://github.com/facexl/vite-plugin-vue3-define-reactive) 
