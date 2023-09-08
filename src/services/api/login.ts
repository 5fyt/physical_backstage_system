import hyRequest from '..'

import type { loginParams } from '../types/login'
export const login = (data: loginParams) => {
  return hyRequest.post({
    url: '/user/login',
    data
  })
}
