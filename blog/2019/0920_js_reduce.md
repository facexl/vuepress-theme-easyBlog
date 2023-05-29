---
title: Array.prototype.reduce 小妙招
category: study
---

## Array.prototype.reduce 小妙招

### 1.生成二维数组 or 二维变一维

希望把 `[1,2,3,4,5,6,7,8,9,10,11,12]` 变成  
`[[1,2,3,4,5],[6,7,8,9,10],[11,12]]`即 5 个一组的二维数组
```javascript

function generate2Array(arr,l){

    return arr.reduce((now,next)=>{

        const last = now.length-1

        if(now[last].length<l){
            now[last].push(next)
        }else{
            now.push([next])
        }

        return now

    },[[]])

}
generate2Array([1,2,3,4,5,6,7,8,9,10,11,12],5)

function generateArray(arr){
    return arr.reduce((a,b)=>{
        return a.concat(b)
    },[])
}

generateArray([[1,2,3,4,5],[6,7,8,9,10],[11,12]])

```
### 2.归并为对象

```javascript

const arr = [
    {
        key:'a',
        defaultValue:'1'
    },
    {
        key:'b',
        defaultValue:'2'
    }
]

arr.reduce((now,{key,defaultValue})=>{

    now[key] = defaultValue

    return now

},{})   // {a: "1", b: "2"}

```

### 3.计算数组中每个元素出现的次数

```javascript

[9,1,3,3,2,5,5,7,5,9].reduce((a,b)=>{
    if(a[b]){
        a[b]++
    }else{
        a[b] = 1
    }
    return a
},{})  //{1: 1, 2: 1, 3: 2, 5: 3, 7: 1, 9: 2}

```

### 5.数组去重

```javascript

[1,2,3,3,4,4,6,7,9,1,9].reduce((a,b)=>{
    !a.includes(b) && a.push(b)
    return a
},[])

```

### 6.当然还有比较常见的  求和

```javascript

[1,2,3,4].reduce((a,b)=>a+b)

```