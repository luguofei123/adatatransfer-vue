<template>
  <div class="settingData">
      <el-form ref="step1Form" :model="step1Form" label-width="120px" :rules="step1FormFules">
        <el-form-item label="软件厂商：">
          <el-select v-model="step1Form.region" placeholder="请选择数据库">
            <el-option key="bbk" label="mysql" value="bbk"></el-option>
            <el-option key="xtc" label="sqlserve" value="xtc"></el-option>
            <el-option key="imoo" label="elk" value="imoo"></el-option>
          </el-select>
        </el-form-item>
      <div class="settingDataItem">
        <el-row :gutter="20">
          <el-col :span="10">
        <el-form-item label="源数据库：">
          <el-select v-model="step1Form.region" placeholder="请选择数据库">
            <el-option key="bbk" label="mysql" value="bbk"></el-option>
            <el-option key="xtc" label="sqlserve" value="xtc"></el-option>
            <el-option key="imoo" label="elk" value="imoo"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="IP地址：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="端口号：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="SID：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="数据库状态：">
              <span v-if="databaseStatus1" class="active">连接成功</span>
              <span v-else class="error">连接失败</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <hr style="padding:0;margin:0" />
      <div class="settingDataItem">
        <el-row :gutter="20">
          <el-col :span="10">
        <el-form-item label="目标数据库：">
          <el-select v-model="step1Form.region" placeholder="请选择数据库">
            <el-option key="bbk" label="mysql" value="bbk"></el-option>
            <el-option key="xtc" label="sqlserve" value="xtc"></el-option>
            <el-option key="imoo" label="elk" value="imoo"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="IP地址：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="端口号：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="SID：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码：">
              <el-input v-model="step1Form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="数据库状态：">
              <span v-if="databaseStatus2" class="active">连接成功</span>
              <span v-else class="error">连接失败</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="18">
           <el-button type="primary" :loading="buttonLoading"  @click="testDataBaseCon" >测试连接</el-button>
           <el-button type="primary" :loading="buttonLoading"  @click="goSettingRule" >下一步</el-button>
          </el-col>
        </el-row>
      </div>
      </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      buttonLoading: false,
      databaseStatus1: false,
      databaseStatus2: false,
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
        ]
      }
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    testDataBaseCon () {
      this.buttonLoading = true
      setTimeout(() => {
        this.buttonLoading = false
        this.databaseStatus1 = true
        this.databaseStatus2 = true
      }, 1000)
    },
    goSettingRule () {
      if (this.databaseStatus1) {
        this.$router.push({
          path: '/setDatabaserule'
        })
      } else {
        this.$message.error('数据库连接失败')
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.settingData{
  padding:10px;
  width:70%;
  margin: 20px auto;
  background :#fff;
  border:2px solid #000;
}
.settingDataItem{
  padding:10px 50px 10px 10px;
  background: #ecf6fd;
}
.active{
  color:green;
}
.error{
  color:red;
}
</style>
