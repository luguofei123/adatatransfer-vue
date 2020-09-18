<!--
 * @Author: sunch
 * @Date: 2020-06-22 11:04:36
 * @LastEditTime: 2020-08-24 10:49:22
 * @LastEditors: Please set LastEditors
 * @Description: 账表辅助项多选树
 * @FilePath: /agla-fe-8.50/vuedev/src/views/gl/rpt/components/RptQryItemsTreeSelect.vue
-->
<template>
  <div ref="rptTree" class="rptTreeSelectWrap">
    <div class="rptTreeSearchWrap">
      <slot name="icon"></slot>
      <input
        type="text"
        v-model="searchText"
        @focus="searchFocus($event)"
        :placeholder="placeholder"
      />
      <!-- <a-icon type="close" v-show="searchText" class="clear" @click="searchClear" /> -->
      <i v-show="searchText" class="el-icon-close clear" @click="searchClear"></i>
    </div>

    <transition name="myfade">
      <div
        class="rptTreeOptionsWrap"
        ref="treeWrap"
        :class="dropdownClassName"
        :style="dropdownStyle"
      >
        <ztree
          :setting="setting"
          :nodes="treeData"
          :selectNodeCode="selectNodeCode"
          :searchNodeCode="searchNodeCode"
          @onClick="onClick"
          @onSelect="onSelect"
          @searchScrollTo="searchScrollTo"
        ></ztree>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'RptTreeSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    allowClear: {
      // 是否带有清除按钮
      type: Boolean,
      default: false
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    dropdownClassName: {
      // 下拉列表的样式名
      type: String,
      default: ''
    },
    dropdownStyle: {
      // 下拉菜单的样式
      type: Object,
      default: () => {
        return {}
      }
    },
    placeholder: {
      // 选择框默认文字
      type: String,
      default: ''
    },
    treeData: {
      // treeNodes 数据
      type: Array,
      default: () => {
        return []
      }
    },
    treeDefaultExpandAll: {
      // 默认展开所有树节点
      type: Boolean,
      default: false
    },
    treeCheckable: {
      // 是否有多选框
      type: Boolean,
      default: false
    },
    checkedCodes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 搜索的内容
      searchText: '',
      // 选择了哪个node
      selectNodeCode: '',
      // 使用搜索筛选出的code
      searchNodeCode: '',
      setting: {
        data: {
          key: {
            name: 'codeName'
          },
          simpleData: {
            enable: true
          }
        },
        // check: {
        //   enable: this.treeCheckable,
        // },
        view: {
          showLine: false,
          showIcon: false,
          nodeClasses: function (treeId, treeNode) {
            return treeNode.highlight
              ? { add: ['searchBg'] }
              : { remove: ['searchBg'] }
          }
        },
        callback: {
          /**
           * @description: 判断是否能点击
           */
          beforeClick: (treeId, treeNode) => {
            if (this.treeCheckable) {
              return false
            } else {
              if (treeNode.isLeaf === 1) {
                return true
              } else {
                return false
              }
            }
          }
        }
      },
      // 控制下拉列表的隐藏显示
      treeVisible: false,
      // 搜索的loading
      searchLoading: false
    }
  },
  mounted () {
    this.searchText = ''
    if (this.value) {
      this.selectNodeCode = this.value
    }
    document.addEventListener('click', (e) => {
      if (this.$refs.rptTree) {
        if (!this.$refs.rptTree.contains(e.target)) {
          this.treeVisible = false
        }
      }
    })
  },
  watch: {
    /**
     * @description: 搜索框内容变化
     */
    searchText (val) {
      this.$emit('search', val)
      if (val) {
        this.searchLoading = true
        let arr1 = this.treeData.filter((item) => {
          return item.code === val && item.isLeaf === 1
        })
        let arr2 = this.treeData.filter((item) => {
          return item.codeName.indexOf(val) > -1 && item.isLeaf === 1
        })
        let arr = arr1.concat(arr2)
        if (arr.length > 0) {
          this.searchNodeCode = arr[0].code
        } else {
          this.searchNodeCode = ''
        }
        this.searchLoading = false
      } else {
        this.searchNodeCode = ''
      }
    },
    value (val) {
      console.log(val)
      // this.searchText = ''
      if (val) {
        this.selectNodeCode = val
      }
    }
  },
  methods: {
    searchFocus (event) {
      event.currentTarget.select()
      this.treeVisible = true
    },
    onClick (...arg) {
      this.treeVisible = false
      if (arg[2].code) {
        console.log('点击了item: ', arg[2].codeName)
        this.searchText = arg[2].codeName
        this.selectNodeCode = arg[2].code
        this.$emit('change', { title: arg[2].codeName, value: arg[2].code })
      } else {
        this.searchText = ''
        this.selectNodeCode = ''
        this.$emit('change', { title: '', value: '' })
      }
    },
    onSelect (node) {
      this.treeVisible = false
      if (node) {
        // console.log('选择了item: ', node.codeName)
        this.searchText = node.codeName
        this.selectNodeCode = node.code
        this.$emit('change', { title: node.codeName, value: node.code })
      } else {
        this.searchText = ''
        this.selectNodeCode = ''
        this.$emit('change', { title: '', value: '' })
      }
    },
    searchClear () {
      this.treeVisible = true
      this.searchText = ''
      this.$emit('clear')
    },
    searchScrollTo (val) {
      let el = this.$refs.treeWrap
      this.$(el).scrollTop(val)
    }
  }
}
</script>
<style lang="scss">
.rptTreeSelectWrap {
  // width: 220px;
  height: 30px;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.rptTreeSearchWrap {
  width: 100%;
  height: 100%;
  padding: 5px 20px 5px 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
}
.rptTreeSearchWrap input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
}
.rptTreeOptionsWrap {
  position: absolute;
  top: 30px;
  left: 0;
  width: 305px;
  max-height: 200px;
  box-sizing: border-box;
  padding: 5px 10px;
  overflow: auto;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #fff;
  z-index: 9;
}
.clear {
  display: none;
  font-size: 10px;
  font-weight: bold;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-5px);
  cursor: pointer;
}
.rptTreeSearchWrap:hover .clear {
  display: inline-block;
}
.searchBg {
  background-color: #c9e9f7;
}
</style>
