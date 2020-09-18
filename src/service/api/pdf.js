import axios from '@/service/http/http'
// import qs from 'qs'
// 登陆页面
const pdfPage = {
  // 修改密码POST /usermanager/updatePassword
  getPdfContent () {
    return axios.get('/usermanager/echo.php')
  }
  // 其他接口…………
}
export default pdfPage
