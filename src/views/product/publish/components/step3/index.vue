<template>
    <div class="step3">
         <p>系统级基础资料</p>
       <el-table
       class="stepTable1"
        border
        height="300"
        size='mini'
    ref="multipleTable"
    :data="tableData"
    style="width: 100%;"
    @selection-change="handleSelectionChange"
    :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
    :row-class-name="tableRowClassName"
    >
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column prop="address1" label="基础项"></el-table-column>
    <el-table-column prop="address" label="覆盖"></el-table-column>
  </el-table>
    </div>
</template>

<script>
// import myInput from './components/myInput'
// import mySelect from './components/mySelect'
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
      multipleSelection: [],
      unitName: '',
      test: 99,
      tableData: [
        { address1: 1 }, { a: 1 }, { a: 1 }
      ],
      rules: {
        billingType: [
          { required: true, message: '选择费用类型', trigger: ['change', 'blur'] }
        ],
        priod: [
          { required: true, message: '周期不能为空', trigger: ['change', 'blur'] },
          { pattern: /^[1-9]\d{0,8}$/, message: '输入正整数', trigger: ['change', 'blur'] }
        ],
        priodUnit: [
          { required: true, message: '选择周期单位', trigger: ['change', 'blur'] }
        ],
        price: [
          { required: true, message: '价格不能为空', trigger: ['change', 'blur'] },
          { pattern: /^(0|[1-9]\d{0,8})$/, message: '输入0或正整数', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    selectBlur (e, row, index) {
      if (e.target.value) {
        this.step2Form.tableData[index].billingType = e.target.value
      }
      console.log(this.step2Form.tableData)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    formChecked () {
      // console.log(this.$refs['step1Form'])
      let isOk = true
      return isOk
    },
    checkTable (v, index) {
    //   if (v.billingType === '1') {
    //     this.form.tableData[index].priod = '99'
    //     this.form.tableData[index].priodUnit = '1'
    //   }
    //   if (v.billingType === '2') {
    //     this.form.tableData[index].priod = ''
    //     this.form.tableData[index].priodUnit = ''
    //   }
      console.log(11111)
      this.$emit('valitorTable', this.index, this.index1)
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
.step3{
  padding:10px 0px 10px 0px;
  width:100%;
  margin: 0 auto;
  background :#fff;
}
.step3 p{
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
.stepTable2 .cell {
  overflow: visible;
}
.el-table__body-wrapper{
 overflow: visible;
}
.step3 .el-table--mini th, .step3 .el-table--mini td{
  padding: 2px 0 2px 0;
  font-size: 14px;
}
.el-table .success-row {
    background: #F3F3F3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #ecf6fd !important;
}
</style>
