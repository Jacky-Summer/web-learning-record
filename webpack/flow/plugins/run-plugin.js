class RunPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('RunPlugin', () => {
      console.log('run:开始编译')
    })
  }
}

module.exports = RunPlugin
