<template>
    <div class="classify-add">
        <!-- 头部 -->
        <Header></Header>
        <!-- 身体 -->
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>添加管理</span>
                </div>
                <el-form :model="classifyform" status-icon :rules="rules1" ref="classifyform" label-width="100px" class="demo-ruleForm">
                    <!-- 表单 -->
                    <el-form-item label="所属分类" prop="classgroup">
                        <el-select v-model="classifyform.classgroup" placeholder="---顶级分类---">
                            <el-option label="---顶级分类---" value="顶级分类"></el-option>
                            <el-option label="---顶级分类---" value="顶级分类"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类名称" prop="classname">
                        <el-input type="text" v-model="classifyform.classname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="statestr">
                        <el-radio v-model="classifyform.statestr" label="1">启用</el-radio>
                        <el-radio v-model="classifyform.statestr" label="2">禁用</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('classifyform')">添加</el-button>
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
/// 注册组件
export default {
  components: {
    Header,
    Footer
  },
  data() {
    //  确认密码验证函数
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.classifyform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单内数据
      classifyform: {
        classname: "",
        classgroup: "",
        statestr: ""
      },
      rules1: {
        classname: [
          { required: true, message: "请输入分类名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        classgroup: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        statestr: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("添加成功！！");
        } else {
          console.log("添加失败！！");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.classify-add {
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
          .el-form-item__label {
            height: 30px;
            line-height: 30px;
          }
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
