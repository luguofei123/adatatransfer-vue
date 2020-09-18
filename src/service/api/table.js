import axios from '@/service/http/http'
import qs from 'qs'
// 页面
const tablePage = {
  // 获取表格数据
  getData (params) {
    return axios.post('/usermanager/table.php', qs.stringify(params))
  }
  // 其他接口…………
}
export default tablePage
