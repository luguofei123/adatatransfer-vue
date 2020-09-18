<template>
  <div>
      <el-form ref="step1Form" :model="step1Form" label-width="120px" :rules="step1FormFules">
        <el-form-item label="选择器">
          <el-select v-model="step1Form.region" placeholder="请选择">
            <el-option key="bbk" label="镜像" value="bbk"></el-option>
            <el-option key="xtc" label="API" value="xtc"></el-option>
            <el-option key="imoo" label="线下交付" value="imoo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单选框1" prop="resource1">
          <el-radio-group v-model="step1Form.resource1">
            <el-radio label="步步高"></el-radio>
            <el-radio label="小天才"></el-radio>
            <el-radio label="imoo"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框1" prop="desc1">
          <el-input type="textarea" rows="5" v-model="step1Form.desc1"></el-input>
        </el-form-item>
        <el-form-item label="产品详情" prop="detail">
          <editor-wang :initContent="step1Form.detail" @updateContent="updateContent"></editor-wang>
        </el-form-item>
        <el-form-item label="表格" prop="checkedObj">
          <api-table :obj="step1Form.checkedObj" @updatecheckedObj="updatecheckedObj"></api-table>
        </el-form-item>
      </el-form>
                <RptTreeSelect
            :treeData="treeData"
            :value="step1Form.desc1"
            @change="change('',arguments[0],'eee')"
          ></RptTreeSelect>
  </div>
</template>
<script>
import editorWang from './components/editorWang'
import apiTable from './components/apiTable/index'
export default {
  components: {
    editorWang,
    apiTable
  },
  props: {
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    propsObj: {
      type: Object,
      default: function () {
        return {}
      }
    },
    propsString: {
      type: String,
      default: ''
    }
  },
  data () {
    const validContent = function (rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('详情不能为空'))
      } else {
        callback()
      }
    }
    const validcheckedObj = function (rule, value, callback) {
      if (value.id === '' || value.id === undefined || value.id === null) {
        callback(new Error('选择不能为空'))
      } else {
        callback()
      }
    }
    return {
      treeData: [
        {
          accBal: 1,
          accaCode: '1',
          accitemCount: 0,
          accoAccItemList: [],
          accoType: 2,
          accsCode: '001',
          acctName: 'zsj测试',
          agencyCode: '001002',
          agencyCodeName: '001002',
          agencyTypeCode: '1,2',
          allowSurplus: '0',
          assCode: 'YHCK',
          chrFullname: '银行存款',
          chrId: 'f1e6e0e96675483695e038a82bea9aca',
          code: '1002',
          codeName: '1002 银行存款',
          enableBalanceControl: '0',
          enableLargeControl: '0',
          enabled: 1,
          enabledAccItem: '0',
          expireDate: '0',
          field1: '',
          id: '1002',
          isCashflow: '0',
          isCheckRegister: '0',
          isCur: '0',
          isLeaf: 1,
          isQty: '0',
          isSelected: '',
          isShowBill: '0',
          lastVer: 0,
          levelNum: 1,
          name: '银行存款',
          pCode: '1',
          pId: '1',
          parentId: '',
          qtyDigits: 0
        }
      ],
      step1Form: {
        region: '',
        resource1: '',
        desc1: '',
        detail: '',
        checkedObj: {}
      },
      step1FormFules: {
        resource1: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc1: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        detail: [
          { required: true, validator: validContent, trigger: 'blur,change' }
        ],
        checkedObj: [
          { required: true, validator: validcheckedObj, trigger: 'blur,change' }
        ]
      }
    }
  },
  inject: ['provideObj', 'provideString'],
  created () {
    console.log('--------------start-------------')
    console.log(this.provideObj.tel)
    console.log(this.provideString)
    console.log(this.propsObj.tel)
    console.log(this.propsString)
    console.log('--------------end-------------')
    setTimeout(() => {
      console.log('--------------startsetTimeout-------------')
      console.log(this.provideObj.tel)
      console.log(this.provideString)
      console.log(this.propsObj.tel)
      console.log(this.propsString)
      console.log('--------------endsetTimeout-------------')
    }, 1000)
    let { resource1, desc1, detail, checkedObj } = this.formData
    this.step1Form = { resource1, desc1, detail, checkedObj }
    // Object.assign(this.step1Form, this.formData)
    // console.log(this.step1Form)
  },
  watch: {
    // 'luguofeiobj.name' (v) {
    //   console.log(v)
    // },
    // stringLugofei (v) {
    //   console.log(111111)
    //   console.log(v)
    // },
    // luguofeiindex (v) {
    //   console.log(v)
    // }
  },
  methods: {
    change (a, b, c) {
      console.log(a, b, c)
    },
    formChecked () {
      // console.log(this.$refs['step1Form'])
      let isOk
      this.$refs['step1Form'].validate((valid) => {
        if (valid) {
          isOk = true
          this.$emit('updata', this.step1Form)
        } else {
          isOk = false
        }
      })
      return isOk
    },
    updateContent (html) {
      this.step1Form.detail = html
      if (html === '<p><br></p>') {
        this.step1Form.detail = ''
      }
      // console.log('执行了')
      this.$refs['step1Form'].validateField('detail')
    },
    updatecheckedObj (obj) {
      this.step1Form.checkedObj = obj
      this.$refs['step1Form'].validateField('checkedObj')
    }
  }
}
</script>
