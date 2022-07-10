const { getOptions } = require('loader-utils')
const mime = require('mime')

function loader(source) {
  const options = getOptions(this) || {}
  let { limit, fallback = 'file-loader' } = options
  if (limit) {
    limit = parseInt(limit, 10)
  }
  const fileType = mime.getType(this.resourcePath)
  if (limit && limit > source.length) {
    const base64Str = `data:${fileType};base64,${source.toString('base64')}`
    return `module.exports = ${JSON.stringify(base64Str)}`
  }
  return require(fallback).call(this, source)
}

loader.raw = true
module.exports = loader
