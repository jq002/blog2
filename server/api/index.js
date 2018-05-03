const Router = require('koa-router')
const UserController = require('../controllers/user')
const TagController=require('../controllers/tag')
const verify=require('./verify')
const config=require('./../config')
// const ListController = require('../controllers/list')
const router = new Router({
  prefix: config.app.baseApi
})
UserController.initUser();
router.post('/login', UserController.postLogin)  // 登录
router.post('/tags',verify, TagController.createTag)  // 创建tag
router.get('/tags',verify,TagController.getAllTag)//获得全部tag
router.delete('/tags/:id',verify,TagController.deleteTag)//删除tag

module.exports = router
