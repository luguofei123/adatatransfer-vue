import axios from '@/service/http/http'
import qs from 'qs'
// 登陆页面
export function login (params) {
  return axios.post('/usermanager/login.php', qs.stringify(params))
}
