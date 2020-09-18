// 图片懒加载技术
let imgloadarr = []
export default {
  // 思路 什么时候加载图片
  bind (el, binding, vnode) {
    el.src = 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
    imgloadarr = []
    // imgloadarr1.push(binding.value)
    // console.log(el.parentElement)
  },
  inserted (el, binding, vnode) {
    // console.log(el.parentElement.offsetTop)
    // console.log(el.parentElement.offsetHeight)
    // console.log(imgloadarr.length)
    el.parentElement.addEventListener('scroll', function () {
      // if (el.getBoundingClientRect().top < document.documentElement.clientHeight - 400) {
      if (imgloadarr.indexOf(binding.value) === -1) {
        if (el.getBoundingClientRect().top < (el.parentElement.offsetTop + el.parentElement.offsetHeight) && el.getBoundingClientRect().top > (el.parentElement.offsetTop - el.clientHeight)) {
          el.src = binding.value
          imgloadarr.push(binding.value)
          // console.log(imgloadarr.length)
        }
      }
    })
    // el.src = binding.value
    // console.log(el.offsetTop)
    // if (el.offsetTop < 150) {
    //   el.src = binding.value
    // }
    // imgloadarr.push(binding.value)
    // console.log(imgloadarr.length)
  },
  update (el, binding, vnode) {
  },
  componentUpdated (el, binding, vnode) {},
  unbind (el, binding, vnode) {}
}
