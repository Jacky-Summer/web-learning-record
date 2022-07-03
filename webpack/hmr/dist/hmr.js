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

  function hotCheck() {
    // {"h":"8b6ca7853883c2efbcf6","c":{"main":true}}
    hotDownloadManifest()
      .then((update) => {
        let chunkIds = Object.keys(update.c)
        chunkIds.forEach((chunkId) => {
          hotDownloadUpdateChunk(chunkId)
        })
        lastHash = currentHash
      })
      .catch(() => {
        window.location.reload()
      })
  }

  function hotDownloadUpdateChunk(chunkId) {
    let script = document.createElement('script')
    script.src = `${chunkId}.${lastHash}.hot-update.js`
    document.head.appendChild(script)
  }

  function hotDownloadManifest() {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest()
      const url = `${lastHash}.hot-update.json`
      xhr.open('get', url)
      xhr.responseType = 'json'
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.send()
    })
  }

  function hotCreateModule() {
    let hot = {
      _acceptedDependencies: {},
      accept(deps, callback) {
        deps.forEach((dep) => (hot._acceptedDependencies[dep] = callback))
      },
      check: hotCheck,
    }
    return hot
  }

  window.webpackHotUpdate = function (chunkId, moreModules) {
    hotAddUpdateChunk(chunkId, moreModules)
  }

  let hotUpdate = {}
  function hotAddUpdateChunk(chunkId, moreModules) {
    for (let moduleId of moreModules) {
      modules[moduleId] = hotUpdate[moduleId] = moreModules[moduleId]
    }
    hotApply()
  }

  function hotApply() {
    for (let moduleId of hotUpdate) {
      // ./src/title.js
      let oldModule = installedModules[moduleId] // 旧的 ./src/title.js 模块
      delete installedModules[moduleId] // 把旧模块从模块缓存中删除掉
      // 循环所有父模块
      oldModule.parents.forEach((parentModule) => {
        let callback = parentModule.hot_acceptedDependencies[module]
        // 取出父模块的回调，有则执行
        callback && callback()
      })
    }
  }

  // parentModuleId 父模块ID
  function hotCreateRequire(parentModuleId) {
    // 因为要加载子模块的时候，父模块肯定加载过了，可以从缓存中通过父模块的ID拿到父模块对象
    const parentModule = installedModules[parentModuleId] // './src/index.js'模块对象
    // 如果缓存里没有此父模块对象，说明这时一个顶级模块，没有父亲
    if (!parentModule) return __webpack_require__

    // childModuleId 此时是 './src/title.js'
    const hotRequire = function (childModuleId) {
      __webpack_require__(childModuleId) // 如果 require 过了，会把子模块对象放进缓存
      let childModule = installedModules[childModuleId] // 取出子模块
      childModule.parents.push(parentModule)
      parentModule.children.push(childModule) // 把此模块ID添加到父模块对象的children
      console.log('childModule', childModule)
      return childModule.exports // 返回子模块的导出对象
    }
    return hotRequire
  }

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId]
    }
    let module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
      hot: hotCreateModule(),
      parents: [],
      children: [],
    })
    modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId))
    module.l = true
    return module.exports
  }
  __webpack_require__.c = installedModules

  return hotCreateRequire('./src/index.js')('./src/index.js')
  // return __webpack_require__('./src/index.js')
})({
  './src/index.js': function (module, exports, __webpack_require__) {
    __webpack_require__('webpack/hot/dev-server.js') // 监听 webpackHotUpdate 消息
    // 连接ws服务器，如果服务器发hash就保存currentHash，如果服务器发送ok，就发送webpackHotUpdate 事件
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
      // 如果没有lastHash说明没上一次的编译结果，说明就是第一次渲染
      if (!lastHash) {
        lastHash = currentHash
        console.log('lastHash', lastHash, 'currentHash', currentHash)
      }
      // 调用hot.check方法向服务器检查更新并且拉取最新的代码
      module.hot.check()
    })
  },
})
