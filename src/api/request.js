import axios from 'axios'
//引入进度条
import nProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  //配置对象
  //基础路径
  baseURL: '/api',
  timeout: 5000
})
//请求拦截器:在发请求时，请求拦截器可以检测到，并做一些配置
requests.interceptors.request.use((config) => {
  //进度条开始动
  nProgress.start()
  if (config.method != 'get') {
    if (store.state.detail.nanoid_token) {
      config.headers.userTempId = store.state.detail.nanoid_token
    }
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
  //进度条结束
  nProgress.done()
  return res.data
}, (err) => {
  return Promise.reject(new Error('faile'))
})

export default requests