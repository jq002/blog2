const Vue = require('vue');
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const Koa = require('koa')
const router = require('koa-router')()
// const routerInfo = require('koa-router')()
const koalogger =require( 'koa-logger')
const koaconvert =require( 'koa-convert')
const bodyParser=require('koa-bodyparser')
const historyApiFallback =require( './middleware/historyApiFallback')
const config=require('./config')
const mongoose = require('mongoose')
const api=require('./api')
const resolve = file => path.resolve(__dirname, file)

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.url)
mongoose.connection.on('error', console.error)

const app = new Koa()
app.use(koalogger());
app.use(bodyParser());

app.use(api.routes()).use(api.allowedMethods())
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './dist'
app.use(static(staticPath))


// 对路由admin直接走historyApiFallback,而不是用服务端渲染
app.use(koaconvert(historyApiFallback({
  verbose: true,
  index: '/admin.html',
  rewrites: [
    { from: /^\/admin$/, to: '/admin.html' },
    { from: /^\/admin\/login/, to: '/admin.html' },
  ],
  path: /^\/admin/
})))

const isProd = process.env.NODE_ENV === 'production'

function createRenderer(bundle, template) {
  return createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false
  })
}
let renderer
if (isProd) {
  // 生产环境下直接读取构造渲染器
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync(resolve('../dist/front.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
  app.use(static(staticPath))
} else {
  // 开发环境下使用hot/dev middleware拿到bundle与template
  require('../build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

// // 提示webpack还在工作
// routerInfo.get('*', async(ctx, next) => {
//   if (!renderer) {
//     return ctx.body = 'waiting for compilation... refresh in a moment.';
//   }
//   return next();
// })

// app.use(routerInfo.routes())
// 流式渲染
router.get('*', async(ctx, next) => {
  let res = ctx.res;
  let req = ctx.req;
  // 由于koa内有处理type，此处需要额外修改content-type
  ctx.type = 'html';
  const s = Date.now();
  let context = { url: req.url };
  function renderToStringPromise() {
    return new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          console.log(err);
        }
        if (!isProd) {
          console.log(`whole request: ${Date.now() - s}ms`)
        }
        resolve(html);
      })
    })
  }
  ctx.body = await renderToStringPromise();
})

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + config.app.port);
})
