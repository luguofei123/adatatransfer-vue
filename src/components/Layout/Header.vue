<template>
    <div class="header" :style="headStyle">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="setCollapse">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">升级管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
              <!-- 全屏显示 -->
              <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                  <i class="el-icon-rank"></i>
                </el-tooltip>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapMutations } from 'vuex'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      fullscreen: false,
      username: '鲁国飞',
      message: 20
    }
  },
  computed: {
    ...mapGetters('tagsRecord', [
      'headStyle'
    ])
  },
  created () {
    // 注意 如果是匿名函数，不能注销，应该使用具名函数
    // 此处的'testM'是事件名称，而不是函数名称
    this.$EventBus.$on('testM', value => {
      console.log(value)
    })
    // console.log(this.$EventBus.count)
  },
  methods: {
    ...mapActions('tagsRecord', [
      'setCollapse',
      'setThemeTool'
    ]),
    skipPortal () {
      this.$router.push('/portal')
    },
    // 测试emit组件之间传值方法

    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === 'loginout') {
        // localStorage.removeItem('ms_username')
        this.$router.push('/login')
      }
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  },
  beforeDestroy () {
    // this.$EventBus.off('testM')
  }
}
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
