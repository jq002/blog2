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
## 项目地址
- github： https://github.com/jq002/blog2
- 在线访问地址：http://140.143.167.20:8886/
## blog展示
#### blog技术细节
![image](https://note.youdao.com/yws/public/resource/f038e6e4d060b7849629c3d0f3fecbbb/xmlnote/EDBA2DF1FBFE4380B745E4F911C32EB1/7761)
#### front展示
![image](https://note.youdao.com/yws/public/resource/f038e6e4d060b7849629c3d0f3fecbbb/xmlnote/6DDDE9A946D44857907138233CA1B1AE/7759)
#### admin展示
![image](https://note.youdao.com/yws/public/resource/f038e6e4d060b7849629c3d0f3fecbbb/xmlnote/F2901EE29B8F45829A64ED014AC936C1/7757)
## bug
1. centos7:node-sass的安装失败：使用cnpm安装淘宝镜像；[issue](https://github.com/angular/angular-cli/issues/4429)
2. centos7:mongodb启动失败：配置文件增加fork=true

```
 npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## todo
- 完成分页插件
- webpack打包优化（提取分离css）
- 归档部分的接口逻辑修改
- front端文章提取目录结构
- front端下一篇的实现
- 支持评论
- 增加统计
- 考虑图片上传实现方案
- docker和ngnix
- 域名
- 设计一个自己的logo(favicon.ico)
- front端的head修改

## 参考文献
- [基于vue2、koa2、mongodb的个人博客](https://imhjm.com/article/58f76ed0c9eb43547d08ec6c#h3-13)
- [八幅漫画理解使用JSON Web Token设计单点登录系统](https://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)
- [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
- [vue服务端渲染-构建配置](https://ssr.vuejs.org/zh/build-config.html)
- [front端界面设计](https://tianqi.name/blog/)