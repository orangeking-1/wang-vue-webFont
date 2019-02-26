<template>
  <div class="login-con">
    <div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="50px" label-position="left" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
          <a class="tipRegister" @click="toPage('/register')">没有账号，前去注册</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      userForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, message: '长度在 3 以上字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最小为6位', trigger: 'blur' }
        ]
      },
      url: {
        loginUrl: this.$wang.api.loginUrl
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
          this.$wang.ajax({
            url: this.url.loginUrl,
            param: {
              account: this.userForm.account,
              password: this.userForm.password
            }
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.$store.commit('setUserInfo', res.data)
              this.$router.push('/')
            } else {
              this.$message.error(res.data)
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
    }
  }
}
</script>

<style scoped lang="sass">
.login-con
  min-width: 350px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background-color: #fff
  box-shadow: 0px 0px 10px #ccc
  padding: 40px
  .tipRegister
    color: #3da8f5
    float: right
    text-align: right
    font-size: 12px
    cursor: pointer
    line-height: 1
    margin-top: 25px
</style>
