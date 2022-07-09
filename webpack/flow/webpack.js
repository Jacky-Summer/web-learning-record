/**
 * 实现简易版 webpack
 */
const Complier = require('./Complier')

function webpack(options) {
  // 1. 初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
  const argv = process.argv.slice(2) // process.argv 格式例如：--mode=development
  const shellOptions = argv.reduce((shellOptions, option) => {
    const [key, value] = option.split('=')
    shellOptions[key.slice(2)] = value
    return shellOptions
  }, {})

  const finalOptions = { ...options, ...shellOptions }
  // 2.用上一步得到的参数初始化Compiler对象
  const compiler = new Complier(finalOptions)
  // 3.加载所有配置的插件
  const { plugins } = finalOptions
  for (const plugin of plugins) {
    plugin.apply(compiler)
  }
  return compiler

  // 6.从入口文件出发,调用所有配置的Loader对模块进行编译
  // 7.再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
  // 8.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
  // 9.再把每个Chunk转换成一个单独的文件加入到输出列表
  // 10在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
}
module.exports = webpack
