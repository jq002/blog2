<template>
  <menu>
       <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章</span>
        </template>
        <el-menu-item index="/articles">
            <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="/category">
            <span slot="title">文章标签</span>
        </el-menu-item>
      </el-submenu> -->
      <el-menu-item index="/admin/articles">
          <span slot="title">文章列表</span>
      </el-menu-item>
      <el-menu-item index="/admin/category">
          <span slot="title">文章标签</span>
      </el-menu-item>
      <el-menu-item index="/admin/mdEdit">
        <i class="el-icon-plus"></i>
        <span slot="title">写文章</span>
      </el-menu-item>
      <!-- <el-menu-item index="/mavonEdit">
        <i class="el-icon-plus"></i>
        <span slot="title">mavon发布文章</span>
      </el-menu-item> -->
      <el-menu-item index="/admin">
        <i class="el-icon-setting"></i>
        <span slot="title">我</span>
      </el-menu-item>
    </el-menu>
  </menu>
</template>

<script>
export default {
  name: "MyMenu",
  data() {
    return {
      isCollapse: false,
      activeIndex: "/admin"
    };
  },
  created() {
    this.activeIndex = this.$route.path; //刷新不高亮问题
    this.$router.afterEach((to, from) => {
      this.activeIndex = to.path; //编程式切换路由不高亮问题
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
menu {
  height: 100%;
  .el-menu {
    height: 100%;
    .el-icon-location {
      font-size: 20px;
    }
  }
}
</style>
