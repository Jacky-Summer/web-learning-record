import { useCallback, useEffect, useRef, useState } from 'react'
import Socket from './lib/socket'
import { EventName, IMessage } from './types'

function App() {
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [isEnter, setIsEnter] = useState(false)
  const [chatList, setChatList] = useState<string[]>([])
  const [onlineCount, setOnlineCount] = useState(0)
  const wsRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (isEnter && !wsRef.current) {
      wsRef.current = new Socket('ws://127.0.0.1:8080')

      wsRef.current.on(EventName.SOCKET_OPEN, onOpen)
      wsRef.current.on(EventName.SOCKET_MESSAGE, onMessage)
      wsRef.current.on(EventName.SOCKET_CLOSE, onClose)
      wsRef.current.on(EventName.SOCKET_ERROR, onError)
    }
  }, [isEnter, chatList])

  // 更新聊天列表
  const updateChatList = (chatMessage: string) => {
    // 修复闭包导致state不更新问题
    setChatList((preChatList) => {
      return [...preChatList, chatMessage]
    })
  }

  const onOpen = () => {
    wsRef.current?.send(
      JSON.stringify({
        type: 'enter',
        name: userName,
      })
    )
  }

  const onMessage = (message: IMessage) => {
    switch (message.type) {
      case 'enter': {
        if (userName !== message.name) {
          updateChatList(`欢迎${message.name}加入聊天室`)
        }
        break
      }
      case 'message': {
        updateChatList(`${message.name === userName ? '我' : message.name}：${message.message}`)
        break
      }
      case 'leave': {
        updateChatList(`${message.name}已经退出了聊天室`)
        break
      }
    }
    setOnlineCount(message.onlineCount)
    console.log('收到的消息：', message)
  }

  const onClose = () => {}

  const onError = () => {}

  const handleEnter = () => {
    if (userName.trim() === '') {
      alert('用户名不能为空')
      return
    }
    setIsEnter(true)
  }

  const sendMessage = () => {
    wsRef.current?.send(
      JSON.stringify({
        type: 'message',
        message,
      })
    )
    setMessage('')
  }

  return (
    <div>
      {!isEnter && (
        <div>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button onClick={handleEnter}>确定加入聊天室</button>
        </div>
      )}

      {isEnter && (
        <div>
          <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>发送消息</button>
          </div>
          <div>在线人数：{onlineCount}</div>
          <div>
            {
              <ul>
                {chatList.map((message, index) => {
                  return <li key={index}>{message}</li>
                })}
              </ul>
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default App
