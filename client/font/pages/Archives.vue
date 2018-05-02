<template>
  <div class="container">
     <div class="search">
         <input type="text" placeholder="搜索">
     </div>
     <ul class="tags">
         <li> <a href=""> show all<sup>13</sup></a></li>
         <li> <a href="">JavaScript<sup>2</sup></a></li>
         <li><a href="">node.js<sup>1</sup> </a></li>
         <li> <a href="">vue<sup>3</sup></a></li>
         <li> <a href="">mongoDB<sup>3</sup></a></li>
     </ul>
     <div class="list">
         <section>
             <h2>2018</h2>
             <ul>
                 <li><span class="date">5月2日</span><a href="">搭建qin博客过程及使用技术</a></li>
                 <li><span class="date">5月2日</span><a href="">搭建qin过程</a></li>
                 <li><span class="date">5月2日</span><a href="">搭建qin博客使用技术</a></li>
                 <li><span class="date">5月2日</span><a href="">搭建qin过程及使用技术</a></li>
             </ul>
         </section>
        <section>
             <h2>2017</h2>
             <ul>
                 <li><span class="date">10月2日</span><a href="">搭建qin博客过程及使用技术</a></li>
                 <li><span class="date">07月2日</span><a href="">搭建qin过程</a></li>
             </ul>
         </section>
     </div>
  </div>
</template>

<script>
export default {
  name: "Archives"
};
</script>

<style lang="scss" scoped>
.container {
    margin-bottom: 3rem;
  .search {
    margin: 1.5rem 0;
    input {
      border: 0;
      background-color: #f2f2f2;
      height: 2rem;
      padding: 0 0.5rem;
      width: 400px;
      box-sizing: border-box;
      outline: 0;
      border-radius: 0.25rem;
    }
  }
  .tags {
    margin: 1rem 0;
    li {
      display: inline-block;
      margin-right: 0.25rem;
      margin-bottom: 0.5rem;
      a {
        background-color: rgba(252, 77, 80, 0.4);
        color: #fff;
        padding: 2px 10px;
        border-radius: 2rem;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 700;
        sup {
          padding: 0 4px;
        }

        &:hover {
          background-color: #fca24d;
          color: #fff;
        }
      }
    }
  }
  .list {
    section {
      ul {
        margin: 0.5rem 0;
        li {
          margin: 0.4rem 0;
          .date {
            display: inline-block;
            font-size: 0.9rem;
            color: #9c9c9c;
            padding: 0 1rem 0 0;
          }
          a {
            font-size: 1rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .container {
    .search {
      margin: 0.5rem 0;
      input {
        border: 0;
        background-color: #f2f2f2;
        height: 2rem;
        padding: 0 0.5rem;
        width: 100%;
        outline: 0;
      }
    }
  }
}
</style>
