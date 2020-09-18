<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!-- <v-tags v-if="isShowTagList.flag"></v-tags>
            <v-breadcrumb v-else></v-breadcrumb> -->
            <div class="content">
                <transition name="move" mode="out-in">
                  <!-- include 指的是组件的name名称，而不是路由的name -->
                    <keep-alive include="baidu">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <transition name="sideTool">
          <v-theme v-if="isShowTheme"></v-theme>
        </transition>
    </div>
</template>

<script>
import vHead from '@/components/Layout/Header.vue'
import vSidebar from '@/components/Layout/Sidebar.vue'
import vTheme from '@/components/SideTool/Theme.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('tagsRecord', [
      'isShowTheme',
      'isShowTagList',
      'collapse',
      'tagsList'
    ])
  },
  mounted () {
    // console.log(this.tagsList)
  },
  methods: {
  },
  components: {
    vHead, vSidebar, vTheme
  }
}
</script>
<style lang="scss">
  .sideTool-enter-active {
    transition: all .3s ease;
  }
  .sideTool-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .sideTool-enter, .sideTool-leave-to {
    transform: translateX(130px);
    opacity: 0;
  }
</style>
