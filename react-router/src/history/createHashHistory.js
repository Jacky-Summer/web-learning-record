// https://github.com/remix-run/history/blob/v4.10.1/modules/createHashHistory.js
const HashChangeEvent = 'hashchange'

const createHashHistory = (props) => {
  let historyStack = [] // 类似于历史栈 location={pathname,state}
  let action = 'POP' // 代表当前的动作
  let state // 代表当前的状态
  const listeners = [] //监听函数组成的数组

  const listen = (listener) => {
    listeners.push(listener)

    // 返回一个取消此监听函数的方法
    return () => (listeners) => listeners.filter((l) => l !== listener)
  }

  const handleHashChange = (event) => {
    console.log('hashChangeHandler')
    const pathname = window.location.hash.slice(1)
    const location = { pathname, state }
    Object.assign(history, { action, location })
    listeners.forEach((listener) => listener(history.location))
  }

  window.addEventListener(HashChangeEvent, handleHashChange)

  if (window.location.hash) {
    action = 'PUSH'
    handleHashChange()
  } else {
    window.location.hash = '/'
  }

  const history = {
    action: 'POP', // 当前的动作
    listen,
    location: { pathname: '/', state: undefined },
  }

  return history
}

export default createHashHistory
