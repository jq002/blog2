// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import store from './store';
import Axios from 'axios'

Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  console.log(store.state);
  if(to.meta.authPage){
    if(store.state.token){
      next('/admin')
    }
    next()
  }else{
    if(store.state.token){
      Axios.defaults.headers.common['Authorization']=store.state.token;
      next()
    }else{
      // app.$message.error("请先登录");
      next('/admin/login')
    }
  }
})
//axios拦截
Axios.interceptors.response.use(function(res){
  return res;
},function(err){
  if(err.response.data.indexOf('token')){
    store.commit("DELETE_TOKEN")
    console.log("登陆失效，请重新登陆")
    // app.$message.error("登陆失效，请重新登陆");
  }
  return Promise.reject(err);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
