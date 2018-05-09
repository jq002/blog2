<template>
    <div class="container container-add">
      <h3 class="title is-3">编辑文章</h3>
      <el-form ref="form" v-if="form&&tags" :model="form" :rules="rules" label-width="80px" label-position="top">
        <el-form-item label="文章分类"  prop="tags">
          <el-checkbox-group v-model="formTags">
            <el-checkbox v-for="tag in tags" :key="tag.id" :label="tag.name" :checked="tag.checked"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input type="textarea" v-model="form.abstract"  class="abstract"></el-input>
        </el-form-item>
        <div class="el-form-item is-required" :class="{'is-error':validate.error}">
          <label class="el-form-item__label">文章内容</label>
          <div class="el-form-item__content">
              <div id="editor">
                <textarea :value="form.content" @input="update"  v-bind:class="[{ active: !isLookArticle }]"></textarea>
                <div v-html="compiledMarkdown"  v-highlight  v-bind:class="[{ active: isLookArticle }, 'editor-show','markdown-body']"></div>
              </div>
            <div v-if="validate.error" class="el-form-item__error">正文则能没有内容呢？</div>
          </div>
        </div>
          <el-form-item>
            <el-button type="primary" @click="submit" @keyup.enter="submit">保存文章</el-button>
            <el-button @click="lookArticle" v-if="isLookArticle">继续编辑</el-button>
            <el-button @click="lookArticle" v-else>预览文章</el-button>            
          </el-form-item>
      </el-form>
    </div>
</template>

<script>
import debounce from "lodash.debounce";
import marked from "marked";
import api from "./../../api/login";
export default {
  name: "Edit",
  data() {
    return {
            isLookArticle: false,

      tags: [],
      form: "",
      formTags: [],
      rules: {
        title: [
          { required: true, message: "必须填写标题哦！", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "必须填写摘要", trigger: "blur" }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "必须填写分类哦！",
            trigger: "change"
          }
        ]
      },
      validate: {
        error: false
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    Promise.all([this.getAllTags(), this.getArticle(id)]).then(res => {
      if (res[0].data.success) {
        this.tags = res[0].data.tagArr;
      } else {
        this.tags = [];
      }
      if (res[1].data.success) {
        this.form = res[1].data.article;
        this.tags.forEach((x, i) => {
          if (
            this.form.tags.some(y => {
              return x.id === y.id;
            })
          ) {
            this.tags[i].checked = true;
          } else {
            this.tags[i].checked = false;
          }
        });
      }
    });
    // this.getAllTags();
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.form.content, { sanitize: true });
    }
  },
  methods: {
    update: debounce(function(e) {
      this.form.content = e.target.value;
    }, 300),
    getAllTags() {
      return api.getAllTags();
    },
    getArticle(id) {
      return api.getArticle(id);
    },
    validateContent() {
      if (!this.form.content) {
        this.validate.error = true;
        return false;
      } else {
        this.validate.error = false;
        return true;
      }
    },
        lookArticle() {
      this.isLookArticle = !this.isLookArticle;
    },
    submit() {
      this.$refs.form.validate(valid => {
        let me = this.validateContent();
        if (valid && me) {
          this.form.tags = this.tags.filter(x => {
            return this.formTags.some(y => {
              return x.name === y;
            });
          });
          let article = {
            title: "",
            content: "",
            tags: []
          };
          article.title = this.form.title;
          article.abstract = this.form.abstract;
          article.content = this.form.content;
          article.tags = this.form.tags;
          api.saveArticle(this.$route.params.id, article).then(res => {
            if (res.data.success) {
              this.$message.success("文章修改成功");
              this.$router.replace({
                name: "Detail",
                params: {
                  id: res.data.article.id
                }
              });
            } else {
              this.$message.success("文章修改失败");
            }
          });
        } else {
          this.$message.error("您填写的信息有误，请按照提示修改");
          return false;
        }
      });
    }
  }
};
</script>

<style  lang='scss'>
</style>
