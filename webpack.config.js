var glob = require("glob");
var path = require('path');
var webpack = require('webpack');
var Config = require('./config.json');

module.exports = {
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
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              //set to development(adds vuejs debugging) or production (remove vuejs debugging)
              NODE_ENV: (Config.debug) ? '"development"' : '"production"'
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: (Config.debug) ? false : true,
          mangle: false,
          compress:
          {
              warnings: false
          }
      })
  ],
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
  externals: {
      jquery: 'jQuery'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: (Config.debug) ? '#eval-source-map' : '#source-map'
}