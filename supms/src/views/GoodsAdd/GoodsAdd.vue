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
        <el-form :model="addGoodsForm" status-icon :rules="rules1" ref="addGoodsForm" label-width="100px" class="demo-ruleForm">
          <!-- 表单 -->
          <!-- 所属分类 -->
          <el-form-item label="请选择分类" prop="cateName">
            <el-select v-model="addGoodsForm.cateName" placeholder="请选择分类">
              <el-option label="酒水类" value="酒水类"></el-option>
              <el-option label="水果类" value="水果类"></el-option>
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
            </el-select>
          </el-form-item>

          <!-- 条形码 -->
          <el-form-item label="条形码" prop="barCode">
            <el-input type="text" v-model="addGoodsForm.barCode" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="goodsName">
            <el-input type="text" v-model="addGoodsForm.goodsName" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价" prop="costPrice">
            <el-input type="text" v-model="addGoodsForm.costPrice"></el-input>
          </el-form-item>
          <!-- 商品市场价 -->
          <el-form-item label="商品市场价" prop="marketPrice">
            <el-input type="text" v-model="addGoodsForm.marketPrice" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价" prop="salePrice">
            <el-input type="text" v-model="addGoodsForm.salePrice" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量" prop="goodsNum">
            <el-input type="text" v-model="addGoodsForm.goodsNum" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量" prop="goodsWeight">
            <el-input type="text" v-model="addGoodsForm.goodsWeight" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="选择单位" prop="unit">
            <el-select v-model="addGoodsForm.unit" placeholder="选择单位">
              <el-option label="个" value="个"></el-option>
              <el-option label="件" value="件"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="斤" value="斤"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="箱" value="箱"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员优惠" prop="discount">
            <el-radio v-model="addGoodsForm.discount" label="1">享受</el-radio>
            <el-radio v-model="addGoodsForm.discount" label="2">不享受</el-radio>
          </el-form-item>
          <el-form-item label="是否促销" prop="promotion">
            <el-radio v-model="addGoodsForm.promotion" label="1">启用</el-radio>
            <el-radio v-model="addGoodsForm.promotion" label="2">禁用</el-radio>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input type="textarea" v-model="addGoodsForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addGoodsForm')">添加</el-button>
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
import qs from "qs";
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
      } else if (value != this.addGoodsForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单内数据
      addGoodsForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        costPrice: "",
        marketPrice: "",
        salePrice: "",
        goodsNum: "",
        goodsWeight: "",
        unit: "",
        discount: "",
        promotion: "",
        goodsDesc: ""
      },
      rules1: {
        // 验证分类名称
        cateName: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          {
            min: 3,
            max: 6,
            message: "长度必须 3 到 6 个字符",
            trigger: "change"
          } // 长度验证
        ],
        // 条形码
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品名称
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品进价
        costPrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 市场价
        marketPrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 售价
        salePrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 入库数量
        goodsNum: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品重量
        goodsWeight: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 单位
        unit: [
          { required: true, message: "不能为空", trigger: "change" } // 非空验证
        ],
        // 是否打折
        discount: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 是否促销
        promotion: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品描述
        goodsDesc: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
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
            cateName: this.addGoodsForm.cateName,
            barCode: this.addGoodsForm.barCode,
            goodsName: this.addGoodsForm.goodsName,
            costPrice: this.addGoodsForm.costPrice,
            marketPrice: this.addGoodsForm.marketPrice,
            salePrice: this.addGoodsForm.salePrice,
            goodsNum: this.addGoodsForm.goodsNum,
            goodsWeight: this.addGoodsForm.goodsWeight,
            unit: this.addGoodsForm.unit,
            discount: this.addGoodsForm.discount,
            promotion: this.addGoodsForm.promotion,
            goodsDesc: this.addGoodsForm.goodsDesc

          };
          this.axios.post("http://127.0.0.1:3000/goods/addgoods",
            qs.stringify(params), //用qs模块转化params数据对象
            { Header:{"Content-Type":"application/x-www-form-urlencoded"} //设置请求头
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
            textarea {
              width: 500px;
              height: 60px;
            }
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



