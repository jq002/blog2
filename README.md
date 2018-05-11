# blog

> A blog with vue2\koa2\mongodb which supports Server-Side Rendering

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
npm run pm2
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## bug
1. centos7:node-sass的安装失败：使用cnpm安装淘宝镜像；[issue](https://github.com/angular/angular-cli/issues/4429)
2. centos7:mongodb启动失败：配置文件增加fork=true

```
 npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## todo
- 完成分页插件
- webpack打包优化（提取分离css）
- 归档部分的接口逻辑
- front端文章提取目录结构
- front端下一篇的实现
- 支持评论
- 增加统计
- 考虑图片上传实现方案
- docker和ngnix
- 域名
- 设计一个自己的logo(favicon.ico)
