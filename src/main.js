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

Vue.use(ElementUI)
Vue.use(VueSimplemde)

// 全局变量挂载到Vue.prototype上去
Vue.prototype.$wang = {
  ajax: HTTP,
  api: API,
  base64: base64
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
