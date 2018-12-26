---
title: ts in create-react-app
date: 2018/11/13
category: practice
---


## ts in create-react-app


去掉sourceMap:
// webpack.config.prod.js
- devtool: shouldUseSourceMap ? 'source-map' : false
// 改为
devtool: false,