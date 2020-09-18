<template>
  <div>
    <el-form  :model="formTemp" label-width="120px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <el-form-item label="计费项中文名">
            <el-input v-model="formTemp.paramName" placeholder="计费项中文名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <el-form-item label="计费项英文名">
            <el-input v-model="formTemp.paramCode" placeholder="计费项英文名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p>-------------------------------------------------------- -------------------------------------------------------------------------------</p>
    <el-form  :model="secondForm"  label-width="120px" ref="secondForm" :rules="secondFormRules">
      <div v-for="(item,index) in secondForm.submitData" :key="index">
        <el-row :gutter="10">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="item.paramName + ':'" :prop="'submitData.'+index+'.paramValName'"  :rules="secondFormRules.paramValName">
              <el-input v-model="item.paramValName" placeholder="" :disabled="item.paramName===''"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <el-form-item :label="item.paramCode + ':'" :prop="'submitData.'+index+'.paramValCode'"  :rules="secondFormRules.paramValCode">
              <el-input v-model="item.paramValCode" placeholder="" :disabled="item.paramCode===''"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="11">
              <el-button type="danger" icon="el-icon-minus" @click="minus(index)" v-if="index!==0"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addList(index)"></el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      formTemp: {
        paramName: '',
        paramCode: ''
      },
      secondForm: {
        submitData: []
      },
      secondFormRules: {
        paramValName: [
          { required: true, message: '请输入数中文参数', trigger: 'blur' }
        ],
        paramValCode: [
          { required: true, message: '请输入数英文参数', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    obj () {
      return {
        paramName: this.formTemp.paramName,
        paramCode: this.formTemp.paramCode
      }
    }
  },
  watch: {
    obj (o) {
      this.secondForm.submitData[this.secondForm.submitData.length - 1].paramName = o.paramName
      this.secondForm.submitData[this.secondForm.submitData.length - 1].paramCode = o.paramCode
    }
  },
  created () {
    let { submitData } = this.formData
    this.secondForm = { submitData }
  },
  methods: {
    formChecked () {
      console.log(this.$refs)
      let isOk
      this.$refs['secondForm'].validate((valid) => {
        if (valid) {
          isOk = true
          // this.$emit('updata', this.step2Form)
        } else {
          isOk = false
        }
      })
      return isOk
    },
    addList (index) {
      let arr = [
        { paramName: '测试1', paramCode: 'test1', paramValName: 'aaa', paramValCode: 'bbb' },
        { paramName: '测试2', paramCode: 'test2', paramValName: 'aaa2', paramValCode: 'bbb2' },
        { paramName: '测试1', paramCode: 'test1', paramValName: 'aaa', paramValCode: 'bbb' }
      ]
      this.aggregationArray(arr)
      if (this.secondForm.submitData[this.secondForm.submitData.length - 1].paramName === '' ||
          this.secondForm.submitData[this.secondForm.submitData.length - 1].paramCode === '' ||
          this.secondForm.submitData[this.secondForm.submitData.length - 1].paramValName === '' ||
          this.secondForm.submitData[this.secondForm.submitData.length - 1].paramValCode === '') {
        console.log('数据空，不能添加')
      } else {
        this.secondForm.submitData.push({ paramName: this.formTemp.paramName, paramCode: this.formTemp.paramCode, paramValName: '', paramValCode: '' })
      }
    },
    minus (index) {
      console.log(index)
      this.secondForm.submitData.splice(index, 1)
      this.formTemp.paramName = this.secondForm.submitData[this.secondForm.submitData.length - 1].paramName
      this.formTemp.paramCode = this.secondForm.submitData[this.secondForm.submitData.length - 1].paramCode
    },
    // 对象数组聚合函数 根据某个字段来合并数组
    aggregationArray (array) {
      let arr = []
      let obj = {}
      array.forEach((item, index) => {
        if (!obj[item.paramName]) {
          // delete item.paramName
          arr.push({
            paramName: item.paramName,
            pramList: [
              { paramValName: item.paramValName, paramValCode: item.paramValCode }
            ]
          })
          obj[item.paramName] = 1
        } else {
          arr.forEach((item1, index1) => {
            if (item1.paramName === item.paramName) {
              item1.pramList.push(
                { paramValName: item.paramValName, paramValCode: item.paramValCode }
              )
            }
          })
        }
      })
      console.log(arr)
    }
  }
}
</script>
<style>
input{line-height: 20px!important;}
</style>
