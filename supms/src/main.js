// 引入Vue
import Vue from 'vue'

// 引入Elementui资源文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 样式代码css

// 引入公共样式
import '@/common/css/base.css'
// 引入顶级组件 App
import App from './App.vue'

// 引入axios
import axios from 'axios'

// 引入路由
import router from './router'


// 设置路由守卫
router.beforeEach((to, from, next) => {
  // 定义一个登录状态
  let isLogin;

  // 允许携带cookie
  axios.defaults.withCredentials=true;

  // 发送请求 去检查用户是否登录（是否有cookie）
  axios.get('http://127.0.0.1:3000/users/checkIsLogin')
  .then(response => {
    // 如果没有登录
    if(!response.data.islogin){
      // 如果要进入的不是登录页面  那么就跳转到登录页面
      if(to.path !== '/login'){
        return next({'path':'/login'})
      }else{
        // 放行
        next()
      }
      // 不存在cookie
    }else{
      next()
    }
  })
})

// 讲axios挂在vue原型上
Vue.prototype.axios = axios;
// 注册elementui
Vue.use(ElementUI)
// 阻止生产提示
Vue.config.productionTip = false

// 创建Vue实例 挂在dom
new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
