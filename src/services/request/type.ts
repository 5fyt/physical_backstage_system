import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface requestType<T = AxiosResponse> {
  //全部设置为可选属性
  requestSuccessFn?: (config: any) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestType<T>
}
