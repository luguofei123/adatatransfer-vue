<template>
    <div>
        <el-form :ref="'form'+index+index1" :model="form" label-width="0px" :rules="rules">
            <el-table :data="form.tableData"  border  ref="table" size="mini">
                <el-table-column prop="billingType" label="计费方式" >
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.billingType'" :rules="rules.billingType">
                    <el-select v-model="scope.row.billingType" placeholder="请选择" @change="checkTable(scope.row, scope.$index)">
                        <el-option key="1" label="一次性费用" value="1"></el-option>
                        <el-option key="2" label="包年包月" value="2"></el-option>
                    </el-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="priod" label="售卖周期" width="220">
                <template slot-scope="scope">
                    <el-form-item  :prop="'tableData.'+scope.$index+'.priod'" :rules="rules.priod" style="float:left;margin-right:5px;">
                    <!-- <el-input :disabled="scope.row.billingType==='1'"  v-model="scope.row.priod" style="width:100px;" @change="checkTable"></el-input> -->
                    <my-input :scopeObj="scope" @tablecheck="checkTable"></my-input>
                    </el-form-item>
                    <el-form-item :prop="'tableData.'+scope.$index+'.priodUnit'" :rules="rules.priodUnit" style="float:left;">
                    <!-- <el-select :disabled="scope.row.billingType==='1'" v-model="scope.row.priodUnit" placeholder="请选择" style="width:90px;" @change="checkTable">
                        <el-option key="1" label="年" value="1"></el-option>
                        <el-option key="2" label="月" value="2"></el-option>
                        <el-option key="3" label="日" value="3"></el-option>
                    </el-select> -->
                    <my-select :scopeObj="scope" @tablecheck="checkTable"></my-select>
                    </el-form-item>
                </template>
                </el-table-column>
                <el-table-column prop="guige" label="规格" >
                <template slot-scope="scope">
                    <span style="display:inline-block;height:50px;line-height:30px;">{{scope.row.guige}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="rule" label="rule" >
                <template slot-scope="scope">
                    <span style="display:inline-block;height:50px;line-height:30px;">{{scope.row.rule}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" width="150">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.price'" :rules="rules.price" style="float:left;margin-right:5px;">
                    <el-input v-model="scope.row.price" style="width:110px;" @change="checkTable"></el-input>
                    </el-form-item>
                    <span style="display:inline-block;height:40px;line-height:30px;">{{scope.row.priceUnit}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="price"  label="操作" >
                <template slot-scope="scope">
                    <el-button @click="deletePriceList(scope.$index)" style="position:absolute;left:10px;top:6px;">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-button @click="addPriceList">增加一行</el-button>
    </div>
</template>

<script>
import myInput from './myInput'
import mySelect from './mySelect'
export default {
  components: {
    myInput, mySelect
  },
  props: {
    priceTable: {
      type: Array,
      default () {
        return []
      }
    },
    index: {
      type: Number,
      default () {
        return 0
      }
    },
    index1: {
      type: Number,
      default () {
        return 0
      }
    }
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
      test: 99,
      form: {
        // 如果希望从父传过来的数据 在子模板中改变后，父组件中的数据也改变，那么可以直接引用对象的方式；如果不希望父组件中的数据变化，那么就可以clone一个新的数据。
        // tableData: JSON.parse(JSON.stringify(this.priceTable))
        tableData: this.priceTable
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
    addPriceList () {
      if (this.formChecked('form' + this.index + this.index1)) {
        let obj = { billingType: '', priod: '', priodUnit: '', guige: 'gggg', rule: 'rule1', price: '0', priceUnit: '元' }
        this.form.tableData.push(obj)
        // 更新数据 并且验证数据
        this.$emit('valitorTable', this.index, this.index1)
      } else {
        this.$message.error('数据填写正确后才能添加新数据')
      }
    },
    deletePriceList (index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.tableData.splice(index, 1)
        this.$emit('valitorTable', this.index, this.index1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    formChecked (form) {
      // console.log('开始验证表格数据')
      let isOk
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log('表格数据验证通过')
          isOk = true
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
