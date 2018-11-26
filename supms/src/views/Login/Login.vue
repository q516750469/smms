<template>
    <!-- 登录容器 -->
    <div class="login">
        <el-form :model="loginForm" status-icon :rules="rules1" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <!-- 标题 -->
            <h1 class="title">
                <i class="el-icon-setting"></i>
                华联超市系统登录
            </h1>
            <!-- 表单 -->
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpwd">
                <el-input type="text" v-model.number="loginForm.checkpwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入qs模块
import qs from "qs";

export default {
  data() {
    //  确认密码验证函数
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单内数据
      loginForm: {
        username: "",
        password: "",
        checkpwd: ""
      },
      rules1: {
        // 用户名验证
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        // 密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        // 确认密码验证
        checkpwd: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 判断填写是否正确
        if (valid) {
          //   填写正确收集填写的用户名和密码发
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };

          // 允许携带cookie
          this.axios.defaults.withCredentials = true;
          
          // 发送axios给后端
          this.axios
            .post(
              "http://127.0.0.1:3000/users/checklogin",
              qs.stringify(params),
              {
                Header: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
            .then(response => {
              if (response.data.rstCode === 1) {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "success"
                });
                this.$router.push("/");
              } else {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "error"
                });
              }
            });
        } else {
          console.log("登陆失败！！");
          return false;
        }
      });
    },
    //清空表单函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login {
  background: url(./800.jpg) no-repeat;
  background-size: cover;
  height: 100%;
  .el-form {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 7px;
    padding-right: 34px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .title {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      margin-bottom: 30px;
    }
    .el-form-item {
      .el-form-item__label {
        color: #ffffff;
      }
    }
  }
}
</style>    
