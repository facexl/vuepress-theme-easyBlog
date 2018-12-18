const fs = require('fs')
const join = require('path').join
const path = require('path')

/**
 * 读取文件路径
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
const findSync = (startPath)=>{
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}
/**
 * 读取文件信息
 * @param {*} fileName 文件路径 
 */
const getContent = (fileName)=>{
    return new Promise(res=>{
        fs.readFile(fileName,(err,data)=>{
            const yaml = handleYAML(data.toString('utf-8'))
            const { title,date,category } = yaml
            res({
                path:fileName,
                title,
                date,
                category
            })
        })
    })
}

/**
 * 创建或覆盖文件
 * @param {*} fileName 要覆盖的文件路径
 * @param {*} str 新内容
 */
const writeFileFn = (fileName,str)=>{
    fs.writeFile(path.join(__dirname, fileName), str, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      });
}

/**
 * YAML解析
 * @param {*} fileNamesArr 
 */
const handleYAML = (str)=>{
    const origin = str.match(/---\n[^]+\n---/)[0].split(/\n/)
    origin.pop()
    origin.shift()
    const map = {}
    origin.forEach(it=>{
        const mid = it.split(': ');
        map[mid[0]] = mid[1]
    })
    return map
}

/**
 * 异步批量读取并处理
 * @param {*} fileNamesArr 路径数组
 * resolve出去一个[
 *      {
 *          category:'',  //目标文件
 *          insert:''    //写入内容
 *      }
 * ]
 */
const handleFileContent = (fileNamesArr)=>{
    return new Promise(resolve=>{
        Promise.all(fileNamesArr.map(it=>getContent(it))).then(res=>{
            console.log(res)

            res.sort((a,b)=>Number(new Date(b.date))-Number(new Date(a.date)))

            let typeArr = []

            typeArr.push({
                category:"index",
                insert:res
            })

            res.forEach((it,i)=>{
                let flag = false
                let index = null
                for(let j=0;j<typeArr.length;j++){
                    if(typeArr[j].category===it.category){
                        flag = true
                        index = j
                        break
                    }
                }
                if(flag){
                    typeArr[index].insert.push(it)
                }else{
                    typeArr.push({
                        category:it.category,
                        insert:[it]
                    })
                }
            })

            resolve(typeArr)

        })
    })
}
/**
 * 
 * @param {*} tableList 目录列表
 */
const tableTamplate = (tableList)=>{
    
    return tableList.map((it,i)=>{
        return `#### [${it.title}](/${it.path})_\`${it.date}\`_\n*****`
    }).join('\n')
}

/**
 * 生成分类
 * @param {*} tableList 
 */
// const makeFilter = (tableList) => {
//     let str = `* [all](/)`
//     tableList.forEach((it,i)=>{
//         i!==0 && (str+=`\n* [${it.category}](/type/${it.category})`)
//     })
//     return str
// }

const init = ()=>{
    let fileNames=findSync('./blog');
    fileNames.forEach((it,i,arr)=>it.includes('DS_Store') && arr.splice(i,1))
    handleFileContent(fileNames).then(e=>{
       e.forEach((it,i)=>{
           i===0?writeFileFn('./category/all.md',tableTamplate(it.insert)):writeFileFn(`./category/${it.category}.md`,tableTamplate(it.insert))
       })
       //writeFileFn('./_navbar.md',makeFilter(e))
    })  
}

init()


 
