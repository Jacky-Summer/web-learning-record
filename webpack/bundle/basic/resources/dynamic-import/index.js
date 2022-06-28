document.getElementById('btn').onclick = function () {
  import('./title.js').then((res) => {
    console.log('res', res.default)
  })
}

/**
 
异步加载的基本流程
- 1.点击按钮
- 2.加载包含额外代码块的模块定义的JS文件
- 3.JS文件加载回来后JS脚本会执行
- 4.把新的模块定义合并到老的模块定义上
- 5.走正常的加载逻辑了，加载新的模块，让 Promise resolve,然后走then
  
 
*/
