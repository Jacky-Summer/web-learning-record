import { useState, useEffect } from 'react'
import Test from './Test'
import Content from './Content'

function App() {
  const [isShowText, setIsShowText] = useState(false)
  const [isShowRefContent, setIsShowRefContent] = useState(true)

  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  // v17：去除了 React 事件池
  const handleClick = (e: React.MouseEvent) => {
    console.log('直接打印e', e.target) // <button>React事件池</button>

    setTimeout(() => {
      console.log('setTimeout打印e', e.target) // <button>React事件池</button>
    })
  }

  const handleShowText = (e: React.MouseEvent) => {
    e.stopPropagation() // 停止向document传播
    setIsShowText(true)
  }

  const handleBatching = () => {
    // re-render 一次，这就是批处理的作用
    setCount((c) => c + 1)
    setFlag((f) => !f)

    // re-render两次：v17的批处理只会在事件处理函数中实现，而在Promise链、异步代码、原生事件处理函数中失效
    // setTimeout(() => {
    //   setCount((c) => c + 1)
    //   setFlag((f) => !f)
    // }, 0)
  }

  // useEffect(() => {
  //   document.addEventListener('click', () => {
  //     setIsShowText(false)
  //   })
  // }, [])

  console.log('render')

  return (
    <div className="App">
      <button onClick={handleClick}>React事件池</button>

      <button onClick={handleShowText}>事件委托变更</button>
      {isShowText && <div>展示文字</div>}

      <Test />

      <button
        onClick={() => {
          setIsShowRefContent(false)
        }}
      >
        触发副作用销毁
      </button>
      {isShowRefContent && <Content />}

      {/* react18对比 */}
      <div>
        <button onClick={handleBatching}>自动批处理</button>
      </div>
    </div>
  )
}

export default App
