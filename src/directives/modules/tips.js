// 提示指令
export default {
  bind (el, binding, vnode) {
    let flag = false
    console.log(el.parentNode)
    // let elementui = el.children[0]
    el.onmouseover = function () {
      console.log(11)
      if (!flag) {
        let newEle = document.createElement('div')
        // 对父元素的定位做出判断
        let positionP = getComputedStyle(el, null).getPropertyValue('position')
        if (positionP === 'static') {
          el.style.position = 'relative'
        }
        newEle.id = 'tip'
        // newEle.className = 'tips ' + Object.keys(binding.modifiers)
        let left
        let top
        let tipsPosition = Object.keys(binding.modifiers)[0]
        switch (tipsPosition) {
          case 'left':
            top = 0
            left = '-12px'
            break
          case 'right':
            top = 0
            left = '12px'
            break
          case 'top':
            top = '-12px'
            left = 0
            break
          case 'bottom':
            top = '12px'
            left = 0
            break
        }
        newEle.innerHTML = binding.value
        newEle.style.position = 'absolute'
        newEle.style.fontSize = '12px'
        newEle.style.top = top
        newEle.style.left = left
        newEle.style.color = 'red'
        newEle.style.padding = '3px 6px'
        newEle.style.background = '#000'
        el.append(newEle)
        flag = true
      }
    }
    el.onmouseout = function () {
      document.getElementById('tip').remove()
      flag = false
    }
  },
  inserted (el, binding, vnode) {},
  update (el, binding, vnode) {},
  componentUpdated (el, binding, vnode) {},
  unbind (el, binding, vnode) {}
}
