import Vue from 'vue'
import Router from 'vue-router'
import Home from './../pages/Home.vue'
import Archives from './../pages/Archives.vue'
import Article from './../pages/Article.vue'

Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
      }, {
        path: '/archives',
        name: "Archives",
        component: Archives
      }, {
        path: '/article/:id',
        name: "Article",
        component: Article
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
}
