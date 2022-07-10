const less = require('less')

function loader(source) {
  let cssStr
  // render看着像异步，其实是同步的
  less.render(source, { filename: this.resource }, (err, output) => {
    if (err) {
      console.log(err)
      return
    }
    cssStr = output.css
    // this.callback(null, output.css)
  })
  return `module.exports = ${JSON.stringify(cssStr)}`
}

module.exports = loader
