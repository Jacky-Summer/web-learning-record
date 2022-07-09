/**
 * Compiler 负责整个编译过程，里面保存整个编译所有的信息
 */
const { SyncHook } = require('tapable')
const fs = require('fs')
const path = require('path')
const Compilation = require('./Compilcation')

class Complier {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(), // 会在开始编译的时候触发
      done: new SyncHook(), // 会在结束编译的时候触发
    }
  }

  // 4.执行Compiler对象的run方法开始执行编译
  run(callback) {
    this.hooks.run.call()

    // 5.根据配置中的entry找出入口文件
    this.compile((err, stats) => {
      //10在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
      for (let filename in stats.assets) {
        let filePath = path.join(this.options.output.path, filename)
        fs.writeFileSync(filePath, stats.assets[filename], 'utf8')
      }
      callback(err, {
        toJson: () => stats,
      })
    })

    this.hooks.done.call()

    // Object.values(this.options.entry).forEach((entry) => {
    //   fs.watchFile(entry, () => this.compile(callback))
    // })
    // 监听当前目录下面的所有的文件/ watch:true, watchOptions:{ignorePattens:/node_modules/}
    // if (this.options.watch) {
    //   fs.watchFile('.', () => this.compile(callback))
    // }
  }

  compile(callback) {
    const compilation = new Compilation(this.options)
    compilation.build(callback)
  }
}

module.exports = Complier
