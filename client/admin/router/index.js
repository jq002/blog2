import Vue from 'vue'
import Router from 'vue-router'
import Article from './../pages/Article.vue'
import Category from './../pages/Category.vue'
import HelloWorld from './../components/HelloWorld.vue'
import MarkdownEdit from './../pages/MarkdownEdit.vue'
import Login from './../pages/Login.vue'
import Home from './../pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'Login',
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    name: 'Home',
    children: [{
        name: 'Article',
        path: 'article',
        component: Article
      },
      {
        name: 'Category',
        path: 'category',
        component: Category
      },
      {
        name: 'MarkdownEdit',
        path: 'mdedit',
        component: MarkdownEdit
      }]
  }]

})
