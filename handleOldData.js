const fs = require('fs')
const join = require('path').join
const path = require('path')
const chalk = require('chalk')

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
const insertPageParam = (fileName)=>{
    return new Promise(res=>{
        fs.readFile(fileName,(err,data)=>{

            const map = {
                // path:fileName,
                title:data.toString('utf8').match(/(?<=### )[^\n]*/)[0],
                date:data.toString('utf8').match(/(?<=date:)[^ ]*/)[0],
                tag:data.toString('utf8').match(/(?<=tag:)[^ ]*/)[0],
            }
            const str = `---
title: ${map.title}
date: ${map.date}
category: ${map.tag}
---
`+data

result = str.replace(/(<!)[^]+(-->)/gm,'')

writeFileFn(fileName,result)
            
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



const init = ()=>{
    let fileNames=findSync('./blog');
    fileNames.forEach((it,i,arr)=>it.includes('DS_Store') && arr.splice(i,1))
    fileNames.forEach(it=>insertPageParam(it)) 
}

init()

/**
 * 1.获取文件内容
 * 2.匹配<
 * 3.先写入
 * 3.写入文件
 */

 
