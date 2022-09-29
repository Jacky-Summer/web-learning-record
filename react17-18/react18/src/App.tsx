import { useState } from 'react'
import { flushSync } from 'react-dom'
import TransitionTest from './TransitionTest'

function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const handleAutoBatching = () => {
    // re-render 一次
    setCount((c) => c + 1)
    setFlag((f) => !f)

    // 退出批处理
    flushSync(() => {
      setCount((c) => c + 1)
    })
    flushSync(() => {
      setFlag((f) => !f)
    })

    // 自动批处理：re-render 一次
    // setTimeout(() => {
    //   setCount((c) => c + 1)
    //   setFlag((f) => !f)
    // }, 0)
  }

  console.log('render')

  return (
    <div className="App">
      <div>
        <button onClick={handleAutoBatching}>自动批处理</button>
      </div>

      <h2>Transition Test</h2>
      <TransitionTest />
    </div>
  )
}

export default App
