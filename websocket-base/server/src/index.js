const WebSocket = require('ws')

const wss = new WebSocket.WebSocketServer({ port: 8080 })
let onlineCount = 0 // 在线人数

wss.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    const jsonMessage = JSON.parse(data)
    if (jsonMessage.type === 'enter') {
      onlineCount++
      ws.name = jsonMessage.name
    }

    if (jsonMessage.type === 'ping') {
      ws.send(JSON.stringify({ type: 'pong' }))
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && jsonMessage.type !== 'ping') {
        jsonMessage.name = ws.name
        jsonMessage.onlineCount = onlineCount
        client.send(JSON.stringify(jsonMessage))
      }
    })
  })

  // ws.on('close', function () {
  //   if (ws.name) {
  //     onlineCount--
  //   }
  //   wss.clients.forEach((client) => {
  //     if (client.readyState === WebSocket.OPEN) {
  //       jsonMessage.name = ws.name
  //       jsonMessage.onlineCount = onlineCount
  //       jsonMessage.type = 'leave'
  //       client.send(JSON.stringify(msgObj))
  //     }
  //   })
  // })
})
