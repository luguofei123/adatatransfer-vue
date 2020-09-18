<template>
    <div class="step4">
         <p>系统级基础资料</p>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="treeclass">
<el-input placeholder="输入关键字进行过滤" v-model="filterText" class="filterTextclass"></el-input>
<el-tree
  :data="data"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :filter-node-method="filterNode"
  :props="defaultProps"
   ref="tree">
</el-tree>
</div>
        </el-col>
        <el-col :span="16">
       <el-table
       class="stepTable4"
        border
        height="300"
        size="mini"
    ref="multipleTable"
    :data="tableData"
    style="width: 100%;"
    @selection-change="handleSelectionChange"
    :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
    :row-class-name="tableRowClassName"
    >
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column prop="address" label="模块"></el-table-column>
    <el-table-column prop="address" label="数据项"></el-table-column>
  </el-table>
        </el-col>
     </el-row>
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
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      searchValue: '',
      unitName: '',
      test: 99,
      tableData: [
        { address: '充电电池' }, { address: '充电电池' }
      ],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectBlur (e, row, index) {
      if (e.target.value) {
        this.step2Form.tableData[index].billingType = e.target.value
      }
      console.log(this.step2Form.tableData)
    },
    formChecked (form) {
      // console.log('开始验证表格数据')
      let isOk = true
      // this.$refs[form].validate((valid) => {
      //   if (valid) {
      //     // console.log('表格数据验证通过')
      //     isOk = true
      //   } else {
      //     isOk = false
      //   }
      // })
      return isOk
    },
    handleSelectionChange () {
      // co
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
.step4{
  padding:10px 0px 10px 0px;
  width:100%;
  margin: 0 auto;
  background :#fff;
}
.step4 p{
  font-size: 14px;
  margin-bottom: 20px;
}
.active{
  color:green;
}
.error{
  color:red;
}
.treeclass{
  height: 300px;
  overflow: auto;
  border:1px solid #C0C4CC;
}
</style>
<style lang="scss">
.stepTable2 .cell {
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
.step4 .el-table--mini th, .step4 .el-table--mini td{
  padding: 2px 0 2px 0;
  font-size: 14px;
}
.filterTextclass input{
  border-radius: 0;
}
.el-tree-node__content:hover{
  background: #ecf6fd;
}
.el-tree-node:focus > .el-tree-node__content{
  background: #ecf6fd;
}
</style>
