import store from '@/store/index'
import router from '@/router/index'
// 根据用户权限决定是否显示该按钮
const arrHasValue = (arr, value) => {
  return arr.some((v) => {
    return v === value
  })
}
export default {
  bind (el, binding, vnode) {
    // el.setAttribute('disabled', true)
  },
  inserted (el, binding, vnode) {
    let tagName = el.tagName
    let buttonAuth = store.state.auth.authInfo.buttonAuth
    let passKey = router.currentRoute.meta.passKey
    // console.log(buttonAuth)
    switch (tagName) {
      case 'BUTTON':
        if (buttonAuth[passKey] && buttonAuth[passKey].length > 0 && arrHasValue(buttonAuth[passKey], Object.keys(binding.modifiers)[0])) {
          el.setAttribute('disabled', true)
          el.setAttribute('title', '没有权限查看')
          el.classList.add('is-disabled')
          el.style.color = '#c8c5ce'
        }
        break
      case 'A':
        if (buttonAuth[passKey] && buttonAuth[passKey].length > 0 && arrHasValue(buttonAuth[passKey], Object.keys(binding.modifiers)[0])) {
          let button = document.createElement('button')
          button.innerHTML = el.innerHeight
          button.setAttribute('disabled', true)
          button.setAttribute('title', '没有权限查看')
          button.style.border = 'none'
          button.style.backgroundColor = 'none'
          button.style.padding = '5px'
          el.style = {}
          el.innerHTML = ''
          el.onclick = null
          el.appendChild(button)
        }
        break
      default:
        break
    }
  },
  update (el, binding, vnode) {
  },
  componentUpdated (el, binding, vnode) {
  },
  unbind (el, binding, vnode) {
  }
}
