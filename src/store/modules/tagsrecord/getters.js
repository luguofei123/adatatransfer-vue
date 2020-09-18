// 可以理解为state的计算属性
const getters = {
  doneTodos (state) {
    return state.myarr.filter(todo => todo.done)
  },
  isShowTheme (state) {
    return state.isShowTheme
  },
  isShowTagList (state) {
    return state.isShowTagList
  },
  headStyle (state) {
    return state.headStyle
  },
  sideStyle (state) {
    return state.sideStyle
  },
  collapse (state) {
    return state.collapse
  },
  tagsList (state) {
    return state.tagsList
  }
}
export default getters
