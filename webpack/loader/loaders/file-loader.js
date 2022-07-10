/**
 * webpack里如何加载一个图片
 * 1.生成一个文件名 [hash:8].[ext]=> xxxxxxxx.jpg
 * 2.向输出目录，比如说dist目录写入一个文件 xxxxxxxx.jpg
 * 3.返回一段模块化的JS脚本，JS脚本会导出这个新的路径文件名
 */
const { getOptions, interpolateName } = require('loader-utils')
const core = require('@babel/core')

function loader(source) {
  const options = getOptions(this) || {}
  //interpolateName获取文件的hash值，并插入值,生成唯一的文件名
  const url = interpolateName(this, options.filename || '[hash:8].[ext]', { source })

  // 会在输出目录目录下面生成一个文件
  this.emitFile(url, source)
  return `module.exports = ${JSON.stringify(url)}`
}
// true：得到的是Buffer false得到的字符串
loader.raw = true
module.exports = loader
