// 可以理解为state的计算属性
const getters = {
  menuAuth (state) {
    // 处理menuAuth的逻辑
    let tempArr = state.authInfo.menuAuth.slice()
    let splitArr = []
    let tempIndex = 0
    state.authInfo.menuAuth.forEach((value) => {
      splitArr = value.split('-')
      tempIndex = splitArr.length - 1
      switch (tempIndex) {
        case 1:
          tempArr.push(splitArr[0])
          break
        case 2:
          tempArr.push(splitArr[0])
          tempArr.push(splitArr[0] + '-' + splitArr[1])
          break
        default:
          break
      }
    })
    tempArr = [...new Set(tempArr)]
    return tempArr
  },
  pageAuth (state) {
    return state.authInfo.pageAuth
  },
  buttonAuth (state) {
    return state.authInfo.buttonAuth
  }
}
export default getters
