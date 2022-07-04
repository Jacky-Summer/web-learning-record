const esprima = require('esprima') // code -> ast
const estraverse = require('estraverse') // 遍历ast
const escodegen = require('escodegen') // ast -> code

const sourceCode = `const test = () => {
	console.log(123)
}`

function transform(sourceCode) {
  // esprima可以源代码转成一个抽象语法树
  const ast = esprima.parseScript(sourceCode)
  // estraverse 用来 遍历语法树上的所有节点，然后可以处理你关心的节点
  estraverse.traverse(ast, {
    enter: function (node) {
      // 将箭头函数改为es5函数
      if (node.type === 'ArrowFunctionExpression') {
        node.type = 'FunctionExpression'
      }
    },
  })
  const code = escodegen.generate(ast)
  return { code }
}

console.log(transform(sourceCode))

exports.transform = transform
