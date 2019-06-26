const fs = require('fs')
const join = require('path').join
const path = require('path')
const chalk = require('chalk')
const config = require('./.vuepress/config')

const pageSize = config.themeConfig.pageSize || 20
const categoryDirName = './category'


const createCategory = ()=>{
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
            let { title='暂无',date,category='what' } = yaml
            if(!date){
                //如果yaml没有解析到日期 用文件名获取
                date = fileName.match(/\d{8}/)[0].replace(/(\d{4})(\d{2})(\d{2})/,'$1/$2/$3')
            }
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
          console.log(chalk.blue(`create ${fileName} successs`))
        }
      });
}

/**
 * YAML解析
 * @param {*} fileNamesArr 
 */
const handleYAML = (str)=>{
    const yamlParam = str.match(/---\n[^]+\n---/)
    if(!yamlParam)return {}
    const origin = yamlParam[0].split(/\n/)
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
            // console.log(res)

            res.sort((a,b)=>Number(new Date(b.date))-Number(new Date(a.date)))

            let typeArr = []

            typeArr.push({
                category:"all",
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
const tableTamplate = (tableList,category)=>{
    
    return tableList.map((it,i)=>{
        return `${i===0?`---\ntitle: ${category}\n---\n`:''} #### [${it.title}](/${it.path})_\`${it.date}\`_\n*****`
    }).join('\n')
}

//检测文件或者文件夹存在 
const fsExistsSync=(path)=>{
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

/**
 * 删除目录
 * @param {*} path 
 */
const deleteall=(path)=>{
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
    }
} 

// const a = {
//     category:'all',
//     page:{
//         1:[
//             {
//                 title:1,
//                 date:2,
//                 path:3,
//             }
//         ]
//     }
// }

const init = ()=>{
    if(fsExistsSync(categoryDirName)){
        deleteall(categoryDirName)
        fs.mkdirSync(categoryDirName)
    }else{
        fs.mkdirSync(categoryDirName)
    }
    let fileNames=findSync('./blog');
    fileNames.forEach((it,i,arr)=>it.includes('DS_Store') && arr.splice(i,1))
    handleFileContent(fileNames).then(e=>{
       e.forEach(it=>{
            it.page = {}
            const mArr = spliceArray(it.insert,pageSize)
            mArr.forEach((item,index)=>{
                it.page[index+1] = item
            })
       })

       e.forEach(it=>{

            if(!fsExistsSync(`${categoryDirName}/${it.category}`)){
                fs.mkdirSync(`${categoryDirName}/${it.category}`)
            }

            Object.keys(it.page).forEach(item=>{
                writeFileFn(`${categoryDirName}/${it.category}/${item}.md`,tableTamplate(it.page[item],it.category))
            })

       })
    })  
}

    /**
     * 数组
     * @param {*} arr 
     * @param {*} len 
     */
    const spliceArray = (arr,len)=>{
        const result = []
        const spliceDo = (a,l)=>{
            if(a.length>l){
                const b = a.splice(l)
                result.push(a)
                spliceDo(b,l)
            }else{
                result.push(a)
            }
        }
        spliceDo(arr,len)
        return result
    }

    init()
}

createCategory()

module.exports = createCategory



 
