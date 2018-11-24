<template>
    <div class="edit-newpassword">
        <!-- 头部 -->
        <Header></Header>
        <!-- 身体 -->
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>修改密码</span>
                </div>
                <el-form :model="editPassword" status-icon :rules="rules1" ref="editPassword" label-width="100px" class="demo-ruleForm">
                    <!-- 表单 -->
                    <el-form-item label="原密码" prop="oldnewpassword">
                        <el-input type="text" v-model="editPassword.oldnewpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="newpassword">
                        <el-input type="text" v-model="editPassword.newpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpwd">
                        <el-input type="text" v-model.number="editPassword.checkpwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('editPassword')">提交</el-button>
                        <el-button @click="resetForm('editPassword')">重置</el-button>
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
  // 注册头脚组件
  components: {
    Header,
    Footer
  },
  methods: {
    // 提交表单函数

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("修改成功")
        } else {
          console.log("修改失败");
          return false;
        }
      });
    },
    //   清空表单函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  data() {
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.editPassword.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 表单内数据
      editPassword: {
        oldnewpassword: "",
        newpassword: "",
        checkPwd: "",
        usergroup: ""
      },
      rules1: {
        // 用户名验证
        oldnewpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        // 密码验证
        newpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        // 确认密码验证
        checkpwd: [{ required: true, validator: validatePwd, trigger: "blur" }]
      }
    };
  }
};
</script>
<style lang="less">
.edit-newpassword {
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


