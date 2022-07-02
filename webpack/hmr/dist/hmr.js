// 连接websocket服务器
// let io = require('socket.io-client')
let currentHash
let lastHash
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, fn) {
    this.events[eventName] = fn
  }
  emit(eventName, ...args) {
    this.events[eventName](...args)
  }
}
let hotEmitter = new EventEmitter()

;(function (modules) {
  var installedModules = {}

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId]
    }
    let module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    module.l = true
    return module.exports
  }

  return __webpack_require__('./src/index.js')
})({
  './src/index.js': function (module, exports, __webpack_require__) {
    __webpack_require__('webpack/hot/dev-server.js') // 监听 webpackHotUpdate 消息
    // 连接ws服务器，如果服务器发hash就保存currentHash，如果服务器发送ok，就发送webpackHotUpdate
    __webpack_require__('webpack-dev-server/client/index.js')

    const input = document.createElement('input')
    document.body.appendChild(input)

    const div = document.createElement('div')
    document.body.appendChild(div)

    const render = () => {
      let title = __webpack_require__('./src/title.js')
      div.innerHTML = title
    }

    render()

    if (module.hot) {
      module.hot.accept(['./src/title.js'], render)
    }
  },
  './src/title.js': function (module, exports, __webpack_require__) {
    module.exports = 'myTitle4'
  },
  'webpack-dev-server/client/index.js': function (module, exports, __webpack_require__) {
    const socket = window.io('/')

    socket.on('hash', (hash) => {
      currentHash = hash
    })

    socket.on('ok', () => {
      console.log('ok')
      reloadApp()
    })

    function reloadApp() {
      hotEmitter.emit('webpackHotUpdate')
    }
  },
  'webpack/hot/dev-server.js': function (module, exports, __webpack_require__) {
    hotEmitter.on('webpackHotUpdate', () => {
      console.log('hotCheck')
    })
  },
})
