import Vue from 'vue'
// 全局注册组件
import tipsBar from '@/components/AlertMessage/tipsBar'
import ztree from '@/components/treeSelect/ztree'
import RptTreeSelect from '@/components/treeSelect/RptTreeSelect'
import RptTreeMSelect from '@/components/treeSelect/RptTreeMSelect'
import RptTree from '@/components/treeSelect/RptTree'
import ufModal from '@/components/dialog/ufModal'
Vue.component('tips-bar', tipsBar)
Vue.component('ztree', ztree)
Vue.component('RptTreeSelect', RptTreeSelect)
Vue.component('RptTreeMSelect', RptTreeMSelect)
Vue.component('RptTree', RptTree)
Vue.component('ufModal', ufModal)
