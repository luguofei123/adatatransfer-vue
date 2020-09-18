<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"
                 :default-active="activeRoute"
                 :collapse="collapse"
                 :active-text-color="sideStyle.sideActiveTextColor"
                 :background-color="sideStyle.sideBackgroundColor"
                 :text-color="sideStyle.sideTextColor"
                  unique-opened router>
            <template v-for="item in menuItems">
                <template v-if="item.children.length>0">
                    <el-submenu :index="item.router" :key="item.index">
                        <template slot="title">
                            <i :class="item.menuIcon"></i><span slot="title">{{ item.menuName }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu v-if="subItem.children.length>0" :index="subItem.router" :key="subItem.index">
                                <template slot="title">{{ subItem.menuName }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.router">
                                    {{ threeItem.menuName }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.router" :key="subItem.index">
                                {{ subItem.menuName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.router" :key="item.index">
                        <i :class="item.menuIcon"></i><span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { filterObjectByIdArr, deepCopySimple } from '@/utils/Object'
import menu from '@/const/menu'
export default {
  data () {
    return {
      menuItems: menu
    }
  },
  computed: {
    ...mapGetters('tagsRecord', [
      'sideStyle'
    ]),
    ...mapGetters('auth', [
      'menuAuth'
    ]),
    activeRoute () {
      return this.$route.name
    },
    collapse () {
      return this.$store.state.tagsRecord.collapse
    }
  },
  created () {
    // let obj = {
    //   // 根据此值渲染菜单
    //   menuAuth: ['3-2'],
    //   // 根据此值判断哪个页面可以访问
    //   pageAuth: [],
    //   // 根据此值判断哪个页面的哪些按钮可以操作
    //   buttonAuth: []
    // }
    // 三种方法改变state数据状态
    // 1 直接触发mutation
    // this.$store.commit('auth/SET_AUTH_INFO', obj)
    // 2 直接触发action里面的函数
    // this.$store.dispatch('auth/setAuthInfo', obj)
    // 3 利用mapactions映射处理
    // this.setAuthInfo(obj)
    // console.log(this.menuAuth)
    if (this.menuAuth.length > 0) {
      this.menuItems = filterObjectByIdArr(deepCopySimple(menu), this.menuAuth)
    }
  },
  methods: {
    // 工具函数，判断数组里面是否有该值，有返回真，没有返回假
    // arrHasValue (arr, value) {
    //   return arr.some((v) => {
    //     return v === value
    //   })
    // },
    // // 保留树结构中指定的index
    // filterAsyncMenu (menu, arr) {
    //   const accessMenu = menu.filter(item => {
    //     if (this.arrHasValue(arr, item.index)) {
    //       if (item.children && item.children.length) {
    //         item.children = this.filterAsyncMenu(item.children, arr)
    //       }
    //       return true
    //     }
    //     return false
    //   })
    //   return accessMenu
    // }
  }
}
</script>
<style scoped lang="scss">
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
