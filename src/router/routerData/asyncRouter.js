let asyncRouter = [
  {
    path: '/index',
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
export default asyncRouter
