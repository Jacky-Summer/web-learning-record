const { SyncBailHook } = require('tapable')

const hook = new SyncBailHook(['name', 'age'])
// 当回调函数或者说事件函数返回非undefined的时候 就会停止后续的执行
hook.tap('1', (name, age) => {
  console.log(1, name, age)
})
hook.tap('2', (name, age) => {
  console.log(2, name, age)
  return 'error' // 保险丝一样，如果有返回值了，就直接熔断了，后面不走了
})
hook.tap('3', (name, age) => {
  console.log(3, name, age)
})
hook.call('jacky', 25)
