<template>
    <div class="step5">
        <el-form ref="step5Form" :model="step5Form" label-width="0px">
          <p>1 迁移{{step5Form.year}}年度数据。</p>
          <!-- <p>2 迁移单位和账套规则和范围如下：</p>
          <dl style="font-size:14px;" v-for="(item,index) in step5Form.unitArr" :key="index">
            <dt>{{item.unitName}}</dt>
            <dd style="padding-left:40px;margin-bottom:5px;margin-top:5px;" v-for="(item1,index1) in item.account" :key="index1">{{item1}}</dd>
          </dl> -->
        <p style="margin-top:20px;">2 迁移单位和账套规则和范围如下：</p>
            <el-table :data="step5Form.tableData0"  border height="300" ref="table" size="mini" class="stepTable5"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
            :row-class-name="tableRowClassName"
            >
            <el-table-column prop="unitName" label="单位名称" >
            </el-table-column>
            <el-table-column prop="account" label="账套" >
              <template slot-scope="scope">
                <div>
                  <span style="margin-right:10px;" v-for="(item,index) in scope.row.account" :key="index">{{item}}</span>
                </div>
              </template>
            </el-table-column>
            </el-table>
          <p style="margin-top:20px;">3 辅助核算项迁移规则</p>
          <p>系统级统一管理辅助核算项：</p>
            <el-table :data="step5Form.tableData1"
              border height="300" ref="table" size="mini" class="stepTable5"
              :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
              :row-class-name="tableRowClassName"
              >
                <el-table-column prop="source1" label="源辅助核算项代码/源辅助核算项名称" >
                </el-table-column>
                <el-table-column prop="source2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                </el-table-column>
            </el-table>
        <p style="margin-top:20px;">系统级非统一管理辅助核算项：</p>
            <el-table :data="step5Form.tableData2"  border height="300" ref="table" size="mini" class="stepTable5"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
            :row-class-name="tableRowClassName"
            >
                <el-table-column prop="source1" label="源辅助核算项代码/源辅助核算项名称" >
                </el-table-column>
                <el-table-column prop="source2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                </el-table-column>
            </el-table>
        <p style="margin-top:20px;">单位级辅助核算项：</p>
            <el-table :data="step5Form.tableData3"  border height="300" ref="table" size="mini" class="stepTable5"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
            :row-class-name="tableRowClassName"
            >
                <el-table-column prop="unitName" label="单位" >
                </el-table-column>
                <el-table-column prop="source1" label="源辅助核算项代码/源辅助核算项名称" >
                </el-table-column>
                <el-table-column prop="source2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                </el-table-column>
            </el-table>
        <p style="margin-top:20px;">4 迁移模块：账务处理、出纳管理</p>
        </el-form>
    </div>
</template>
<script>
export default {
  components: {
    // myInput, mySelect
  },
  watch: {
    // priceTable (v) {
    //   console.log(v)
    //   console.log('数据变化了吗？')
    //   this.form.tableData = JSON.parse(JSON.stringify(v))
    //   console.log('数据变化了')
    // }
  },
  data () {
    return {
      step5Form: {
        year: '2030',
        unitArr: [
          { unitName: '单位1', account: ['账号1', '账号2', '账号3'] },
          { unitName: '单位2', account: ['账号3', '账号4', '账号5'] }
        ],
        tableData0: [
          { unitName: '单位1', account: ['账号1', '账号2', '账号3'] },
          { unitName: '单位2', account: ['账号3', '账号4', '账号5'] }
        ],
        tableData1: [
          { source1: '2222 dde', source2: '2222 dde' }
        ],
        tableData2: [
          { source1: '2222 dde', source2: '2222 dde' }
        ],
        tableData3: [
          { unitName: 'bcdc', source1: '2222 dde', source2: '2222 dde' }
        ]
      }
    }
  },
  methods: {
    formChecked () {
      // console.log(this.$refs['step1Form'])
      let isOk = true
      // this.$refs['step5Form'].validate((valid) => {
      //   if (valid) {
      //     isOk = true
      //     // this.$emit('updata', this.step2Form)
      //   } else {
      //     isOk = false
      //   }
      // })
      return isOk
    },
    tableRowClassName ({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.step5{
  padding:10px 0px 10px 0px;
  width:100%;
  margin: 0 auto;
  background :#fff;
}
.step5 p{
  font-size: 14px;
  margin-bottom: 20px;
}
.active{
  color:green;
}
.error{
  color:red;
}
</style>
<style lang="scss">
.stepTable5 .cell {
  overflow: visible;
}
.el-table__body-wrapper{
 overflow: visible;
}
.el-table .success-row {
    background: #F3F3F3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #ecf6fd !important;
}
.step5 .el-table--mini th, .step5 .el-table--mini td{
  padding: 2px 0 2px 0;
  font-size: 14px;
}
</style>
