import Vue from 'vue'
import Router from 'vue-router'
import Article from './../pages/Article.vue'
import Category from './../pages/Category.vue'
import HelloWorld from './../components/HelloWorld.vue'
import MarkdownEditor from './../pages/MarkdownEditor.vue'
import Login from './../pages/Login.vue'
import Home from './../pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
    name: 'Login',
    path: '/admin/login',
    component: Login,
    meta:{
      authPage:true
    }
  }, {
    path: '/admin',
    component: Home,
    name: 'Home',
    children: [{
        name: 'Article',
        path: '/article',
        component: Article
      },
      {
        name: 'Category',
        path: '/category',
        component: Category
      },
      {
        name: 'MarkdownEdit',
        path: '/mdedit',
        component: MarkdownEditor
      }]
  } ,{
    path: '*',
    redirect: '/admin' // 输入其他不存在的地址自动跳回首页
  }]

})
