const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  resolveLoader: {
    // alias: {
    //   // 'babel-loader': path.resolve('loaders/babel-loader.js'),
    //   // "file-loader": path.resolve("loaders/file-loader.js"),
    // },
    modules: [path.resolve('loaders'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      // {
      //   test: /\.jpg$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         filename: '[hash:8].[ext]',
      //         // limit: 8 * 1024,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              filename: '[hash:8].[ext]',
              limit: 1000 * 1024,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
