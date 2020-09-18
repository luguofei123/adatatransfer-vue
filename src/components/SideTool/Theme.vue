<template>
  <div class="themeBox" ref="queryBox">
    <div class="box">
      <span>页面显示方式</span>
      <el-radio-group v-model="isShowTagList.flag">
        <el-radio :label="true">标签</el-radio>
        <el-radio :label="false">面包屑</el-radio>
      </el-radio-group>
    </div>
    <div class="box">
      <span>主题更换</span>
      <el-radio-group v-model="theme" @change="changeTheme">
        <el-radio label="theme1">主题1</el-radio>
        <el-radio label="theme2">主题2</el-radio>
      </el-radio-group>
    </div>
    <div class="box">
      <span>头部背景颜色</span>
      <el-color-picker v-model="headStyle.backgroundColor" show-alpha  :predefine="predefineColors"></el-color-picker>
    </div>
    <div class="box">
      <span>左侧背景颜色</span>
      <el-color-picker v-model="sideStyle.sideBackgroundColor" show-alpha  :predefine="predefineColors"></el-color-picker>
      <span>左侧字体颜色</span>
      <el-color-picker v-model="sideStyle.sideTextColor" show-alpha  :predefine="predefineColors"></el-color-picker>
      <span>字体激活颜色</span>
      <el-color-picker v-model="sideStyle.sideActiveTextColor" show-alpha  :predefine="predefineColors"></el-color-picker>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Theme',
  data () {
    return {
      theme: 'theme1',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  computed: {
    ...mapGetters('tagsRecord', [
      'headStyle',
      'sideStyle',
      'isShowTagList'
    ])
  },
  mounted () {
    document.addEventListener('click', this.queryHide)
  },
  // 清除click监听
  beforeDestroy () {
    document.removeEventListener('click', this.queryHide)
  },
  methods: {
    ...mapActions('tagsRecord', [
      'setThemeTool'
    ]),
    queryHide (e) {
      // this.$EventBus.$emit('testM', 'lufei')
      if ((!this.$refs.queryBox.contains(e.target)) && (!this.$parent.$children[0].$refs.queryDown.contains(e.target))) {
        /* 关闭元素 */
        this.setThemeTool()
      }
    },
    changeTheme (v) {
      console.log(v)
      // 取到我们在html上给皮肤的css留的坑并且设置路径
      let themeLink = document.querySelector('link[name="theme"]')
      let stylePath = ''
      // 如果是 开发环境
      console.log(process.env.BASE_URL)
      if (process.env.NODE_ENV === 'development') {
        stylePath = `${process.env.BASE_URL}theme/theme1.css`
      } else {
        // 生产环境
        stylePath = `${process.env.BASE_URL}theme/theme1.css`
      }
      themeLink.setAttribute('href', stylePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.themeBox{
  width:150px;
  height:400px;
  position:fixed;
  box-shadow:inset -2px -2px 8px #065EAF;
  border:1px solid #dedede;
  background: #ffffff;
  right:0;
  top:25%;
  z-index: 11;
  padding:15px;
  .box{
    padding-top: 15px;
    span{
      font-size: 16px;
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>
