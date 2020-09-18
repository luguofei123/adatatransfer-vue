import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import constRouter from './routerData/constRouter'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: 'dist',
  routes: [
    {
      path: '/',
      redirect: '/setDatabase',
      component: resolve => require(['@/views/Home.vue'], resolve),
      meta: { title: '主页' },
      children: [
        {
          path: 'setDatabase',
          name: 'setDatabase',
          component: resolve => require(['@/views/product/publish/setDataBase.vue'], resolve),
          meta: { title: '数据源设置', requiresAuth: false, passKey: 'setDatabase' }
        },
        {
          path: 'setDatabaserule',
          name: 'setDatabaserule',
          component: resolve => require(['@/views/product/publish/index.vue'], resolve),
          meta: { title: '数据规则设置', requiresAuth: false, passKey: 'setDatabaserule' }
        }
      ]
    }
  ]
})
// 1 根据返回的角色 设置角色
// let obj = {
//   // 根据此值渲染菜单
//   menuAuth: ['1', '2'],
//   // 根据此值判断哪个页面可以访问
//   pageAuth: ['setDatabase', 'setDatabaserule'],
//   // 根据此值判断哪个页面的哪些按钮可以操作
//   buttonAuth: {
//     role: ['add', 'delete']
//   }
// }
// 路由钩子函数
// router.beforeEach((to, from, next) => {
//   // 先判断是否登录
//   if (store.state.auth.userInfo.token === '') {
//     if (to.path === '/login') {
//       NProgress.start()
//       next()
//     } else {
//       NProgress.start()
//       next('/login')
//     }
//   } else {
//     if (store.state.auth.authInfo.pageAuth.length === 0) {
//       store.commit('auth/SET_AUTH_INFO', obj)
//       store.dispatch('auth/setAuthRouter')
//         .then(() => {
//           router.addRoutes(store.state.auth.authRoutes)
//           router.addRoutes([{ path: '*', redirect: '/403', hidden: true }])
//           NProgress.start()
//           next({
//             ...to, replace: true
//           })
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     } else {
//       NProgress.start()
//       next()
//     }
//   }
//   if (to.path.indexOf('index/') !== -1 && to.meta.title) {
//     store.commit('tagsRecord/ADD_TAGSLIST', to)
//     store.commit('tagsRecord/SET_BREADCRUBM_LIST', to)
//   }
// })
router.afterEach(transition => {
// 结束进度条
  NProgress.done()
})
export default router
