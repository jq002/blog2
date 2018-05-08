<template>
  <nav>
      <p>共{{allNum}}篇文章</p>
      <ul>
          <li  @click="prevPage"><span>上</span></li>
          <li @click="switchPage(page)" v-for="page in pages" :key="page" v-bind:class="{active: curPage==page}"><span>{{page}}</span></li>
          <li  @click="nextPage"><span>下</span></li>
      </ul>
  </nav>
</template>

<script>
export default {
  name: "MyPaging",
  props: ["curPage", "allNum", "allPage"],
  computed: {
    pages() {
      let arr = [];
      for (let i = 1; i <= this.allPage; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    prevPage() {
      if (this.curPage <= 1) {
        return;
      }
      this.$emit("changePage", this.curPage - 1);
    },
    nextPage() {
      if (this.curPage >= this.allPage) {
        return;
      }
      this.$emit("changePage", this.curPage + 1);
    },
    switchPage(page) {
      if (page == "...") {
        return;
      }
      console.log(page);
      // 触发父组件的changePage方法，实现从父组件再修改props,单向数据流
      this.$emit("changePage", page);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  font-size: 0.9rem;
  margin: 2rem 0;
  p {
    padding-left: 0.2rem;
  }
  ul {
    margin: 0.5rem 0;
    li {
      display: inline-block;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      line-height: 2rem;
      text-align: center;
      font-weight: 700;
      background-color: #f2f2f2;
      color: #333;
      font-size: 0.9rem;
      &.active {
        background-color: #fc4d50;
        color: #fff;
      }
      &:hover{
                background-color: #fc4d50;
        color: #fff;
      }
    }
  }
}
</style>
