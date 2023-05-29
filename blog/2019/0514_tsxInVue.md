---
title: 在 vue 中使用 tsx
category: practice
---


::: danger
鉴于 vue3.0 放弃了 class api 。。这篇文章的写法没什么用了
:::

## 在 vue 中使用 tsx

`vue3.0` 即将全面支持 `typeScript`，`vue-cli3` 也已经支持 ts ，喜欢尝鲜的同学可以试试 tsx 开发 vue 项目了。

### Quick Start

```
yarn add global @vue/cli // 当前版本是 3.7.0

vue create tsx-test-vue

cd tsx-test-vue

yarn serve

```

创建项目过程中选择 `Manually select features` ,然后除了单元测试和 pwa ，其他都选上，后面的一路同意过去就行了。

### 第一个 tsx 文件

删除 `Home.vue` 新建 `Home.tsx`，然后删除  `App.vue` 多余内容，修改 `router.ts` 中的 `Home`模块导入，去除其 `.vue`后缀。以下是 `Home.tsx`中的代码：

```javascript
import { Component, Vue } from 'vue-property-decorator'

@Component

export default class App extends Vue {
  protected render () {
    return <div>Hello Tsx</div>
  }
}
```
#### 结果如下
![](http://img.xlcool.cn/FvaoE0Dg_4CYZ23D0N8lNj1pvxq0)

### tsx 中使用 vue 特性

### lifeCycle & v-model & watch 

```javascript
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component

export default class App extends Vue {
  public value:string = ''
  public newValue:string = ''
  public oldValue:string = ''

  @Watch('value')

  protected valueWatch (newV:string, old:string) {
    this.newValue = newV
    this.oldValue = old
  }

  @Watch('newValue')
  protected newValueWatch (v:string) {
    console.log(v)
  }

  public created () {
    console.log('created')
  }
  public mounted(){
      console.log('mounted')
  }

  protected render () {
    return (
      <div>
        <input v-model={this.value} type="text"/>
        <div>上次输入:{this.oldValue}这次输入:{this.newValue}</div>
      </div>
    )
  }
}
```
#### 结果如下
![](http://img.xlcool.cn/Fu0UzM7B4YvbGU8YLEJd8ht_ET_g)

### computed & methods

```javascript

import { Component, Vue, Watch } from 'vue-property-decorator'

@Component

export default class App extends Vue {
  public click:number = 0

  public add () {
    this.click++
  }

  public get count () {
    return this.click % 2 ? 'yes' : 'no'
  }

  protected render () {
    return (
      <div>
        <div onClick={this.add}>click</div>
        <div>{this.click}</div>
        <div>click count is odd:{this.count}</div>
      </div>
    )
  }
}

```
#### 结果如下
![](http://img.xlcool.cn/FpL4mX4yenuwZzNftaHfFPxRQryU)

### 组件及组件间通信

```javascript
// 父组件
import { Component, Vue } from 'vue-property-decorator'
import Child from './child'

@Component

export default class App extends Vue {
  public childWords:string = ''
  public getWords (v:string) {
    this.childWords = v
  }
  protected render () {
    return (
      <div>
        <Child onSaySth={this.getWords} fatherWords="Girls are liar" />
        <div>I am father</div>
        <div>my child told me -> <span style="color:red;margin-right:20px">{this.childWords}</span></div>
      </div>
    )
  }
}

// 子组件
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component

export default class Child extends Vue {
  @Prop(String) readonly fatherWords!: string

  public told () {
    this.$emit('saySth', 'Yes , Mom always lie to you')
  }

  protected render () {
    return (
      <div>
        <div>I am child</div>
        <div>my father told me -> <span style="color:red;margin-right:20px">{this.fatherWords}</span><button onClick={this.told}>Told father sth</button></div>
      </div>
    )
  }
}

```
#### 结果如下
![](http://img.xlcool.cn/FoFMStnh9kv5wdNBmBf0GREk4poS)

[关于 Props 的各种写法戳这里](https://github.com/kaorun343/vue-property-decorator)
