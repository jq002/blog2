import Vue from 'vue'
import Router from 'vue-router'
import Articles from './../pages/Articles.vue'
import Category from './../pages/Category.vue'
import HelloWorld from './../components/HelloWorld.vue'
import MarkdownEditor from './../pages/MarkdownEditor.vue'
import Login from './../pages/Login.vue'
import Home from './../pages/Home.vue'
import Detail from '../pages/Detail.vue'
import Edit from '../pages/Edit.vue'

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
        name: 'Articles',
        path: '/articles',
        component: Articles
      },
      {
        name: 'Category',
        path: '/category',
        component: Category
      },
      {
        name: 'MarkdownEditor',
        path: '/mdEdit/',
        component: MarkdownEditor
      },{
        name:"Detail",
        path:"/detail/:id",
        component:Detail
      },{
        name:"Edit",
        path:"/edit/:id",
        component:Edit
      }
    ]
  } ,{
    path: '*',
    redirect: '/admin' // 输入其他不存在的地址自动跳回首页
  }]

})
