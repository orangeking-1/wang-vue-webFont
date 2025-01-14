<template>
  <div class="home">
    <el-carousel ref="carousel" class="carousel" height="100%" :autoplay="false" indicator-position="none" arrow="never">
      <el-carousel-item>
        <div class="con">
          <p>Orangeking</p>
          <p>不忘初心，才能始终</p>
          <div class="beian"><a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备19008041号-1</a></div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="con">
        <canvas id="timeCanvas"></canvas>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!--自定义指示器-->
    <div class="indicator">
      <div class="icon animated lightSpeedIn" style="background: #fff" @click="setActiveItem(0)">
        <i class="iconfont icon-home" style="color: #7782D1;font-size: 21px"></i>
      </div>
      <div class="icon animated lightSpeedIn" style="background: #fff" @click="setActiveItem(1)">
        <i class="iconfont icon-time1" style="color: #7782D1;font-size: 32px"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    setActiveItem (item) {
      this.$refs.carousel.setActiveItem(item)
    }
  },
  created () {
  },
  mounted () {
    let canvas = document.getElementById('timeCanvas')
    let ctx = canvas.getContext('2d')

    // 设置画布大小
    let canvasSize = document.body.clientWidth > document.body.clientHeight ? document.body.clientHeight : document.body.clientWidth
    canvas.width = canvasSize
    canvas.height = canvasSize

    // 绘制圆形
    let timeShowObj = {
      countPosition: (textArr, newTime, initAngle, cellAngle, initXPosition, startZero = true) => {
        ctx.save()
        // 平移坐标原点
        ctx.translate(canvasSize / 2, canvasSize / 2)
        ctx.rotate(initAngle)
        textArr.map((text, index) => {
          // 计算文本算在位置
          let textMaxWidth = 50
          ctx.font = '10px Arial'
          // 如果当前时间显示高亮
          // 判断当前是否从0开始
          let times = ''
          times = startZero ? newTime : newTime - 1
          if (index === times) {
            ctx.strokeStyle = 'rgba(0, 0, 0, .8)'
          } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
          }
          ctx.rotate(-cellAngle)
          ctx.strokeText(text, canvasSize / 2 - initXPosition, 0, textMaxWidth)
        })
        ctx.restore()
      },
      init: () => {
        let timeDate = ''
        let cellAngle = ''
        function intervalFunc () {
          ctx.clearRect(0, 0, canvasSize, canvasSize)
          // 绘制秒
          timeDate = timeShowObj.currentSecond()
          cellAngle = timeShowObj.countAngle(timeShowObj.secondTextArr)
          timeShowObj.countPosition(timeShowObj.secondTextArr, timeDate, (timeDate + 1) * cellAngle, cellAngle, 50)
          // 绘制分钟
          timeDate = timeShowObj.currentMinutes()
          cellAngle = timeShowObj.countAngle(timeShowObj.minutesTextArr)
          timeShowObj.countPosition(timeShowObj.minutesTextArr, timeDate, (timeDate + 1) * cellAngle, cellAngle, 95)
          // 绘制时
          timeDate = timeShowObj.currentHour()
          cellAngle = timeShowObj.countAngle(timeShowObj.hoursTextArr)
          timeShowObj.countPosition(timeShowObj.hoursTextArr, timeDate, (timeDate + 1) * cellAngle, cellAngle, 130)
          // 绘制上下午
          timeDate = timeShowObj.currentAPM()
          cellAngle = timeShowObj.countAngle(timeShowObj.apmTextArr)
          timeShowObj.countPosition(timeShowObj.apmTextArr, timeDate, (timeDate + 1) * cellAngle, cellAngle, 155)
          // 绘制星期
          timeDate = timeShowObj.currentWeek()
          cellAngle = timeShowObj.countAngle(timeShowObj.weekTextArr)
          timeShowObj.countPosition(timeShowObj.weekTextArr, timeDate, (timeDate + 1) * cellAngle, cellAngle, 190)
          // 绘制日
          timeDate = timeShowObj.currentDay()
          // 判断当月有几天，改变dayTextArr的长度
          let haveDayNum = new Date(timeShowObj.currentYear(), timeShowObj.currentMonth(), 0).getDate()
          let dayText = timeShowObj.dayTextArr.slice(0, haveDayNum)
          cellAngle = timeShowObj.countAngle(dayText)
          timeShowObj.countPosition(dayText, timeDate, timeDate * cellAngle, cellAngle, 233, false)
          // 绘制月
          timeDate = timeShowObj.currentMonth()
          cellAngle = timeShowObj.countAngle(timeShowObj.monthTextArr)
          timeShowObj.countPosition(timeShowObj.monthTextArr, timeDate, timeDate * cellAngle, cellAngle, 265, false)
        }
        // 为了精确到毫秒
        let timeStamp = String(new Date().getTime())
        let timeStampNum = Number(timeStamp.substring(timeStamp.length - 3))
        let timer = setTimeout(function () {
          clearTimeout(timer)
          intervalFunc()
          setInterval(intervalFunc, 1000)
        }, 1000 - timeStampNum)
      },
      // 计算夹角大小
      countAngle: (textArr) => {
        let textArrLength = textArr.length
        let cellAngle = 2 * Math.PI / textArrLength
        return cellAngle
      },

      currentSecond: () => {
        let time = new Date()
        return time.getSeconds()
      },
      currentMinutes: function () {
        let time = new Date()
        return time.getMinutes()
      },
      currentHour: () => {
        let time = new Date()
        return time.getHours() >= 12 ? time.getHours() - 12 : time.getHours()
      },
      currentAPM: () => {
        let time = new Date()
        let hour = time.getHours()
        return hour <= 12 ? 0 : 1
      },
      currentWeek: () => {
        let time = new Date()
        let week = time.getDay()
        if (week === 0) {
          return 0
        } else if (week === 1) {
          return 1
        } else if (week === 2) {
          return 2
        } else if (week === 3) {
          return 3
        } else if (week === 4) {
          return 4
        } else if (week === 5) {
          return 5
        } else if (week === 6) {
          return 6
        }
      },
      currentDay: () => {
        let time = new Date()
        return time.getDate()
      },
      currentMonth: () => {
        let time = new Date()
        return time.getMonth() + 1
      },
      currentYear: () => {
        let time = new Date()
        return time.getFullYear()
      },
      secondTextArr: ['零秒', '一秒', '两秒', '三秒', '四秒', '五秒', '六秒', '七秒', '八秒', '九秒',
        '十秒', '十一秒', '十二秒', '十三秒', '十四秒', '十五秒', '十六秒', '十七秒', '十八秒', '十九秒',
        '二十秒', '二十一秒', '二十二秒', '二十三秒', '二十四秒', '二十五秒', '二十六秒', '二十七秒', '二十八秒', '二十九秒',
        '三十秒', '三十一秒', '三十二秒', '三十三秒', '三十四秒', '三十五秒', '三十六秒', '三十七秒', '三十八秒', '三十九秒',
        '四十秒', '四十一秒', '四十二秒', '四十三秒', '四十四秒', '四十五秒', '四十六秒', '四十七秒', '四十八秒', '四十九秒',
        '五十秒', '五十一秒', '五十二秒', '五十三秒', '五十四秒', '五十五秒', '五十六秒', '五十七秒', '五十八秒', '五十九秒'
      ],
      minutesTextArr: ['零分', '一分', '两分', '三分', '四分', '五分', '六分', '七分', '八分', '九分',
        '十分', '十一分', '十二分', '十三分', '十四分', '十五分', '十六分', '十七分', '十八分', '十九分',
        '二十分', '二十一分', '二十二分', '二十三分', '二十四分', '二十五分', '二十六分', '二十七分', '二十八分', '二十九分',
        '三十分', '三十一分', '三十二分', '三十三分', '三十四分', '三十五分', '三十六分', '三十七分', '三十八分', '三十九分',
        '四十分', '四十一分', '四十二分', '四十三分', '四十四分', '四十五分', '四十六分', '四十七分', '四十八分', '四十九分',
        '五十分', '五十一分', '五十二分', '五十三分', '五十四分', '五十五分', '五十六分', '五十七分', '五十八分', '五十九分'
      ],
      hoursTextArr: ['十二点', '一点', '两点', '三点', '四点', '五点', '六点', '七点', '八点', '九点',
        '十点', '十一点'],
      apmTextArr: ['上午', '下午'],
      weekTextArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayTextArr: ['一号', '二号', '三号', '四号', '五号', '六号', '七号', '八号', '九号', '十号',
        '十一号', '十二号', '十三号', '十四号', '十五号', '十六号', '十七号', '十八号', '十九号', '二十号',
        '二十一号', '二十二号', '二十三号', '二十四号', '二十五号', '二十六号', '二十七号', '二十八号', '二十九号', '三十号',
        '三十一号'],
      monthTextArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
    timeShowObj.init()
  }
}
</script>

<style  scoped lang="sass">
.home
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  position: relative
  .carousel
    width: 100%
    height: 100%
    text-align: center
  .con
    width: 100%
    height: 100%
    font-size: 30px
    color: orange
    opacity: 0.9
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    background-image: url("../assets/bg.png")
    background-size: cover
    p
      text-shadow: 2px 2px 1px rgba(0,0,0,.6)
      margin: 20px 0
    .beian
      a
        color: #363741
        font-size: 12px
        // opacity: 0.5
        position: absolute
        bottom: 0
        translate: -50%
        cursor: auto
  .indicator
    position: absolute
    bottom: 20px
    z-index: 2000
    display: flex
    align-items: center
    justify-content: center
    .icon
      display: inline-block
      width: 30px
      height: 30px
      border-radius: 20px
      margin: 0 10px
      box-shadow: 0 0 10px 5px rgba(0,0,0,.1)
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
@media screen and (max-width: 700px)
  .beian
    display: none
</style>
<style lang="sass">
.home
  .el-carousel__item
    display: flex
    align-items: center
    justify-content: center
</style>
