<template>
    <div class="goods-add">
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
                        <el-select v-model="classifyform.classgroup" placeholder="---请选择分类---">
                            <el-option label="---顶级分类---" value="顶级分类"></el-option>
                            <el-option label="---顶级分类---" value="低级分类"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品条形码" prop="barcode">
                        <el-input type="text" v-model="classifyform.barcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" v-model="classifyform.goodsName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品售价" prop="salePrice">
                        <el-input type="text" v-model="classifyform.salePrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="市场价" prop="marketprice">
                        <el-input type="text" v-model="classifyform.marketprice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品进价" prop="costPrice">
                        <el-input type="text" v-model="classifyform.costPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="入库数量" prop="Inventoryquantity">
                        <el-input type="text" v-model="classifyform.Inventoryquantity" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goodsNum">
                        <el-input type="text" v-model="classifyform.goodsNum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位" prop="unit">
                        <el-input type="text" v-model="classifyform.unit" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="会员优惠" prop="discount">
                        <el-radio v-model="classifyform.discount" label="1">享受</el-radio>
                        <el-radio v-model="classifyform.discount" label="2">不享受</el-radio>
                    </el-form-item>
                    <el-form-item label="是否促销" prop="promotion">
                        <el-radio v-model="classifyform.promotion" label="1">启用</el-radio>
                        <el-radio v-model="classifyform.promotion" label="2">禁用</el-radio>
                    </el-form-item>
                    <el-form-item label="商品简介">
                      <el-input type="textarea" v-model="classifyform.desc"></el-input>
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
        barcode:"",
        goodsName: "",
        classgroup: "",
        statestr: "",
        goodsNum:"",
        salePrice:"",
        marketprice:"",
        costPrice:"",
        unit:"",
        discount:"",
        promotion:"",
        desc:""
      },
      rules1: {
        barcode: [
          { required: true, message: "请输入条形码", trigger: "blur" },
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        salePrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" },
        ],
        classgroup: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        statestr: [{ required: true, message: "请选择状态", trigger: "change" }],
        

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
.goods-add {
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
            textarea{
              width:500px;
              height: 60px;
            }
            .el-input__inner{
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



