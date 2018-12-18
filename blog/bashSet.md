---
title: bash set
date: 2018/09/02
category: study
---

### bash set

日常工作中对`.bashrc`或者`.bash_profile`设置可以提高效率

```javascript

alias x='goPath'

function goPath(){
    code workspace/$1
}

```
比如上面这样，在终端输入 `x projectName`就会执行在`vscode`中打开在`workspace`下的目标项目,非常方便
##### 解放双手

```javascript

##发布模块
alias npm.publish='npm publish --registry=https://registry.npmjs.org'

alias push='gitPush'
function gitPush(){
    git status && git add . && git commit -m $1 && git push
}
alias ss='git status'

```