<template>
  <div class="project">
    <div class="title-tip">全部项目</div>
    <template v-if="projectListData.length > 0">
      <div v-loading="loading">
        <div class="project-item" v-for="(item, index) in projectListData" :key="index" @click="toProjectDetailFunc(item._id)">
          <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
            <!--<img :src="item.img[0].url" alt="">-->
            <div class="project-item-img"  :style="{backgroundImage: 'url(' + item.img[0].url + ')'}"></div>
          </el-tooltip>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-data">
        暂无数据
      </div>
    </template>
    <!--添加项目-->
    <el-tooltip effect="dark" content="添加项目" placement="bottom-start">
      <el-button v-if="canAddProject" class="add-project" type="primary" icon="el-icon-plus" circle @click="addProjectFunc"></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'projectList',
  data () {
    return {
      loading: true,
      canAddProject: false,
      url: {
        getProjectListUrl: this.$wang.api.getProjectListUrl
      },
      projectListData: []
    }
  },
  methods: {
    addProjectFunc () {
      this.$router.push('/projectAddOrModify')
    },
    toProjectDetailFunc (id) {
      this.$router.push({ path: '/projectDetail', query: { projectId: id } })
    },
    getProjectListFunc () {
      this.$wang.ajax({
        url: this.url.getProjectListUrl
      }).then(res => {
        if (res.code === 0) {
          this.projectListData = res.data
          this.loading = false
        } else {
          this.$message({
            message: '服务器链接失败',
            type: 'warning'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 判断是否有添加的项目的权限
    canAddProjectFunc () {
      this.canAddProject = this.$store.state.isLoginState && JSON.parse(localStorage.getItem('userInfo')).admin
    }
  },
  created () {
    this.canAddProjectFunc()
    this.getProjectListFunc()
  }
}
</script>

<style scoped lang="sass">
.project
  max-width: 800px
  margin: 0px auto
  &:after
    content: ''
    display: block
    clear: both
  .title-tip
    padding: 20px
    font-size: 30px
    font-weight: bold
    text-align: center
  .no-data
    font-size: 20px
    font-weight: bold
    text-align: center
    margin-top: 150px
  .project-item
    float: left
    width: 150px
    height: 170px
    margin: 150px 25px 30px
    text-align: center
    position: relative
    cursor: pointer
    transition: all 0.5s
    overflow: hidden
    &:hover
      transform: translate(0px, -10px)
    &:hover:after
      transform: translate(0px, -10px)
    &:after
      content: ''
      display: block
      position: absolute
      bottom: -10px
      left: 5%
      width: 90%
      height: 10px
      background: radial-gradient(#999, #ccc, #fff)
      transition: all 0.3s
    .project-item-img
      width: 150px
      height: 150px
      background-size: cover
      background-position: center center
      border-radius: 75px
      overflow: hidden
  .add-project
    position: absolute
    right: 20px
    top: 20px
</style>
