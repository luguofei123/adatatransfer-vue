<template>
  <el-dialog :title="option.title" :visible.sync="option.isVisible" width="300px" center>
    <div class="del-dialog-cnt">{{option.message}}</div>
    <span slot="footer" class="dialog-footer">
                <el-button @click="nextEvent(false)">取 消</el-button>
                <el-button type="primary" @click="nextEvent(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'tipsBar',
  props: {
    option: {
      type: Object,
      default () {
        return {
          isVisible: false,
          title: '提示',
          message: '删除不可恢复，是否确定删除？'
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    nextEvent (bool) {
      this.option.isVisible = false
      if (bool) {
        this.$emit('deleteList', bool)
      }
    }
  }
}
</script>

<style scoped>

</style>
