var glob = require("glob");
var path = require('path');
var fs = require('fs-extra');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
var packageJSON = fs.readJsonSync('./package.json');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .filter(function(y) {
    return !(y in packageJSON.devDependencies);
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

delete nodeModules['vue'];
// delete nodeModules['axios'];
// delete nodeModules['crypto-js'];
// delete nodeModules['localforage'];
// delete nodeModules['lodash'];
// delete nodeModules['moment'];
delete nodeModules['vue-class-component'];
delete nodeModules['vue-property-decorator'];
delete nodeModules['vue-router'];

module.exports = {
  mode: 'production',
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
    minimize: true,
    minimizer: [new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
            semicolons: false
          },
          compress: {
            collapse_vars: false, // some platforms have issues. disabled. 
            sequences: false // some platforms have issues. disabled. 
          },
          keep_fnames: true
        }
      })],
  },
  /*
  plugins: [
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 5,
          mangle: true
        },
        sourceMap: true
      })
  ],
  */
  externals: nodeModules,
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
  performance: {
    hints: false
  },
  devtool: '#source-map'
}