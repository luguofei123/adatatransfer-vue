import { isEmpty } from '@/utils/String'
/**
 *  {{ string | trim('all') }} 去除空格
 *  type
 *  all 所有空格
 *  fandb 前后空格
 *  front 前空格
 *  behind 后空格
 */
export const trim = (value, trim) => {
  switch (trim) {
    case 'all':
      return value.replace(/\s*/g, '')
    case 'fandb':
      return value.replace(/^\s+/g, '').replace(/\s+$/g, '')
    // return value.replace(/(^\s+)|(\s+$)/g, '')
    case 'front':
      return value.replace(/^\s+/g, '')
    case 'behind':
      return value.replace(/\s+$/g, '')
    default:
      return value
  }
}
/**
 * 字母大小写切换
 * type
 * 1: 首字母大写
 * 2：首页母小写
 * 3：大小写转换
 * 4：全部大写
 * 5：全部小写
 */
export const changeCase = (str, type) => {
  function ToggleCase (str) {
    let itemText = ''
    str.split('').forEach(
      function (item) {
        if (/^([a-z]+)/.test(item)) {
          itemText += item.toUpperCase()
        } else if (/^([A-Z]+)/.test(item)) {
          itemText += item.toLowerCase()
        } else {
          itemText += item
        }
      })
    return itemText
  }
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
      })
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
      })
    case 3:
      return ToggleCase(str)
    case 4:
      return str.toUpperCase()
    case 5:
      return str.toLowerCase()
    default:
      return str
  }
}
/**
 * 字符串循环复制,count->次数
*/
export const repeatStr = (str, count) => {
  if (isEmpty(str)) return '-'
  let text = ''
  for (let i = 0; i < count; i++) {
    text += str
  }
  return text
}
/**
 * 字符替换*，隐藏手机号或者身份证号等
 * replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
 * replaceStr('18819322663',[3,5,3],0)
 * result：188*****663
 * replaceStr('18819322663',[3,5,3],1)
 * result：***19322***
 * replaceStr('18819322663',[5],0)
 * result：*****322663
 * replaceStr('18819322663',[5],1,'+')
 * result："188193+++++"
*/
export const replaceStr = (str, regArr, type, lable) => {
  let regText = ''
  let Reg = null
  let replaceText = lable || '*'
  if (regArr.length === 3 && type === 0) {
    regText = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
    Reg = new RegExp(regText)
    let replaceCount = repeatStr(replaceText, regArr[1])
    return str.replace(Reg, '$1' + replaceCount + '$2')
  } else if (regArr.length === 3 && type === 1) {
    regText = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
    Reg = new RegExp(regText)
    let replaceCount1 = repeatStr(replaceText, regArr[0])
    let replaceCount2 = repeatStr(replaceText, regArr[2])
    return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
  } else if (regArr.length === 1 && type === 0) {
    regText = '(^\\w{' + regArr[0] + '})'
    Reg = new RegExp(regText)
    let replaceCount = repeatStr(replaceText, regArr[0])
    return str.replace(Reg, replaceCount)
  } else if (regArr.length === 1 && type === 1) {
    regText = '(\\w{' + regArr[0] + '}$)'
    Reg = new RegExp(regText)
    let replaceCount = repeatStr(replaceText, regArr[0])
    return str.replace(Reg, replaceCount)
  }
}
