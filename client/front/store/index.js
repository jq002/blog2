// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api/login'
import marked from 'marked'
Vue.use(Vuex)

const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_ALL_TAGS = 'GET_ALL_TAGS';
const SET_SELECT_TAGS='SET_SELECT_TAGS';
const SET_SEARCH_TITLE='SET_SEARCH_TITLE';
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
      allArticles:[],
      limit:3,
      allNum: 0,
      curPage: 0,
      allPage:10,
      tags: [],
      selectTags: '',
      searchTitle:''
    },
    getters:{
      articles:state=>state.articles,
      allArticles:state=>state.allArticles,
      tags:state=>state.tags,
      curPage:state=>state.curPage,
      allNum:state=>state.allNum,
      allPage:state=>state.allPage,
      selectTags:state=>state.selectTags,
      searchTitle:state=> state.searchTitle,
      currentArticle:state=>state.currentArticle,
      currentArticleCompile: state => state.currentArticleCompile
    },
    actions: {
      getAllArticles({commit,state},{tags='',page=1,limit=3,searchTitle=''}={}){
        return api.getAllPublishArticles(page,limit,tags,searchTitle).then((res)=>{
          let obj;
          if(!limit){
            obj={allArticles: res.data.articleArr,articles:[],selectTags:tags,searchTitle:searchTitle,allNum: res.data.allNum,limit}
          }else{
            obj={allArticles:[],articles: res.data.articleArr, allNum: res.data.allNum, curPage: page, allPage: res.data.allPage,limit}
          }
          commit(GET_ALL_ARTICLES,obj)
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
      GET_ALL_ARTICLES:(state,{articles,allNum,curPage,allPage,allArticles,selectTags,searchTitle,limit})=>{
        state.limit=limit;
        if(isNaN(+allNum)){
          allNum=0;
        }
        state.allNum = +allNum;
        if(!limit){
          state.allArticles=allArticles;
          state.selectTags = selectTags;
          state.searchTitle = searchTitle;
          return;
        }
        if(isNaN(+curPage)){
          curPage=0;
        }
        if(isNaN(+allPage)){
          allPage=0;
        }
        if(articles&&articles.length!=0){
          state.articles=articles;
        }
        state.curPage = +curPage;
        state.allPage=+allPage;
      },
      GET_ALL_TAGS: (state, tags) => {
        state.tags = tags;
      },
      GET_ARTICLE: (state, article) => {
        state.currentArticle = article;
        state.currentArticleCompile = marked(state.currentArticle.content);
      }
    }
  })
}