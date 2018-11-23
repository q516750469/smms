<template>
    <div class="nav">
        <el-menu :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#2d3a4b" active-text-color="rgb(64, 158, 255)" router>
            <h1>
                华联超市管理系统
            </h1>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-location"></i>系统管理</template>
                <el-menu-item index="/"><i class="el-icon-caret-right"></i>系统信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-location"></i>账号管理</template>
                <el-menu-item index="/usermanage"><i class="el-icon-caret-right"></i>账号管理</el-menu-item>
                <el-menu-item index="/useradd"><i class="el-icon-caret-right"></i>添加账号</el-menu-item>
                <el-menu-item index="/editpassword"><i class="el-icon-caret-right"></i>密码修改</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-location"></i>商品管理</template>
                <el-menu-item index="/goodsmanage"><i class="el-icon-caret-right"></i>商品管理</el-menu-item>
                <el-menu-item index="/goodsadd"><i class="el-icon-caret-right"></i>添加商品</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-location"></i>统计管理</template>
                <el-menu-item index="/salescharts"><i class="el-icon-caret-right"></i>销售统计</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .el-aside {
        background-color: #2d3a4b;
        color: #333;
        .el-menu{
        h1{
            text-align: center;
        };
        background-color: #2d3a4b;
        border: none;
            color: #ffffff;
            .el-submenu__title {
                color: #ffffff;
            }
            .el-menu-item {
                color: #ffffff;
            }
        }
    }
</style>
