---
title: 编写一个 vite 插件预处理 vue3 代码  
category: practice    
---

## 编写一个 vite 插件预处理 vue3 代码  

### 前言  

[上一篇文章](/blog/20220408_scriptsetupadvise.html)说到,在把`setup`重构成`script setup`过程中遇到一点小麻烦，我给`vuejs/core`项目提出了建议，如预期被驳回了，`vue3`团队维护人员表示`不考虑在核心源码库实现这种功能，实在需要建议以 vite 插件的形式`，并给了一个插件[例子](https://github.com/antfu/unplugin-auto-import)。我十分理解过多的语法糖、编译宏可能会让`vue`项目变得更加混乱，但这并不影响我们自己折腾。

### 需求分析  

- 添加一个编译宏使`return toRefs`解构的写法可以继续使用  
- 编译期间自动`import missing dependencies`  
- 编译期间检查编译后可以造成的语法错误（`duplicate key`），并中断编译抛出错误  

### 开发  

#### vite plugin 示例

一个`vite`的`plugin`可以像下面这样简单  

```javascript
import type { Plugin } from 'vite'
const fileRegex = /\.vue$/
export default function fn():Plugin {
  return {
    name: 'pluginName',
    transform(src, id):any {
      if (fileRegex.test(id)) {
        return {
          code: transformFile(src),
        }
      }
    }
  }
}
```
只需要编写`transformFile`就行，其中`src`是文件内容字符串。  

#### Ast 转换  

由于编程的写法多变，很难直接处理字符串达到目的，通常需要借助`ast语法树分析`。  
我们知道`bable`就是通过`babylon`生成`AST语法树`,然后使用`babel-traverse`对其遍历，然后进行添加、更新及移除等操作。然后通过`babel-generator`再将`ast`转换为`js`代码。实现 es6 转换成 es5 的强大功能。`babel-core`整合了这些功能暴露出相关`Api`我们可以直接使用。  
但是`.vue`文件是特殊的文件，并不能直接使用`babel-core`，还好尤大单独导出了`vue/compiler-sfc`，暴露了转换`.vue`文件的`api`。  

```javascript
import { parse,babelParse } from 'vue/compiler-sfc'

function transformFile(src){

    const { descriptor } = parse(src) // 得到解析sfc后的对象 

    const scriptAst = babelParse(descriptor.scriptSetup.content, { // 取出 script setup 标签中的 js 代码 转换为 ast  
        plugins:[],
        sourceType: 'module'
    }).program

    // do whatever you want to do and return result  
}

```

###  以下是我实现 defineReactive 宏的代码，[完整仓库链接](https://github.com/facexl/vite-plugin-vue3-define-reactive) 

```javascript


import { parse,babelParse } from 'vue/compiler-sfc'
import type { Plugin } from 'vite'

const fileRegex = /\.vue$/

// Special compiler macros
const DEFINE_REACTIVE = 'defineReactive'

const default_imports = ['toRefs','reactive']

const default_var_name = 'auto_identifier__v_'

interface userOptions{
    debug?:Boolean,
    needImport?:Boolean
}

export default function defineReactiveVitePlugin(userOptions:userOptions):Plugin {
  const options = {
      debug:false,
      needImport:true,
      ...userOptions
  }
  return {
    name: DEFINE_REACTIVE,
    transform(src, id):any {
      if (fileRegex.test(id)) {
        return {
          code: transformDefineReactiveMacro(src,options),
        }
      }
    }
  }
}


export const transformDefineReactiveMacro = function(src:string,options:userOptions):string | void{

    if(!src.includes(DEFINE_REACTIVE))return

    const log = function(a:any,b?:any){
        options.debug && console.log(...arguments as any)
    }

    const { descriptor } = parse(src)

    log('after vue/compiler-sfc parse:',descriptor)

    let { scriptSetup } = descriptor

    if(!scriptSetup){
        throw new Error(`${DEFINE_REACTIVE} only use in script setup`)
    }

    let content = scriptSetup.content

    const scriptAst = babelParse(content, {
        plugins:[],
        sourceType: 'module'
    }).program

    log('after babelParse',scriptAst)

    const nodeBody = scriptAst.body as any

    const targets = nodeBody.filter(it=>{
        return it.type==='VariableDeclaration' && it.declarations.length===1 && it.declarations[0].type==="VariableDeclarator" && it.declarations[0].init.type==="CallExpression" && it.declarations[0].init.callee.name===DEFINE_REACTIVE||
        it.type==='ExpressionStatement' && it.expression && it.expression.callee.name===DEFINE_REACTIVE
    })

    if(!targets.length){
        log('ast hit nothing')
        return
    }

    const resTargets = targets.map(target=>{
        const needIdentifier = target.type==='ExpressionStatement'
        let targetArguments:Array<{type:string,properties:Array<any>}> = [];
        if(needIdentifier){
            targetArguments = target.expression.arguments
        }else{
            targetArguments = target.declarations[0].init.arguments
        }
        if(targetArguments.length!==1){
            throw new Error(`${DEFINE_REACTIVE} only one arg`)
        }
        if(targetArguments[0].type!=="ObjectExpression"){
            throw new Error(`${DEFINE_REACTIVE} arg must be ObjectExpression`)
        }
        const targetArgumentsProperties = targetArguments[0].properties
        if(targetArgumentsProperties.find(it=>it.key.type!=='Identifier')){
            throw new Error(`${DEFINE_REACTIVE} arg's key error`)
        }
        // defineReactive 参数内部 key
        const argumentsKeys = targetArgumentsProperties.map(it=>it.key.name) 
        const newIdentifier = `${default_var_name}${target.start}`
        return {
            needIdentifier,
            newIdentifier,
            target,
            argumentsKeys,
            finallyStr:targetArgumentsProperties.length?`\n const ${JSON.stringify(argumentsKeys).replace(/\[/,'{').replace(/\]/,'}').replace(/\"/g,'')} = toRefs(${needIdentifier?newIdentifier:target.declarations[0].id.name})\n`:''
        }
    })

    log('resTargets',resTargets)

    const combinResTargets = resTargets.reduce((a,b)=>{
        a = a.concat(b.argumentsKeys)
        return a
    },[])

    if([...new Set(combinResTargets)].length!==combinResTargets.length){
        throw new Error(`${DEFINE_REACTIVE} args use duplicate key`)
    }

    // 顶层变量
    // 这个应该不准确  
    const allVariableDeclaration = nodeBody.filter(it=>it.type==='VariableDeclaration').reduce((a,b)=>{
        if(b.declarations[0].id.type==='Identifier'){
            a.push(b.declarations[0].id.name)
        }
        if(b.declarations[0].id.type==='ObjectPattern'){
            a = a.concat(b.declarations[0].id.properties.map(it=>it.value.name))
        }
        return a
    },[])

    // 变量声明检查
    for(let i=0;i<allVariableDeclaration.length;i++){
        if(combinResTargets.includes(allVariableDeclaration[i])){
            throw new Error(`duplicate variable: ${allVariableDeclaration[i]} 、${DEFINE_REACTIVE} : ${allVariableDeclaration[i]}`)
        }
    }

    let finallyScript = scriptSetup.content

    // 倒序为了从后面修改字符串 避免影响到 ast 坐标  
    resTargets.reverse().forEach(it=>{
        if(it.needIdentifier){
            finallyScript = finallyScript.substring(0,it.target.start)+`\n const ${it.newIdentifier}=`+finallyScript.substring(it.target.start,finallyScript.length)
        }
        finallyScript = finallyScript + it.finallyStr
    })

    const reg = new RegExp(DEFINE_REACTIVE,'g')

    finallyScript = finallyScript.replace(reg,'reactive') 

    // 拼接 import 
    if(options.needImport){
        const identifiers = nodeBody.filter(it=>it.type==='ImportDeclaration').reduce((a,b)=>{
            a = a.concat(
                b.specifiers.map(item=>item.local.name)
            )
            return a
        },[])
        log('all imports identifiers',identifiers)
        let resImportStr = ''
        default_imports.forEach(it=>{
            if(!identifiers.includes(it)){
                if(resImportStr){
                    resImportStr = resImportStr + `,${it}`
                }else{
                    resImportStr = it
                }
            }
        })
        if(resImportStr){
            finallyScript = `\n import { ${resImportStr} } from 'vue' \n ${finallyScript}`
        }
    }

    const result = ['template','script','scriptSetup']
                    .filter(it=>descriptor[it])
                    .map(it=>revertTopTags(descriptor[it],it==='scriptSetup'?finallyScript:''))
                    .concat(descriptor['styles'].map(it=>revertTopTags(it)))
                    .concat(descriptor['customBlocks'].map(it=>revertTopTags(it)))
                    .sort((a,b)=>(+a.offset) - (+b.offset))
                    .map(it=>it.content)
                    .join('\n')

    log('transform result:',result)

    return result
}

function revertTopTags(
    obj:{
        attrs:{
            [key:string]:string | Boolean
        },
        type:string,
        content:string,
        loc:{
            start:{
                offset:Number
            }
        }
    },
    content?:string
):{
    content:string,
    offset:Number
}{
    const res = Object.keys(obj.attrs).reduce((a,b)=>{
        const str = obj.attrs[b]===true?` ${b}`:` ${b}="${obj.attrs[b]}"`
        a = a + str
        return a
    },'')
    return {
        content:`<${obj.type}${res}>${content || obj.content}</${obj.type}>`,
        offset:obj.loc.start.offset
    }
}


```