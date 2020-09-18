<template>
<div>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageConfig.currentPage"
    :page-sizes="pageConfig.pageSizes"
    :page-size="pageConfig.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageConfig.total">
  </el-pagination>
</div>
</template>
<script>
export default {
  name: 'pageBar',
  props: {
    pageConfig: {
      type: Object,
      default () {
        return {
          pageSizes: [10, 20, 30, 40],
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
    // total: {
    //   type: Number,
    //   default: 0
    // }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('handleSizeChange', size)
    },
    handleCurrentChange (page) {
      this.$emit('handleCurrentChange', page)
    }
  }
}
</script>

<style scoped>

</style>
