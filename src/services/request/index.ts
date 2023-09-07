import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { requestConfig } from './type'

class HYRequest {
  //声明instance实例成员的类型，可以是any类型但是不够友好
  instance: AxiosInstance //axios创建的是这个类型那就用这也类型
  //构造函数里面传入baseURL，timeout，headers这些参数，可以直接传入一个config
  constructor(config: requestConfig) {
    this.instance = axios.create(config)

    //拦截器interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功拦截')
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = token
        }
        return config
      },
      (err) => {
        // console.log('全局请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局相应成功的拦截')
        return res.data
      },
      (err) => {
        // console.log('全局响应失败后的拦截')
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }
  //执行实例中的局部拦截器

  //对axios实例的request方法进行二次封装：以免当第三方库不在维护时引起不可逆的麻烦
  //单次请求拦截器
  request<T = any>(config: requestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: requestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: requestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: requestConfig<T>) {
    return this.request({ ...config, method: 'delete' })
  }
  patch<T = any>(config: requestConfig<T>) {
    return this.request({ ...config, method: 'patch' })
  }
}
export default HYRequest
