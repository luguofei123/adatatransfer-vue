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
      this.scopeObj.row.priod = '99'
      this.scopeObj.row.priodUnit = '1'
    } else {
    }
    let self = this
    return h('el-input', {
      props: {
        value: self.scopeObj.row.priod
      },
      style: {
        width: '100px'
      },
      attrs: {
        disabled: isDisabled
      },
      on: {
        input: function (value) {
          console.log(value)
          self.scopeObj.row.priod = value
        },
        change: function () {
          self.$emit('tablecheck')
        }
      }
    })
  }
}
