;(() => {
  var modules = {
    './loaders/less-loader.js!./src/index.less': (module) => {
      module.exports = '#root {\n  color: red;\n}\n'
    },
    './src/index.less': (module, __unused_webpack_exports, require) => {
      let style = document.createElement('style')
      style.innerHTML = require('./loaders/less-loader.js!./src/index.less')
      document.head.appendChild(style)
      module.exports = ''
    },
    './src/assets/image.jpg': (module) => {
      module.exports =
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
  var exports = {}
  ;(() => {
    'use strict'
    var _image = _interopRequireDefault(require('./src/assets/image.jpg'))
    require('./src/index.less')
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }
    var img = document.createElement('img')
    img.src = _image['default']
    document.body.appendChild(img)
  })()
})()