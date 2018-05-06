<template>
  <div class="container">
    <el-container class="main">
      <el-header>
        <div class="title">QIN ADMIN</div>
        <div class="left"><span>admin</span> <img src="./../assets/logo.png"/></div>
        <div class="right"><el-button type="text" @click="loginOut">退出</el-button></div>
      </el-header>
      <el-container class="content">
        <el-aside width="230px"> <my-menu></my-menu></el-aside>
        <el-main> 
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyMenu from "./../components/MyMenu.vue";
import { mapMutations } from "vuex";
export default {
  name: "Home",
  components: { MyMenu },
  methods: {
    ...mapMutations({
      deleteToken: "DELETE_TOKEN"
    }),
    loginOut() {
      this.$confirm("退出系统？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteToken();
        this.$router.replace({
          name: "Login"
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .main {
    height: 100%;
    .el-header {
      height: 60px;
      line-height: 60px;
      display: flex;
      flex-direction: row;
      padding: 0;
      background-color: #20a0ff;
      color: #fff;
      .title {
        width: 230px;
        box-sizing: border-box;
        border-right: 1px solid hsla(62, 77%, 76%, 0.3);
        text-align: center;
        font-size: 22px;
      }
      .left {
        text-align: right;
        flex: 1;
        padding-right: 20px;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          padding-left: 10px;
        }
      }
      .right {
        text-align: right;
        padding-right: 20px;
        .el-button--text {
          color: #fff;
        }
      }
    }
  }
}
</style>
