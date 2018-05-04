<template>
    <div class="container">
      <h3 class="title is-3">发布一篇新的文章</h3>
      <!-- <mavon-editor v-model="article"/> -->
    </div>
</template>

<script>
import api from './../../api/login'
let article
export default {
  name: "MavonEditor",
  data() {
    return {
      // article: "",
    };
  
  }
};
</script>

<style scoped lang='scss'>
.container {
}
</style>
