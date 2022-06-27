'use strict'
var modules = {
  './src/title.js': (__unused_webpack_module, exports, require) => {
    require.r(exports)
    require.d(exports, {
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
require.r(exports)
var _title__WEBPACK_IMPORTED_MODULE_0__ = require('./src/title.js')
console.log('name', _title__WEBPACK_IMPORTED_MODULE_0__['default'])
console.log('age', _title__WEBPACK_IMPORTED_MODULE_0__.age)
