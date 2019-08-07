---
title: 请求封装结合webpack智能提示
category: practice
---

## 请求封装结合 webpack 智能提示

### 引言

`工欲善其事，必先利其器`。为了提高开发效率，减少傻瓜错误，提高维护性。我为前端发请求好好折腾了一下。

### 目标

- 请求需要处理常规业务异常
- 请求高度可配置
- 调用时有参数智能提示
- 由于 ts 接口写起来比较繁琐，有规律性的,希望利用 webpack 自动生成

### 1.请求封装

主要注意，不管是啥情况都要顺着 promise 往外抛，特别是异常情况，即便处理了也要给到调用方 catch 的机会

```javascript

import axios from 'axios'
import Vue from 'vue'
import Router from '@/router'
import { message } from 'ant-design-vue'

export interface AxiosConfig{
    loading?: boolean;
    loadingDesc?: string;
    auth?: boolean;
    errorFuck?: boolean;
    success?:boolean;
    successText?:string;
    thirdApi?:boolean;
}

// eslint-disable-next-line max-len
export const $axios = function (apiKey: string, params = {}, config: AxiosConfig = {}, otherConfig = {}) {
  const apiConfig = {
    loading: true,
    loadingDesc: '加载中',
    auth: true,
    errorFuck: true,
    success: false,
    successText: '操作成功',
    thirdApi: false,
    ...config
  }

  if (otherConfig.headers) {
    otherConfig.headers.Authorization = `Bearer ${local.get('accessToken')}`
  } else {
    otherConfig.headers = { Authorization: `Bearer ${local.get('accessToken')}` }
  }

  apiConfig.loading && Vue.$xl.loading.show()

  const apiUrlArr = apiKey.split(' ')

  return axios({
    method: apiUrlArr[0],
    url: apiUrlArr[1],
    data: _params,
    params: apiUrlArr[0].toLowerCase() === 'get' ? _params : {},
    ...otherConfig
  }).then((res: any) => {
    apiConfig.loading && Vue.$xl.loading.hide()
    if (apiConfig.thirdApi) {
      return res.data
    }

    if (res.data.code === 2) {
        if (apiConfig.auth) {
            message.error('未登录，即将前往登录页面..')
            Router.replace({
                name: 'Login',
                query: { redirect: Router.currentRoute.fullPath }
            })
            throw res.data
        }
    }

    if (!res.data.success) {
      apiConfig.errorFuck && message.error(res.data.msg)
      throw res.data
    }
    apiConfig.success && message.info(apiConfig.successText)
    return res.data
  }).catch((err: any) => {
    apiConfig.loading && Vue.$xl.loading.hide()
    if (err.response) {
      switch (err.response.status) {
        case 500:
          message.error('系统异常')
          console.log('fuck 500')
          break
        default:
          console.log('fuck 500', err.response.status)
      }
    } else {
      console.log(err)
    }
    // eslint-disable-next-line no-throw-literal
    throw 'opps An unexpected error occured'
  })
}

```

### 2.利用 webpack 的 `require.context` 收集接口 url

我的目录是这样的
```javascript

api
    ---@types
            ---api.ts // ts 接口用以做到智能提示
            ---generate.js // 生成 api.ts
    ---modules
            ---a.ts // 各个接口 url
            ---b.ts
            ...
    ---axiosSet.ts   // axios 封装后的代码
    ---index.ts  // api 处理完成的输出对象
    
```
在 `index.ts` 中需要收集所有的 `modules` 并且注册为调用 `axios` 的方法

```javascript

// modules下的 xx.ts 长这样:

export default {
    getSth:'get /xx',
    postSth:'post /xxx',
    ...
}

```

在 `index.ts` 就可以：

```javascript

import { $axios, AxiosConfig } from '@/Global/api/axiosSet'
import { Api } from '@/Global/api/@types/api'

console.time()

const originModule = require.context('./modules', true, /\.ts/)

const $api:Api = {}

originModule.keys().forEach((it) => {
  let o = originModule(it).default
  Object.keys(o).forEach(key => {
    o[`_${key}`] = o[key]
    o[key] = function (params:{} = {}, config:AxiosConfig = {}, otherConfig:{} = {}) {
      return $axios(o[`_${key}`], params, config, otherConfig)
    }
  })
  $api[it.replace(/\.\/(.+)\.ts$/, '$1')] = originModule(it).default
})

console.timeEnd()

export default Object.freeze($api)

```
现在导出的 `$api` 是这样的:

![](http://img.xlcool.cn/FqxKBvUTVgsoxh1pMoxk0hlEr8LH)

调用接口即: `$api.a.getSth()`


### 3.把`index.ts`导出挂载在 `vue` 实例上

```javascript

// main.ts:
import $api from '@/api/index'
Vue.prototype.$api = $api

```
主要注意需要在 `.d.ts`中声明，在项目任何位置都可以，不过建议在`@types`中，创建 `vue.d.ts`:

```javascript
import Vue from 'vue'
import api from '@/api/index'
declare module 'vue/types/vue'{
    interface Vue{
        $api:typeof api
    }
}

```

### 4.手写 `@/types/api.ts` 感受提示效果

```javascript

import { AxiosConfig } from '@/api/axiosSet'
interface Res<T> {
    data:{},
    body:T
}
interface Params{
    pageSize?:number,
    page?:number,
    id?:number,
    [key:string]:any
}
interface ResFunction{
    (params:Params, config:AxiosConfig, otherConfig:{}):Promise<Res<any>>
}
export interface Api{
    a?:aContent,
    b?:bContent,
    [key:string]:any
}
export interface aContent{
    getSth:ResFunction,
    postSth:ResFunction,
    _getSth:string,
    _postSth:string,
    [key:string]:any
}

```
在 `vue` 实例中:
![](http://img.xlcool.cn/FowVZUnfDMIMX23oSoD2vKL8CICM)

![](http://img.xlcool.cn/FqtSjLe3Sn9ypMhLKsUXPUKB3vDT)

这样一来写起来已经相当爽了，但不得不面对一行行写 `interface` 的事实，仔细观察其实这个文件是很有规律性的，完全可以交给工具生成，你说没有现成的 `webpack`插件？那我们就来写一个。

### 5.自动生成`@/types/api.ts`

```javascript

// generate.js

const fs = require('fs')
const path = require('path')
const join = require('path').join

const CONFIG = {
  // 源文件 根据这里生成 interface
  apiPath: join(__dirname, '../modules'),
  // 目标文件上方的固定内容
  baseContent: `import { AxiosConfig } from '@/api/axiosSet'
interface Res<T> {
    data:{},
    body:T
}
interface Params{
    pageSize?:number,
    page?:number,
    id?:number,
    [key:string]:any
}
interface ResFunction{
    (params:Params, config:AxiosConfig, otherConfig:{}):Promise<Res<any>>
}`,
  // 输出
  outPut: 'src/api/@types/api.ts'
}

/**
 * 读取文件路径
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
const findSync = (startPath) => {
  let result = []
  function finder (path) {
    let files = fs.readdirSync(path)
    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push(fPath)
    })
  }
  finder(startPath)
  return result
}

/**
 * 读取文件信息
 * @param {*} fileName 文件路径
 */
const getContent = (fileName) => {
  return new Promise(resolve => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        throw err
      }
      let res = data.toString('utf-8')
      res = res.replace('export default', '')
      // eslint-disable-next-line no-new-func
      const keys = Object.keys(new Function(`return ${res}`)())
      resolve({
        fileName: fileName.replace(/.+\/(.+)\.ts/, '$1'),
        keys
      })
    })
  })
}

/**
 * 创建或覆盖文件
 * @param {*} fileName 要覆盖的文件路径
 * @param {*} str 新内容
 */
const writeFileFn = (fileName, str) => {
  fs.writeFile(path.join(path.resolve('.'), fileName), str, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`create ${fileName} successs`)
    }
  })
}

/**
 * resolve ({
 *     fileName,
 *     origin,
 *     main
 * })
 */
const handleFileContent = () => {
  const apiPaths = findSync(CONFIG.apiPath)
  return new Promise(resolve => {
    Promise.all(apiPaths.map(it => getContent(it))).then(res => {
      resolve(res)
    })
  })
}

const newContent = (arr) => {
  let ApiStr = arr.map(it => `${it.fileName}?:${it.fileName}Content`).join(',\n    ')
  ApiStr = `
export interface Api{
    ${ApiStr},
    [key:string]:any
}`
  let contentInterface = arr.map(it => {
    const Interface = it.keys.map(item => `${item}:ResFunction`).join(',\n    ')
    const interfaceString = it.keys.map(item => `_${item}:string`).join(',\n    ')
    return `
export interface ${it.fileName}Content{
    ${Interface},
    ${interfaceString},
    [key:string]:any
}`
  }).join('')
  const str = `
${CONFIG.baseContent}
${ApiStr}
${contentInterface}
`
  return str
}

module.exports = () => {
  handleFileContent().then(res => {
    writeFileFn(CONFIG.outPut, newContent(res))
  })
}


```
node 文件编写好 导出为 `webpack`插件

```javascript

// 创建 apiPlugin.js 文件

const fn = require('./src/api/@types/generate')
class ApiPlugin {
  apply (compiler) {
    // 指定要附加到的事件钩子函数
    compiler.hooks.emit.tapAsync(
      'ApiPlugin',
      (compilation, callback) => {
        fn()
        callback()
      }
    )
  }
}

module.exports = ApiPlugin

```
使用 webpack 插件，这里用的是 `vue-cli3` ，所以直接修改 `vue.config.js`:

```javascript

const ApiPlugin = require('./apiPlugin')
module.exports = {
  ...
  configureWebpack: {
    plugins: [
      new ApiPlugin()
    ]
  }
}

```

这样一来，每次 `api/modules`下文件变化，`webpack`都会自动生成对应的 `api/@types/api.ts` 帮助我们智能提示。
