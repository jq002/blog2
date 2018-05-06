<template>
  <div class="container">
      <article>
          <header>
              <h1>{{article.title}}</h1>
              <div class="article-data">
                    <ul class="article-tags" > 
                        <li  v-for="tag in article.tags" :key="tag.id"><a href="">{{tag.name}}</a></li>
                    </ul>
                    <div class="article-other">
                        <div class="article-other-count"><span>630</span>阅读</div>
                        <div class="article-other-time"><span>{{article.lastEditTime}}</span></div>                        
                    </div>
                </div> 
          </header>
          <div class="content" v-html="compiledMarkdown" v-highlight></div>
          <footer>
              <p>下一篇</p>
              <router-link class="title" to="/article">纯css实现箭头</router-link>
          </footer>
      </article>
  </div>
</template>

<script>
import api from "../../api/login";
import marked from "marked";
export default {
  name: "Article",
  data() {
    return {
      article: "",
      content:""
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, { sanitize: true });
    }
  },
  created() {
    let id = this.$route.params.id;
    this.getArticle(id);
  },
  methods: {
    getArticle(id) {
      api.getArticle(id).then(res => {
        if (res.data.success) {
          this.article = res.data.article;
          this.content=this.article.content
        }
      });
    }
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
            padding: 2px 10px;
            border-radius: 2rem;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 700;

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
