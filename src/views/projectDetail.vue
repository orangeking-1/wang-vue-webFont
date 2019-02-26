<template>
    <div class="project" v-loading="loading">
      <div class="title">{{projectDetail.name}}</div>
      <div class="projectImg">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in projectDetail.img" :key="index">
            <!--<img :src="item.url" alt="" style="height: 100%;">-->
            <div class="projectImg-bg" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="con">
        <div class="con-item" v-if="projectDetail.cycle">
          <div class="con-title">
            <span>开发周期:</span>
          </div>
          <div class="con-content">
            {{projectDetail.cycle}} 个月
          </div>
        </div>
        <div class="con-item">
          <div class="con-title">
            <span>项目介绍:</span>
          </div>
          <div class="con-content">
            {{projectDetail.introduce}}
          </div>
        </div>
        <div class="con-item">
          <div class="con-title">
            <span>负责模块:</span>
          </div>
          <div class="con-content">
            {{projectDetail.doit}}
          </div>
        </div>
        <div class="con-item">
          <div class="con-title">
            <span>技术支持:</span>
          </div>
          <div class="con-content">
            {{projectDetail.skill}}
          </div>
        </div>
      </div>
      <div class="btn" v-if="canProject">
        <el-tooltip effect="dark" content="修改项目" placement="bottom-start">
          <el-button type="primary" icon="el-icon-edit" circle @click="editProjectFunc"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="删除项目" placement="bottom-start">
          <el-button type="primary" icon="el-icon-delete" circle @click="deleteProjectFunc"></el-button>
        </el-tooltip>
      </div>
    </div>
</template>

<script>
export default {
  name: 'projectDetail',
  data () {
    return {
      loading: true,
      projectDetail: '',
      url: {
        getProjectDetailUrl: this.$wang.api.getProjectDetailUrl,
        deleteProjectUrl: this.$wang.api.deleteProjectUrl
      },
      canProject: false
    }
  },
  methods: {
    getProjectDetailFunc () {
      this.$wang.ajax({
        url: this.url.getProjectDetailUrl,
        param: {
          _id: this.$route.query.projectId
        }
      }).then(res => {
        if (res.code === 0) {
          this.projectDetail = res.data
          this.loading = false
        } else {
          this.$message({
            message: '服务器链接失败',
            type: 'warning'
          })
        }
      })
    },
    editProjectFunc () {
      this.$router.push({ path: '/projectAddOrModify', query: { projectId: this.$route.query.projectId } })
    },
    deleteProjectFunc () {
      this.$wang.ajax({
        url: this.url.deleteProjectUrl,
        param: {
          _id: this.$route.query.projectId
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.$router.push('/projectList')
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    },
    // 判断是否有修该、删除的文章的权限
    canChangeProjectFunc () {
      this.canProject = this.$store.state.isLoginState && JSON.parse(sessionStorage.getItem('userInfo')).admin
    }
  },
  created () {
    this.canChangeProjectFunc()
    this.getProjectDetailFunc()
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
  .projectImg
    .projectImg-bg
      width: 100%
      height: 100%
      background-size: cover
  .con
    margin-top: 30px
    .con-item
      display: flex
      margin-bottom: 15px
      font-size: 18px
      .con-title
        span
          display: inline-block
          width: 80px
          background-color: #ddd
          padding: 5px
          font-weight: bold
      .con-content
        flex: 1
        max-width: 710px
        word-wrap: break-word
        padding-left: 15px
        line-height: 36px
  .btn
    position: absolute
    right: 20px
    top: 20px
</style>
