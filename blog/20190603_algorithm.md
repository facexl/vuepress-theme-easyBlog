---
title: 日常问题算法练习
category: practice
---

## 日常问题算法练习

### 引言

这里记录平时遇到的一些,需要一点算法的场景。

### 1.上下级关系

```javascript

const a = [
    { up:null, id:1, name:'水' },
    { up:null, id:2, name:'油' },
    { up:1, id:5, name:'自来水' },
    { up:4, id:6, name:'怡宝' },
    { up:4, id:7, name:'农夫山泉' },
    { up:2, id:8, name:'金龙鱼' },
    { up:3, id:9, name:'大米' },
    { up:1, id:4, name:'矿泉水' },
    { up:3, id:10, name:'小米' },
    { up:9, id:11, name:'超级大米' },
    { up:null, id:3, name:'米' },
]

// up 指的是自己的上级 id ，如果 up 为空，说明是顶级分类 希望处理成如下数据结构:

[
    {
        up:null,
        id:1,
        children:[
            {
                up:1,
                id:4,
                children:[
                    ...
                ]
            }
        ]
    },
    ...
]

```
```javascript

function normalizeLevel(waitArr){

    const res = []

    loop(waitArr)

    function loop(waitArr, hashMap = {}){
        const newWait = []
        const newHashMap = {}
        waitArr.forEach(item => {
            const it = {...item}
            if (it.up === null) {
            newHashMap[it.id] = it
            res.push(it)
            } else {
            if (hashMap[it.up]) {
                if (hashMap[it.up].children) {
                hashMap[it.up].children.push(it)
                } else {
                hashMap[it.up].children = [it]
                }
                newHashMap[it.id] = it
            } else {
                newWait.push(it)
            }
            }
        })
        if (newWait.length > 0) {
            loop(newWait, newHashMap)
        }
    }

    return res
}

// test

normalizeLevel(a)  // [{"up":null,"id":1,"name":"水","children":[{"up":1,"id":5,"name":"自来水"},{"up":1,"id":4,"name":"矿泉水","children":[{"up":4,"id":6,"name":"怡宝"},{"up":4,"id":7,"name":"农夫山泉"}]}]},{"up":null,"id":2,"name":"油","children":[{"up":2,"id":8,"name":"金龙鱼"}]},{"up":null,"id":3,"name":"米","children":[{"up":3,"id":9,"name":"大米","children":[{"up":9,"id":11,"name":"超级大米"}]},{"up":3,"id":10,"name":"小米"}]}]


```