import Vue from 'vue'
import Vuex from 'vuex'
// 引入相应，模块
import tagsRecord from '@/store/modules/tagsrecord/index'
import auth from '@/store/modules/auth/index'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tagsRecord: tagsRecord,
    auth: auth
  }
})
