/**
 * 二位数组按指定字段比较排序
 * 使用 [{},{}].sort(compare('time'))
 * 默认 asc 升序
*/
export const compareArray = (propertyName, order = 'asc') => {
  return function (object1, object2) {
    let value1 = object1[propertyName]
    let value2 = object2[propertyName]
    if (order === 'asc') {
      return value1 - value2
    } else if (order === 'random') {
      return Math.random() - 0.5
    } else {
      return value2 - value1
    }
  }
}
/**
 * 准确判断数组是否含有某个值
 * 有此值 返回 true
 * 没有，返回 false
 */
export const arrHasValue = (arr, value) => {
  return arr.some((v) => {
    return v === value
  })
}
/**
 * 两数组合并后去重 采用的是es6 new set 数据结构
 */
export const distinct = (a, b) => {
  return Array.from(new Set([...a, ...b]))
}
