<template>
    <div class="container">
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
        <div class="el-form-item is-required" :class="{'is-error':validate.error}">
          <label class="el-form-item__label">文章内容</label>
          <div class="el-form-item__content">
              <div id="editor">
                <textarea :value="content" @input="update"></textarea>
                <div v-html="compiledMarkdown"  v-highlight></div>
              </div>
            <div v-if="validate.error" class="el-form-item__error">正文则能没有内容呢？</div>
          </div>
        </div>
          <el-form-item>
            <el-button type="primary" @click="submit" @keyup.enter="submit">保存文章</el-button>
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
      content: "",
      tags: [],
      form: {
        tags: [],
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "必须填写标题哦！", trigger: "blur" }
        ],
        tags: [
           { type: 'array', required: true, message: '必须填写分类哦！', trigger: 'change' }
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
      this.ArticleHtml=marked(this.content, { sanitize: true });
      return this.ArticleHtml;
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
    submit() {
      this.$refs.form.validate(valid => {
        let me = this.validateContent();
        if (valid && me) {
          // this.tags.map
          this.$message.error("有内容");
          api
            .createArticle(this.form.title, this.ArticleHtml, false, this.form.tags)
            .then(res => {
              if (res.data.success) {
                this.$message.success("文章创建成功");
                console.log(res.data.article);
              } else {
                this.$message.success("文章创建失败");
              }
            });
        } else {
          console.log("error submit!!!");
          this.$message.error("您填写的信息有误，请按照提示修改");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.container {
  // height: 100%;
  #editor {
    // height: 50%;
    & > div {
      border: 1px solid #ccc;
    }
    textarea,
    & > div {
      display: inline-block;
      width: 49%;
      height: 400px;
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
    }
  }
}
</style>
