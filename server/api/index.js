const Router = require('koa-router')
const UserController = require('../controllers/user')
const config=require('./../config')
// const ListController = require('../controllers/list')
const router = new Router({
  prefix: config.app.baseApi
})
UserController.initUser();
router.post('/login', UserController.postLogin)  // 登录

module.exports = router
