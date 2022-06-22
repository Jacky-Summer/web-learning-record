var modules = {
  './src/title.js': (__unused_webpack_module, exports, require) => {
    'use strict'
    require.r(exports)
    require.d(exports, {
      // getter 函数
      age: () => age,
      default: () => __WEBPACK_DEFAULT_EXPORT__,
    })
    const __WEBPACK_DEFAULT_EXPORT__ = 'my_title_name'
    const age = 100
  },
}
var cache = {}
function require(moduleId) {
  var cachedModule = cache[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  var module = (cache[moduleId] = {
    exports: {},
  })
  modules[moduleId](module, module.exports, require)
  return module.exports
}
require.d = (exports, definition) => {
  for (var key in definition) {
    // key：default / age
    if (require.o(definition, key) && !require.o(exports, key)) {
      // 实际做的事情：
      // exports.default = 'my_title_name'
      // exports.age = 100
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
    }
  }
}
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
require.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // Object.prototype.toString.call(exports = [object Module]
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  // exports.__esModule = true 如果一个exports对象它的 __esModule=true说明它是从 esm 模块编译过来
  Object.defineProperty(exports, '__esModule', { value: true })
}
var exports = {}
const title = require('./src/title.js')
console.log('title', title)
console.log('title', title.age)
