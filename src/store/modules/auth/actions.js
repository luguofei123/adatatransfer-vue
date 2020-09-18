// 异步提交同步任务
import asyncRouter from '@/router/routerData/asyncRouter'
import store from '@/store/index'
// 工具函数，判断数组里面是否有该值，有返回真，没有返回假
const arrHasValue = (arr, value) => {
  return arr.some((v) => {
    return v === value
  })
}
// 保留树结构中指定的index
const filterAsyncMenu = (menu, arr) => {
  const accessMenu = menu.filter(item => {
    if (arrHasValue(arr, item.meta.passKey)) {
      if (item.children && item.children.length) {
        item.children = this.filterAsyncMenu(item.children, arr)
      }
      return true
    }
    return false
  })
  return accessMenu
}
const actions = {
  setAuthInfo (context, obj) {
    context.commit('SET_AUTH_INFO', obj)
  },
  setAuthRouter (context) {
    // return new Promise((resolve, reject) => {
    const pageAuth = store.state.auth.authInfo.pageAuth
    if (pageAuth.length !== 0) {
      asyncRouter[0].children = filterAsyncMenu(asyncRouter[0].children, pageAuth)
    } else {
      asyncRouter[0].children = []
    }
    context.commit('SET_ROUTER', asyncRouter)
    // resolve()
    // })
  }
}
export default actions
