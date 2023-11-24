---
title: 利用 AbortController 解决请求竞态问题    
category: practice  
---  

## 利用 AbortController 解决请求竞态问题    

### 背景  

`axios`自从`v0.22.0`版本开始废弃了之前的`CancelToken`取消请求，现在可以用`AbortController`取消请求，同时原生的`fetch`也支持`AbortController`。

```javascript
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()

```

### 一个特定竞态场景的封装  

`tab`切换后发起请求刷新列表是一个常见场景，如果前一个请求比切换后的请求还慢，导致回调后执行，可能出现异常渲染。这时候我们可以利用`AbortController`每次取消前一次请求，基于此可以做一个简单封装来优雅使用：

```javascript

export const useAborter = ()=>{
    let axiosAborter: AbortController | null = null
    return ()=>{
      if('AbortController' in window){
        if(axiosAborter){
          axiosAborter.abort()
        }
        axiosAborter = new AbortController();
        return {
          signal:axiosAborter.signal
        }
      }
      return {}
    }
}

```

#### Useage:

```javascript
const aborter = useAborter()
const getList = ()=>{
    axios.get('/foo/bar', aborter()).then(function(response) {
    //...
    });
}

```
这样一来每次`getList()`发起新请求之前都会取消前一次请求。  