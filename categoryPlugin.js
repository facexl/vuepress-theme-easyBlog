const createCategory = require('./createCategory')
class CategoryPlugin {
  apply (compiler) {
    // 指定要附加到的事件钩子函数
    compiler.hooks.emit.tapAsync(
      'CategoryPlugin',
      (compilation, callback) => {
        // createCategory()
        // callback()
        console.log('异步操作开始')
        setTimeout(function () {
            createCategory()
            
            callback()
        }, 2000)
      }
      
    )
  }
}

module.exports = CategoryPlugin
