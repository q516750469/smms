<template>
    <el-header>
        <h1 class="title">华联超市系统</h1>
        <div class="username">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    Admin <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <div class="photo"><img src="" alt=""></div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
    .el-header{
        color: rgb(48, 65, 86);
        border-bottom:1px solid rgba(0, 0, 0, 0.1);
        .title{
            display:inline-block;
            float: left;
        }
        .el-dropdown{
            height: 60px;
            line-height: 60px;
            display:inline-block;
            float: right;
            .photo{
                margin-left: 20px;
                display: inline-block;
                height: 50px;
                width: 50px;
                line-height: 50px;
                background: #ccc;
            }
        }
    }
</style>
