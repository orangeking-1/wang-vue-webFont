<template>
  <div class="menu">
    <div class="personal-info">
      <template v-if="$store.state.userInfo.avatar">
        <img class="avatar" :src="$store.state.userInfo.avatar" alt="">
      </template>
      <template v-else>
        <div class="avatar">头像</div>
      </template>
      <div class="nickname">
        <div class="nickname-con" v-if="$store.state.userInfo">
          <div>{{$store.state.userInfo.account}}</div>
          <div class="nickname-profile">{{$store.state.userInfo.profile}}</div>
        </div>
        <div v-else>
          <div>请先登陆</div>
          <div class="login-register">
            <a @click="toPage('/login')">登陆</a> / <a @click="toPage('/register')">注册</a>
          </div>
        </div>
      </div>
    </div>
    <el-menu
      mode="vertical"
      :router="true"
      default-active="/"
      class="el-menu-vertical-demo"
      @select="handleSelectFunc"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#f05b72">
      <el-menu-item index="/">
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/articleList">
        <span slot="title">文章</span>
      </el-menu-item>
      <el-menu-item v-if="$store.state.userInfo"  index="/projectList">
        <span slot="title">项目</span>
      </el-menu-item>
      <el-menu-item index="/personalProfile">
        <span slot="title">简介</span>
      </el-menu-item>
      <el-menu-item index="/messageBoard">
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item v-if="$store.state.userInfo" index="/userCenter">
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'wang-menu',
  data () {
    return {
      userInfo: ''
    }
  },
  watch: {
  },
  methods: {
    handleSelectFunc (key, keyPath) {
      this.$store.commit('colseSidebarFunc')
    },
    toPage (path) {
      this.$router.push(path)
      this.$store.commit('colseSidebarFunc')
    }
  },
  created () {
  }
}
</script>

<style scoped lang="sass">
.menu
  position: fixed
  left: 0
  top: 0
  transform: translateX(-100%)
  display: flex
  flex-direction: column
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.08)
  /*position: relative*/
  .personal-info
    padding: 20px
    display: flex
    .avatar
      width: 64px
      height: 64px
      line-height: 64px
      background-color: #a6a6a6
      color: #fff
      border-radius: 3px
      font-size: 12px
      text-align: center
    .nickname
      flex: 1
      font-size: 13px
      padding-left: 20px
      display: flex
      align-items: center
      .nickname-con div
        max-width: 150px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .nickname-profile
        color: #666
      .login-register
        margin-top: 5px
        a
          color: #3da8f5
          text-decoration: none
          cursor: pointer
  .el-menu
    flex: 1
    min-width: 280px
    background: #383838
    .el-menu-item
      height: 80px
      line-height: 80px
      text-align: right
      font-size: 20px
      padding-right: 80px
      &.is-active span::after
        background-color: #f05b72
      &:hover
        color: #3da8f5!important
        background: #545c64!important
        span::after
          background-color: #3da8f5
      span
        position: relative
        &::after
          content: ''
          position: absolute
          top: -10px
          right: -20px
          height: 60px
          width: 1px
          background-color: #fff
          transform: rotate(45deg)
</style>
