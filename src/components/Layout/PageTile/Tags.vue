<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tagsList () {
      return this.$store.state.tagsRecord.tagsList
    },
    showTags () {
      return this.tagsList.length > 0
    }
  },
  created () {
    this.$store.commit('tagsRecord/ADD_TAGSLIST', this.$route)
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags (index) {
      this.$store.commit('tagsRecord/DEL_TAGSLIST', index)
    },
    // 关闭全部标签
    closeAll () {
      this.$store.commit('tagsRecord/SET_TAGSLIST', [])
      this.$router.push('/dashboard')
    },
    // 关闭其他标签
    closeOther () {
      const curRoute = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.$store.commit('tagsRecord/SET_TAGSLIST', curRoute)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  }
}
</script>
<style lang="scss">
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    .tags .tags-li.active {
      border: 1px solid #409EFF;
      background-color: #409EFF;
      color: #fff;
    }
    .tags .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
    .tags .tags-li:not(.active):hover {
        background: #f8f8f8;
    }
    .tags .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }
    .tags .tags-li.active .tags-li-title {
        color: #fff;
    }
    .tags .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
</style>
