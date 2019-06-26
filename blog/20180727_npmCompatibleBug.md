---
title: 记一次兼容问题处理过程
date: 2018/07/27
category: practice
---

## 记一次兼容问题处理过程
### 场景
ios9.3.2 app内嵌vue-cli构建的移动端网站
### 现象
客户反映app点一个按钮跳的页面是空白
### 定位问题
通过沟通确定不是网络问题之后，  
让客户用浏览器直接打开我们的网站链接，发现仍然打不开，排除了app的原因。  
询问客户系统版本，发现是ios9.3.2,版本较低，考虑是兼容问题  
于是用`xcode`模拟了ios9系统，使用safari打开h5链接，复现了打不开的bug，控制台提示 
`SyntaxError: Unexpected keyword 'const'. Const declarations are not supported in strict mode.`
奇怪了 明明用babel转了es6的语法  怎么还出现了`const`,不过好在问题是锁定了，基本完成了一大步
### 解决问题
- 第一步  查看`bable`配置,并没有什么不对
```javascript
{
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
    "plugins": ["transform-vue-jsx", "transform-runtime"],
    "env": {
      "test": {
        "presets": ["env", "stage-2"],
        "plugins": ["transform-vue-jsx", "istanbul"]
      }
    }
  }
```
- 第二步  直接查看webpack打包后的`app.js`,全局搜索`const`（注意末尾加空格），发现一个`const`都没有，`app.js`也就是业务代码应该是正常转化过了，进一步说明babel工作正常
- 第三步 找到打包后的`vendor.js`,重复第二步操作，找到了`const`！！`vendor.js`是`webpack`打包`node_modules`下的文件后生成的，说明引入了未转化的包，然后在`node_modules`下搜索`const`，最终定位在了`query-string`这个包的源码里
- 第四步 删除了`query-string`，去工具库里找了个想同功能的方法代替
- 第五步 `xcode`模拟ios9打开网站没有问题，真机ios9测试打开网站没有问题

### 反思

::: tip
1、有人反映bug，首先应问清楚具体环境，`浏览器类型、浏览器版本、系统版本`等等,然后尽可能复现bug，是定位问题的最佳方式  
2、引入第三方包需谨慎，默认`node_modules`下的文件是不会`babel`处理的
:::










