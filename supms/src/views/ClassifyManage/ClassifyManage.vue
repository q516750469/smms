<template>
  <div class="UserAdd">
    <!-- 头部 -->
    <Header></Header>
    <!-- 身体 -->
    <el-main>
      <el-card class="box-card">
        <el-table ref="multipleTable" :data="classData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <!-- 用户名 -->
          <el-table-column prop="username" label="分类名称">
          </el-table-column>
          <!-- 创建日期 -->
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.cdate|getCdate }}</template>
          </el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        
      </el-card>
    </el-main>
    <!-- 脚部 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入头部组件
import Header from "@/components/Header/Header.vue";
// 引入脚部组件
import Footer from "@/components/Footer/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      classData: [],
      multipleSelection: []
    };
  },
  methods: {
    // 修改数据函数
    handleEdit(id) {
      console.log(id)
    },
    // 删除数据函数
    handleDelete(id) {
      this.axios
        .get(`http://127.0.0.1:3000/users/deluser?id=${id}`)
        .then(response => {
          if (response.data.rstCode === 1) {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "success"
            });
            this.getUserdata();
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: "error"
            });
          }
        });
    },

    // 获取全部数据的axios函数
    getUserdata() {
      this.axios
        .post("http://127.0.0.1:3000/users/usermanage")
        .then(response => {
          this.tableData = response.data;
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less">
</style>
