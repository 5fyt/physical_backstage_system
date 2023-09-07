// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // console.log('局部请求成功拦截')
      // const token = localCache.getItem(TOKEN_LOGIN)
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`
      // }

      return config
    },
    requestFailureFn: (err) => {
      // console.log('局部请求失败拦截')
      return err
    },
    responseFailureFn: (err) => {
      // console.log('局部响应失败拦截')
      return err
    },
    responseSuccessFn: (res) => {
      // console.log('局部响应响应成功拦截')
      return res
    }
  }
})

export default hyRequest
