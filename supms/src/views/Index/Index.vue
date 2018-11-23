<template>
    <div class="index">
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 导航组件 -->
                <Nav></Nav>
            </el-aside>
            <!-- 右侧 -->
            <el-container>
              <!-- 路由出口 -->
              <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 引入导航组件
import Nav from "@/components/Nav/Nav.vue";

export default {
    components:{
        Nav
    }
};
</script>


<style lang="less">
.index {
  height: 100%;
  //  大容器
  .el-container {
    height: 100%;
  }
}
</style>


