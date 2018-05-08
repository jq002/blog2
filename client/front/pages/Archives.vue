<template>
  <div class="container">
     <div class="search">
         <input type="text" placeholder="搜索" v-model="searchTitle2" @keyup.enter='search'>
     </div>
     <ul class="tags" >
        <li  @click='showAll()'> 
          <span  v-bind:class="{active:isShowAll}"> show all
             <sup>{{allNum}}</sup>
          </span>
        </li>
         <li v-for="tag in tags" :key="tag.id" @click='addTag(tag.id)'> 
          <span  v-bind:class="{active:tag.active}"> {{tag.name}}
             <!-- <sup>13</sup> -->
          </span>
        </li>
     </ul>
     <div class="list">
         <section>
             <h2>2018</h2>
             <ul>
                 <li v-for="article in allArticles" :key="article.id">
                   <span class="date">{{article.lastEditTime}}</span>
                   <router-link :to="'/article/'+article.id"  class="title">{{article.title}}</router-link>
                </li>

             </ul>
         </section>
     </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Archives",
  data() {
    return {
      searchTitle2: "",
      selectTags2: "",
      isShowAll: true
    };
  },
  computed: {
    ...mapGetters([
      "allArticles",
      "tags",
      "searchTitle",
      "selectTags",
      "allNum"
    ])
  },
  beforeMount() {
    if (this.allArticles && this.allArticles.length !== 0) {
      if (this.searchTitle) {
        this.isShowAll=false;
        this.searchTitle2 = this.searchTitle;
      }
      if (this.selectTags) {
        this.isShowAll=false;
        this.selectTags2 = this.selectTags;
      }
      return;
    }
    this.getAllArticles({ limit: 0 });
    this.getAllTags().then(res => {
      res.data.tagArr.forEach(element => {
        element.active = false;
      });
    });
  },
  asyncData({ store, route }) {
    store.dispatch("getAllTags");
    return store.dispatch("getAllArticles", { limit: 0 }).then(() => {});
  },
  methods: {
    ...mapActions(["getAllArticles", "getAllTags"]),
    addTag(id) {
      this.isShowAll = false;
      this.tags.some(element => {
        if (element.id === id) {
          element.active = !element.active;
        }
        return element.id === id;
      });
      let arr = [];
      this.tags.forEach(element => {
        if (element.active) {
          arr.push(element.id);
        }
      });
      this.selectTags2 = arr.join(",");
      this.getAllArticles({
        limit: 0,
        searchTitle: this.searchTitle2,
        tags: this.selectTags2
      });
    },
    search() {
      this.isShowAll = false;
      this.getAllArticles({
        limit: 0,
        searchTitle: this.searchTitle2,
        tags: this.selectTags2
      });
    },
    showAll() {
      if (this.isShowAll) {
        return;
      }
      this.tags.forEach(element => {
        element.active = false;
      });
      this.isShowAll = true;
      this.searchTitle2="";
      this.selectTags2="";
      this.getAllArticles({ limit: 0 });
    }
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
    list-style-type: none;
    li {
      display: inline-block;
      margin-right: 0.25rem;
      margin-bottom: 0.5rem;
      span {
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
        &.active {
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
        list-style-type: none;
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
