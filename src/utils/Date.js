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
/**
 * 口诀 4年一润，百年不润，400年一润   1900是平年
 *  判断是否是闰年 1 年份是4的倍数，但不是100的倍数 2 年份数是400的倍数
 *  输入年份
 *  返回true，是闰年 false 不是闰年
 */
export const isLeapYear = (year) => {
  if (year / 4 === 0 && year / 100 !== 0) {
    return true
  } else if (year / 400 === 0) {
    return true
  } else {
    return false
  }
}
/**
 *  判断某年某月有多少日
 *  输入年份，月份
 *  返回天数
 */
export const getDayNumberByYearMonth = (year, month) => {
  let d
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      d = 31
      break
    case 4:
    case 6:
    case 9:
    case 11:
      d = 30
      break
    case 2:
      d = isLeapYear(year) ? 29 : 28
      break
  }
  return d
}
