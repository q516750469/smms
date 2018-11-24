<template>
    <div class="stock-add">
        <!-- 头部 -->
        <Header></Header>
        <!-- 身体 -->
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>系统信息</span>
                </div>
                <div>
                    <template>
                        <el-alert
                            title="商品总数：5。已经销售的总金额：890.00。库存商品总价1235.82"
                            type="info">
                        </el-alert>
                        <el-alert
                            title="导入数据"
                            type="success">
                        </el-alert>
                    </template>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table :data="tableDataLeft">
                                        <el-table-column
                                            prop="goodsname"
                                            label="商品名称"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="sales"
                                            label="销量">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="12">
                         <div class="grid-content bg-purple">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>缺货商品</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table :data="tableDataRight">
                                        <el-table-column
                                            prop="goodsname"
                                            label="商品名称"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="repertoryCount"
                                            label="库存"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="option"
                                            label="操作">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </div>  
                    </el-col>
                </el-row>
            </el-card> 
        </el-main>
        <!-- 脚部 -->
        <Footer></Footer>
    </div>
</template>

<script>
// 引入头部组件
import Header from "@/components/Header/Header.vue" 
// 引入脚部组件
import Footer from "@/components/Footer/Footer.vue"

export default {
    // 注册组件
    components:{
        Header,
        Footer
    },
    // 数据
    data () {
        return{
            // 左边表格火速局
            tableDataLeft:[
                {
                    "goodsname":"海飞丝",
                    "sales":8
                },
                {
                    "goodsname":"海飞丝",
                    "sales":8
                },
                {
                    "goodsname":"海飞丝",
                    "sales":8
                }
            ],
            tableDataRight:[
                 {
                    "goodsname":"海飞丝",
                    "repertoryCount":8,
                    "option":"入库"
                },
                {
                    "goodsname":"海飞丝",
                    "repertoryCount":8,
                    "option":"入库"
                },
                {
                    "goodsname":"海飞丝",
                    "repertoryCount":8,
                    "option":"入库"
                }
            ]
        }
    }

}
</script>
<style lang="less">
    .classify-add{
       width: 100%;
       display: flex;
       flex-direction: column;
       .el-main{
            flex: 1;
            .el-card{
                .el-card__header{
                    background: #dbe3ff;
                    font-weight: bold;
                }
                .el-alert{
                    margin-bottom: 10px;
                }
            }
       }
    }
</style>
