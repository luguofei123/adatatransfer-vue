/**
 * 节流函数  一段时间内只执行一次，多次调用，只执行最后一次
 */
export const throttle = (method, context) => {
  clearTimeout(method.tId)
  method.tId = setTimeout(() => {
    method.call(context)
  }, 1000)
}
/**
 * 延迟函数 作用是什么？
 */
export const sleep = duration => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}
