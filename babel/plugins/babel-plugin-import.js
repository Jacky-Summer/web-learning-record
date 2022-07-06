/**
 * 实现极简 babel-plugin-import 插件
 * 
 * 需要对照 AST 结构 `import { concat, flatten } from 'lodash'`
 * 1. 在 ImportDeclaration 里将所有的 specifier 收集起来
 *  source.value: lodash
    specifier.local.name: concat
    specifier.local.name: flatten
 * 
 */

const types = require('@babel/types')

const plugin = {
  visitor: {
    ImportDeclaration: {
      enter(nodePath, state) {
        const { node } = nodePath
        const {
          opts: { libraryName, libraryDirectory },
        } = state

        const source = node.source // import 的包名 -> lodash
        const specifiers = node.specifiers // node.specifiers 表示 import 了什么
        // 引入的模块名等于插件配置的模块名 && 如果不是默认导入才处理
        if (libraryName === source.value && !types.isImportDefaultSpecifier(specifiers[0])) {
          const declarations = specifiers.map((specifier) => {
            return types.importDeclaration(
              [types.importDefaultSpecifier(specifier.local)],
              types.stringLiteral(`${source.value}/${specifier.local.name}`) // local.name 是导入进来的别名
            )
          })
          nodePath.replaceWithMultiple(declarations)
        }
      },
    },
  },
}

module.exports = function () {
  return plugin
}
