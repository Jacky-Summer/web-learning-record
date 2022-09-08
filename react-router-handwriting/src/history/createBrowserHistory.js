// https://github.com/remix-run/history/blob/v4.10.1/modules/createBrowserHistory.js
const createBrowserHistory = (props) => {
  const globalHistory = window.history
  let state // 代表当前的状态
  const listeners = [] //监听函数组成的数组

  const notify = (newHistory) => {
    Object.assign(history, newHistory)
    listeners.forEach((listener) => listener(history.location))
  }

  const listen = (listener) => {
    listeners.push(listener)

    // 返回一个取消此监听函数的方法
    return () => (listeners) => listeners.filter((l) => l !== listener)
  }

  window.addEventListener('popstate', () => {
    let location = { pathname: window.location.pathname, state: window.location.state }
    notify({ action: 'POP', location })
  })

  const push = (path, nextState) => {
    const action = 'PUSH'
    if (typeof path === 'object') {
      state = path.state
      pathname = path.pathname
    } else {
      state = nextState
    }
    globalHistory.pushState(state, null, pathname)
    const location = { pathname, state }
    notify({ action, location })
  }

  const go = (n) => {
    globalHistory.go(n)
  }

  const goBack = () => {
    go(-1)
  }

  const goForward = () => {
    go(1)
  }

  const history = {
    action: 'POP',
    push,
    listen,
    go,
    goBack,
    goForward,
    location: { pathname: window.location.pathname, state: window.location.state },
  }

  return history
}

export default createBrowserHistory
