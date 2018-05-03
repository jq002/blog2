
import Vue from 'vue'
import Vuex from 'vuex'
// import types from './mutation_type'
import api from './../../api/login'
Vue.use(Vuex)
 const CREATE_TOKEN = 'CREATE_TOKEN';
 const DELETE_TOKEN = 'DELETE_TOKEN';
 const CREATE_TAG='CREATE_TAG';
 const DELETE_TAG='DELETE_TAG';
 const GET_ALL_TAG='GET_ALL_TAG';
const store=new Vuex.Store({
    state:{
        // articleList:[],
        // tagList:[],
        // currentArticle:{
        //     id:-1,
        //     index:-1,
        //     content:'',
        //     title:'',
        //     tags:[],
        //     save:true,
        //     publish:false
        // },
        // allPage:1,
        // curPage:1,
        // selectTagArr:[],
        token:sessionStorage.getItem('blog')
    },
    // getters:{//派生的方法
    //     articleList:state=>state.articleList,
    //     tagList:state=>state.tagList,
    //     currentArticle:state=>state.currentArticle,
    //     allPage:state=>state.allPage,
    //     curPage:state=>state.curPage,
    //     selectTagArr:state=>state.selectTagArr
    // },
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