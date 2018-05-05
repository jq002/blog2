<template>
<div class="container">
   <el-table
    :data="articleArr"
    border
    style="width: 100%">
    <el-table-column
      prop="lastEditTime"
      label="修改日期"
      sortable
      width="200"
    >
    </el-table-column>
      <el-table-column
    prop="createTime"
    label="创建日期"
    sortable
    width="200"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tags"
      label="标签"
      >
      <template slot-scope="scope">
        <el-tag  v-for="tag in scope.row.tags" :key="tag.id" disable-transitions>{{tag.name}}</el-tag>
      </template>
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allNum">
    </el-pagination>
</div>
 
</template>
<script>
import api from "./../../api/login";

export default {
  name: "Articles",

  data() {
    return {
      data: null,
      articleArr: [],
      // allPage,
      page: 1,
      allNum: 1,
      limit: 5,
      tags: []
    };
  },
  created() {
    let limit = this.limit;
    this.getAllArticles({ limit });
  },
  methods: {
    handleSizeChange(limit) {
      this.limit = limit;
      this.getAllArticles();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getAllArticles();
    },
    prevClick() {
      this.page--;
      this.getAllArticles();
    },
    nextClick() {
      this.page++;
      this.getAllArticles();
    },
    handleLook(val) {
      console.log(val);
      this.$router.push({
        name: "Detail",
        params: {
          id: val.id
        }
      });
    },
    handleEdit(val) {
      this.$router.push({
        name: "Edit",
        params: {
          id: val.id
        }
      });
    },

    getAllArticles() {
      api.getAllArticles(this.page, this.limit, this.tags).then(res => {
        if (res.data.success) {
          this.data = res.data;
          this.articleArr = res.data.articleArr;
          this.page = res.data.page;
          this.allNum = res.data.allNum;
          // this.$message.success("查询成功");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .el-pagination {
    margin: 40px 0;
  }
}
</style>
