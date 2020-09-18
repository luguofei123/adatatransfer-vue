<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                  <el-form-item label="动态表格表单" prop="tableData">
                    <el-table :data="form.tableData"  border  ref="table" size="mini">
                      <el-table-column prop="dataType" label="类型" >
                        <template slot-scope="scope">
                          <el-form-item :prop="'tableData.'+scope.$index+'.dataType'" :rules="rules.dataType">
                            <el-select v-model="scope.row.dataType" placeholder="请选择" @change="zhudong($event,scope.$index)">
                              <el-option key="1" label="整数" value="int"></el-option>
                              <el-option key="2" label="中文" value="cn"></el-option>
                              <el-option key="3" label="英文" value="en"></el-option>
                            </el-select>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="姓名" >
                        <template slot-scope="scope">
                          <el-form-item :prop="'tableData.'+scope.$index+'.name'" :rules="rules.name">
                            <el-input v-model="scope.row.name"></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="sex" label="性别" >
                        <template slot-scope="scope">
                          <el-form-item :prop="'tableData.'+scope.$index+'.sex'" :rules="rules.sex">
                            <el-input v-model="scope.row.sex"></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                    <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文本框" prop="desc">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'baseform',
  data () {
    const validateAcquaintance = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      // value 为table数据，可以在这里判断是否重复等校验全部通过则ok
      if (!value) {
        callback(new Error('必须输入熟悉程度'))
      } else {
        callback()
      }
    }
    const validateNameType = (rule, value, callback) => {
      let index = rule.field.split('.')[1]
      // console.log(index)
      // console.log(value)
      // console.log(this.form.tableData[index].dataType)
      switch (this.form.tableData[index].dataType) {
        case 'int':
          console.log('check int')
          break
        case 'en':
          console.log('check en')
          break
        case 'cn':
          console.log('check cn')
          break
        default:
          break
      }
      if (!value) {
        callback(new Error('必须输入对应的数据'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: 'guangdong',
          label: '广东省',
          children: [
            {
              value: 'guangzhou',
              label: '广州市',
              children: [
                {
                  value: 'tianhe',
                  label: '天河区'
                },
                {
                  value: 'haizhu',
                  label: '海珠区'
                }
              ]
            },
            {
              value: 'dongguan',
              label: '东莞市',
              children: [
                {
                  value: 'changan',
                  label: '长安镇'
                },
                {
                  value: 'humen',
                  label: '虎门镇'
                }
              ]
            }
          ]
        },
        {
          value: 'hunan',
          label: '湖南省',
          children: [
            {
              value: 'changsha',
              label: '长沙市',
              children: [
                {
                  value: 'yuelu',
                  label: '岳麓区'
                }
              ]
            }
          ]
        }
      ],
      form: {
        tableData: [{ name: '' }],
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['步步高'],
        resource: '小天才',
        desc: 'swsw',
        options: []
      },
      rules: {
        tableData: [
          { type: 'array', required: true, message: '请至少选择一条数据', trigger: 'change' },
          { type: 'array', required: true, validator: validateAcquaintance, trigger: 'blur' }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          { validator: validateNameType, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入sex名称', trigger: 'blur' }
          // { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    zhudong (v, s) {
      // console.log(this)
      // console.log(s)
      this.$refs.form.validateField('tableData.' + s + '.name')
    }
  }
}
</script>
