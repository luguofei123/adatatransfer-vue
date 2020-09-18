// 一条重要的原则就是要记住 mutation 必须是同步函数
// import router from '@/router/index'
const mutations = {
  SET_USER_INFO: (state, obj) => {
    state.userInfo = obj
    sessionStorage.setItem('userInfo', JSON.stringify(obj))
  },
  SET_AUTH_INFO: (state, obj) => {
    state.authInfo = obj
  },
  SET_ROUTER: (state, arr) => {
    state.authRoutes = arr
  }
}
export default mutations
