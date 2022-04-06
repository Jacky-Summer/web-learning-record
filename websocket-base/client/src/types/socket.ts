export type ISocketMessage = string | Blob | SharedArrayBuffer | ArrayBuffer | ArrayBufferView
export enum SocketReadyStates {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export interface ISocketOptions {
  debug?: boolean
  readonly heartbeat?: {
    readonly params?: ISocketMessage
    readonly interval?: number
    readonly enableHeartbeat?: boolean
  }
}

export enum EventName {
  SOCKET_OPEN = 'socket_open',
  SOCKET_SEND = 'socket_send',
  SOCKET_MESSAGE = 'socket_message',
  SOCKET_CLOSE = 'socket_close',
  SOCKET_ERROR = 'socket_error',
}

export enum Heartbeats {
  PING = 'ping',
  PONG = 'pong',
}
