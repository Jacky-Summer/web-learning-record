/**
 * 简易版webpack实现测试
 * 运行：node debugger.js --mode=development
 */

const webpack = require('./webpack')
// debugger
const options = require('./webpack.config')
const compiler = webpack(options)
compiler.run((err, stats) => {
  console.log(
    JSON.stringify(
      stats.toJson({
        assets: true, //资源
        chunks: true, //代码块
        modules: true, //模块
        entries: true, //入口
      }),
      null,
      2
    )
  )
})
