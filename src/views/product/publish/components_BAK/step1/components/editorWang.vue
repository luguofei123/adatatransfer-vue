<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>
<script>
import Editor from 'wangeditor'
// import XSS from 'xss'
export default {
  props: {
    initContent: {
      type: String,
      default: '<p>请输入内容...</p>'
    }
  },
  watch: {
    // 此步观察略显多余，保存成功或不成功，编辑器显示的内容都不会变化。
    // initContent (v) {
    //   this.editorContent = v
    //   this.editor.txt.html(v)
    // }
  },
  data () {
    return {
      editor: null,
      editorContent: this.initContent
    }
  },
  mounted () {
    // 初始化编辑器对象
    this.editor = new Editor(this.$refs.editor)
    // 关闭粘贴内容中的样式
    this.editor.customConfig.pasteFilterStyle = false
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = false
    // 将图片大小限制为 5M
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
    // 限制一次最多上传 1 张图片
    this.editor.customConfig.uploadImgMaxLength = 1
    // this.editor.customConfig.emotions = []
    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    // 使用 base64 保存图片
    this.editor.customConfig.uploadImgShowBase64 = false
    // 设置文件上传的参数名称
    this.editor.customConfig.uploadFileName = 'myFile'
    // 上传图片到服务器
    this.editor.customConfig.uploadImgServer = '/upload'
    // 上传参数dstPath 参数名称  main-img 参数值
    this.editor.customConfig.uploadImgParams = {
      dstPath: 'main-img'
    }
    // 隐藏“网络图片”tab
    this.editor.customConfig.showLinkImg = false
    // 实时监控文本内容变化
    this.editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      customInsert: function (insertImg, result, editor) {
        let url = result.data
        console.log('image url = ' + url)
        insertImg(url)
      }
    }
    this.editor.customConfig.onchange = (html) => {
      // this.editorContent = html
      this.$emit('updateContent', html)
      // let json = this.editor.txt.getJSON()
      // let jsonStr = JSON.stringify(json)
      // this.editorContent = jsonStr
    }
    this.editor.create()
    // 初始化编辑器的内容，一般这个内容是从后台传过来的，这个地方应该用异步操作
    setTimeout(() => {
      this.editor.txt.html(this.initContent)
    }, 500)
  },
  methods: {
    cleanContent () {
      this.editor.txt.clear()
    },
    submitContent () {
      // alert(this.editorContent)
      this.$emit('submit', this.editorContent)
    }
  }
}
</script>
<style  lang="scss" scoped>
  .editor-btn {
    margin-top: 20px;
  }
  /* table 样式 */
  table {
    border-top: 10px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
</style>
