const { AsyncSeriesWaterfallHook } = require('tapable')
const hook = new AsyncSeriesWaterfallHook(['name', 'age'])
console.time('cost')
hook.tapPromise('1', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('1', name, age)
      resolve('result1')
    }, 1000)
  })
})
hook.tapPromise('2', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('2', name, age)
      resolve('result2')
    }, 2000)
  })
})
hook.tapPromise('3', (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('3', name, age)
      resolve('result3')
    }, 3000)
  })
})
hook.promise('jacky', 25).then((result) => {
  console.log(result)
  console.timeEnd('cost')
})
