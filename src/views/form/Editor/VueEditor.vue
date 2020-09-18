<template>
  <div class="container">
    <div class="plugins-tips">
      Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
      访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
    </div>
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'editor',
  data () {
    return {
      content: '',
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    submit () {
      console.log(this.content)
      this.$message.success('提交成功！')
    }
  }
}
</script>
<style  lang="scss">
  .editor-btn{
    margin-top: 20px;
  }
  .plugins-tips {
    padding: 20px 10px;
    margin-bottom: 20px;
    background: #eef1f6;
  }
  .ql-container {
  min-height: 400px;
  }
  .ql-snow .ql-tooltip {
  transform: translateX(117.5px) translateY(10px) !important;
  }
  .editor-btn {
  margin-top: 20px;
  }
</style>
