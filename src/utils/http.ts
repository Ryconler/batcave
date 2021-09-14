import axios from 'axios'

const http = axios.create()

http.defaults.withCredentials = true
http.interceptors.request.use(
  (config) => {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 身份认证错误
      console.log('请登录')
      location.href = `//www.wzmxx.com/login.html?referrer=${location.href}`
    } else {
      return Promise.reject(error)
    }
  }
)

// 新建一个axios实例专门用来传multipart/form-data类型的数据
const httpForm = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' }
})
httpForm.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // 身份认证错误
      console.log('请登录')
      location.href = `//www.wzmxx.com/login.html?referrer=${location.href}`
    } else {
      return Promise.reject(error)
    }
  }
)

export { http, httpForm }
