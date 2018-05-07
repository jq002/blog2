<template>
  <div class="container">
     <div class="search">
         <input type="text" placeholder="搜索">
     </div>
     <ul class="tags" >
         <li v-for="tag in tags" :key="tag.id"> <a href=""> {{tag.name}}<sup>13</sup></a></li>
     </ul>
     <div class="list">
         <section>
             <h2>2018</h2>
             <ul>
                 <li v-for="article in articles" :key="article.id">
                   <span class="date">{{article.lastEditTime}}</span>
                   <router-link :to="'/article/'+article.id"  class="title">{{article.title}}</router-link>
                </li>

             </ul>
         </section>
     </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: "Archives",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["articles", "tags", "curPage", "allNum"])
  },
    beforeMount() {
    if (this.articles &&  this.articles.length!==0) {
      return;
    }
    this.getAllArticles();
    this.getAllTags();
  },
  asyncData({ store, route }) {
    store.dispatch("getAllTags");
    return store
      .dispatch("getAllArticles", { page: route.params.page })
      .then(() => {});
  },
  methods: {
    ...mapActions(["getAllArticles", "getAllTags"])
  }
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
