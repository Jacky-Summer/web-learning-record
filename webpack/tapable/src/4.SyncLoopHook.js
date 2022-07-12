const { SyncLoopHook } = require('tapable')
const hook = new SyncLoopHook(['name', 'age'])
// 特点是不停的执行回调函数，直接结果为undefined为止，每次循环都是从头开始执行
// 如果返回值是undefined就会往后执行下一个函数
let counter1 = 0
let counter2 = 0
let counter3 = 0
hook.tap('1', () => {
  console.log(1, 'counter1', counter1)
  if (++counter1 === 1) {
    counter1 = 0
    return
  }
  return true
})
hook.tap('2', () => {
  console.log(2, 'counter2', counter2)
  if (++counter2 === 2) {
    counter2 = 0
    return
  }
  return true
})
hook.tap('3', () => {
  console.log(3, 'counter3', counter3)
  if (++counter3 === 3) {
    counter3 = 0
    return
  }
  return true
})
hook.call('jacky', 25)
