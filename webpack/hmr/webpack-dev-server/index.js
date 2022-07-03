const webpack = require('webpack')
const config = require('../webpack.config')
const Server = require('./lib/server')

// compiler（编译器对象）代表整个webpack编译任务，全局只有一个
const compiler = webpack(config)

const server = new Server(compiler)
server.listen(9092, () => {
  console.log('server run on http://localhost:9092')
})
