<template>
  <div class="container">
          <header>
                  <h1>{{currentArticle.title}}</h1>

              <div class="article-data">
                    <ul class="article-tags" > 
                        <li  v-for="tag in currentArticle.tags" :key="tag.id"><a>{{tag.name}}</a></li>
                    </ul>
                    <div class="article-other">
                        <!-- <div class="article-other-count"><span>630</span>阅读</div> -->
                        <div class="article-other-time"><span>{{currentArticle.lastEditTime}}</span></div>                        
                    </div>
                </div> 
          </header>
      <article class="markdown-body">

          <section class="abstract-content">{{ currentArticle.abstract}}</section>
          <section class="content" v-html="currentArticleCompile" v-highlight></section>
          <!-- <footer>
              <p>下一篇</p>
              <router-link class="title" to="/article">纯css实现箭头</router-link>
          </footer> -->
      </article>
  </div>
</template>

<script>
import api from "../../api/login";
import marked from "marked";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Article",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentArticle", "currentArticleCompile"])
  },
  beforeMount() {
    let id = this.$route.params.id;
    if (this.currentArticle && this.currentArticle.id == id) {
      return;
    }
    this.getArticle(id);
  },
  asyncData({ store, route }) {
    return store.dispatch("getArticle", route.params.id).then(() => {});
  },
  methods: {
    ...mapActions(["getArticle"])
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 3rem;

  header {
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
            // background-color: rgba(252, 77, 80, 0.4);
            // color: #fff;
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
  .abstract-content{
    border-bottom: dotted 2px #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  footer {
    margin: 2.8rem 0 1.4rem 0;
    padding-top: 0.7rem;
    border: 0 solid #e6e6e6;
    border-top-width: 4px;
    text-align: right;
    p {
      font-weight: 700;
      color: #9c9c9c;
    }
    a {
      font-weight: 700;
    }
  }
}
</style>
