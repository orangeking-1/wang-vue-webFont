<template>
  <div id="app">
    <wangMenu class="app-menu" :class="{'open-menu': $store.state.openSidebar}"></wangMenu>
    <!--点击按钮-->
    <div class="toggle-btn" :class="{'open-menu': $store.state.openSidebar}" @click="toggleSidebarFunc">
      <i v-show="!$store.state.openSidebar" class="el-icon-s-fold"></i>
      <i v-show="$store.state.openSidebar" class="el-icon-s-unfold"></i>
      橙子国王
      </div>
    <div class="content" :class="{'open-menu': $store.state.openSidebar}" @click="colseSidebarFunc">
      <transition
        mode="out-in"
        name="el-fade-in"
      >
        <router-view/>
      </transition>
    </div>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1043452_68eyuj52hyd.css">
  </div>
</template>
<script>
import wangMenu from '@/components/layout/wang-menu'
export default {
  components: {
    wangMenu
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    toggleSidebarFunc () {
      this.$store.commit('toggleSidebarFunc')
    },
    // 当菜单为开启的时候点击右侧区域关闭菜单
    colseSidebarFunc () {
      this.$store.commit('colseSidebarFunc')
    },
    // 判断登陆状态
    checkLoginStateFunc () {
      if (localStorage.getItem('userInfo')) {
        this.$store.state.isLoginState = true
      } else {
        this.$store.state.isLoginState = false
      }
    }
  },
  created () {
    this.checkLoginStateFunc()
  }
}
</script>
<style lang="sass" scoped>
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center;
  color: #2c3e50
  background-color: #f5f5f5
  display: flex
  width: 100%
  min-height: 100vh
  position: relative
  overflow: hidden
  .app-menu
    height: 100vh
    transition: all 0.5s ease
    &.open-menu
      transform: translateX(0px)
  .toggle-btn
    position: fixed
    top: 20px
    left: 20px
    z-index: 10000
    font-size: 14px
    padding: 2px 10px
    border-radius: 14px
    background-color: #333
    color: #fff
    opacity: 0.8
    cursor: pointer
    transition: all 0.5s ease
    &.open-menu
      transform: translateX(280px)
  .content
    width: 100%
    flex: 1
    transition: all 0.5s ease
    &.open-menu
      transform: translateX(280px)
</style>
