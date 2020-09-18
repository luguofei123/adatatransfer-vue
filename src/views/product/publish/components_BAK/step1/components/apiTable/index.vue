<template>
<div>
<el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        highlight-current-row
        style="width: 100%"
        @current-change="handleSelectionChange">
        <el-table-column
          label="操作"
          width="155">
          <template slot-scope="scope">
            <!-- <el-checkbox v-model="scope.row.checked"></el-checkbox> -->
            <el-radio v-model="checkedobj.id" :label="scope.row.id">
                <span>{{scope.row.id}}</span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!--结果分页-->
      <div class="pagination-box">
        <page-bar :pageConfig="pageConfig" @handleSizeChange = 'handleSizeChange' @handleCurrentChange="handleCurrentChange"></page-bar>
      </div>
</div>
</template>
<script>
import pageBar from './components/paginationBar'
export default {
  components: {
    pageBar
  },
  props: {
    obj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      pageConfig: {
        pageSizes: [10, 20, 30, 40],
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData3: [],
      checkedobj: JSON.parse(JSON.stringify(this.obj))
      // checkedobj: this.obj
      // 如果使用单选框,定义一个model值
      // currentSelectItem: {}
      // 当前选中的值
    }
  },
  created () {
    this.setTable()
  },
  methods: {
    // 分页导航
    handleCurrentChange (page) {
      this.pageConfig.currentPage = page
      // this.getData()
    },
    handleSizeChange (size) {
      this.pageConfig.pageSize = size
      // this.getData()
    },
    setTable () {
      let resdata = [{
        id: '44',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1 弄'
      }, {
        id: '89',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 2 弄'
      }, {
        id: '23',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 3 弄'
      }, {
        id: '88',
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 4 弄'
      }]
      // 后台数据返回后,手动添加一个checked属性控制选中与否 如果是使用el-rodio单选框,不需要这一步
      //   resdata.forEach(item => {
      //     item.checked = false
      //   })
      this.tableData3 = resdata
    },
    handleSelectionChange (row) {
      // el-radio单选框,不需要这一步
      this.tableData3.forEach(item => {
        // 排他,每次选择时把其他选项都清除
        if (item.id !== row.id) {
          // item.checked = false
        }
      })
      this.$emit('updatecheckedObj', row)
      console.log(row)
      // 如果使用单选框,这里可以把当前选中的这一项先保存起来
      // this.currentSelectItem = row
    }
  }
}
</script>
