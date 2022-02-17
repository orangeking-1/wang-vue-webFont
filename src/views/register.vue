<template>
  <div class="login-con">
    <div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px" label-position="right">
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="againPassword">
          <el-input v-model="userForm.againPassword" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">注册</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
          <a class="tipRegister" @click="toPage('/login')">已有账号，登录</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'register',
  data () {
    return {
      userForm: {
        account: '',
        password: '',
        againPassword: '',
        addr: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, message: '长度在 3 以上字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最小为6位', trigger: 'blur' }
        ],
        againPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, message: '密码最小为6位', trigger: 'blur' }
        ]
      },
      url: {
        registerUrl: this.$wang.api.registerUrl
      },
      position: {
        province: '',
        city: ''
      }
    }
  },
  methods: {
    toPage (path) {
      this.$router.push(path)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.userForm.password !== this.userForm.againPassword) {
            this.$message({
              message: '两次输入的密码不一致，请重新输入',
              type: 'warning'
            })
            return false
          }
          this.userForm.addr = this.position.province + this.position.city
          this.$wang.ajax({
            url: this.url.registerUrl,
            param: this.userForm
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
              console.log(res.data)
              this.$store.commit('setUserInfo', res.data)
              this.$router.push('/')
            } else {
              this.$message({
                type: 'warning',
                message: res.data
              })
            }
          })
        } else {
          this.$message.error('请填写正确的账号密码')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getLocation () {
      const geolocation = new BMap.Geolocation()
      var _this = this
      geolocation.getCurrentPosition(function getinfo (position) {
        _this.position.city = position ? position.address.city : '' // 获取城市信息
        _this.position.province = position ? position.address.province : '' // 获取省份信息
      }, function (e) {
      }, { provider: 'baidu' })
    }
  },
  mounted () {
    this.getLocation()
  }
}
</script>

<style scoped lang="sass">
  .login-con
    min-width: 3.5rem
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: #fff
    box-shadow: 0px 0px 10px #ccc
    padding: .3rem

    .tipRegister
      float: right
      text-align: right
      font-size: .12rem
      color: #3da8f5
      cursor: pointer
      line-height: 1
      margin-top: .25rem
</style>
