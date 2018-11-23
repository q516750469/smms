// 引入Vue
import Vue from 'vue'

// 引入Elementui资源文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 样式代码css

// 引入公共样式
import '@/common/css/base.css'
// 引入顶级组件 App
import App from './App.vue'

// 引入路由
import router from './router'

// 注册elementui
Vue.use(ElementUI)
// 阻止生产提示
Vue.config.productionTip = false

// 创建Vue实例 挂在dom
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
