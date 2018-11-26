<template>
  <div class="user-manage">
    <!-- 头部 -->
    <Header></Header>
    <!-- 身体 -->
    <el-main>
      <el-card class="box-card">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <!-- 用户名 -->
          <el-table-column prop="username" label="用户名">
          </el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="usergroup" label="用户组" show-overflow-tooltip>
          </el-table-column>

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
        <div style="margin-top: 20px">
          <el-button @click="BatchDel" type="danger">批量删除</el-button>
          <el-button @click="toggleSelection">取消选择</el-button>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="修改账号" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="editform" status-icon :rules="rules1" ref="editform" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="editform.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="editform.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="editform.usergroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
          </div>
        </el-dialog>
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

// 引入moment模块
import moment from "moment";

// 引入qs模块
import qs from "qs";

// VUE实例对象
export default {
  components: {
    Header,
    Footer
  },
  data() {
    //
    return {
      tableData: [],
      selectedUser: [],
      editId: "",
      dialogFormVisible: false,
      editform: {
        username: "",
        password: "",
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
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getUserdata();
  },
  filters: {
    getCdate(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    // 修改数据函数(数据回显)
    handleEdit(id) {
      this.editId = id;
      this.axios
        .get(`http://127.0.0.1:3000/users/edituser?id=${id}`)
        .then(response => {
          this.editform.username = response.data[0].username;
          this.editform.password = response.data[0].password;
          this.editform.usergroup = response.data[0].usergroup;
        });
      this.dialogFormVisible = true;
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

    // 保存修改的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送保存数据的请求
          let params = {
            username: this.editform.username,
            password: this.editform.password,
            usergroup: this.editform.usergroup,
            editId: this.editId
          };
          this.axios
            .post(
              "http://127.0.0.1:3000/users/saveuser",
              qs.stringify(params),
              {
                Header: {
                  "Content-Type": {
                    Header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    }
                  }
                }
              }
            ) //设置请求头
            .then(response => {
              // 判断后端传回的数据
              if (response.data.rstCode === 1) {
                // 弹窗消息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: response.data.msg
                });
              }
              this.getUserdata();
              this.dialogFormVisible = false;
            });
        } else {
          console.log("添加失败！！");
          return false;
        }
      });
    },
    // 取消选择函数
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      // 把选中的数据 保存到一个变量里面
      this.selectedUser = val;
    },
    // 批量删除函数
    BatchDel(val) {
      let idArr = this.selectedUser.map(v => v.id);
      if (!idArr.length) {
        this.$message.error("请选择以后再操作! 你是不是傻！");
        return;
      }
      let selectId = {
        idArr: JSON.stringify(idArr) // 把数组对象转为字符串
      };
      this.axios.post("http://127.0.0.1:3000/users/batchdel", 
        qs.stringify(selectId), 
        { Header: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then(response => {
          if (response.data.rstCode === 1) {
            // 弹窗消息
            this.$message({
              type: "success",
              message: response.data.msg,
            });
              this.getUserdata();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: response.data.msg
            });
          }
        });
    },
    
  }
};
</script>

<style lang="less">
.user-manage {
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


