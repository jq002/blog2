
import Vue from 'vue'
import Vuex from 'vuex'
import api from './../../api/login'
Vue.use(Vuex)
 const CREATE_TOKEN = 'CREATE_TOKEN';
 const DELETE_TOKEN = 'DELETE_TOKEN';
const store=new Vuex.Store({
    state:{
        token:sessionStorage.getItem('blog')
    },
    mutations:{
        [CREATE_TOKEN](state,token){
            state.token=token;
            sessionStorage.setItem('blog',token);
        },
        [DELETE_TOKEN](state){
            state.token=null;
            sessionStorage.setItem('blog',"")
        }

    },
    actions:{
        createToken({commit,state},{username,password}){
            return api.createToken(username,password).then(res=>{
                if(res.data.success){
                    commit(CREATE_TOKEN,res.data.token);
                }else{
                    commit(DELETE_TOKEN)
                }
                return new Promise((resolve,reject)=>{
                    resolve(res);
                })
            })
        }

    }
})

export default store