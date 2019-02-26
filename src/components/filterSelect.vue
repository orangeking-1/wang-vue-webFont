<!--
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
  - selectFilter
  - @copyright: ©2018 Guangdong Sun Railway Information Technology,Inc. All rights reserved.
  - @author: Wang GuangHang <wangguanghang@sunengineering.cn>
  -->
<template>
<div class="w-select">
  <el-popover
  v-model="showConDiv"
  placement="bottom-start"
  trigger="click">
  <div class="w-select-header"  slot="reference" @click="selectValFunc">
    <el-input
      class="w-select-input"
      :suffix-icon="showConDiv ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      placeholder="请选择内容"
      clearable
      v-model="selectValue"
      :disabled="true">
    </el-input>
  </div>
  <div class="w-select-con">
    <div class="filter-condition" v-if="filterConditionState[0].id != ''">
      <span v-for="(filterCdtItem, index) in filterConditionState" :key="index" :class="filterCdtItem['id'] == currentCondition ? 'active' : ''" @click="conditionChangeFunc(filterCdtItem)">
        <a>{{filterCdtItem['label']}}</a>
      </span>
    </div>
    <div class="filter-con">
      <div class="filter-data-item" v-for="(item, index) in filterDataState" :key="index" v-html="item.dataName" @click="pitchOnFunc(item)"></div>
    </div>
    <div class="query">
      <div class="query-input"><el-input placeholder="请输入" v-model="queryValue" prefix-icon="el-icon-search" size="small" @input="queryChangeFunc" clearable></el-input></div>
      <!-- <div class="query-btn"><el-button type="primary" size="small">确定</el-button></div> -->
    </div>
  </div>
  </el-popover>
</div>

</template>
<script>
export default {
  name: 'selectFilter',
  // filterCondition 为筛选条件, 格式为[{id:1,label:'待审核'}，{id:2,label:'全部'}]
  // filterData 筛选的数据，格式为[{dataId:1,dataName:'sdk-ase-dd'},...]
  // props: ['filterCondition', 'filterData'],
  props: {
    defaultValue: {
      type: String,
      required: false,
      default: ''
    },
    filterCondition: {
      type: Array,
      required: false,
      default: function () {
        return [{
          id: '',
          label: ''
        }]
      }
    },
    filterData: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // 选择的值
      selectValue: '',
      showConDiv: false,
      currentCondition: '',
      queryValue: '',
      filterDataState: [],
      filterConditionState: []
    }
  },
  methods: {
    selectValFunc () {
      this.showConDiv = !this.showConDiv
    },
    conditionChangeFunc (filterCdtItem) {
      this.currentCondition = filterCdtItem.id
      this.$emit('selectConditionFunc', filterCdtItem)
    },
    queryChangeFunc () {
      this.filterDataState = []
      this.filterData.map((item, index) => {
        if (item.dataName.indexOf(this.queryValue) !== -1) {
          let queryStr = item.dataName
          let queryObj = {}
          queryObj.dataId = item.dataId
          queryObj.dataName = queryStr.replace(this.queryValue, `<span style='color:red'>${this.queryValue}</span>`)
          this.filterDataState.push(queryObj)
        }
      })
    },
    pitchOnFunc (selectItem) {
      let pitchOn = {}
      this.filterData.map(filterItem => {
        if (filterItem.dataId === selectItem.dataId) {
          this.selectValue = filterItem.dataName
          pitchOn = filterItem
        }
      })
      this.$emit('pitchOnFunc', pitchOn)
      this.showConDiv = false
      this.queryValue = ''
      this.filterDataState = this.filterData
    }
  },
  watch: {
    'filterData': function (val, oldVal) {
      this.filterDataState = this.filterData
    },
    'defaultValue': function (val, oldVal) {
      this.selectValue = val
    },
    'filterCondition': function (val, oldVal) {
      this.currentCondition = this.filterCondition[0].id
    }
  },
  created () {
    this.filterConditionState = this.filterCondition
    this.currentCondition = this.filterCondition[0].id
    this.filterDataState = this.filterData
    this.selectValue = this.defaultValue
  }
}
</script>
<style lang="sass">
.el-popover
  padding: 0
.w-select
  position: relative
  z-index: 10
  .w-select-header
    position: relative
    .w-select-input
      .el-input__inner
        cursor: pointer
        background: #fff
        color: #000
      .el-input__suffix .el-input__icon
        cursor: pointer
    .w-arrow
      position: absolute
      right: -5px
      top: 50%
.w-select-con
    max-width: 1200px
    min-width: 900px
    background: #fff
    .filter-condition
      height: 50px
      width: 100%
      overflow-x: auto
      display: flex
      align-items: center
      span
        a
          cursor: pointer
          font-size: 14px
          color: #9296A2
          padding: 0px 15px
          border-right: 1px solid #ccc
          &:hover
            color: #3B86FF
        &:nth-last-child(1) a
            border: none
        &.active a
          color: #3B86FF
    .filter-con
      height: 150px
      min-width: 930px
      padding: 10px
      overflow: auto
      border-top: 1px solid #ddd
      border-bottom: 1px solid #ddd
      .filter-data-item
        width: 25%
        float: left
        padding: 0px 15px 15px 0px
        box-sizing: border-box
        font-size: 14px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        cursor: pointer
    .query
      height: 64px
      display: flex
      align-items: center
      padding: 0px 15px
      .query-input
        width: 230px
        margin-right: 20px
</style>
