// const path = require('path')


// const webpack = require('webpack')
// const merge = require('webpack-merge')
// const baseConfig = require('./webpack.base.config.js')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// //清除输出目录，免得每次手动删除
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = merge(baseConfig, {
//   entry:{
//   front:'./client/front/entry-client.js',
//   admin:'./client/admin/main.js'
// },//相对于启动webpack的当前目录
//   output:{
//       filename:'[name].[chunkhash].js',// 给输出的文件名称加上 Hash 值
//   },
//   plugins: [
//         // 配置提取出的样式文件
//         // new ExtractTextPlugin('css/[name].[contenthash].css'),
//     // new CleanWebpackPlugin(['../dist'], { root: __dirname }),


//     // 此插件在输出目录中,生成 `vue-ssr-client-manifest.json`。
//     new VueSSRClientPlugin(),

//     // keep module.id stable when vendor modules does not change
//     new webpack.HashedModuleIdsPlugin(),
//     // enable scope hoisting
//     new webpack.optimize.ModuleConcatenationPlugin(),
//     // split vendor js into its own file
//     //分别提取admin、front的公共部分
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//     //   chunks: ['admin'],
//       minChunks (module) {
//         // any required modules inside node_modules are extracted to vendor
//         return (
//           module.resource &&
//           /\.js$/.test(module.resource) &&
//           module.resource.indexOf(
//             path.join(__dirname, '../node_modules')
//           ) === 0
//         )
//       }
//     }),
//     // extract webpack runtime and module manifest to its own file in order to
//     // prevent vendor hash from being updated whenever app bundle is updated
//         // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
//     // 以便可以在之后正确注入异步 chunk。
//     // 这也为你的 应用程序/vendor 代码提供了更好的缓存。

//     // new webpack.optimize.CommonsChunkPlugin({
//     //   name: 'vendor_front',
//     //   chunks: ['front'],
//     //   minChunks (module) {
//     //     // any required modules inside node_modules are extracted to vendor
//     //     return (
//     //       module.resource &&
//     //       /\.js$/.test(module.resource) &&
//     //       module.resource.indexOf(
//     //         path.join(__dirname, '../node_modules')
//     //       ) === 0
//     //     )
//     //   }
//     // }),
//     // new webpack.optimize.CommonsChunkPlugin({
//     //     name: 'manifest_admin',
//     //     chunks: ['admin'],
//     //     minChunks: Infinity
//     //   }),
//     // extract webpack runtime and module manifest to its own file in order to
//     // prevent vendor hash from being updated whenever app bundle is updated
//     // new webpack.optimize.CommonsChunkPlugin({
//     //     name: 'manifest',
//     //   minChunks: Infinity
//     // }),
//     new HtmlWebpackPlugin({
//       filename: 'front.html',
//       template: './client/front/index.html',
//       chunks: ['manifest', 'vendor', 'front'],//包含的块
//       // inject: true,默认值true，script注入在body底部
//       minify:{
//         removeComments:true,//去除注释
//         collapseWhitespace:true,//压缩空白字符
//         removeAttributeQuotes:true//尽可能移除属性的引号
//       },
//     //   hash:true//给css、js文件加独一无二hash值，用于清除缓存
//     }),
//     new HtmlWebpackPlugin({
//       filename: 'admin.html',
//       template: './client/admin/index.html',
//       chunks: ['manifest', 'vendor', 'admin'],
//       minify:{
//         removeComments:true,//去除注释
//         collapseWhitespace:true,//压缩空白字符
//         removeAttributeQuotes:true//尽可能移除属性的引号
//       }
//     })
//   ]
// })
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。

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
