var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //   entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'), //打包后存放的本地目录，必须是string类型的绝对路径
    publicPath: '/', //配置发布到线上的资源的路径前缀
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        // use: ExtractTextPlugin.extract({
        //   use: [
        //     'vue-style-loader',
        //     'css-loader'
        //   ],
        //   fallback: 'vue-style-loader'
        // })
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     'sass-loader'
        //   ],
        //   fallback: 'vue-style-loader'
        // })
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        // use: ExtractTextPlugin.extract({
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     'sass-loader?indentedSyntax'
        //   ],
        //   fallback: 'vue-style-loader'
        // })
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 压缩输出的 JavaScript 代码
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
