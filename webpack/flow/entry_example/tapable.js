// tapable 是一个类似于 Node.js 中的 EventEmitter 库，但更专注于自定义事件的触发和处理
const { SyncHook } = require('tapable')

// 实例化钩子类时传入的数组，实际上只用上了数组的长度，名称是为了便于维护
const hook = new SyncHook(['name', 'age'])
// 注册事件回调的方法，它第一个参数可以是事件回调的名字，也可以是配置对象
hook.tap('click', (name, age) => {
  console.log('clicked', name, age)
})
/**
 * call 对应 tap、callAsync 对应 tapAsync 和 promise 对应 tapPromise。一般来说，我们注册事件回调时用了什么方法，触发时最好也使用对应的方法。
 */
// call 传入参数的数量需要与实例化时传递给钩子类构造函数的数组长度保持一致
hook.call('click', 12)
