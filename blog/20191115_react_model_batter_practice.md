---
title: React 写一个具有动态表单内容的组件的各种实践
category: practice
---

## React 写一个包含表单的组件的各种实践

### 缘起

弹窗+表单是一种很常见的交互设计，最近发现团队里实现这个交互的代码是各有千秋。包括但不限于：

- 弹窗默认一直是`visable=true`的状态，需要时才 render 出来，关闭时又整个暴力卸载掉，很省事儿
- 利用 componentWillReceiveProps 生命周期更新数据的做法
- 利用 getDerivedStateFromProps 生命周期更新数据
- 使用 react hooks 实现
