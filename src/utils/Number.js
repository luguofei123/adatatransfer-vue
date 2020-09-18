/**
 *  获取两个数之间的随机数 两个值不分大小先后
 */
export const randomBetweenAB = (a, b) => {
  a = +a || 0
  b = +b || 0
  return Math.random() * (b - a) + a
}
/**
 *  js判断两数是否相等
 */
export const approxEqual = (a, b, epsilon = 0.0001) => {
  return Math.abs(a - b) < epsilon
}
