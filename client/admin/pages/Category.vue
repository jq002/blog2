<template>
  <div class="container">
    <el-tag
      :key="tag._id"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag.name}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import api from "./../../api/login";
export default {
  name: "Category",
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getAllTags();
  },
  methods: {
    getAllTags() {
      api.getAllTags().then(res => {
        if (res.data.success) {
          this.dynamicTags = res.data.tags;
        } else {
          this.dynamicTags = [];
        }
      });
    },
    handleClose(tag) {
      api.deleteTag(tag.id).then(res => {
        if (res.data.success) {
          this.$message.success("标签删除成功");
           this.getAllTags();
          // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        } else {
          this.$message.success("标签删除失败");
        }
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        api.createTag(inputValue).then(res => {
          if (res.data.success) {
            this.$message.success("标签添加成功");
             this.getAllTags();
            // this.dynamicTags.push({name:inputValue});
          } else {
            this.$message.success("标签添加失败");
          }
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style>
.el-tag{
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

