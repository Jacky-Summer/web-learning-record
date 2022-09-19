import { useState, useEffect } from 'react'
import Test from './Test'

function App() {
  const [isShowText, setIsShowText] = useState(false)

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

  useEffect(() => {
    document.addEventListener('click', () => {
      setIsShowText(false)
    })
  }, [])

  return (
    <div className="App">
      <button onClick={handleClick}>React事件池</button>

      <button onClick={handleShowText}>事件委托变更</button>
      {isShowText && <div>展示文字</div>}
      <Test />
    </div>
  )
}

export default App
