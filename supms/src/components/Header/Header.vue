<template>
    <el-header>
        <h1 class="title">华联超市系统</h1>
        <div class="username">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <div class="photo"><img src="" alt=""></div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  created() {
    this.axios.get("http://127.0.0.1:3000/users/getusername").then(response => {
      this.username = response.data;
    });
  },
  methods: {
    handleCommand(command) {
      if (command === "personal") {
        this.$router.push("/personal");
      } else if (command === "logout") {
        // 向后端发送请求
        this.axios.get("http://127.0.0.1:3000/users/logout").then(response => {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: "success"
          });
          this.$router.push("/login");
        });
      }
    }
  }
};
</script>

<style lang="less">
.el-header {
  color: rgb(48, 65, 86);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .title {
    display: inline-block;
    float: left;
  }
  .el-dropdown {
    height: 60px;
    line-height: 60px;
    display: inline-block;
    float: right;
    .photo {
      margin-left: 20px;
      display: inline-block;
      height: 50px;
      width: 50px;
      line-height: 50px;
      background: #ccc;
    }
  }
}
</style>
