const options = process.argv;
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const filePath = './.vuepress/components/yearProcess/did.js'
const moment = require('moment')
const now = moment().format('YYYY-MM-DD')

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
          console.log(chalk.blue(`modify ${fileName} successs`))
        }
      });
}

/**
 * make content
 */
const newContent = (str,key) => {
    const reg = new RegExp(`(${key}.+)\]`)
    return str.replace(reg,`$1,\'${now}\']`)
}

let fileContent = fs.readFileSync(filePath,'utf-8')


if(options.includes('en')){
    console.log(typeof now)
    if(!fileContent.match(/en.+\]/)[0].includes(now)){
        fileContent = newContent(fileContent,'en')
    }
}

if(options.includes('sport')){
    if(!fileContent.match(/sport.+\]/)[0].includes(now)){
        fileContent = newContent(fileContent,'sport')
    }
}

writeFileFn(filePath,fileContent)

