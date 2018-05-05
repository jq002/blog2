<template>
  <div class="container" v-if="article">
      <h1>{{article.title}}</h1>
      <div class="time"><span>创建时间：{{article.createTime}}</span><span>最后修改时间：{{article.lastEditTime}}</span></div>
      <div>      
          <el-tag  v-for="tag in article.tags" :key="tag.id" disable-transitions>{{tag.name}}</el-tag>
      </div>   
      <div v-html="compiledMarkdown" v-highlight></div>

  </div>
</template>

<script>
import api from "../../api/login";
import marked from "marked";

export default {
  name: "Detail",
  data() {
    return {
      article: null
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.article.content, { sanitize: true });
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
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  & > div {
    margin: 20px 0;
    .el-tag {
      margin-right: 10px;
    }
  }
  .time {
    span {
      color: #aaa;
      font-size: 14px;
    }
    span:first-child {
      padding-right: 30px;
    }
  }
}
</style>

