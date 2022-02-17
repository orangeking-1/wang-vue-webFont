<template>
  <div class="user-content">
    <div class="user-avatar">
      <div class="avatar">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="httpRequest"
          :show-file-list="false">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="user-info">
      <el-form ref="userInfo" :model="userInfo" label-width="80px">
        <el-form-item label="账号:">
          <el-input v-model="userInfo.account"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="userInfo.location"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userInfo.profile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeInfoFunc">修改</el-button>
          <el-button type="primary" @click="loginOutFunc">退出登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userCenter',
  data () {
    return {
      userInfo: {},
      url: {
        modifyUserInfoUrl: this.$wang.api.modifyUserInfoUrl
      }
    }
  },
  methods: {
    httpRequest (options) {
      this.$wang.base64(options.file).then(res => {
        if (res.code === 0) {
          this.userInfo.avatar = res.data
        } else {
          this.$message.error(res.data)
        }
      })
    },
    loginOutFunc () {
      this.$store.commit('removeUserInfo')
      this.$router.push('/')
    },
    getUserInfoFunc () {
      this.userInfo = this.$store.state.userInfo
    },
    changeInfoFunc () {
      if (!this.userInfo.account) {
        this.$message({
          message: '请务必填写账号！',
          type: 'warning'
        })
        return false
      }
      this.$wang.ajax({
        url: this.url.modifyUserInfoUrl,
        param: {
          userInfo: this.userInfo
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$store.commit('setUserInfo', res.data)
        } else {
          this.$message({
            message: '服务器出错，请稍后尝试！',
            type: 'error'
          })
        }
      })
    }
  },
  created () {
    this.getUserInfoFunc()
  }
}
</script>

<style scoped lang="sass">
.user-content
  max-width: 800px
  padding: 0 .1rem
  box-sizing: border-box
  margin: 40px auto 100px
  .user-avatar
    padding-left: 80px
    .avatar
      width: 100px
      height: 100px
      border: 1px dashed #d9d9d9
      .avatar-uploader .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
        .avatar-uploader .el-upload:hover
          border-color: #409EFF
        .avatar-uploader-icon
          font-size: 28px
          color: #8c939d
          width: 100px
          height: 100px
          line-height: 100px
          text-align: center
        .avatar-up
          width: 100px
          height: 100px
          display: block
  .user-info
    margin-top: 20px
</style>
