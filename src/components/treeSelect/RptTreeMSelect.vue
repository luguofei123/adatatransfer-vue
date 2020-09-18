<!--
 * @Author: sunch
 * @Date: 2020-06-22 11:04:36
 * @LastEditTime: 2020-09-04 17:05:49
 * @LastEditors: Please set LastEditors
 * @Description: 账表辅助项多选树
 * @FilePath: /agla-fe-8.50/vuedev/src/views/gl/rpt/components/RptQryItemsTreeSelect.vue
-->
<template>
  <div ref="rptTree" class="rptTreeSelectWrap">
    <div class="rptTreeSearchWrap">
      <slot name="icon"></slot>
      <div v-if="treeCheckable" style="width: 100%;height: 100%">
        <input
          ref="checkSearchInput"
          v-show="treeVisible"
          type="text"
          v-model="searchText"
          @keyup="onSearchKeyUp"
          @focus="searchFocus($event)"
        />
        <div
          v-show="!treeVisible"
          :class="checkedContent ? 'showChecked' : 'placeholder'"
          @click="onClickInput"
        >{{ checkedContent ? checkedContent : placeholder }}</div>
      </div>
      <div v-else style="width: 100%;height: 100%">
        <input type="text" v-model="searchText" @keyup="onSearchKeyUp" @focus="searchFocus($event)"
        :placeholder="placeholder" />
      </div>
      <a-icon type="close" v-show="searchText" class="clear" @click="searchClear" />
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
          @onCreated="onZtreeCreated"
          :selectNodeCode="selectNodeCode"
          :searchNodeCode="searchNodeCode"
          :checkedNodeCodes="checkedNodeCodes"
          @onCheck="onCheck"
          @onClick="onClick"
          @onSelect="onSelect"
          @searchScrollTo="searchScrollTo"
        ></ztree>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "RptTreeSelect",
  props: {
    value: [String, Array],
    itemType: { //辅助项类别
      type: String,
      default: '',
    },
    allowClear: {
      //是否带有清除按钮
      type: Boolean,
      default: false,
    },
    disabled: {
      //是否禁用
      type: Boolean,
      default: false,
    },
    dropdownClassName: {
      //下拉列表的样式名
      type: String,
      default: "",
    },
    dropdownStyle: {
      //下拉菜单的样式
      type: Object,
      default: () => {
        return {};
      },
    },
    placeholder: {
      //选择框默认文字
      type: String,
      default: "",
    },
    treeData: {
      //treeNodes 数据
      type: Array,
      default: () => {
        return [];
      },
    },
    treeDefaultExpandAll: {
      //默认展开所有树节点
      type: Boolean,
      default: false,
    },
    treeCheckable: {
      //是否有多选框
      type: Boolean,
      default: true,
    },
    defaultCheckedAll:  {
      //多选状态下 初始选中所有
      type: Boolean,
      default: false,
    },
    checkedCodes: {
      type: Array,
      default: () => {
        return [];
      },
    },
    maxTagCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      searchText: "", //搜索的内容
      selectNodeCode: "", //选择了哪个node
      searchNodeCode: "", //使用搜索筛选出的code
      checkedContent: "", //勾选了的label内容
      checkedNodeCodes: [], //勾选了的codes
      setting: {
        data: {
          key: {
            name: "codeName",
          },
          simpleData: {
            enable: true,
          },
        },
        check: {
          enable: this.treeCheckable,
        },
        view: {
          showLine: true,
          showIcon: true,
          nodeClasses: function (treeId, treeNode) {
            return treeNode.highlight
              ? { add: ["searchBg"] }
              : { remove: ["searchBg"] };
          },
        },
        callback: {
          /**
           * @description: 判断是否能点击
           */
          beforeClick: (treeId, treeNode) => {
            if (this.treeCheckable) {
              return false;
            } else {
              if (treeNode.isLeaf === 1) {
                return true;
              } else {
                return false;
              }
            }
          },
        },
      },
      treeVisible: false, //控制下拉列表的隐藏显示
      searchLoading: false, //搜索的loading
    };
  },
  mounted() {
    this.searchText = ''
    if (this.value) {
      if(this.treeCheckable){
        this.checkedNodeCodes = this.value
      }else{
        this.selectNodeCode = this.value
      }
    }
    document.addEventListener("click", (e) => {
      if (this.$refs.rptTree) {
        if (!this.$refs.rptTree.contains(e.target)) {
          this.treeVisible = false;
        }
      }
    });
  },
  watch: {
    /**
     * @description: 搜索框内容变化
     */
    searchText(val) {
      this.$emit("search", val);
      if (val) {
        this.searchLoading = true;
        let arr1 = this.treeData.filter((item) => {
          return item.code === val && item.isLeaf === 1;
        });
        let arr2 = this.treeData.filter((item) => {
          return item.codeName.indexOf(val) > -1 && item.isLeaf === 1;
        });
        let arr = arr1.concat(arr2);
        if (arr.length > 0) {
          this.searchNodeCode = arr[0].code;
        } else {
          this.searchNodeCode = "";
        }
        this.searchLoading = false;
      } else {
        this.searchNodeCode = "";
      }
    },
    /**
     * @description: v-model或value变化
     */
    value(newVal, oldVal) {
      // console.log('value改变: ', newVal, oldVal)
      if (newVal) {
        if(this.treeCheckable){
          this.checkedNodeCodes = newVal
        }else{
          this.selectNodeCode = newVal
        }
      } else {
        this.searchText = "";
      }
    }
  },
  methods: {
    ...mapActions([
      "setQrySelectItemData"
    ]),
    onSearchKeyUp(e) {
      if (e.keyCode === 13) {
        //如果按回车键
        ++this.keyCur;
        if (this.searchResult.length === 0) {
          this.keyCur = 0;
          this.$message.info("最后1个");
        } else if (this.keyCur > this.searchResult.length - 1) {
          this.keyCur = 0;
          this.$message.info("第1个");
        } else if (this.keyCur === this.searchResult.length - 1) {
          this.$message.info(`最后1个`);
        } else {
          this.$message.info(`第${this.keyCur + 1}个`);
        }
        this.searchNodeCode = this.searchResult[this.keyCur].code;
      }
    },
    /**
     * @description: ztree创建成功的回调
     */
    onZtreeCreated(treeObj) {
      // console.log('ztree创建成功')
      if(this.treeCheckable){
        if(this.defaultCheckedAll){
          treeObj.checkAllNodes(true);
          this.checkedContent = '全部'
        } else{
          if(this.value instanceof Array){
            this.value.forEach(code => {
              let node = treeObj.getNodeByParam("code", code);
              treeObj.checkNode(node, true, true);
            })
            let flag = treeObj.getNodes().every(node => { return node.checked })
            if(flag){
              this.checkedContent = '全部'
              this.setQrySelectItemData({ itemType: this.itemType, code: [] })
            }
          }
        }
      }
    },
    onClickInput() {
      this.treeVisible = true;
      this.$nextTick(()=>{
        this.$refs.checkSearchInput.focus()
      })
    },
    searchFocus(event) {
      event.currentTarget.select();
      this.treeVisible = true;
    },
    onClick(...arg) {
      if (this.checkable) {
        var zTree = $.fn.zTree.getZTreeObj(arg[1]);
        zTree.checkNode(arg[2], !arg[2].checked, true, true);
      } else {
        this.treeVisible = false;
        if (arg[2].code) {
          this.searchText = arg[2].codeName;
          this.selectNodeCode = arg[2].code;
          this.$emit("change", { title: arg[2].codeName, value: arg[2].code });
        } else {
          this.searchText = "";
          this.selectNodeCode = "";
          this.$emit("change", { title: "", value: "" });
        }
      }
    },
    onCheck(...arg) {
      // console.log(arg);
      let treeObj = $.fn.zTree.getZTreeObj(arg[1]);
      let nodes = treeObj.getCheckedNodes(true);
      // console.log(nodes);
      let codes = [],
        names = [];
      nodes.forEach((node) => {
        if (!node.isParent) {
          codes.push(node.code);
          names.push(node.name);
        }
      });
      if (this.maxTagCount) {
        if (names.length > this.maxTagCount) {
          this.checkedContent = names.join("，"); //!!!注意都是以中文逗号做的分隔
        } else {
          // this.searchText = names[0]
          this.checkedContent = names.slice(0, this.maxTagCount).join("，");
        }
      } else {
        this.checkedContent = names.join("，");
      }
      this.$emit("change", { value: codes });
    },
    onSelect(node) {
      this.treeVisible = false;
      if (node) {
        // console.log('选择了item: ', node.codeName)
        this.searchText = node.codeName;
        this.selectNodeCode = node.code;
        this.$emit("change", { title: node.codeName, value: node.code });
      } else {
        this.searchText = "";
        this.selectNodeCode = "";
        this.$emit("change", { title: "", value: "" });
      }
    },
    searchClear() {
      this.treeVisible = true;
      this.searchText = "";
      this.$emit("clear");
    },
    searchScrollTo(val) {
      let el = this.$refs.treeWrap;
      this.$(el).scrollTop(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.rptTreeSelectWrap {
  width: 220px;
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
.rptTreeSearchWrap input,
.rptTreeSearchWrap .showChecked,
.rptTreeSearchWrap .placeholder {
  width: 100%;
  height: 100%;
  line-height: 18px;
  border: 0;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding-left: 5px;
}
.placeholder {
  color: #cdcdcd;
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
