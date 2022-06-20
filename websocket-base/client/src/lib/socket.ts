import Emitter from './emitter'
import { ISocketMessage, SocketReadyStates, ISocketOptions, EventName, Heartbeats } from '../types'

class Socket extends Emitter {
  private readonly _url: string
  private readonly _options: ISocketOptions
  private _ws: WebSocket | null
  private _heartbeatTimer: number | null
  private static readonly SEND_HEARTBEAT_INTERVAL = 2_000

  constructor(url: string, options: ISocketOptions = {}) {
    super()
    this._url = url
    this._options = options
    this._ws = null
    this._heartbeatTimer = null

    this._createSocket()
  }

  private _createSocket() {
    this._ws = new WebSocket(this._url)
    this._initSocketEvent()
  }

  private _initSocketEvent() {
    if (this._ws) {
      this._ws.onopen = this._onOpen.bind(this)
      this._ws.onmessage = this._onMessage.bind(this)
      this._ws.onclose = this._onClose.bind(this)
      this._ws.onerror = this._onError.bind(this)
    }
  }

  private _onOpen(e: WebSocketEventMap['open']) {
    this.emit(EventName.SOCKET_OPEN, e)
    this._options.debug && console.log('--- websocket connected ---')
    this._sendHeartbeat()
  }

  send(message: ISocketMessage) {
    if (this._ws && this._ws.readyState === SocketReadyStates.OPEN) {
      this.emit(EventName.SOCKET_SEND, message)
      this._options.debug && console.log('--- websocket send ---', message)
      this._ws.send(message)
    }
  }

  private _onMessage(e: WebSocketEventMap['message']) {
    const jsonMessage = JSON.parse(e.data)
    this.emit(EventName.SOCKET_MESSAGE, jsonMessage)
    this._options.debug && console.log('--- websocket onmessage ---', e)
  }

  private _onClose(e: WebSocketEventMap['close']) {
    if (this._ws) {
      this.emit(EventName.SOCKET_CLOSE, e)
      this._options.debug && console.log('--- websocket closed ---', e)
      this._ws.close()
    }
  }

  private _onError(e: WebSocketEventMap['error']) {
    this.emit(EventName.SOCKET_ERROR, e)
    this._options.debug && console.log('--- websocket error ---', e)
  }

  private _sendHeartbeat() {
    if (this._ws && this._options.heartbeat) {
      this._heartbeatTimer && clearInterval(this._heartbeatTimer)
      const { interval = Socket.SEND_HEARTBEAT_INTERVAL, params = Heartbeats.PING } = this._options.heartbeat
      this._heartbeatTimer = setTimeout(() => {
        this._ws?.send(params)
      }, interval)
    }
  }
}

export default Socket
