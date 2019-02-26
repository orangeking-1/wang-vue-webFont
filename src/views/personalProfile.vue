<template>
  <div class="profile">
    <div class="title">关于我</div>
    <div class="profile-desc">
      <img :src="avatarUrl" alt="">
      <div class="profile-name">王广航</div>
      <div class="profile-describe">
        <p>爱学习，爱编程，能快速学习使用新知识；</p>
        <p>良好的分析解决问题能力，和自我管理能力；做事稳重，认真；</p>
        <p>具备独立分析和解决问题的能力；有强烈的责任心；具有良好的沟通表达、团队协作能力</p>
      </div>
      <div class="profile-skill">
        <div class="skill-title">我的技能树</div>
        <div class="skill-con">
          <div class="skill-cell">
            <div class="skill-tip">h5/c3</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="90" color="#87CEFA"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">javaScript</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70" color="#00FA9A"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">jQuery/zepto</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="65" color="#32CD32"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">gulp/webpack</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="50" color="#8B4513"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">微信小程序</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70" color="#A52A2A"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">less/sass</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="30" color="#a5c7d8"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">angularJs</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="75" color="#A59A22"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">vue/react</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="60" color="#483D8B"></el-progress>
            </div>
          </div>
          <div class="skill-cell">
            <div class="skill-tip">node/express</div>
            <div class="skill-proficiency">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="60" color="#708090"></el-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="work-experience">
        <div class="work-title">工作经历</div>
        <div class="work-con">
          <el-collapse accordion>
            <el-collapse-item title="2016年6月-2017年7月 亿博科技有限公司（驻南方航空）" name="1">
              <div>亿博科技为一家外包公司，由南方航空移动触屏部直接面试，并入场开发。</div>
              <div>主要负责南航移动效能分析系统，并参与南航移动官网会员抽奖模块，韩国登机牌领取模块的前端开发。</div>
            </el-collapse-item>
            <el-collapse-item title="2017年8月-2018年8月 猎程科技（深圳特色国际旅行社分公司）" name="2">
              <div>公司产品前期主要面向导游/游客，对应开发有相应的微信公众号（猎行领队、猎行旅游）</div>
              <div>由于后期产品方向调整，产品定位为平台和商家，主推类型于商城的一个平台。开发有商家、平台管理后台。以及小程序（金米圈）</div>
            </el-collapse-item>
            <el-collapse-item title="2018年10月-2019年1月 瀚阳国际" name="3">
              <div>一家结合软件、土木相结合，主要做桥梁、铁路建筑的公司。</div>
              <div>负责预制场平台管理系统，该系统服务于郑州四环线桥梁建设。提供给河南省一建、五建等各大梁场使用。</div>
              <div>桥梁全生命周期检测管理系统，该系统主要用于桥梁的检测，智能管理。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="call-me">
        <div class="callMe-title">与我联系</div>
        <div class="callMe-con">
          <el-tooltip class="item" effect="dark" content="xiaozai314230" placement="top">
            <div class="icon" style="background: #6F92FF">
              <i class="iconfont icon-weixin1" style="color: #fff;font-size: 50px"></i>
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="1617610812" placement="top">
            <div class="icon" style="background: #2BC0B5;cursor: pointer;" @click="openQQFunc">
              <i class="iconfont icon-qq" style="color: #fff;font-size: 50px"></i>
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="guanghangwang@163.com" placement="top">
            <div class="icon" style="background: #7243D4">
              <i class="iconfont icon-youxiang" style="color: #fff;font-size: 50px"></i>
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="orangkingliness" placement="top">
            <div class="icon" style="background: #7782D1">
              <a href="https://github.com/orangekingliness" target="view_window">
                <i class="iconfont icon-github" style="color: #fff;font-size: 50px"></i>
              </a>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config/config'

export default {
  name: 'personalProfile',
  data () {
    return {
      avatarUrl: config.PATH + '/assets/avatar.png'
    }
  },
  methods: {
    openQQFunc () {
      window.location.href = 'tencent://message/?uin=1617610812&Site=orangekingliness&Menu=yes'
    }
  },
  created () {
  }
}
</script>

<style scoped lang="sass">
.profile
  max-width: 1000px
  margin: 0 auto
  background: #fff
  box-shadow: 0px 0px 5px #ccc
  padding-bottom: 50px
  .title
    padding: 20px
    font-weight: bold
    text-align: center
    font-size: 30px
  .profile-desc
    margin-top: 30px
    text-align: center
    img
      width: 100px
      height: 100px
      border-radius: 50px 50px
    .profile-name
      margin-top: 10px
    .profile-describe
      margin-top: 10px
      font-size: 14px
      color: #666
      p
        margin: 5px 0px
  .profile-skill
    margin-top: 20px
    .skill-title
      background-color: #f6f6f6
      padding: 8px
      font-weight: bold
      font-size: 20px
    .skill-con
      padding: 30px
      width: 600px
      margin: 0 auto
      .skill-cell
        display: flex
        margin-bottom: 20px
      .skill-tip
        width: 130px
        padding-right: 30px
        text-align: right
      .skill-proficiency
        flex: 1
  .work-experience
    margin-top: 20px
    .work-title
      background-color: #f6f6f6
      padding: 8px
      font-weight: bold
      font-size: 20px
  .call-me
    .callMe-title
      background-color: #f6f6f6
      padding: 8px
      font-weight: bold
      font-size: 20px
    .callMe-con
      padding: 30px
      .icon
        display: inline-block
        width: 80px
        height: 80px
        line-height: 80px
        border-radius: 45px
        margin: 0 20px
</style>
