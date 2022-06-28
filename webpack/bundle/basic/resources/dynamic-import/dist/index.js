//放置着所有的模块定义 key模块ID 值是模块定义
var modules = {}
//已经加载的模块的缓存
var cache = {}
function require(moduleId) {
  var cachedModule = cache[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  var module = (cache[moduleId] = {
    exports: {},
  })
  //执行模块定义方法，给module.exports赋值，导出对象就是module.exports
  modules[moduleId](module, module.exports, require)
  return module.exports
}
require.m = modules //模块定义
require.d = (exports, definition) => {
  for (var key in definition) {
    if (require.o(definition, key) && !require.o(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
    }
  }
}
require.f = {}
// 加载一个额外的代码块 require.ensure 保证/加载
require.e = (chunkId) => {
  return Promise.all(
    Object.keys(require.f).reduce((promises, key) => {
      require.f[key](chunkId, promises)
      return promises
    }, [])
  )
}
require.u = (chunkId) => {
  return '' + chunkId + '.index.js'
}
require.g = (function () {
  if (typeof globalThis === 'object') return globalThis
  try {
    return this || new Function('return this')()
  } catch (e) {
    if (typeof window === 'object') return window
  }
})()
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
var inProgress = {}
var dataWebpackPrefix = 'basic:'
// require.load 加载JSON脚本
require.l = (url, done, key, chunkId) => {
  if (inProgress[url]) {
    inProgress[url].push(done)
    return
  }
  var script, needAttach
  if (key !== undefined) {
    var scripts = document.getElementsByTagName('script')
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i]
      if (s.getAttribute('src') == url || s.getAttribute('data-webpack') == dataWebpackPrefix + key) {
        script = s
        break
      }
    }
  }
  if (!script) {
    needAttach = true
    script = document.createElement('script')
    script.charset = 'utf-8'
    script.timeout = 120
    if (require.nc) {
      script.setAttribute('nonce', require.nc)
    }
    script.setAttribute('data-webpack', dataWebpackPrefix + key)
    script.src = url
  }
  inProgress[url] = [done]
  var onScriptComplete = (prev, event) => {
    script.onerror = script.onload = null
    clearTimeout(timeout)
    var doneFns = inProgress[url]
    delete inProgress[url]
    script.parentNode && script.parentNode.removeChild(script)
    doneFns && doneFns.forEach((fn) => fn(event))
    if (prev) return prev(event)
  }
  var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000)
  script.onerror = onScriptComplete.bind(null, script.onerror)
  script.onload = onScriptComplete.bind(null, script.onload)
  needAttach && document.head.appendChild(script)
}
require.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  Object.defineProperty(exports, '__esModule', { value: true })
}
var scriptUrl
if (require.g.importScripts) scriptUrl = require.g.location + ''
var document = require.g.document
if (!scriptUrl && document) {
  if (document.currentScript) scriptUrl = document.currentScript.src
  if (!scriptUrl) {
    var scripts = document.getElementsByTagName('script')
    if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
  }
}
if (!scriptUrl) throw new Error('Automatic publicPath is not supported in this browser')
scriptUrl = scriptUrl
  .replace(/#.*$/, '')
  .replace(/\?.*$/, '')
  .replace(/\/[^\/]+$/, '/')
require.p = scriptUrl // 域名
//已经安装好或者加载中的代码块
// undefined 标识模块没有加载
// null 模块预加载
// promise 模块加载中（加载中）
// 0 模块加载完成
var installedChunks = {
  main: 0,
}
// require.f.jsonp 使用JSONP加载额外的代码
// 定义一个promise数组，用来存储promise. 判断是否已经加载过，如果加载过，返回一个空数组的promise.all(). 如果正在加载中，则返回存储过的此文件对应的promise. 如果没加载过，先定义一个promise，然后创建script标签，加载此js，并定义成功和失败的回调 返回一个promise
require.f.j = (chunkId, promises) => {
  var installedChunkData = require.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined
  // 如果 installedChunkData == 0 则代表模块已经被处理过（加载了模块函数并转换成了模块对象）
  if (installedChunkData !== 0) {
    if (installedChunkData) {
      promises.push(installedChunkData[2])
    } else {
      if (true) {
        var promise = new Promise(
          (resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject])
        )
        promises.push((installedChunkData[2] = promise)) // jsonp 要加载的脚本路径
        var url = require.p + require.u(chunkId)
        var error = new Error()
        var loadingEnded = (event) => {
          if (require.o(installedChunks, chunkId)) {
            installedChunkData = installedChunks[chunkId]
            if (installedChunkData !== 0) installedChunks[chunkId] = undefined //没有被处理
            // 是按需加载模块，即请求超时了
            if (installedChunkData) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type)
              var realSrc = event && event.target && event.target.src
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')'
              error.name = 'ChunkLoadError'
              error.type = errorType
              error.request = realSrc
              installedChunkData[1](error)
            }
          }
        }
        require.l(url, loadingEnded, 'chunk-' + chunkId, chunkId) // url: 这个就是JSONP要加载的脚本的路径或者说名称
      } else {
      }
    }
  }
}
//定义一个代码块加载的全局变量，它的值默认是一个空数组
// webpackJsonpCallback 的主要作用是将获得的模块数据，插入到之前的module对象里，然后将在requireEnsure里的promise用resolve触发完成，使其能正常的被then.
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules, runtime] = data
  var moduleId,
    chunkId,
    i = 0
  if (chunkIds.some((id) => installedChunks[id] !== 0)) {
    for (moduleId in moreModules) {
      if (require.o(moreModules, moduleId)) {
        require.m[moduleId] = moreModules[moduleId]
      }
    }
    if (runtime) var result = runtime(require)
  }
  if (parentChunkLoadingFunction) parentChunkLoadingFunction(data)
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i]
    if (require.o(installedChunks, chunkId) && installedChunks[chunkId]) {
      installedChunks[chunkId][0]() // 把promise的resovle方法取出放到了resolves数组中
    }
    installedChunks[chunkId] = 0 //表示此代码块已经加载完成
  }
}
var chunkLoadingGlobal = (self['webpackChunkbasic'] = self['webpackChunkbasic'] || [])
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal)) // 默认把当前数组的push方法重写了
var exports = {}
document.getElementById('btn').onclick = function () {
  require
    .e('src_title_js')
    .then(require.bind(require, './src/title.js'))
    .then((res) => {
      console.log('res', res)
    })
}
