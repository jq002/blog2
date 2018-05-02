<template>
  <nav>
      <p>共13篇文章，3页</p>
      <ul>
          <li><span>上</span></li>
          <li><span>1</span></li>
          <li><span>2</span></li>
          <li><span>下</span></li>
      </ul>
  </nav>
</template>

<script>
export default {
    name:"MyPaging"
};
</script>

<style lang="scss" scoped>
nav {
  font-size: 0.9rem;
  margin: 2rem 0;
  p{
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
      &.active{
      background-color: #fc4d50;
      color: #fff;
      }
    }
  }
}
</style>
