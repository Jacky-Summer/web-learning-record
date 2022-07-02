/**
 * 存两个hash值，一个是上一个hash，一个是当前hash
 */
let lastHash
hotEmitter.on('webpackHotUpdate', () => {
  console.log('hotCheck')
})
