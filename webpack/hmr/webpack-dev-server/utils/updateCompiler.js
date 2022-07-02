/**
 * 为了实现客户端跟服务端通信，需要往入口里多注入两个文件
 * webpack-dev-server/client/index.js
 * webpack/hot/dev-server.js （webpack源码）
 * ./src/index.js
 */
const path = require('path')
function updateCompiler(compiler) {
  const config = compiler.options
  config.entry = {
    main: [
      path.resolve(__dirname, '../client/index.js'),
      path.resolve(__dirname, '../../webpack/hot/dev-server.js'),
      config.entry,
    ],
  }
}

module.exports = updateCompiler
