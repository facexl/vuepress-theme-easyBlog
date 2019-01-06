const options = process.argv;
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const filePath = './.vuepress/components/yearProcess/did.js'
const did = require('./.vuepress/components/yearProcess/did')
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
if(options.includes('en')){
    console.log(did)
    // if(!did.en.includes(now)){
    //     did.en.push(now)
    //     const str = `module.exports = ${JSON.stringify(did)}`
    //     writeFileFn(filePath,str)
    // }
}
if(options.includes('sport')){
    if(!did.sport.includes(now)){
        did.sport.push(now)
        const str = `module.exports = {
            en:${JSON.stringify(did.en)},
            sport:['2019-01-01']
        }`
        console.log(str)
        writeFileFn(filePath,str)
    }
}


