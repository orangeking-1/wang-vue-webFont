<template>
  <div class="comment">
    <div class="comment-title">
      <div class="line"></div>
      <div class="title">{{title}} <span style="color: #666;">({{commentList.length}}条)</span></div>
      <div class="line"></div>
    </div>
    <div>
      <template v-if="commentList.length > 0">
        <div class="comment-content" v-for="(commentItem, index) in commentList" :key="index">
          <div class="con-item">
            <div class="con-avatar">
              <template v-if="commentItem.author.avatar">
                <img :src="commentItem.author.avatar" width="100%" height="100%" alt="头像">
              </template>
              <template v-else>
                <i class="iconfont icon-huabanfuben"></i>
              </template>
            </div>
            <div class="con-message">
              <div class="author">
                <span class="name">{{commentItem.author.account}}</span><span class="time">{{commentItem.created_time}}</span>
              </div>
              <div class="message">
                {{commentItem.content}}
              </div>
              <!--<el-button type="text"  class="el-icon-message">回复</el-button>-->
              <el-button type="text"  class="el-icon-delete" v-if="canComment" @click="deleteCommentFunc(commentItem._id)">删除</el-button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-comment">
          暂无评论，前去沙发
        </div>
      </template>
    </div>
    <div class="comment-form">
      <div class="form-title">
        发表评论：
      </div>
      <div class="form-con">
        <el-input :autosize="{ minRows: 4 }" type="textarea" v-model="comment" placeholder="请填写评论"></el-input>
      </div>
      <div class="submit">
        <el-button type="primary" round  size="small" @click="submitCommentFunc">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    title: {
      type: String,
      require: true,
      default: '评论'
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      comment: '',
      canComment: false
    }
  },
  methods: {
    submitCommentFunc () {
      // 判断是否登录过了
      if (!this.$store.state.isLoginState) {
        this.$alert('请您移步前去登录，然后发表评论啦😊', {
          confirmButtonText: '确定',
          callback: () => {
            this.$router.push('/login')
          }
        })
        return false
      }
      if (this.comment.length === 0) {
        this.$message({
          type: 'warning',
          message: '请填写评论后再提交'
        })
        return false
      }
      this.$emit('submitComment', this.comment)
      this.comment = ''
    },
    deleteCommentFunc (id) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteCommment', id)
      }).catch(() => {})
    }
  },
  created () {
    this.canComment = this.$store.state.isLoginState && JSON.parse(localStorage.getItem('userInfo')).admin
  }
}
</script>

<style scoped lang="sass">
.comment
  margin-top: 30px
  .comment-title
    font-size: 20px
    font-weight: bold
    text-align: center
    margin-bottom: 20px;
    display: flex
    align-items: center
    .title
      padding: 0px 15px
    .line
      height: 2px
      background-color: #666
      flex: 1
  .no-comment
    text-align: center
    font-size: 20px
    color: #999
  .comment-content
    /*margin-top: 20px*/
    padding: 20px 0px
    border-bottom: 1px dashed #999
    .con-item
      display: flex
      .con-avatar
        width: 50px
        height: 50px
        border-radius: 25px
        border: 1px solid #ccc
        overflow: hidden
        display: flex
        align-items: center
        justify-content: center
        i
          font-size: 30px
          color: #409EFF
      .con-message
        flex: 1
        padding-left: 20px
        .author
          padding: 5px 0px
          font-size: 14px
          .time
            color: #666
            padding-left: 20px
          .name
            font-weight: bold
        .message
          padding: 5px 0px
          word-break: break-word
        .reply
          color: #409EFF
          cursor: pointer
          padding: 0px
  .comment-form
    padding: 30px 0px
    .form-con
      margin-top: 20px
    .submit
      margin-top: 10px
</style>
