// 聚焦指令
export default {
  bind (el, binding, vnode) {},
  inserted (el, binding, vnode) {
    // 原生的input
    // el.focus()
    // elementUI 的input
    el.children[0].focus()
  },
  update (el, binding, vnode) {},
  componentUpdated (el, binding, vnode) {},
  unbind (el, binding, vnode) {}
}
