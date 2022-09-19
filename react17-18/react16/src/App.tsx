import { useState, useEffect } from 'react'
import Test from './Test'

function App() {
  const [isShowText, setIsShowText] = useState(false)
  const handleClick = (e: React.MouseEvent) => {
    console.log('直接打印e', e.target) // <button>React事件池</button>
    // v17以下在异步方法拿不到事件e，必须先调用 e.persist()
    // e.persist()

    setTimeout(() => {
      console.log('setTimeout打印e', e.target) // null
    })
  }

  const handleShowText = (e: React.MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation() // 阻止监听同一事件的其他事件监听器被调用
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
