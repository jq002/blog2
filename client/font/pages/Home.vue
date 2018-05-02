<template>
  <div class="container">
      <div class="list">
          <article>
                <h1> <router-link to="/article" class="title">第一篇文章</router-link></h1>
                <div class="article-content">需要调起微信APP，就要操作，相应系统的APP，
                  就需要原生操作系统调用。除非JS能操作原生的操作系统，那是没有的，
                  JS需要专门的引擎，比如V8引擎，进行编译
                </div>
                <router-link to="/article" class="more">点击阅读更多</router-link>
                <div class="article-data">
                    <ul class="article-tags">
                        <li><a href="">JavaScript</a></li>
                        <li><a href="">vue</a></li>
                    </ul>
                    <div class="article-other">
                        <div class="article-other-count"><span>630</span>阅读</div>
                        <div class="article-other-time"><span>2018年 01月12日</span></div>                        
                    </div>
                </div> 
          </article> 
          <article>
                <h1> <router-link to="/article" class="title">第一篇文章</router-link></h1>
                <div class="article-content">需要调起微信APP，就要操作，相应系统的APP，
                  就需要原生操作系统调用。除非JS能操作原生的操作系统，那是没有的，
                  JS需要专门的引擎，比如V8引擎，进行编译
                </div>
                <router-link to="/article" class="more">点击阅读更多</router-link>
                <div class="article-data">
                    <ul class="article-tags">
                        <li><a href="">JavaScript</a></li>
                        <li><a href="">vue</a></li>
                    </ul>
                    <div class="article-other">
                        <div class="article-other-count"><span>630</span>阅读</div>
                        <div class="article-other-time"><span>2018年 01月12日</span></div>                        
                    </div>
                </div> 
          </article>                          
          <article>
                <h1> <router-link to="/article" class="title">第一篇文章</router-link></h1>
                <div class="article-content">需要调起微信APP，就要操作，相应系统的APP，
                  就需要原生操作系统调用。除非JS能操作原生的操作系统，那是没有的，
                  JS需要专门的引擎，比如V8引擎，进行编译
                </div>
                <router-link to="/article" class="more">点击阅读更多</router-link>
                <div class="article-data">
                    <ul class="article-tags">
                        <li><a href="">JavaScript</a></li>
                        <li><a href="">vue</a></li>
                    </ul>
                    <div class="article-other">
                        <div class="article-other-count"><span>630</span>阅读</div>
                        <div class="article-other-time"><span>2018年 01月12日</span></div>                        
                    </div>
                </div> 
          </article>       
      </div>
        <my-paging></my-paging>             

  </div>
</template>

<script>
import MyPaging from "./../components/MyPaging.vue";

export default {
  name: "Home",
  components: { MyPaging }
};
</script>

<style lang="scss" scoped>
.list {
  article {
    padding-bottom: 1.3rem;
    margin: 2.6rem 0 1rem 0;
    border-bottom: 1px solid #e6e6e6;
    .more {
      font-size: 0.9rem;
      color: #fc4d50;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .article-data {
      margin: 0.8rem 0;
      overflow: hidden; //解决浮动没有高度问题
      .article-tags {
        float: left;
        li {
          display: inline-block;
          margin-right: 0.25rem;
          a {
            background-color: #f2f2f2;
            color: #333;
            padding: 2px 10px;
            border-radius: 2rem;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 700;

            &:hover {
              background-color: #fc4d50;
              color: #fff;
            }
          }
        }
      }
      .article-other {
        float: right;
        display: flex;
        flex-direction: row;
        font-size: 0.9rem;
        color: #9c9c9c;
        margin: 0 0 0 0.6rem;
        &-count {
          border-right: 1px solid #e6e6e6;
          margin-right: 0.25rem;
          padding-right: 0.25rem;
        }
      }
    }
  }
}
</style>
