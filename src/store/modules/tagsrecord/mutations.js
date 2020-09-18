// 一条重要的原则就是要记住 mutation 必须是同步函数
import router from '@/router/index'
const mutations = {
  SET_THEME_TOOL: (state) => {
    let isShowTheme = !state.isShowTheme
    if (isShowTheme) {
      state.isShowTheme = true
    } else {
      state.isShowTheme = false
    }
  },
  SET_COLLAPSE: (state) => {
    let isCollapse = !state.collapse
    if (isCollapse) {
      state.collapse = true
    } else {
      state.collapse = false
    }
  },
  ADD_TAGSLIST: (state, route) => {
    // console.log(route.name)
    const isExist = state.tagsList.some(item => {
      return item.path === route.fullPath
    })
    if (!isExist) {
      if (state.tagsList.length >= 8) {
        state.tagsList.shift()
      }
      state.tagsList.push({
        title: route.meta.title,
        path: route.fullPath,
        // name: route.matched[1].components.default.name
        name: route.meta.title
      })
    }
  },
  DEL_TAGSLIST: (state, index) => {
    const delItem = state.tagsList.splice(index, 1)[0]
    const curItem = state.tagsList[index] ? state.tagsList[index] : state.tagsList[index - 1]
    if (curItem) {
      delItem.path === router.currentRoute.fullPath && router.push(curItem.path)
    } else {
      router.push('/index/dashboard')
    }
  },
  SET_TAGSLIST: (state, arr) => {
    state.tagsList = arr
  },
  SET_BREADCRUBM_LIST: (state, route) => {
    // 面包屑home/table  home可以是固定不动的，只需要设置后面的table就行了，另外需要看看是不是有子菜单
    let arr = []
    if (route.matched && route.matched.length > 0) {
      route.matched.forEach((item, index) => {
        let obj = {}
        obj.title = item.meta.title
        obj.path = item.path
        obj.name = item.name
        arr.push(obj)
      })
    }
    state.breadcrumbList = arr
  }
}
export default mutations
