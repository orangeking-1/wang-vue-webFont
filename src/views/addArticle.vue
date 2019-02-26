<template>
  <div class="con">
    <div class="title-tip">添加文章</div>

    <div class="article-title">
      <div class="title">标题：</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="content">
      <div class="title">内容：</div>
      <markdown-editor class="md-editor" v-model="content" :highlight="true" :sanitize="true" ref="markdownEditor"></markdown-editor>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="addArticleFunc">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addArticle',
  data () {
    return {
      title: '',
      content: '',
      url: {
        addArticleUrl: this.$wang.api.addArticleUrl
      }
    }
  },
  methods: {
    addArticleFunc () {
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
        author: JSON.parse(sessionStorage.getItem('userInfo'))._id,
        title: this.title,
        content: this.content
      }
      this.$wang.ajax({
        url: this.url.addArticleUrl,
        param
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.data,
            type: 'success'
          })
          this.$router.push('/articleList')
        }
      })
    }
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
