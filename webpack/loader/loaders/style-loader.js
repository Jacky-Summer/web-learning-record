const loaderUtils = require('loader-utils')

function loader(source) {
  // const script = `
  //   let style = document.createElement('style')
  //   style.innerHTML = ${JSON.stringify(source)}
  //   document.head.appendChild(style)
  //   module.exports = ""
  // `
  // return script
}

loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log('remainingRequest', remainingRequest)
  console.log('previousRequest', previousRequest)
  console.log('data', data)

  /**
   * remainingRequest  loaders/less-loader.js!xx/path/xxx/index.less
   * !! 表示只要行内，不要pre post normal
   * 执行的时候先读取index.less内容，然后把内容给less-loader.js，获得到模块的导出对象module.exports
   * loader-runner执行了几次?
   */
  const script = `
    let style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
    document.head.appendChild(style)
    module.exports = ""
  `
  return script
}

module.exports = loader
