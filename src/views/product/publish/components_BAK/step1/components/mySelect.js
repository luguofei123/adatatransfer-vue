export default {
  props: {
    scopeObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  render: function (h) {
    let isDisabled = false
    if (this.scopeObj.row.billingType === '1') {
      isDisabled = true
      this.scopeObj.row.priodUnit = '1'
    } else {
    }
    let self = this
    return h('el-select', {
      props: {
        value: self.scopeObj.row.priodUnit
      },
      style: {
        width: '90px'
      },
      attrs: {
        disabled: isDisabled
      },
      on: {
        change: function (v) {
          console.log(v)
          self.scopeObj.row.priodUnit = v
          self.$emit('tablecheck')
        }
      }
    }, [
      h('el-option', {
        props: {
          key: '1',
          label: '年',
          value: '1'
        }
      }),
      h('el-option', {
        props: {
          key: '2',
          label: '月',
          value: '2'
        }
      }),
      h('el-option', {
        props: {
          key: '3',
          label: '日',
          value: '3'
        }
      })
    ])
  }
}
