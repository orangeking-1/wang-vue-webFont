import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openSidebar: false,
    isLoginState: false,
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || ''
  },
  mutations: {
    // 侧边菜单栏变化
    toggleSidebarFunc (state) {
      state.openSidebar = !state.openSidebar
    },
    colseSidebarFunc (state) {
      if (state.openSidebar) {
        state.openSidebar = false
      }
    },
    setUserInfo (state, info) {
      state.userInfo = info
      state.isLoginState = true
      sessionStorage.setItem('userInfo', JSON.stringify(info))
    },
    removeUserInfo (state) {
      state.userInfo = ''
      state.isLoginState = false
      sessionStorage.removeItem('userInfo')
    }
  },
  getters: {
    getStorage (state) {
      if (!state.userInfo) {
        state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      }
      return state.userInfo
    }
  },
  actions: {}
})
