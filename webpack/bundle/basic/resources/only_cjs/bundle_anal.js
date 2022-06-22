/**
 * Webpack 打包文件分析
 */

// 放置着所有的模块定义 key模块ID 值是模块定义
var modules = {
  './src/title.js': (module, exports, require) => {
    module.exports = 'test'
  },
}
// 已经加载的模块的缓存
var cache = {}

// 加载一个模块，并且返回模块的导出结果，并且把结果放到缓存中，下次加载就直接取缓存结果就可以了
function require(moduleId) {
  var cachedModule = cache[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  var module = (cache[moduleId] = {
    exports: {},
  })
  // 执行模块定义方法，给module.exports赋值，导出对象就是module.exports
  modules[moduleId](module, module.exports, require)
  return module.exports
}
var exports = {}
// webpack 自己实现一套 commonjs 规范，实现 require polyfill
debugger
const title = require('./src/title.js.js')
console.log('title', title)
