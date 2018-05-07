// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api/login'
import marked from 'marked'
Vue.use(Vuex)

const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_ALL_TAGS = 'GET_ALL_TAGS';
const SET_SELECT_TAGS='SET_SELECT_TAGS';
const GET_ARTICLE='GET_ARTICLE';
// 假定我们有一个可以返回 Promise 的
// 通用 API
export function createStore () {
  return new Vuex.Store({
    state: {
      currentArticle: {
        content:'',
        id:''
      },
      currentArticleCompile:'',
      articles:[],
      allNum: 0,
      curPage: 0,
      tags: [],
      selectTags: [],
    },
    getters:{
      articles:state=>state.articles,
      tags:state=>state.tags,
      curPage:state=>state.curPage,
      allNum:state=>state.allNum,
      selectTags:state=>state.selectTags,
      // searchTags:state=> state.selectTags.map()
      currentArticle:state=>state.currentArticle,
      currentArticleCompile: state => state.currentArticleCompile
    },
    actions: {
      getAllArticles({commit,state},{tags='',page=1,limit=5}={}){
        return api.getAllPublishArticles(page,limit,tags).then((res)=>{
          commit(GET_ALL_ARTICLES,{articles: res.data.articleArr, allNum: res.data.allNum, curPage: page})
          return new Promise((resolve,reject)=>{
            resolve(res);
          })
        })
      },
      getAllTags({commit,state}){
        return api.getAllTags().then(res=>{
          commit(GET_ALL_TAGS,res.data.tagArr);
          return new Promise((resolve,reject)=>{
            resolve(res);
          })
        })
      },
      getArticle({commit,state},id){
        let article=state.articles.find(article=>article.id==id)
        if(article&&article.content){
          commit(GET_ARTICLE,article)
          console.log(article)
          return new Promise((resolve,reject)=>{
            resolve(article);
          })
        }else{
          return api.getArticle(id).then(res=>{
            commit(GET_ARTICLE,res.data.article);
            return new Promise((resolve, reject) => {
              resolve(res);
            });
          }).catch(err=>{

          })
        }
      }
    },
    mutations: {
      GET_ALL_ARTICLES:(state,{articles,allNum,curPage})=>{
        if(isNaN(+allNum)){
          allNum=0;
        }
        if(isNaN(+curPage)){
          curPage=0;
        }
        state.articles=articles;
        state.allNum = +allNum;
        state.curPage = +curPage;
      },
      GET_ALL_TAGS: (state, tags) => {
        state.tags = tags;
      },
      SET_SELECT_TAGS: (state, tags) => {
        state.selectTags = tags;
      },
      GET_ARTICLE: (state, article) => {
        state.currentArticle = article;
        state.currentArticleCompile = marked(state.currentArticle.content);
      }
    }
  })
}