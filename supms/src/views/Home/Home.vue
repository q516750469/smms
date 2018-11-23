<template>
    <div class="home">
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
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>卡片名称</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                                </div>
                                <div class="text item">
                                </div>
                            </el-card>

                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <div slot="header" class="clearfix">
                                <span>卡片名称</span>
                                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                            </div>
                            <div class="text item">
                            </div>
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
    }
}
</script>

<style lang="less">
    .home{
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
