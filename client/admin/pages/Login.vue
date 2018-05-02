<template>
  <div class="container">
      <h2>博客后台登录</h2>
      <el-form :model="user" status-icon :rules="signRules" ref="loginForm"  class="login-form">
  <el-form-item label="用户名" prop="username" >
    <el-input type="text" v-model="user.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="user.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @keyup.enter="submitForm('loginForm')" @click="submitForm('loginForm')">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        pass: "",
        username: ""
      },
      signRules: {
        pass: [{ required: true, message: "请输入密码" }],
        username: [{ required: true, message: "请输入用户名" }]
      }
    };
  },
  mounted() {
    // this.$Progress.finish();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.replace({
            name: "Home"
          });
          this.$message.success("登录成功");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 400px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
  padding-top: 10px;
  .login-form{
    padding: 0 35px;
    label{
      display: none;
    }
    .el-button{
      width: 120px;
    }

  }
}
</style>

