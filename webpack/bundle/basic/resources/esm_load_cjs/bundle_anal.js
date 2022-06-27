var modules = {
  './src/title.js': (module) => {
    module.exports = { name: 'my_title_name', age: 100 }
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
require.n = (module) => {
  var getter = module && module.__esModule ? () => module['default'] : () => module
  // getter添加了一个a属性，a属性值是getter的返回值
  // getter.a() --> 异步加载用
  require.d(getter, { a: getter })
  return getter
}
require.d = (exports, definition) => {
  for (var key in definition) {
    if (require.o(definition, key) && !require.o(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
    }
  }
}
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
require.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  Object.defineProperty(exports, '__esModule', { value: true })
}
var exports = {}
;('use strict')
require.r(exports)
var _title = require('./src/title.js') // _title={ name: 'my_title_name', age: 100 }
var _title_default = /*#__PURE__*/ require.n(_title)
console.log('name', _title_default())
console.log('age', _title.age)
