const Article = require('../models/article');

class ArticleController {
  static async createArticle(ctx) {
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const publish = ctx.request.body.publish;
    const tags = ctx.request.body.tags;
    const createTime = new Date();
    const lastEditTime = new Date();
    if (!title) {
      ctx.throw(400, '标题不能为空')
    }
    if (!content) {
      ctx.throw(400, '文章内容不能为空')
    }
    if (tags.length==0) {
      ctx.throw(400, '标签不能为空')
    }
    const article=new Article({
        title,
        content,
        publish,
        tags,
        createTime,
        lastEditTime
    })
    let createResult=await article.save().catch(err=>{
        ctx.throw(500,'server error')
    });
    await Article.populate(createResult,{path:'tags'},function(err,result){
        createResult=result;
    });
    console.log('文章创建成功');
    ctx.body={
        success:true,
        article:createResult
    }
  }
  static async getAllArticles(ctx){
      const tags=ctx.query.tags;
      const page=+ctx.query.page;
      const limit=+ctx.query.limit||4;
      let skip=0;
      let articleArr;
      let allPage;
      let allNum;
      if(page!==0){
          skip=limit*(page-1)
      }
      if(!tags){
          articleArr=await Article.find().populate("tags")
          .sort({createTime:-1})
          .limit(limit)
          .skip(skip).catch(err=>{
              ctx.throw(500,'server error')
          })
          allNum=await Article.count().catch(err=>{
            ctx.throw(500,'server error')
          })
      }else{
          let tagArr=tags.split(',');
          articleArr=await Article.find({
              tags:{"$in":tagArr}
          })
          .populate('tags')
          .sort({createTime:-1})
          .limit(limit)
          .skip(skip).catch(err=>{
            ctx.throw(500,'server error')
        })
        allNum=await Article.find({
            tags:{"$in":tagArr}
        }).count().catch(err=>{
            ctx.throw(500,'server error')
          })
      }
      allPage=Math.ceil(allNum/limit)
      ctx.body={
          success:true,
          articleArr,
          allPage,
          page,
          allNum
      }
  }
  static async  getAllPublishArticles(ctx) {
    const tags = ctx.query.tags;
    const page = +ctx.query.page;
    const limit = +ctx.query.limit || 4;
    let skip = 0;
    let articleArr;
    let allPage;
    let allNum;
  
    if (page !== 0) {
      skip = limit * (page - 1)
    }
  
    if (!tags) {
      articleArr = await Article.find({
          publish: true
        })
        .populate("tags")
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip).catch(err => {
          ctx.throw(500, '服务器内部错误')
        });
      allNum = await Article.find({
        publish: true
      }).count().catch(err => {
        this.throw(500, '服务器内部错误')
      })
    } else {
      let tagArr = tags.split(',')
      // console.log(tagArr)
      articleArr = await Article.find({
          tags: { "$in": tagArr },
          publish: true
        })
        .populate("tags")
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip).catch(err => {
          ctx.throw(500, '服务器内部错误')
        });
      allNum = await Article.find({
        tags: { "$in": tagArr }
      }).count().catch(err => {
        ctx.throw(500, '服务器内部错误')
      })
    }
    allPage = Math.ceil(allNum / limit)
    ctx.body = {
      success: true,
      articleArr,
      allPage: allPage,
      page,
      allNum
    }
  }
  static async modifyArticle(ctx){
      const id=ctx.params.id;
      const title = ctx.request.body.title;
      const content = ctx.request.body.content;
      const publish = ctx.request.body.publish;
      const tags = ctx.request.body.tags;
      const lastEditTime = new Date();
      if (!title) {
        ctx.throw(400, '标题不能为空')
      }
      if (!content) {
        ctx.throw(400, '文章内容不能为空')
      }
      if (tags.length==0) {
        ctx.throw(400, '标签不能为空')
      }
      const article=new Article({
          title,
          content,
          publish,
          tags,
          lastEditTime
      })
      const article=await Article.findByIdAndUpdate(id,article).catch(err=>{
          if(err.name==='CastError'){
              ctx.throw(400,"id is not exist")
          }else{
              ctx.throw(500,'server error')
          }
      });
      ctx.body={
          success:true,
        //   article
      }
  }
  static async getArticle(ctx){
    const id = ctx.params.id;
    if (id == '') {
      ctx.throw(400, 'id不能为空')
    }

    const article = await Article.findById(id).catch(err => {
      if (err.name === 'CastError') {
        ctx.throw(400, 'id不存在');
      } else {
        ctx.throw(500, '服务器内部错误')
      }
    });
    ctx.body = {
      success: true,
      article: article
    }
  }
  static async  deleteArticle(ctx) {
    const id = ctx.params.id;
    const article = await Article.findByIdAndRemove(id).catch(err => {
      if (err.name === 'CastError') {
        this.throw(400, 'id不存在');
      } else {
        this.throw(500, '服务器内部错误')
      }
    });
    ctx.body = {
      success: true
    }
  }
  
  static async  publishArticle(ctx) {
    const id = ctx.params.id;
    const article = await Article.findByIdAndUpdate(id, { $set: { publish: true } }).catch(err => {
      if (err.name === 'CastError') {
        this.throw(400, 'id不存在');
      } else {
        this.throw(500, '服务器内部错误')
      }
    });
    ctx.body = {
      success: true
    }
  }
  
  static async  notPublishArticle(ctx) {
    const id = ctx.params.id;
    const article = await Article.findByIdAndUpdate(id, { $set: { publish: false } }).catch(err => {
      if (err.name === 'CastError') {
        this.throw(400, 'id不存在');
      } else {
        this.throw(500, '服务器内部错误')
      }
    });
    ctx.body = {
      success: true
    }
  }
}

module.exports=ArticleController