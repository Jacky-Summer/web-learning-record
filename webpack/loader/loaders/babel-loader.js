const core = require('@babel/core')
const { getOptions } = require('loader-utils')

function loader(source, inputSourceMap, inputAst) {
  let options = getOptions(this) || {}
  options = {
    presets: ['@babe-env'],
    inputSourceMap,
    sourceMaps: true,
    filename: this.resourcePath,
    ...options,
  }
  const { code, map, ast } = core.transform(source, options)
  // return code // 如果返回的是一个值
  // 如果返回的是多个值
  return this.callback(null, code, map, ast)
}

module.exports = loader
