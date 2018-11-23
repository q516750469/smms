// 引入VUE
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 登录组件
import Login from '@/views/Login/Login.vue'
// 首页组件
import Index from '@/views/Index/Index.vue'
// 默认页面组件
import Home from '@/views/Home/Home.vue'
// 修改密码
import EditPassword from '@/views/EditPassword/EditPassword.vue'
// 商品添加
import GoodsAdd from '@/views/GoodsAdd/GoodsAdd.vue'
// 商品管理
import GoodsManage from '@/views/GoodsManage/GoodsManage.vue'
// 统计
import SalesCharts from '@/views/SalesCharts/SalesCharts.vue'
// 用户添加
import UserAdd from '@/views/UserAdd/UserAdd.vue'
// 用户管理
import UserManage from '@/views/UserManage/UserManage.vue'

// 注册路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 登录路由
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 首页路由
      path:'/',
      component:Index,
      // 子路由
      children:[
        {
          path:'',
          name:'home',
          component:Home
        },
        // 添加账号
        {
          name: 'useradd',
          path: '/useradd',
          component: UserAdd
        },
        // 账号管理
        {
          name: 'usermanage',
          path: '/usermanage',
          component: UserManage
        },
        // 修改密码
        {
          name: 'editpassword',
          path: '/editpassword',
          component: EditPassword
        },
        // 添加商品
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: GoodsAdd
        },
        // 商品管理
        {
          name: 'goodsmanage',
          path: '/goodsmanage',
          component: GoodsManage
        },
        // 销售统计报表
        {
          name: 'salescharts',
          path: '/salescharts',
          component: SalesCharts
        },
        
      ]
    }
  ]
})
