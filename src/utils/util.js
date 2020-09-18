
// 过滤对象中为null的方法函数
// export const filterNull = obj => {
//   for (let key in obj) {
//     if (obj[key] === null) {
//       delete obj[key]
//     }
//     if (seeJsType(obj[key]) === 'string') {
//       obj[key] = obj[key].trim()
//     } else if (seeJsType(obj[key]) === 'object') {
//       obj[key] = filterNull(obj[key])
//     } else if (seeJsType(obj[key]) === 'array') {
//       obj[key] = filterNull(obj[key])
//     }
//   }
//   return obj
// }
export const getUrlKey = name => {
  let part = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
  // let result = pattenr.exec(location.href)
  let result = location.search.match(part)
  return decodeURIComponent(result[1].replace(/\+/g, '%20')) || null
}
