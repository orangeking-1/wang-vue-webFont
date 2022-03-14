<template>
  <div class="message">
    <div class="message-img">
      <img src="../assets/messageBoard.png" alt="message-img">
      <div class="message-font">留言板</div>
    </div>
    <div class="message-con">
      <comment title="留言" :commentList="commentList" v-on:submitComment="addCommentFunc" v-on:deleteCommment="deleteCommmentFunc"></comment>
    </div>
  </div>
</template>

<script>
import comment from '@/components/layout/comment'
export default {
  name: 'messageBoard',
  components: {
    comment
  },
  data () {
    return {
      commentList: [],
      url: {
        addCommentUrl: this.$wang.api.addCommentUrl,
        getCommentlistUrl: this.$wang.api.getCommentlistUrl,
        deleteCommentUrl: this.$wang.api.deleteCommentUrl
      }
    }
  },
  methods: {
    // 获取留言列表
    getCommentFunc () {
      this.$wang.ajax({
        url: this.url.getCommentlistUrl,
        param: {
          type: '1'
        }
      }).then(res => {
        this.commentList = res.data
      })
    },
    // 添加留言列表
    addCommentFunc (data) {
      let param = {
        content: data,
        author: this.$store.state.userInfo._id,
        type: '1'
      }
      this.$wang.ajax({
        url: this.url.addCommentUrl,
        param
      }).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '留言成功！',
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
    this.getCommentFunc()
    let oneLever = {
      type: '1',
      content: '手动上报错误信息'
    }
    console.log(this.$wang.Sentry)
    // throw new Error(JSON.stringify(oneLever))
    this.$wang.Sentry.captureMessage('付费功能', JSON.stringify(oneLever))
  }
}
</script>

<style scoped lang="sass">
.message
  max-width: 800px
  margin: 0 auto
  .message-img
    position: relative
    img
      width: 100%
      border-radius: 30px
      box-shadow: 0px 0px 10px #aaa
    .message-font
      font-size: 40px
      font-weight: bold
      text-shadow: 3px 3px 6px
      opacity: 0.7
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
  .message-con
    padding: .1rem
    box-sizing: border-box
</style>
