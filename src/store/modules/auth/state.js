// 刷新页面，数据仍然保留的方法目前至少有3种
// 1 直接将数据写如state，每次刷新直接从本地存储获取
// 2 路由跳转前判断缓存是否有token，有的话就执行store.commit('setToken'),将token写入到state
// 3 页面刷新会执行页面一个事件，在此事件中执行store.commit('setToken')，将token写入state
const state = {
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {
    userName: 'luguofei',
    userId: 1,
    token: '123abc'
  },
  authInfo: {
    // 根据此值渲染菜单
    menuAuth: [],
    // 根据此值判断哪个页面可以访问
    pageAuth: [],
    // 根据此值判断哪个页面的哪些按钮可以操作
    buttonAuth: {}
  },
  authRoutes: [{
    children: false
  }]
}
export default state
