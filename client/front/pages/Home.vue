<template>
  <div class="container">
      <div class="list">
          <article v-for="article in articles" :key="article.id">
                <h2> <router-link :to="'/article/'+article.id"  class="title">{{article.title}}</router-link></h2>
                <div class="article-content">{{article.abstract}}
                </div>
                <router-link :to="'/article/'+article.id"  class="more">点击阅读更多</router-link>
                <div class="article-data">
                    <ul class="article-tags">
                        <li  v-for="tag in article.tags" :key="tag.id"><a >{{tag.name}}</a></li>
                    </ul>
                    <div class="article-other">
                        <!-- <div class="article-other-count"><span>0</span>阅读</div> -->
                        <div class="article-other-time"><span>{{article.lastEditTime}}</span></div>                        
                    </div>
                </div> 
          </article>     
      </div>
        <my-paging :curPage="curPage" :allNum="allNum" :allPage="allPage" @changePage='changePage'></my-paging>             

  </div>
</template>

<script>
import MyPaging from "./../components/MyPaging.vue";
import api from "../../api/login";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: { MyPaging },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["articles", "tags", "curPage", "allNum", "allPage"])
  },
  beforeMount() {
    if (this.articles && this.articles.length !== 0) {
      return;
    }
    this.getAllArticles();
  },
  asyncData({ store, route }) {
    return store
      .dispatch("getAllArticles", { page: route.params.page })
      .then(() => {});
  },
  methods: {
    ...mapActions(["getAllArticles", "getAllTags"]),
    changePage(page) {
      this.getAllArticles( { page:page }).then(()=>{})
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  article {
    padding-bottom: 1.3rem;
    margin: 2.6rem 0 1rem 0;
    border-bottom: 1px solid #e6e6e6;
    .more {
      font-size: 0.9rem;
      color: #fc4d50;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .article-data {
      margin: 0.8rem 0;
      overflow: hidden; //解决浮动没有高度问题
      .article-tags {
        float: left;
        li {
          display: inline-block;
          margin-right: 0.25rem;
          a {
            background-color: #f2f2f2;
            color: #333;
            padding: 2px 10px;
            border-radius: 2rem;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 600;

            &:hover {
              background-color: #fc4d50;
              color: #fff;
            }
          }
        }
      }
      .article-other {
        float: right;
        display: flex;
        flex-direction: row;
        font-size: 0.9rem;
        color: #9c9c9c;
        margin: 0 0 0 0.6rem;
        &-count {
          border-right: 1px solid #e6e6e6;
          margin-right: 0.25rem;
          padding-right: 0.25rem;
        }
      }
    }
  }
}
</style>
