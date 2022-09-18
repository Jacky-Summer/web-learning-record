function App() {
  const handleClick = (e: React.MouseEvent) => {
    console.log('直接打印e', e.target) // <button>React事件池</button>
    // v17以下在异步方法拿不到事件e，必须先调用 e.persist()
    // e.persist()

    setTimeout(() => {
      console.log('setTimeout打印e', e.target) // null
    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}>React事件池</button>
    </div>
  )
}

export default App
