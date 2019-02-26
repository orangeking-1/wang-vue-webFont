<template>
  <div class="project" v-loading="loading">
    <div class="title">
      <template v-if="isAddProject">
        添加项目
      </template>
      <template v-else>
        修改项目
      </template>
    </div>
    <div class="project-picture">
      <el-upload
        action=""
        :http-request="httpRequest"
        list-type="picture-card"
        :file-list="projectImg"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div class="project-con">
      <el-form ref="param" :rules="rules" :model="param" label-width="100px">
        <el-form-item label="项目名称：" prop="name">
          <el-input v-model="param.name" placeholder="请填写名称"></el-input>
        </el-form-item>
        <el-form-item label="开发周期：" prop="cycle">
          <el-input v-model="param.cycle" placeholder="请填写周期">
            <template slot="append">月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="项目介绍：" prop="introduce">
          <el-input type="textarea" v-model="param.introduce" placeholder="项目的介绍"></el-input>
        </el-form-item>
        <el-form-item label="负责模块：" prop="doit">
          <el-input type="textarea" v-model="param.doit" placeholder="负责做的模块"></el-input>
        </el-form-item>
        <el-form-item label="技术支持：" prop="skill">
          <el-input type="textarea" v-model="param.skill" placeholder="项目所用到的技术"></el-input>
        </el-form-item>
        <el-form-item>
          <template v-if="isAddProject">
            <el-button type="primary" @click="addProjectFunc('param')">添加项目</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="editProjectFunc('param')">修改项目</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectAddOrModify',
  data () {
    return {
      loading: true,
      isAddProject: true,
      param: {
        name: '',
        cycle: '',
        introduce: '',
        doit: '',
        skill: '',
        img: []
      },
      rules: {
        name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }],
        introduce: [{ required: true, message: '项目的介绍', trigger: 'blur' }],
        doit: [{ required: true, message: '负责做的模块', trigger: 'blur' }],
        skill: [{ required: true, message: '项目所用到的技术', trigger: 'blur' }]
      },
      url: {
        addProjectUrl: this.$wang.api.addProjectUrl,
        getProjectDetailUrl: this.$wang.api.getProjectDetailUrl,
        editProjectUrl: this.$wang.api.editProjectUrl
      },
      projectImg: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.param.img.map((item, index) => {
        if (file.id === item.id) {
          // 获取到然后删除
          this.param.img.splice(index, 1)
          return false
        }
      })
    },
    httpRequest (options) {
      console.log(options.file)
      let imgBase64 = {}
      imgBase64.id = options.file.uid
      this.$wang.base64(options.file).then(res => {
        if (res.code === 0) {
          imgBase64.url = res.data
          this.param.img.push(imgBase64)
        } else {
          this.$message.error('图片传化失败')
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getProjectDetailFunc () {
      this.$wang.ajax({
        url: this.url.getProjectDetailUrl,
        param: {
          _id: this.$route.query.projectId
        }
      }).then(res => {
        if (res.code === 0) {
          this.param = res.data
          this.loading = false
          this.projectImg = JSON.parse(JSON.stringify(res.data)).img
        } else {
          this.$message({
            message: '服务器链接失败',
            type: 'warning'
          })
        }
      })
    },
    addProjectFunc (param) {
      if (this.param.img.length === 0) {
        this.$message.error('请上传项目图片')
        return false
      }
      this.$refs[param].validate((valid) => {
        if (valid) {
          this.$wang.ajax({
            url: this.url.addProjectUrl,
            param: this.param
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.data,
                type: 'success'
              })
              // 跳转到项目列表页面
              this.$router.push('/projectList')
            } else {
              this.$message({
                message: '服务器链接失败',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    editProjectFunc (param) {
      if (this.param.img.length === 0) {
        this.$message.error('请上传项目图片')
        return false
      }
      this.$refs[param].validate((valid) => {
        if (valid) {
          this.$wang.ajax({
            url: this.url.editProjectUrl,
            param: this.param
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.data,
                type: 'success'
              })
              // 跳转到项目列表页面
              this.$router.push('/projectList')
            } else {
              this.$message({
                message: '服务器链接失败',
                type: 'warning'
              })
            }
          })
        }
      })
    }
  },
  created () {
    // 判断路由是否有project，来确定是添加页还是修改页面
    if (this.$route.query.projectId) {
      // 为编辑页面
      this.isAddProject = false
      this.getProjectDetailFunc()
    } else {
      this.isAddProject = true
      this.loading = false
    }
  }
}
</script>

<style scoped lang="sass">
.project
  max-width: 800px
  margin: 0 auto
  .title
    padding: 20px
    font-size: 30px
    font-weight: bold
    text-align: center
  .project-con
    margin-top: 30px
    padding: 20px
</style>
