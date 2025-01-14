<template>
  <div class="article" v-loading="loading">
    <div class="title-tip">{{showSearchInput ? `“${search}”相关` : '全部文章'}}</div>
    <div class="article-con">
      <div class="article-list">
        <template v-if="articleListData.length > 0">
          <div class="article-item animated bounceInRight delay-.2s" v-for="(item, index) in articleListData" :key="index">
            <div class="article-title">
              <span class="title-span" @click="toArticleDetailFunc(item._id)">{{item.title}}</span>
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
        class="pagination"
        :total="total">
      </el-pagination>

<!--      <div class="article-args">-->
<!--        <div class="args-title">标签</div>-->
<!--        <div class="args-item">121</div>-->
<!--        <div class="args-item">121222222222</div>-->
<!--      </div>-->
    </div>
    <div class="article-function">
      <!-- 搜索 -->
      <div class="search-article">
        <el-button v-if="!showSearchInput" type="primary" icon="el-icon-search" circle @click="showSearchInput = true"></el-button>
        <el-input v-if="showSearchInput" class="animated bounceIn delay-.1s" prefix-icon="el-icon-search" v-model="search" placeholder="请输入，回车搜素" clearable @clear="searchClearFunc" @change="searchFunc"></el-input>
      </div>
      <!--添加文章-->
      <el-tooltip effect="dark" content="添加文章" placement="bottom-start">
        <el-button v-if="canArticle" class="add-article" type="primary" icon="el-icon-plus" circle @click="addArticleFunc"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleList',
  data () {
    return {
      loading: false,
      showSearchInput: false,
      search: '',
      articleListData: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      url: {
        getArticleList: this.$wang.api.getArticleList,
        getCommentlistUrl: this.$wang.api.getCommentlistUrl
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
        url: this.url.getCommentlistUrl,
        param: {
          type: '1'
        }
      }).then(res => {
        this.commentList = res.data
      })
      this.$wang.ajax({
        url: this.url.getArticleList,
        param: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          search: this.search
        }
      }).then(res => {
        if (res.code === 0) {
          this.total = res.data.total
          this.articleListData = res.data.listData
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
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
      this.canArticle = this.$store.state.isLoginState && JSON.parse(localStorage.getItem('userInfo')).admin
    },
    searchFunc () {
      if (this.search === '') {
        this.showSearchInput = false
      }
      this.getArticleListFunc()
    },
    searchClearFunc () {
      this.search = ''
      this.showSearchInput = false
    }
  },
  created () {
    this.getArticleListFunc()
    this.canAddArticleFunc()
  }
}
</script>

<style scoped lang="sass">
.pagination
  text-align: center
.article
  height: 100%
  width: 100%
  padding: .1rem
  box-sizing: border-box
  display: flex
  flex-direction: column
  position: relative
  .title-tip
    padding: .2rem
    font-size: .3rem
    font-weight: bold
    text-align: center
  .article-con
    max-width: 800px
    width: 100%
    margin: 0 auto
    flex: 1
    padding-top: .2rem
    padding-bottom: .2rem
    position: relative
    .article-list
      .article-item
        transition: .5s all
        background: linear-gradient(#3e9bfd40, rgba(0, 0, 0, 0))
        padding: .2rem
        margin-bottom: .2rem
        border-radius: 5px
        box-shadow: 0 4px 8px rgba(0, 0, 0, .2)
        &:hover
          box-shadow: 0 8px 16px rgba(0, 0, 0, .4)
          /*background: #c6c6c6!important*/
        .article-title
          font-size: .24rem
          font-weight: bold
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          .title-span
            cursor: pointer
            color: #3da8f5
            &:hover
              color: #4078f2
        .article-content
          margin-top: 10px
          color: #808080
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .article-author
          margin-top: 15px
          font-size: .14rem
          display: flex
          .first-div
            flex: 1
          .see-detail
            cursor: pointer
            &:hover
              color: #4078f2
      .no-article
        font-size: .24rem
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
  .article-function
    position: absolute
    right: 20px
    top: 20px
    display: flex
    .search-article
      margin-right: 10px
</style>

<style lang="sass">
.article
  .el-pagination .btn-prev,.el-pagination .btn-next,.el-pager li
    background: #f5f5f5
</style>
