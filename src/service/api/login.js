import axios from '@/service/http/http'
import qs from 'qs'
// 登陆页面
const loginPage = {
  // 登陆
  login (params) {
    return axios.post('/usermanager/login.php', qs.stringify(params))
  },
  // 修改密码POST /usermanager/updatePassword
  changePassword (params) {
    return axios.post('/usermanager/updatePassword', qs.stringify(params))
  },
  // 单个的请求 修改请求头部信息
  login1 (params) {
    return axios.post('/usermanager/login', params, {
      timeout: 5000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  // 另一种写法
  login2 (params) {
    const query = qs.stringify(params)
    return axios({
      url: `/usermanager/login?${query}`,
      method: 'POST',
      data: params
    })
  }
  // 其他接口…………
}
export default loginPage
