<template>
  <div id="app">
    <my-header></my-header>
    <div class="app-content">
      <router-view/> 
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "app",
  components: { MyHeader,MyFooter},
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss" scoped>
.app-content {
  max-width: 850px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem;
}
@media screen and (max-width: 500px) {
  .app-content {
    padding: 0 1rem;
  }
}
</style>
