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
    { up:0, id:1, name:'水' },
    { up:0, id:2, name:'油' },
    { up:1, id:5, name:'自来水' },
    { up:4, id:6, name:'怡宝' },
    { up:4, id:7, name:'农夫山泉' },
    { up:2, id:8, name:'金龙鱼' },
    { up:3, id:9, name:'大米' },
    { up:1, id:4, name:'矿泉水' },
    { up:3, id:10, name:'小米' },
    { up:9, id:11, name:'超级大米' },
    { up:0, id:3, name:'米' },
]
// up 指的是自己的上级 id ，如果 up 为0，说明是顶级分类 。 
```
> 场景1：希望把 a 处理成如下数据结构:
```javascript
[
    {
        up:0,
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

// answers:

function normalize(originArr){
    console.time()
    const map = {}; // 处理成功的数据
    const res = [];
    let waitArr = originArr;
    let count = 0;
    do{
        var arr = waitArr;
        waitArr = [];
        for(var i = 0,l = arr.length;i < l; i++ ){
            var temp = {...arr[i]}
            if(temp.up===0){
                map[temp.id] = temp
                res.push(temp)
            }else{
                if(map[temp.up]){
                    if(map[temp.up].children){
                        map[temp.up].children.push(temp)
                    }else{
                        map[temp.up].children = [temp]
                    }
                    map[temp.id] = temp
                }else{
                    waitArr.push(temp)
                }
            }
            count++
        }
        if(waitArr.length===arr.length){
            console.log('要爆栈啦',waitArr)
            throw new Error('stack overflow')
        }
    }while(waitArr.length!==0)

    console.timeEnd()

    return [res,count]
    
}

// test

normalize(a)  // [[{"up":null,"id":1,"name":"水","children":[{"up":1,"id":5,"name":"自来水"},{"up":1,"id":4,"name":"矿泉水","children":[{"up":4,"id":6,"name":"怡宝"},{"up":4,"id":7,"name":"农夫山泉"}]}]},{"up":null,"id":2,"name":"油","children":[{"up":2,"id":8,"name":"金龙鱼"}]},{"up":null,"id":3,"name":"米","children":[{"up":3,"id":9,"name":"大米","children":[{"up":9,"id":11,"name":"超级大米"}]},{"up":3,"id":10,"name":"小米"}]}],16]

```
> 场景2：给一个 id 找到它的所有子类(包括子类的子类)


``` javascript

function findChildren(id,arr){
    const res = [];
    let newIds = [id];
    let count = 0;
    do{
        const newIdsTemp = [];
        for(let j=0,jl=newIds.length;j<jl;j++){
            for(let i = 0, l = arr.length;i < l; i++){
                const temp = arr[i]
                if(temp.up === newIds[j]){
                    res.push(temp.id)
                    newIdsTemp.push(temp.id)
                }
                count++
            }
        }
        if(count>10000){
            throw new Error('stack overflow')
        }
        newIds = newIdsTemp

    }while(newIds.length!==0)

    return { res,count }

}

// test

findChildren(1,a) //  { res:[5, 4, 6, 7],count:55 }

```

