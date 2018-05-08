<template>
    <div class="container container-add">
      <h3 class="title is-3">发布一篇新的文章</h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
        <!-- <el-form-item label="文章分类" prop="tags">
          <el-select v-model="form.tags" value-key="id" placeholder="请选择文章分类">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="文章分类"  prop="tags">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox v-for="tag in tags" :key="tag.id" :label="tag.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input type="textarea" v-model="form.abstract" class="abstract"></el-input>
        </el-form-item>

        <div class="el-form-item is-required" :class="{'is-error':validate.error}">
          <label class="el-form-item__label">文章内容</label>
          <div class="el-form-item__content">
              <div id="editor">
                <textarea :value="content" @input="update" v-bind:class="[{ active: !isLookArticle }]"></textarea>
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
import _ from "lodash";
import marked from "marked";
import api from "./../../api/login";
let ArticleHtml;
export default {
  name: "MarkdownEditor",
  data() {
    return {
      isLookArticle: false,
      content: "",
      tags: [],
      form: {
        tags: [],
        title: "",
        abstract: ""
      },
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
    this.getAllTags();
  },
  computed: {
    compiledMarkdown: function() {
      // this.ArticleHtml=marked(this.content, { sanitize: true });
      return marked(this.content, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.content = e.target.value;
    }, 300),
    getAllTags() {
      api.getAllTags().then(res => {
        if (res.data.success) {
          this.tags = res.data.tagArr;
        } else {
          this.tags = [];
        }
      });
    },
    validateContent() {
      if (!this.content) {
        this.validate.error = true;
        // $(".wangEditor-container").css({ borderColor: "red" });
        return false;
      } else {
        this.validate.error = false;
        // $(".wangEditor-container").css({ borderColor: "#ccc" });
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
          let tags = this.tags.filter(x => {
            return this.form.tags.some(y => {
              return x.name === y;
            });
          });
          api
            .createArticle(
              this.form.title,
              this.form.abstract,
              this.content,
              false,
              tags
            )
            .then(res => {
              if (res.data.success) {
                this.$message.success("文章创建成功");
                this.$router.replace({
                  name: "Detail",
                  params: {
                    id: res.data.article.id
                  }
                });
              } else {
                this.$message.success("文章创建失败");
              }
            });
        } else {
          this.$message.error("您填写的信息有误，请按照提示修改");
          return false;
        }
      });
    },
    publish() {}
  }
};
</script>

<style  lang='scss'>
//去掉scope,因为el-textarea__inner样式无法增加
.container-add {
  // height: 100%;
  .abstract{
    .el-textarea__inner{
      height: 100px;
    }
  }
  #editor {
    // height: 50%;
    position: relative;
        
    .editor-show {
      border: 1px solid #ccc;
      overflow: scroll;
      height: 500px;
      position: absolute;
      top: 0;
      visibility: hidden;
      &.active{
        visibility: visible;
      }
    }
    textarea,
    .editor-show {
      display: inline-block;
      width: 100%;
      min-height: 500px;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 20px;
    }
    textarea {
      border: none;
      resize: none;
      outline: none;
      background-color: #f6f6f6;
      font-size: 14px;
      font-family: "Monaco", courier, monospace;
      padding: 20px;
            visibility: hidden;
      &.active{
        visibility: visible;
      }
    }
  }
}
</style>
