<template>
    <div class="step2">
        <p>系统级统一管理的辅助核算类别迁移对应关系设置：</p>
        <el-form ref="step2Form" :model="step2Form" label-width="150px" size="mini">
            <el-table :data="step2Form.tableData1"  border height="300" ref="table" size="mini" class="stepTable2">
                <el-table-column prop="billingType" label="源辅助核算项代码/源辅助核算项名称" width="400">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData1.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData1',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="priod" label="迁移后辅助核算项代码/迁移后辅助核算项名称" width="400">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData1.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData1',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="rule" label="账套级" >
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData1.'+scope.$index+'.isorno'" :rules="rules.isorno" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择" filterable @blur="selectBlur('tableData1',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="是"></el-option>
                        <el-option key="2"  value="否"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
            </el-table>
        <p style="margin-top:20px;">系统级非统一管理的辅助核算类别：</p>
            <el-table :data="step2Form.tableData2"  border height="300" ref="table" size="mini" class="stepTable2">
                <el-table-column prop="billingType" label="源辅助核算项代码/源辅助核算项名称" width="400">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData2.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData2',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="priod" label="迁移后辅助核算项代码/迁移后辅助核算项名称" width="400">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData2.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData2',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="rule" label="账套级" >
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData2.'+scope.$index+'.isorno'" :rules="rules.isorno" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择" filterable @blur="selectBlur('tableData2',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="是"></el-option>
                        <el-option key="2"  value="否"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
            </el-table>
            <el-form-item label="单位级辅助核算项：" style="margin-top:20px;" prop="unitName" :rules="rules.unitName">
          <el-select size="mini" v-model="step2Form.unitName" placeholder="请选择">
            <el-option key="1"  value="单位1"></el-option>
          </el-select>
            </el-form-item>
            <el-table :data="step2Form.tableData3"  border height="300" ref="table" size="mini" class="stepTable2">
                <el-table-column prop="unitName" label="单位" >
                </el-table-column>
                <el-table-column prop="billingType" label="源辅助核算项代码/源辅助核算项名称" width="350">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData3.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData3',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="priod" label="迁移后辅助核算项代码/迁移后辅助核算项名称" width="350">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData3.'+scope.$index+'.billingType'" :rules="rules.billingType" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.billingType" placeholder="请选择" filterable @blur="selectBlur('tableData3',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="ITEM_CODE  项目"></el-option>
                        <el-option key="2"  value="ITEM_CODE  项目"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="rule" label="账套级" >
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData3.'+scope.$index+'.isorno'" :rules="rules.isorno" class="tabbleItem">
                    <el-select size="mini" v-model="scope.row.isorno" placeholder="请选择" filterable @blur="selectBlur('tableData3',$event,scope.row, scope.$index)">
                        <el-option key="1"  value="是"></el-option>
                        <el-option key="2"  value="否"></el-option>
                    </el-select>
                    </el-form-item>
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
    return {
      unitName: '',
      test: 99,
      step2Form: {
        tableData1: [
          { a: 1 }
        ],
        tableData2: [
          { a: 1 }
        ],
        tableData3: [
          { a: 1 }
        ]
      },
      rules: {
        billingType: [
          { required: true, message: '选择费用类型', trigger: ['change', 'blur'] }
        ],
        isorno: [
          { required: true, message: '选择是否账套', trigger: ['change', 'blur'] }
        ],
        unitName: [
          { required: true, message: '选择单位', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    selectBlur (type, e, row, index) {
        this.step2Form[type][index].billingType = e.target.value
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
    }
  }
}
</script>
<style lang="scss" scoped>
.step2{
  padding:10px 20px 10px 10px;
  width:70%;
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
</style>
