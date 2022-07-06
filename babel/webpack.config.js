const path = require('path')
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  watch: true,
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                // 按需打包
                // ['import', { libraryName: 'lodash', libraryDirectory: '' }],
                [path.resolve('plugins/babel-plugin-import.js'), { libraryName: 'lodash', libraryDirectory: '' }],
              ],
            },
          },
        ],
      },
    ],
  },
}
