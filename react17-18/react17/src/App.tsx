function App() {
  // v17：去除了 React 事件池
  const handleClick = (e: React.MouseEvent) => {
    console.log('直接打印e', e.target) // <button>React事件池</button>

    setTimeout(() => {
      console.log('setTimeout打印e', e.target) // <button>React事件池</button>
    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}>React事件池</button>
    </div>
  )
}

export default App
