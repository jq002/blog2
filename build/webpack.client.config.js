const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  entry:{
  front:'./client/front/entry-client.js',
  admin:'./client/admin/main.js'
  // admin:["webpack-hot-middleware/client?noInfo=true&reload=true","./client/admin/main.js"]
},//相对于启动webpack的当前目录
  output:{
      filename:'static-[name]-client.js',
  },
  plugins: [
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }), 
    // 此插件在输出目录中,生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息,
    new HtmlWebpackPlugin({
      filename: 'front.html',
      template: './client/front/index.html',
      chunks: ['manifest', 'vendor', 'front'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './client/admin/index.html',
      chunks: ['manifest', 'vendor', 'admin'],
      inject: true
    })
  ]
})