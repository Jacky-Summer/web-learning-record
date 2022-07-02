// 连接websocket服务器
// let io = require('socket.io-client')
let currentHash
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
