<template>
    <div class="step2">
        <p>系统级统一管理的辅助核算类别迁移对应关系设置：</p>
        <el-form ref="step2Form" :model="step2Form" label-width="150px" size="mini">
            <el-table :data="step2Form.tableData1"  border height="300"
            ref="singleTable"
            size="mini"
            class="stepTable2"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
            :row-class-name="tableRowClassName"
            >
                <el-table-column prop="asset1" label="源辅助核算项代码/源辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData1.'+scope.$index+'.asset1'"  class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset1" placeholder="请选择" filterable @blur="selectBlur('tableData1',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrLeft" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="asset2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData1.'+scope.$index+'.asset2'"  class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset2" placeholder="请选择" filterable @blur="selectBlur('tableData1',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrright" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="isorno" label="账套级" width="200">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData1.'+scope.$index+'.isorno'"  class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择"   style="width:100%">
                        <el-option key="1"  value="1" label="是"></el-option>
                        <el-option key="2"  value="2" label="否"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
            </el-table>
        <p style="margin-top:20px;">系统级非统一管理的辅助核算类别：</p>
            <el-table :data="step2Form.tableData2"  border height="300" ref="table"
            size="mini" class="stepTable2"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}"
            :row-class-name="tableRowClassName"
            >
                <el-table-column prop="asset1" label="源辅助核算项代码/源辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData2.'+scope.$index+'.asset1'" :rules="rules.asset1" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset1" placeholder="请选择" filterable @blur="selectBlur('tableData2',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrLeft" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="asset2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData2.'+scope.$index+'.asset2'" :rules="rules.asset2" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset2" placeholder="请选择" filterable @blur="selectBlur('tableData2',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrright" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="isorno" label="账套级" width="200">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData2.'+scope.$index+'.isorno'" :rules="rules.isorno" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择"   style="width:100%">
                        <el-option key="1"  value="1" label="是"></el-option>
                        <el-option key="2"  value="2" label="否"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
            </el-table>
            <el-form-item label="单位级辅助核算项：" style="margin-top:20px;" prop="unitName" :rules="rules.unitName">
          <el-select size="mini" v-model="step2Form.unitName" placeholder="请选择">
            <el-option key="1"  value="单位1"></el-option>
          </el-select>
            </el-form-item>
            <el-table :data="step2Form.tableData3"  border height="300"
            ref="table" size="mini" class="stepTable2"
            :row-class-name="tableRowClassName"
            :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'40px'}">
                <el-table-column prop="unitName" label="单位" >
                </el-table-column>
                <el-table-column prop="asset1" label="源辅助核算项代码/源辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData3.'+scope.$index+'.asset1'" :rules="rules.asset1" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset1" placeholder="请选择" filterable @blur="selectBlur('tableData3',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrLeft" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="asset2" label="迁移后辅助核算项代码/迁移后辅助核算项名称" >
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData3.'+scope.$index+'.asset2'" :rules="rules.asset2" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.asset2" placeholder="请选择" filterable @blur="selectBlur('tableData3',$event,scope.row, scope.$index)" style="width:100%">
                        <el-option v-for="(item, index) in optionArrright" :key="index" :value="item.value"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
                <el-table-column prop="isorno" label="账套级" width="200">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData3.'+scope.$index+'.isorno'" :rules="rules.isorno" class="tabbleItem"> -->
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择"   style="width:100%">
                        <el-option key="1"  value="1" label="是"></el-option>
                        <el-option key="2"  value="2" label="否"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
                </el-table-column>
            </el-table>
        </el-form>
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
    // const validchecked = function (rule, value, callback) {
    //   if (value === '' || value === undefined || value === null) {
    //     callback(new Error('不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      unitName: '',
      test: 99,
      step2Form: {
        tableData1: [
          { asset1: '', asset2: '', isorno: 1 }, { asset1: '', asset2: '', isorno: 1 }
        ],
        tableData2: [
          { asset1: '', asset2: '', isorno: 1 }, { asset1: '', asset2: '', isorno: 1 }
        ],
        tableData3: [
          { unitName: '项目', asset1: '', asset2: '', isorno: 1 }, { asset1: '', asset2: '', isorno: 1 }
        ]
      },
      rules: {
        asset1: [
          { required: true, message: '选择源辅助核算项代码/源辅助核算项名称', trigger: ['change', 'blur'] }
        ],
        asset2: [
          { required: true, message: '选择迁移后辅助核算项代码/迁移后辅助核算项名称', trigger: ['change', 'blur'] }
          // { required: true, validator: validchecked, trigger: ['blur'] }
        ],
        isorno: [
          { required: true, message: '选择是否账套', trigger: ['change', 'blur'] }
        ],
        unitName: [
          { required: true, message: '选择单位', trigger: ['change', 'blur'] }
        ]
      },
      optionArrLeft: [
        { code: 'ITEM_CODE', name: '项目', value: 'ITEM_CODE 项目' },
        { code: 'B_ACC_CODE', name: '功能分类', value: 'B_ACC_CODE 功能分类' },
        { code: 'OUTLAY_CODE', name: '经济分类', value: 'OUTLAY_CODE 经济分类' },
        { code: 'ACC_ITEM1', name: '部门', value: 'ACC_ITEM1 部门' },
        { code: 'ACC_ITEM2', name: '支出类型', value: 'ACC_ITEM2 支出类型' },
        { code: 'ACC_ITEM3', name: '资产类型', value: 'ACC_ITEM3 资产类型' },
        { code: 'ACC_ITEM4', name: '项目', value: 'ACC_ITEM4 项目' },
        { code: 'ACC_ITEM5', name: '项目', value: 'ACC_ITEM5 项目' },
        { code: 'ACC_ITEM6', name: '项目', value: 'ACC_ITEM6 项目' },
        { code: 'ACC_ITEM7', name: '项目', value: 'ACC_ITEM7 项目' },
        { code: 'ACC_ITEM8', name: '项目', value: 'ACC_ITEM8 项目' },
        { code: 'ACC_ITEM9', name: '项目', value: 'ACC_ITEM9 项目' },
        { code: 'ACC_ITEM10', name: '项目', value: 'ACC_ITEM10 项目' },
        { code: 'ACC_ITEM11', name: '项目', value: 'ACC_ITEM11 项目' },
        { code: 'ACC_ITEM12', name: '项目', value: 'ACC_ITEM12 项目' },
        { code: 'ACC_ITEM13', name: '项目', value: 'ACC_ITEM13 项目' },
        { code: 'ACC_ITEM14', name: '项目', value: 'ACC_ITEM14 项目' },
        { code: 'ACC_ITEM15', name: '项目', value: 'ACC_ITEM15 项目' },
        { code: 'ACC_ITEM16', name: '项目', value: 'ACC_ITEM16 项目' },
        { code: 'ACC_ITEM17', name: '项目', value: 'ACC_ITEM17 项目' }
      ],
      optionArrright: [
        { code: 'PROJECT', name: '项目', value: 'PROJECT 项目' },
        { code: 'EXPFUNC', name: '支出功能分类', value: 'EXPFUNC 支出功能分类' },
        { code: 'EXPECO', name: '部门经济分类', value: 'EXPECO 部门经济分类' },
        { code: 'DEPARTMENT', name: '部门', value: 'DEPARTMENT 部门' },
        { code: 'BKZL', name: '拨款种类', value: 'BKZL 拨款种类' },
        { code: 'PAYTYPE', name: '支付方式', value: 'PAYTYPE 支付方式' },
        { code: 'SUBSIDYTYPE', name: '补贴种类', value: 'SUBSIDYTYPE 补贴种类' },
        { code: 'DEPPRO', name: '预算项目', value: 'DEPPRO 预算项目' },
        { code: 'FUNDTYPE', name: '资金性质', value: 'FUNDTYPE 资金性质' },
        { code: 'ACC_ITEM7', name: '项目', value: 'ACC_ITEM7 项目' },
        { code: 'ACC_ITEM8', name: '项目', value: 'ACC_ITEM8 项目' },
        { code: 'ACC_ITEM9', name: '项目', value: 'ACC_ITEM9 项目' },
        { code: 'ACC_ITEM10', name: '项目', value: 'ACC_ITEM10 项目' },
        { code: 'ACC_ITEM11', name: '项目', value: 'ACC_ITEM11 项目' },
        { code: 'ACC_ITEM12', name: '项目', value: 'ACC_ITEM12 项目' },
        { code: 'ACC_ITEM13', name: '项目', value: 'ACC_ITEM13 项目' },
        { code: 'ACC_ITEM14', name: '项目', value: 'ACC_ITEM14 项目' },
        { code: 'ACC_ITEM15', name: '项目', value: 'ACC_ITEM15 项目' },
        { code: 'ACC_ITEM16', name: '项目', value: 'ACC_ITEM16 项目' }
      ]
    }
  },
  methods: {
    selectBlur (type, e, row, index) {
      console.log(e.target.value)
      if (e.target.value) {
        this.step2Form[type][index].asset2 = e.target.value
      }
      // console.log(this.step2Form.tableData)
    },
    formChecked () {
      console.log(this.step2Form)
      let isOk
      this.$refs['step2Form'].validate((valid) => {
        if (valid) {
          isOk = true
          this.$emit('updata', this.step2Form)
        } else {
          isOk = false
        }
      })
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
.step2{
  padding:10px 0px 10px 0px;
  width:100%;
  margin: 0 auto;
  background :#fff;
}
.step2 p{
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
.step2 .el-table--mini th, .step2 .el-table--mini td{
  padding: 0px 0 0 0;
}
.el-table .success-row {
    background: #F3F3F3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #ecf6fd !important;
}
.step2 .stepTable2 .el-table__row{
  font-size: 14px;
}
.step2 .stepTable2 .el-select.el-select--mini input{
    border:none!important;
  background: none!important;
  font-size: 14px;
}
.step2  .el-select.el-select--mini input{
  font-size: 14px;
}
</style>
