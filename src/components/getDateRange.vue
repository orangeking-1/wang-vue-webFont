<!--
  - dateRange
  - @copyright: ©2018 Guangdong Sun Railway Information Technology,Inc. All rights reserved.
  - @author: Wang GuangHang <wangguanghang@sunengineering.cn>
  -->

<template>
  <div class="w-time-picker">
    <div class="w-week">
      <i class="w-week-arrow el-icon-arrow-down"></i>
      <el-date-picker
        class="w-week-class"
        v-model="value"
        :type="type"
        @change="weekChange">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dateRange',
  props: {
    type: {
      default: 'week',
      type: String
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    weekChange (val) {
      let getDate = []
      if (this.type === 'week') {
        let end = new Date(val.getTime() + 3600 * 1000 * 24 * 5)
        let endTime = this.dateFtt('yyyy-MM-dd', end)
        let start = new Date(val.getTime() - 3600 * 1000 * 24 * 1)
        let startTime = this.dateFtt('yyyy-MM-dd', start)
        getDate = [startTime, endTime]
      } else if (this.type === 'month') {
        let end = new Date(val.getTime())
        let endTime = this.dateFtt('yyyy-MM', end)
        let start = new Date(val.getTime() - 3600 * 1000 * 24 * 30 * 11)
        let startTime = this.dateFtt('yyyy-MM', start)
        getDate = [startTime, endTime]
      } else {
        getDate = val
      }
      this.$emit('getDateFunc', getDate)
    },
    dateFtt (fmt, date) {
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return fmt
    }
  }
}
</script>
<style lang="sass">
  .w-time-picker
    .w-week
      height: 20px
      width: 20px!important
      overflow: hidden
      position: relative
      .w-week-class
        opacity: 0
        .el-input__inner
          width: 30px
          height: 20px
          padding: 0px
          cursor: pointer
          transform: translate(-25%, -25%)
        .el-input__icon
          display: none
      .w-week-arrow
        position: absolute
        font-size: 14px
        left: 3px
        top: 3px
</style>
