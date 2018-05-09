
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: {
    front: './client/front/entry-client.js',
    admin: './client/admin/main.js'
    // admin:["webpack-hot-middleware/client?noInfo=true&reload=true","./client/admin/main.js"]
  }, //相对于启动webpack的当前目录
  output: {
    filename: '[name].[chunkhash].js', // 给输出的文件名称加上 chunkhash 值
  },
  plugins: [
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/,
    //   cssProcessorOptions: { 
    //        discardComments: { removeAll: true } 
    //   }
    // }),
    // // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: '[name].[contenthash].css'
    // }),
    //分别提取admin、front的第三方库部分
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor_admin',
        chunks: ['admin'],
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor_front',
          chunks: ['front'],
        minChunks(module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      }),
    // 此插件在输出目录中,生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    // new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息,
    new HtmlWebpackPlugin({
      filename: 'front.html',
      template: './client/front/index.html',
      chunks: ['manifest', 'vendor_front', 'front'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './client/admin/index.html',
      chunks: ['manifest', 'vendor_admin', 'admin'],
      inject: true
    })
  ]
})
