/**
 * 实现一个babel插件
 * 把es6的箭头函数变成es5的普通函数
 * pnpm i @babel/core  @babel/types babel-plugin-transform-es2015-arrow-functions -D
 */
const core = require('@babel/core')
const types = require('@babel/types')
// const babelPluginTransformEs2015ArrowFunctions = require('babel-plugin-transform-es2015-arrow-functions')

const babelPluginTransformEs2015ArrowFunctions = {
  // 访问者visitor 迭代器模式 iterator for(let key of obj){}
  visitor: {
    // 要处理的节点的类型(箭头函数)
    ArrowFunctionExpression(nodePath) {
      let node = nodePath.node
      node.type = 'FunctionExpression'
    },
  },
}

const sourceCode = `const test = () => {
	console.log(123)
}`

const { code } = core.transform(sourceCode, {
  plugins: [babelPluginTransformEs2015ArrowFunctions],
})
console.log(code)
