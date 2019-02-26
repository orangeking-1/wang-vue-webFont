<template>
  <div class="con">
    <div class="title-tip">修改文章</div>

    <div class="article-title">
      <div class="title">标题：</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="content">
      <div class="title">内容：</div>
      <markdown-editor class="md-editor" v-model="content" :highlight="true" :sanitize="true" ref="markdownEditor"></markdown-editor>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="editArticleFunc">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleModify',
  data () {
    return {
      title: '',
      content: '',
      url: {
        editArticleUrl: this.$wang.api.editArticleUrl,
        getArticleDetail: this.$wang.api.getArticleDetail
      },
      articleId: ''
    }
  },
  methods: {
    getArticleDetailFunc () {
      this.articleId = this.$route.query.articleId
      this.$wang.ajax({
        url: this.url.getArticleDetail,
        param: {
          articleId: this.articleId
        }
      }).then(res => {
        if (res.code === 0) {
          this.title = res.data.title
          this.content = res.data.content
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    },
    editArticleFunc () {
      if (this.title === '') {
        this.$message({
          message: '请填写标题',
          type: 'warning'
        })
        return false
      }
      if (this.content === '') {
        this.$message({
          message: '请输入内容',
          type: 'warning'
        })
        return false
      }
      let param = {
        articleId: this.articleId,
        title: this.title,
        content: this.content
      }
      this.$wang.ajax({
        url: this.url.editArticleUrl,
        param
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.data,
            type: 'success'
          })
          this.$router.push({ path: '/articleDetail', query: { articleId: this.articleId } })
        }
      })
    }
  },
  created () {
    this.getArticleDetailFunc()
  }
}
</script>

<style scoped lang="sass">
  .con
    max-width: 1000px
    margin: 0px auto
    .title-tip
      padding: 20px
      font-size: 30px
      font-weight: bold
      text-align: center
    .article-title
      margin-bottom: 30px
      display: flex
      .title
        width: 70px
        line-height: 40px
        font-size: 20px
        font-weight: bold
    .content
      display: flex
      .title
        line-height: 40px
        font-size: 20px
        font-weight: bold
      .markdown-editor
        flex: 1
    .btn
      text-align: center
      margin: 30px 0px 100px 0px
</style>
