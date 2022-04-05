export type EventMap = Record<string, any>
export type EventName<T extends EventMap> = keyof T
export type EventListener<T> = (...args: T[]) => void

class Emitter<T extends EventMap = any> {
  protected readonly _listeners: EventMap

  constructor() {
    this._listeners = new Map()
  }

  on<K extends EventName<T>>(eventKey: K, func: EventListener<T[K]>, once = false) {
    const eventHandler = {
      once,
      func,
    }
    if (!this._listeners.has(eventKey)) {
      this._listeners.set(eventKey, [eventHandler])
    } else {
      let listeners = this._listeners.get(eventKey)
      if (Array.isArray(listeners)) {
        listeners.push(eventHandler)
      } else {
        listeners = [eventHandler]
      }
      this._listeners.set(eventKey, listeners)
    }
  }

  once<K extends EventName<T>>(eventKey: K, func: EventListener<T[K]>) {
    this.on(eventKey, func, true)
  }

  emit<K extends EventName<T>>(eventKey: K, ...args: T[K][]) {
    const listeners = this._listeners.get(eventKey)

    if (Array.isArray(listeners)) {
      listeners.forEach((eventHandler) => {
        if (eventHandler.once) {
          this._listeners.delete(eventKey)
        }

        eventHandler.func(...args)
      })
    }
  }

  off<K extends EventName<T>>(eventKey: K) {
    if (this._listeners.has(eventKey)) {
      this._listeners.delete(eventKey)
    }
  }

  clear() {
    this._listeners.clear()
  }
}

export default Emitter
