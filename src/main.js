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

// 引入sentry日志监控系统
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

Vue.use(ElementUI)
Vue.use(VueSimplemde)
Vue.use(animate)

// 配置sentry
Sentry.init({
  Vue,
  dsn: 'https://95b443cd83a240f6a7acf817c133ceae@o1156786.ingest.sentry.io/6238438',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'wangguanghang.com', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
// 自定义用户信息
Sentry.configureScope(function (scope) {
  scope.setTag('userInfo', '用户信息上传')
  scope.setUser({
    id: 42,
    email: 'john.doe@example.com',
    phone: '13213527964'
  })
})

// 全局变量挂载到Vue.prototype上去
Vue.prototype.$wang = {
  ajax: HTTP,
  api: API,
  base64: base64,
  Sentry: Sentry
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
