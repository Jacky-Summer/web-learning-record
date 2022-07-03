const express = require('express')
const http = require('http')
const mime = require('mime')
const path = require('path')
// const MemoryFs = require('memory-fs')

const fs = require('fs-extra')
fs.join = path.join
const updateCompiler = require('../../utils/updateCompiler')
const socketIO = require('socket.io')

class Server {
  constructor(compiler) {
    this.compiler = compiler // 保存编译器对象
    updateCompiler(compiler) // 向 entry 注入代码
    this.setupApp() // 创建app
    this.currentHash = '' // 当前的hash值（每次编译都会产生一个hash值）
    this.clientSocketList = [] // 存放着所有通过ws连接到服务器的客户端
    this.setupHooks() // 建立钩子
    this.setupDevMiddleware()
    this.routes() // 配置路由
    this.createServer() // 创建HTTP服务器，以app作为路由
    this.createSocketServer() // 创建socket服务器
  }

  setupApp() {
    this.app = express() // 作为路由中间件s
  }

  setupDevMiddleware() {
    this.middleware = this.webpackDevMiddleware() // 返回一个express中间件
  }

  routes() {
    const { compiler } = this
    const config = compiler.options
    this.app.use(this.middleware(config.output.path))
  }

  webpackDevMiddleware() {
    const { compiler } = this
    // 以监听模式启动编译，如果以后文件发生变更了，会重新编译
    compiler.watch({}, () => {
      console.log('监听模式编译成功')
    })
    // let fs = new MemoryFs() // 内存文件系统实例
    // 以后打包后文件写入内存文件系统，读的时候也要从内存文件系统里读
    this.fs = compiler.outputFileSystem = fs
    // 返回一个中间件，用来响应客户端对于产出文件的请求 index.html main.js
    return (staticDir) => {
      // 静态文件根目录，它其实就是输出目录dist目录
      return (req, res, next) => {
        let { url } = req // 拿到请求路径
        if (url === '/favicon.ico') {
          return res.sendStatus(404)
        }
        url === '/' ? (url = '/index.html') : null
        // 得到要访问的静态路径 /index.html main.js
        let filePath = path.join(staticDir, url)
        console.log('filePath', filePath)
        try {
          // 判断是否存在这个文件,如果在的话直接把这个读出来发给浏览器,不存在就抛异常
          let stat = fs.statSync(filePath)
          if (stat.isFile()) {
            let content = fs.readFileSync(filePath) // 读取文件内容
            let contentType = mime.getType(filePath)
            res.setHeader('Content-Type', contentType)

            // res.statusCode = res.statusCode || 200
            res.send(content) // 把内容发送给浏览器
          } else {
            return res.sendStatus(404)
          }
        } catch (error) {
          return res.sendStatus(404)
        }
      }
    }
  }

  setupHooks() {
    const { compiler } = this
    // 监听编译完成事件，当编译完成之后会调用钩子函数
    compiler.hooks.done.tap('webpack-dev-server', (stats) => {
      // stats 是一个描述对象，里面放着打包后的结果hash chunkhash contenthash，产生了哪些代码块，产出哪些模块
      // console.log('stats', stats)
      this.currentHash = stats.hash
      this.clientSocketList.forEach((socket) => {
        socket.emit('hash', this.currentHash)
        socket.emit('ok') // 给客户端发一个ok
      })
    })
  }

  createServer() {
    this.server = http.createServer(this.app)
  }

  createSocketServer() {
    // websocket 协议握手是需要依赖http服务器
    const io = socketIO(this.server)
    // 服务器要监听客户端的连接
    io.on('connection', (socket) => {
      console.log('一个新的客户端已经连接上')
      this.clientSocketList.push(socket)
      socket.emit('ok')
      socket.on('disconnect', () => {
        const index = this.clientSocketList.indexOf(socket)
        this.clientSocketList.splice(index, 1)
      })
    })
  }

  listen(port, callback) {
    this.server.listen(port, callback)
  }
}

module.exports = Server
