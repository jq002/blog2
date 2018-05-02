const Vue = require('vue');
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
const Koa = require('koa')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()
const isProd = process.env.NODE_ENV === 'production'

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}
let renderer
let readyPromise
const templatePath = resolve('./client/font/index.template.html')
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}





// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './dist'
app.use(static(staticPath))

app.use(async (ctx) => {
  const context = {
    url: ctx.request.url
  }
  function renderToStringPromise() {
    return new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          console.log(err);
        }
        resolve(html);
      })
    })
  }
  ctx.body = await renderToStringPromise();
})


app.listen(8887, () => {
  console.log('The server is running at http://localhost:' + '8887');
})
