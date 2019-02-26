<template>
  <div class="article" v-loading="loading">
    <div class="title-tip">全部文章</div>
    <div class="article-con">
      <div class="article-list">
        <template v-if="articleListData.length > 0">
          <div class="article-item" v-for="(item, index) in articleListData" :key="index">
            <div class="article-title">
              {{item.title}}
            </div>
            <div class="article-content">
              {{item.content}}
            </div>
            <div class="article-author">
              <div class="first-div">
                <span>著：{{item.author.account}}</span>
                <span style="padding-left: 20px;">{{item.update_time}}</span>
                <!--<span style="padding-left: 20px;">2条评论</span>-->
              </div>
              <a @click="toArticleDetailFunc(item._id)" class="see-detail">查看全文</a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="no-article">
            暂无数据
          </div>
        </template>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>

      <!--<div class="article-args">-->
        <!--<div class="args-title">标签</div>-->
        <!--<div class="args-item">121</div>-->
        <!--<div class="args-item">121222222222</div>-->
      <!--</div>-->
    </div>
    <!--添加文章-->
    <el-tooltip effect="dark" content="添加文章" placement="bottom-start">
      <el-button v-if="canArticle" class="add-article" type="primary" icon="el-icon-plus" circle @click="addArticleFunc"></el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'articleList',
  data () {
    return {
      loading: true,
      articleListData: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      url: {
        getArticleList: this.$wang.api.getArticleList
      },
      canArticle: false
    }
  },
  methods: {
    addArticleFunc () {
      this.$router.push('/addArticle')
    },
    toArticleDetailFunc (articleId) {
      this.$router.push({ path: '/articleDetail', query: { articleId: articleId } })
    },
    getArticleListFunc () {
      this.$wang.ajax({
        url: this.url.getArticleList,
        param: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }).then(res => {
        if (res.code === 0) {
          this.total = res.data.total
          this.articleListData = res.data.listData
          this.loading = false
        }
      })
    },
    handleSizeChange () {
      console.log('a')
    },
    handleCurrentChange () {
      this.getArticleListFunc()
    },
    // 判断是否有添加的文章的权限
    canAddArticleFunc () {
      this.canArticle = this.$store.state.isLoginState && JSON.parse(sessionStorage.getItem('userInfo')).admin
    }
  },
  created () {
    this.getArticleListFunc()
    this.canAddArticleFunc()
  }
}
</script>

<style scoped lang="sass">
.el-pagination
  text-align: center
.article
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  position: relative
  .title-tip
    padding: 20px
    font-size: 30px
    font-weight: bold
    text-align: center
  .article-con
    max-width: 800px
    width: 100%
    margin: 0 auto
    flex: 1
    padding-top: 20px
    position: relative
    .article-list
      .article-item
        background: #fff
        padding: 20px
        margin-bottom: 20px
        border-radius: 5px
        border: 1px solid #ccc
        &:hover
          box-shadow: 0px 0px 8px #999
          /*background: #c6c6c6!important*/
        .article-title
          font-size: 24px
          font-weight: bold
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .article-content
          margin-top: 10px
          color: #808080
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .article-author
          margin-top: 15px
          font-size: 14px
          display: flex
          .first-div
            flex: 1
          .see-detail
            cursor: pointer
      .no-article
        font-size: 24px
        font-weight: bold
        text-align: center
        height: 200px
        line-height: 200px
        color: #666
    .article-args
      width: 150px
      position: absolute
      right: -170px
      top: 20px
      .args-title
        font-size: 18px
        font-weight: bold
  .add-article
    position: absolute
    right: 20px
    top: 20px
</style>
