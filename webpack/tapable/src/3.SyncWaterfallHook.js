const { SyncWaterfallHook } = require('tapable')

const hook = new SyncWaterfallHook(['name', 'age'])
// 如果上一个回调函数的结果不为undefined则可以作为下一个回调函数的第一个参数
hook.tap('1', (name, age) => {
  console.log(1, name, age)
  return 'fn1'
})
hook.tap('2', (name, age) => {
  console.log(2, name, age)
  //return 'fn2';//保险丝一样，如果有返回值了，就直接熔断了，后面不走了
})
hook.tap('3', (name, age) => {
  console.log(3, name, age)
})

hook.call('jacky', 10)
