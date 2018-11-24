<template>
    <div class="UserAdd">
        <!-- 头部 -->
        <Header></Header>
        <!-- 身体 -->
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>添加管理员账号</span>
                </div>
                <el-form :model="addUserForm" status-icon :rules="rules1" ref="addUserForm" label-width="100px" class="demo-ruleForm">
                    <!-- 表单 -->
                    <el-form-item label="账号" prop="username">
                        <el-input type="text" v-model="addUserForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="addUserForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input type="text" v-model.number="addUserForm.checkpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组" prop="usergroup">
                        <el-select v-model="addUserForm.usergroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addUserForm')">提交</el-button>
                        <el-button @click="resetForm('addUserForm')">重置</el-button>
                    </el-form-item>
                </el-form>
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
// 引入qs
import qs from "qs";

export default {
  // 注册组件
  components: {
    Header,
    Footer
  },
  data() {
    //  确认密码验证函数
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.addUserForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单内数据
      addUserForm: {
        username: "",
        password: "",
        checkPwd: "",
        usergroup: ""
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
        checkpwd: [{ required: true, validator: validatePwd, trigger: "blur" }],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.addUserForm.username,
            password: this.addUserForm.password,
            usergroup: this.addUserForm.usergroup
          };
          this.axios.post("http://127.0.0.1:3000/users/adduser",
            qs.stringify(params), //用qs模块转化params数据对象
            {"hearder":{"Content-Type":"application/x-www-form-urlencoded"} //设置请求头
          })
          .then(response => {
              if(response.data.rstCode === 1){
                // 弹窗消息
                this.$message({
                  type: 'success',
                  message: response.data.msg
                });
                  this.$router.push('/usermanage')
              }else{
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: response.data.msg
                  });
              }
          })
        } else {
          console.log("添加失败！！");
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
.UserAdd {
  width: 100%;
  display: flex;
  flex-direction: column;
  .el-main {
    flex: 1;
    .el-card {
      .el-form {
        width: 300px;
        .el-form-item {
          height: 30px;
          line-height: 30px;
          margin-bottom: 50px;
          .el-form-item__content {
            height: 30px;
            line-height: 30px;
            .el-input__inner {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>



