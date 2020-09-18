<template>
  <div>
    <div class="container">
      <div class="step">
        <el-steps :active="active" align-center>
          <el-step title="设置迁移区划年度单位"></el-step>
          <el-step title="设置辅助核算项迁移规则"></el-step>
          <el-step title="设置系统级基础资料迁移内容"></el-step>
          <el-step title="设置单位迁移内容"></el-step>
          <el-step title="迁移方案内容"></el-step>
        </el-steps>
      </div>
      <div class="containerBox">
        <keep-alive>
          <component :is="currentComponent" ref="currentRef" :formData="formData" @updata="updata"></component>
        </keep-alive>
      </div>
      <div style="text-align:center;background:#ecf6fd;padding-bottom:10px;">
        <el-button type="primary" style="margin-top: 12px;" @click="pre"  :disabled="active===1">上一步</el-button>
        <el-button type="primary" style="margin-top: 12px;" @click="next" :disabled="active===5">下一步</el-button>
        <el-button type="primary" style="margin-top: 12px;" @click="submmit" v-if="active===5">开始迁移</el-button>
        <el-button type="primary" style="margin-top: 12px;" @click="checkResult" >查看结果</el-button>
      </div>
    </div>
    <uf-modal title="正在迁移" v-model="dialogVisible" @cancel="handleClose" :maskClosable="false" :width="720" bodySyle="modalBody">
      <div class="modal-main" style="font-size:14px;">
        <div class="clear_fix">
            <p style="float:left;margin-right:10px;width:20%;font-size:18px;">总进度</p>
            <div style="float:left; height:50px;width:75%;">
              <el-progress :percentage="100" status="success" :stroke-width='10'></el-progress>
            </div>
        </div>
        <div>
          <p style="margin-right:10px;width:100%;margin-bottom:5px;">
            <span>当前迁移单位：</span><span>001厅机关</span><span>50个单位</span>
          </p>
          <p style="margin-right:10px;width:100%;margin-bottom:5px;">
            <span>当前迁移账套：</span><span>001经费账</span><span></span>
          </p>
          <p style="margin-right:10px;width:100%;margin-bottom:5px;">
            <span>当前迁移内容：</span><span>1期间凭证</span><span></span>
          </p>
        </div>
        <div class="clear_fix">
            <p style="float:left;margin-right:10px;width:20%;">当前单位迁移进度</p>
            <div style="float:left; height:50px;width:75%;">
              <el-progress :percentage="100" color="#e6a23c" status="success"></el-progress>
            </div>
        </div>
      </div>
      <template slot="footer">
        <el-button  type="primary" @click="handleClose">关闭</el-button>
      </template>
    </uf-modal>
    <uf-modal title="迁移数据结果对比" v-model="dialogVisible1" @cancel="handleClose1" :maskClosable="false" :width="720" bodySyle="modalBody">
      <div class="modal-main result" style="font-size:14px;">
       <el-table   border height="300" :data="tableData" style="width: 100%;"
         size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266', fontSize:'14px',textAlign:'center',height:'30px'}"
        :row-class-name="tableRowClassName"
       >
         <el-table-column prop="address" label="项目"></el-table-column>
         <el-table-column prop="address" label="源数据"></el-table-column>
         <el-table-column prop="address" label="迁移数量"></el-table-column>
       </el-table>
      </div>
      <template slot="footer">
        <el-button  type="primary" @click="handleClose1">关闭</el-button>
        <el-button  type="primary" @click="save">保存</el-button>
      </template>
    </uf-modal>
    <!-- <el-dialog title="正在迁移" :visible.sync="dialogVisible"  width="40%"  :before-close="handleClose">
    <div class="clear_fix">
         <p style="float:left;margin-right:10px;line-height:20px;width:10%;">进度111111</p>
         <div style="float:left; height:50px;width:80%;">
           <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
         </div>
    </div>
    <div class="clear_fix">
         <p style="float:left;margin-right:10px;line-height:20px;width:10%;">进度2</p>
         <div style="float:left; height:50px;width:80%;">
           <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
         </div>
    </div>
    <div class="clear_fix">
         <p style="float:left;margin-right:10px;line-height:20px;width:10%;">进度3</p>
         <div style="float:left; height:50px;width:80%;">
           <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
         </div>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
  </div>
</template>

<script>
import step1 from './components/step1/index'
import step2 from './components/step2/index'
import step3 from './components/step3/index'
import step4 from './components/step4/index'
import step5 from './components/step5/index'
var ComponentArray = [step1, step2, step3, step4, step5]
export default {
  name: 'baseform',
  data () {
    return {
      // 开始迁移的弹框
      dialogVisible: false,
      // 迁移完成后的弹框
      dialogVisible1: false,
      // 迁移数据结果集合
      tableData: [
        { address: '北京华夏' }
      ],
      active: 1,
      currentComponent: ComponentArray[0],
      formData: {
      }
    }
  },
  provide () {
  },
  created () {
  },
  methods: {
    next () {
      if (this.$refs.currentRef.formChecked()) {
        if (this.active++ > 6) this.active = 0
        this.currentComponent = ComponentArray[this.active - 1]
      }
    },
    pre () {
      if (this.active-- < 0) this.active = 0
      this.currentComponent = ComponentArray[this.active - 1]
    },
    submmit () {
      if (this.$refs.currentRef.formChecked()) {
        console.log(this.formData)
        this.dialogVisible = true
      }
    },
    updata (v) {
      Object.assign(this.formData, v)
      // console.log(this.formData)
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleClose1 () {
      this.dialogVisible1 = false
    },
    checkResult () {
      this.dialogVisible1 = true
    },
    save () {
      // console.log()
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
<style lang="scss"  scoped>
.step{
  // background:#ecf6fd;
  padding:20px 15px 5px 20px;
}
.containerBox{
  margin-top:10px;
}
.modal-main{
  width:90%;
  margin:10px auto;
}
</style>
<style lang="scss">
.step .el-step__title{
  font-size: 13px;
}
// table边框颜色
.el-table--border:after,
.el-table--group:after,
.el-table:before {
    background-color: #C0C4CC;
}

.el-table--border,
.el-table--group {
    border-color: #C0C4CC;
}

.el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #C0C4CC;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid #C0C4CC;
}

.el-table--border td,
.el-table--border th {
    border-right: 1px solid #C0C4CC;
}
.el-table .success-row {
    background: #F3F3F3;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
   background-color: #ecf6fd !important;
}
.result.modal-main .el-table--mini th, .modal-main.result .el-table--mini td{
  padding: 2px 0 2px 0;
  font-size: 14px;
}
.el-step__head.is-success{
  color:#108EE9;
  border-color:#108EE9;
}
.el-step__head.is-finish .el-step__icon.is-text{
  background:#108EE9;
}
.el-step__head.is-finish .el-step__icon-inner{
  color:white!important;
}
.el-step__title.is-success{
  color: #999 !important;
}
.el-step__title.is-finish{
  color: #999 !important;
}
.el-step__title.is-process{
   font-weight: normal;
   color: #999 !important;
}
.el-step__head.is-process{
    color:#999;
  border-color:#999;
}
.el-step__icon-inner{
  font-weight: normal;
  font-size: 14px;
}
.el-step__icon.is-text{
  border: 1px solid;
  width:28px;
  height:28px;
}
</style>
