<template>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item  v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">
          <span v-if="index != breadcrumbList.length-1">{{item.title}}</span>
          <span class="isActive" v-else >{{item.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    breadcrumbList () {
      return this.$store.state.tagsRecord.breadcrumbList
    }
  },
  created () {
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath
    }
  }
}
</script>
<style scoped lang="scss">
    .breadcrumb {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
       .el-breadcrumb{
         line-height: 30px;
         padding-left:10px;
      }
      .isActive{
        position: relative;
        display: inline-block;
        color:rgb(32, 160, 255);
      }
      .isActive:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: rgb(32, 160, 255);
      }
    }
</style>
