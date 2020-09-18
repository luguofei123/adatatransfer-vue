<template>
  <div class="step1 assetrc">
      <RptTreeMSelect
      :treeData="treeData1"
      ></RptTreeMSelect>
      <el-form ref="step1Form" :model="step1Form" label-width="120px" :rules="step1FormFules" size="mini">
        <el-row :gutter="20" style="background:#ecf6fd;padding-top:20px;padding-left:20px;margin-right:-21px;">
          <p>设置迁移年度与区划</p>
          <el-col :span="8">
        <el-form-item label="迁移年度：" prop="database1">
          <el-select  v-model="step1Form.database1" placeholder="请选择数据库">
            <el-option  label="2019" value="2019"></el-option>
            <el-option  label="2020" value="2019"></el-option>
            <el-option  label="2021" value="2019"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="源区划：" prop="database2">
          <el-select  v-model="step1Form.database2" placeholder="请选择数据库">
            <el-option label="源区划1" value="源区划1"></el-option>
            <el-option label="源区划2" value="源区划2"></el-option>
            <el-option label="源区划3" value="源区划3"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="目标区划：" prop="database3">
          <el-select  v-model="step1Form.database3" placeholder="请选择数据库">
            <el-option  label="目标区划1" value="目标区划1"></el-option>
            <el-option  label="目标区划2" value="目标区划2"></el-option>
            <el-option  label="目标区划3" value="目标区划3"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-right:-21px;margin-left:-10px;">
        <el-form-item label=""  class="tabbleItem" prop="tableData">
         <p style="margin-top:10px;margin-bottom:10px;">单位迁移规则设置</p>
            <el-table
              class="stepTable1"
              :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
              :row-class-name="tableRowClassName"
              border
              size="mini"
              height="300"
              ref="singleTable"
              :data="step1Form.tableData"
              style="width: 100%;"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="源单位代码/源单位名称">
                <template slot-scope="scope">
                  <RptTreeSelect
                    :treeData="treeData"
                    :value="scope.row.source1"
                    @change="change('source1',arguments[0],scope.$index)"></RptTreeSelect>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="源账套代码/源账套名称">
                <template slot-scope="scope">
                  <RptTreeSelect
                    :treeData="treeData"
                    :value="scope.row.source2"
                    @change="change('source2',arguments[0],scope.$index)"
                  ></RptTreeSelect>
                </template>
              </el-table-column>
            </el-table>
        </el-form-item>
        </el-row>
   </el-form>
   </div>
</template>
<script>
import treeData1 from './test.js'
export default {
  data () {
    const validateAcquaintance = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      // value 为table数据，可以在这里判断是否重复等校验全部通过则ok
      // value.forEach((item, index) => {
      // })
      if (!value) {
        callback(new Error('必须输入熟悉程度'))
      } else {
        callback()
      }
    }
    return {
      treeData1: treeData1,
      step1Form: {
        database1: '',
        database2: '',
        database3: '',
        tableData: [
          { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' },
          { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' }, { source1: '1002', source2: '1003' }
        ]
      },
      step1FormFules: {
        database1: [
          { required: true, message: '请选择迁移年度', trigger: 'change' }
        ],
        database2: [
          { required: true, message: '请选择源区划', trigger: 'change' }
        ],
        database3: [
          { required: true, message: '请选择目标区划', trigger: 'change' }
        ],
        tableData: [
          { type: 'array', required: true, message: '至少要有一条数据', trigger: 'change' },
          { type: 'array', required: true, validator: validateAcquaintance, trigger: 'blur' }
        ]
      },
      multipleSelection: [],
      treeData: [
        {
          code: '1002',
          codeName: '1002 银行存款',
          id: '1002',
          isLeaf: 1,
          isQty: '0',
          isSelected: '',
          name: '银行存款',
          pCode: '1',
          pId: '1',
          parentId: ''
        },
        {
          code: '1003',
          codeName: '1003 北京存款',
          id: '1003',
          isLeaf: 1,
          isQty: '0',
          isSelected: '',
          name: '北京存款',
          pCode: '1',
          pId: '1002',
          parentId: ''
        }
      ]
    }
  },
  created () {
    // let { resource1, desc1, detail, checkedObj } = this.formData
    // this.step1Form = { resource1, desc1, detail, checkedObj }
    // Object.assign(this.step1Form, this.formData)
    // console.log(this.step1Form)
  },
  watch: {
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    change (prop, obj, index) {
      this.step1Form.tableData[index][prop] = obj.title
    },
    formChecked () {
      // console.log(this.$refs['step1Form'])
      let isOk
      this.$refs['step1Form'].validate((valid) => {
        if (valid) {
          isOk = true
          // 如果有勾选的话，增加对勾选的判断
          this.$emit('updata', this.step1Form)
        } else {
          isOk = false
        }
      })
      return isOk
    },
    // 奇偶行背景色不同
    // setCurrent (row) {
    //   this.$refs.singleTable.setCurrentRow(row)
    // },
    // handleCurrentChange (val) {
    //   this.currentRow = val
    // },
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
.step1{
  padding:10px 20px 10px 10px;
  width:100%;
  margin: 0 auto;
  background :#fff;
}
.step1 p{
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
.stepTable1 .cell {
  overflow: visible;
}
.el-table__body-wrapper{
 overflow: visible;
}
.tabbleItem .el-form-item__content{
  margin-left:0px!important;
}
.el-table .success-row {
    background: #F3F3F3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #ecf6fd !important;
}
.assetrc .stepTable1 .cell .rptTreeSelectWrap{
  border:none!important;
  background: none!important;
}
.assetrc .stepTable1 .cell .rptTreeSelectWrap input{
  border:none!important;
  background: none!important;
  font-size: 14px;
}
 .assetrc .el-select.el-select--mini input{
  font-size: 14px;
}
.assetrc .el-table--mini th, .assetrc .el-table--mini td{
  padding: 0px 0 0 0;
}
</style>
