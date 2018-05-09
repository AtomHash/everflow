var glob = require("glob");
var path = require('path');
var webpack = require('webpack');
var Config = require('./config.json');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: (Config.debug) ? 'development' : 'production',
  context: __dirname,
  entry: [
      './everflow.ts'
  ],
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'everflow.js',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'everflow',
    umdNamedDefine: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 5,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
      rules: [
          {
              test: /\.ts$/,
              loader: 'ts-loader'
          }
    ]
  },
  resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
    extensions: ['.js', '.ts', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#source-map'
}