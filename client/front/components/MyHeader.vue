<template>
  <header>
      <div class="main">
          <div class="main-logo">    <img src="./../assets/logo.png">Qin's  Blog</div>
          <nav><ul>
              <li> <router-link to="/"> 主页</router-link></li>
              <li><router-link to="/archives"> 归档</router-link></li>
              <li>关于</li>
              <li>其他</li>
              </ul></nav>
      </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>

<style lang="scss" scoped>
header {
  background-color: #f2f2f2;
  height: 5rem;
  width: 100%;
  .main {
    max-width: 850px;
    box-sizing: border-box;
    padding: 0 2rem;
    height: 100%;
    margin: 0 auto;
    &-logo {
      float: left;
      line-height: 5rem;
      height: 5rem;
      img {
        vertical-align: middle;
        margin-right: 10px;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    nav {
      float: right;
      ul {
        display: flex;
        flex-direction: row;
        flex: 1;
        height: 5rem;
        line-height: 5rem;
        list-style-type: none;
        li {
          margin-right: 20px;
          a{
              text-decoration: none;
              color: #333;
              &:hover{
                  color: #fc4d50;
                  text-decoration: underline;
              }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  header {
    .main {
      padding: 0 1rem;
      &-logo {
        float: none;
        line-height: 3rem;
        height: 3rem;
      }
      nav {
        float: none;
        ul {
          line-height: 2rem;
          height: 2rem;
          overflow-x: auto;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
