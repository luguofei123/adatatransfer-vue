// 刷新页面，数据仍然保留的方法目前至少有3种
// 1 直接将数据写如state，每次刷新直接从本地存储获取
// 2 路由跳转前判断缓存是否有token，有的话就执行store.commit('setToken'),将token写入到state
// 3 页面刷新会执行页面一个事件，在此事件中执行store.commit('setToken')，将token写入state
const state = {
  isShowTheme: false,
  // 不是严格模式下 state的数据要是绑定了表单，可以自动实现双向绑定，无需在mutation和action中改变state中的变量
  // 直接双向绑定不能是直接变量，应该是一个对象的属性，这样才能双向绑定
  // 严格模式下，state的变化只能在mutation中改变，此时v-model直接帮顶会报错
  // <input :value="message" @input="updateMessage">
  //  message: {
  //     get () {
  //       return this.$store.state.obj.message
  //     },
  //     set (value) {
  //       this.$store.commit('updateMessage', value)
  //     }
  //   }
  // mutation去改变值
  headStyle: {
    backgroundColor: '#242f42'
  },
  sideStyle: {
    sideBackgroundColor: '#324157',
    sideTextColor: 'rgb(191, 203, 217)',
    sideActiveTextColor: 'rgb(32, 160, 255)'
  },
  collapse: false,
  tagsList: [],
  breadcrumbList: ['home', 'table'],
  isShowTagList: {
    flag: true
  }
}
export default state
