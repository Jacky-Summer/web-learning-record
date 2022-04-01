const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    wss.clients.forEach((message) => {
      ws.send(message)
    })
  })

  ws.on('close', function () {})

  ws.send('something')
})
