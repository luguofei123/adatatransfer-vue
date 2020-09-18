/**
 * 清除字符串前后的空格
 */
export const strTrim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
/**
 * 判断字符串是否为空
 */
export const isEmpty = str => {
  return strTrim(str) === '' || str === null || str === undefined
}
/**
 * 返回字节真实字节长度 中文占2字节，英文占1字节 ；
 * 利用charCodeAt 返回0-65535之间的整数，如果<=255 则是英文，反之是中文；
 */
export const getStrBytes = str => {
  let strLen = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 255) {
      // 中文，字节 2
      strLen += 2
    } else {
      strLen += 1
    }
  }
  return strLen
}
