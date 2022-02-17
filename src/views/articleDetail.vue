<template>
  <div class="article">
    <div class="article-content">
      <div class="article-title">
        {{articleInfo.title}}
      </div>
      <div class="article-author">
        {{authorName}} <span style="color: #666;">著 发表于</span> {{articleInfo.update_time}}
      </div>
      <div class="article-con" v-html="compiledMarkdown()"></div>

      <div class="btn" v-if="canArticle">
        <el-tooltip effect="dark" content="修改文章" placement="bottom-start">
          <el-button type="primary" icon="el-icon-edit" circle @click="editArticleFunc"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="删除文章" placement="bottom-start">
          <el-button type="primary" icon="el-icon-delete" circle @click="deleteArticleFunc"></el-button>
        </el-tooltip>
      </div>
    </div>
    <!--评论-->
    <div class="comment-div">
      <comment :commentList="commentList" v-on:submitComment="addCommentFunc" v-on:deleteCommment="deleteCommmentFunc"></comment>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import '../css/atom-one-light.css'
import comment from '@/components/layout/comment'

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})
export default {
  name: 'articleDetail',
  components: {
    comment
  },
  data () {
    return {
      articleId: '',
      articleInfo: '',
      authorName: '',
      url: {
        getArticleDetail: this.$wang.api.getArticleDetail,
        deleteArticle: this.$wang.api.deleteArticle,
        getCommentlistUrl: this.$wang.api.getCommentlistUrl,
        addCommentUrl: this.$wang.api.addCommentUrl,
        deleteCommentUrl: this.$wang.api.deleteCommentUrl
      },
      canArticle: false,
      commentList: []
    }
  },
  methods: {
    getArticleInfo () {
      // 通过路由参数获得文章Id值
      this.$wang.ajax({
        url: this.url.getArticleDetail,
        param: {
          articleId: this.articleId
        }
      }).then(res => {
        if (res.code === 0) {
          this.articleInfo = res.data
          this.authorName = res.data.author.account
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    },
    deleteArticleFunc () {
      this.$wang.ajax({
        url: this.url.deleteArticle,
        param: {
          articleId: this.articleId
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.$router.push('/articleList')
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    },
    editArticleFunc () {
      this.$router.push({ path: '/articleModify', query: { articleId: this.articleId } })
    },
    compiledMarkdown: function () {
      return marked(this.articleInfo.content || '', { sanitize: true })
    },
    // 判断是否有修该、删除的文章的权限
    canAddArticleFunc () {
      this.canArticle = this.$store.state.isLoginState && JSON.parse(localStorage.getItem('userInfo')).admin
    },
    // 获取文章评论列表
    getCommentFunc () {
      this.$wang.ajax({
        url: this.url.getCommentlistUrl,
        param: {
          type: '2',
          articleId: this.articleId
        }
      }).then(res => {
        this.commentList = res.data
      })
    },
    // 添加评论
    addCommentFunc (data) {
      let param = {
        content: data,
        author: this.$store.state.userInfo._id,
        articleId: this.articleId,
        type: '2'
      }
      this.$wang.ajax({
        url: this.url.addCommentUrl,
        param
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '添加评论成功！',
            type: 'success'
          })
          this.getCommentFunc()
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    },
    // 删除评论
    deleteCommmentFunc (id) {
      this.$wang.ajax({
        url: this.url.deleteCommentUrl,
        param: {
          _id: id
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '删除评论成功！',
            type: 'success'
          })
          this.getCommentFunc()
        } else {
          this.$message({
            message: '服务器出错',
            type: 'error'
          })
        }
      })
    }
  },
  created () {
    this.articleId = this.$route.query.articleId
    this.getArticleInfo()
    this.canAddArticleFunc()
    this.getCommentFunc()
  }
}
</script>

<style scoped lang="sass">
.article
  max-width: 800px
  margin: 30px auto
  .article-content
    padding: 40px 20px
    background-color: #fff
    box-shadow: 0px 0px 5px #ccc
    .article-title
      font-size: 30px
      text-align: center
    .article-author
      margin-top: 30px
      font-size: 14px
      text-align: center
    .article-con
      margin-top: 30px
    .btn
      position: absolute
      right: 20px
      top: 20px
  .comment-div
    padding: 0 .1rem
    box-sizing: border-box
</style>
