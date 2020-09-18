import { isEmpty } from '@/utils/String'
/**
 *  value 为时间格式的字符串'2018-09-14 01:05'  或 时间戳 1573612354000
 *  fmt 为需要格式化的时间样式 yyyy-MM-dd hh:mm:ss.S w q 或 MM/dd
 *  输出 如 2019-09-09 09:09:08.888 周四 4     4 表示季度
 */
export const formalDate = (value, fmt) => {
  if (isEmpty(value)) {
    return '-'
  }
  let date = new Date(value)
  // console.log(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'w+': date.getDay(), // 星期
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (k === 'w+') {
      if (o[k] === 0) {
        fmt = fmt.replace('w', '周日')
      } else if (o[k] === 1) {
        fmt = fmt.replace('w', '周一')
      } else if (o[k] === 2) {
        fmt = fmt.replace('w', '周二')
      } else if (o[k] === 3) {
        fmt = fmt.replace('w', '周三')
      } else if (o[k] === 4) {
        fmt = fmt.replace('w', '周四')
      } else if (o[k] === 5) {
        fmt = fmt.replace('w', '周五')
      } else if (o[k] === 6) {
        fmt = fmt.replace('w', '周六')
      }
    } else if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
