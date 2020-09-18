<template>
    <div class="pdfBox" ref="pdfBox">
      <div class="controllerBox">
        <el-tooltip class="item" effect="light" content="上一页" placement="top">
          <i class="el-icon-arrow-left" @click="prev"></i>
        </el-tooltip>
        <span>
          <span>{{currentPages}}</span> /
          <span>{{totalPage}}</span>
        </span>
        <el-tooltip class="item" effect="light" content="下一页" placement="top">
          <i class="el-icon-arrow-right" @click="next"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="缩小" placement="top">
          <i class="el-icon-zoom-out"  icon="minus" @click="zoomOut"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="放大" placement="top">
          <i class="el-icon-zoom-in"  addscaleicon="plus" @click="zoomIn"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="全屏阅卷" placement="top">
          <i class="el-icon-rank" @click="fullScreen"></i>
        </el-tooltip>
      </div>
      <el-scrollbar class="scrollbars" style="height:100%;overflow:hidden">
        <div class="wrapper"  :style="`width:${viewWidth}px;margin: 40px auto 0;`">
          <div ref="page" class="page" :style="`width:${viewWidth}px;`">
            <canvas ref="canvasPdf" class="canvasPdf"></canvas>
          </div>
        </div>
      </el-scrollbar>
    </div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
// ie下设置PDFJS.GlobalWorkerOptions.workerSrc，其他设置PDFJS.workerSrc
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
export default {
  name: 'PDF',
  props: ['pdfData'],
  data () {
    return {
      totalPage: 1,
      currentPages: 1,
      scale: 1.1,
      maxScale: 3.5,
      minScale: 0.6,
      viewWidth: '',
      pageRendering: false
    }
  },
  watch: {
    pdfData () {
      this.initPages(this.scale, this.currentPages)
    }
  },
  created () {
    // 初始化不能放在这里，因为此时还没有数据，所以就增加了一个数据监控，此数据变化，便会初始化
    // this.initPages(1.1, 1)
  },
  methods: {
    prev () {
      if (this.currentPages > 1 && this.currentPages <= this.totalPage) {
        this.currentPages--
        this.initPages(this.scale, this.currentPages)
      } else {
        alert('已经是第一页')
      }
    },
    next () {
      if (this.currentPages >= 1 && this.currentPages < this.totalPage) {
        this.currentPages++
        this.initPages(this.scale, this.currentPages)
      } else {
        alert('已经是最后页')
      }
    },
    // 缩小
    zoomOut () {
      if (this.scale > this.minScale) {
        this.scale = this.scale - 0.3
        this.initPages(this.scale, this.currentPages)
      } else {
        alert('已经是最小了')
      }
    },
    // 放大
    zoomIn () {
      if (this.scale < this.maxScale) {
        this.scale = this.scale + 0.3
        this.initPages(this.scale, this.currentPages)
      } else {
        alert('已经是最大了')
      }
    },
    fullScreen () {
      let element = this.$refs.pdfBox
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    initPages (scale, currentPage) {
      setTimeout(() => {
        this.renderPdf(scale, this.pdfData, currentPage)
      }, 0)
    },
    renderPdf (scale, pdfUrl, currentPage) {
      // ie下设置PDFJS.GlobalWorkerOptions.workerSrc，其他设置PDFJS.workerSrc
      // PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker')
      // PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
      // 当 PDF 地址为跨域时，pdf 应该已流的形式传输，否则会出现pdf损坏无法展示
      PDFJS.getDocument({ data: atob(pdfUrl) }).promise.then(pdf => {
        // 如果页码大于0
        if (pdf.numPages > 0) {
          this.totalPage = pdf.numPages
          this.pageRendering = false
          pdf.getPage(currentPage).then(page => {
            let pageDiv = this.$refs.page
            let viewport = page.getViewport({ scale: scale })
            let canvas = this.$refs.canvasPdf
            let context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            this.viewWidth = viewport.width
            let renderContext = {
              canvasContext: context,
              viewport
            }
            // 如果你只是展示pdf而不需要复制pdf内容功能，则可以这样写render
            // page.render(renderContext)
            // 如果你需要复制则像下面那样写利用text-layer
            page
              .render(renderContext)
              .promise
              .then(() => {
                return page.getTextContent()
              })
              .then(textContent => {
                // 创建文本图层div
                const textLayerDiv = document.createElement('div')
                textLayerDiv.setAttribute('class', 'textLayer')
                // 将文本图层div添加至每页pdf的div中
                pageDiv.appendChild(textLayerDiv)
                // 创建新的TextLayerBuilder实例
                let textLayer = new TextLayerBuilder({
                  textLayerDiv: textLayerDiv,
                  pageIndex: page.pageIndex,
                  viewport: viewport
                })
                textLayer.setTextContent(textContent)
                textLayer.render()
                this.pageRendering = true
              })
          })
        } else {
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .pdfBox {
    width: 100%;
    text-align: center;
    height: 83.5vh;
    /*margin-top 负值是为了抵消外层的padding 10px*/
    margin-top: -10px;
    z-index: 2000;
    position:relative;
  }
  .controllerBox i {
    padding: 0 10px;
    font-size: 20px;
  }
  .controllerBox {
    text-align: center;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    /*width: 100%;*/
    height: 40px;
    line-height: 40px;
    background-color: #44bfbe;
    position: absolute;
    left: -10px;
    right:-10px;
    top: 0px;
    z-index: 1999;
    cursor: pointer;
    i {
      padding: 0 10px;
      font-size: 20px;
    }
  }
  .canvasPdf {
    margin: 0 auto;
  }
  .page {
    background: #fff;
    border: 1px solid #d8dce6;
    border-radius: 4px;
    border-bottom: none;
    position: relative;
  }
</style>
