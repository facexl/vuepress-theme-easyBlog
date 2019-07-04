
### 引言

本博客小框架基于 [vuepress](http://daringfireball.net/projects/markdown/syntax)

### 快速开始

```bash

npm install 

npm start

```

### 目录说明

- .vuepress:  

    components 下定义的组件可以直接在 markdown 中使用  
    theme 是我们的博客主题 大家可以魔改  
    config.js是我们的博客配置,除了 `themeConfig`其他参数请参照 [vuepress](https://vuepress.vuejs.org) ;
    其中themeConfig 的 `nav` 选项是写死的，你可以新增或删除分类，这意味着你的博客内容也要声明对应的分类， `nav` 会作为顶部菜单渲染，不论什么分类，路径请务必使用 `/category/{你的分类名}/1`的形式，其中 `1` 代表页码

- blog  
    这里是所有的博客内容，文件名必须严格的 YYYYMMDD_xxx.md  
    文件内容开头必须以 `yaml` 形式书写标题和分类，举例：
```yaml
---
title: markdown示例
category: chat
---
```
- category文件夹是脚本生成的 无需关心

另外博客内置了 `gitalk` 评论功能，需要修改 `gitalkConfig.js` 的相关配置,[gitalk 配置方式参考](https://www.jianshu.com/p/656e6101bf0f),配置将会在 `.vuepress/theme/Page.vue` 中被引用

### 发布

把 .vuepress 下的 dist 发布到 github 仓库就可以通过 github-pages 服务访问了，如果申请了个性域名可以修改 CNAME 文件。  

另外 vuepress 提供了自动化发布的示例，即 `deploy.sh`,可以根据需要修改，然后 `npm run publish` 直接发布！

