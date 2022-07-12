const { AsyncSeriesBailHook } = require('tapable')
const hook = new AsyncSeriesBailHook(['name', 'age'])
console.time('cost')
hook.tapPromise('1', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1)
      resolve()
    }, 1000)
  })
})
hook.tapPromise('2', (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(2)
      // 如果有返回值了，后面的事件函数就不再执行，直接结束了
      resolve('2')
    }, 2000)
  })
})
hook.tapPromise('3', (name, age, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3)
      resolve()
    }, 3000)
  })
})
hook.promise('jacky', 25).then((result) => {
  console.log(result)
  console.timeEnd('cost')
})
