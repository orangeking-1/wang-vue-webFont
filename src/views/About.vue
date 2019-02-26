<template>
  <div class="about">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        :formatter="formatter">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '虎',
        address: '上海市普陀区金沙江路 1518 弄',
        gender: 1
      }, {
        date: '2016-05-04',
        name: '豹子',
        address: '上海市普陀区金沙江路 1517 弄',
        gender: 2
      }, {
        date: '2016-05-01',
        name: '猴子',
        address: '上海市普陀区金沙江路 1519 弄',
        gender: 1
      }, {
        date: '2016-05-03',
        name: '大象',
        address: '上海市普陀区金沙江路 1516 弄',
        gender: 1
      }]
    }
  },
  methods: {
    formatter (row, column, cellValue, index) {
      if (row.gender === 1) {
        return '男'
      } else {
        return '女'
      }
    }
  }
}
</script>
