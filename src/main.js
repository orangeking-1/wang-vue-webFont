import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './css/app.sass'
import HTTP from './common/http-promies.js'
import API from './api/api.js'
import base64 from './common/changeBase64.js'
// md编辑器
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

// 动画库
import animate from 'animate.css'

// 引入pwa的server-work
// import './registerServiceWorker'

Vue.use(ElementUI)
Vue.use(VueSimplemde)
Vue.use(animate)

// 全局变量挂载到Vue.prototype上去
Vue.prototype.$wang = {
  ajax: HTTP,
  api: API,
  base64: base64
}

// 加入百度统计
router.beforeEach((to, from, next) => {
  // 统计代码
  if (to.path) {
    // eslint-disable-next-line
    _hmt.push(['_trackPageview', '/#' + to.fullPath])
  }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
