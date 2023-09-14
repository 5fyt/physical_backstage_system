import hyRequest from '..'

import type { loginParams } from '../types/login'
export const loginOp = (data: loginParams) => {
  return hyRequest.post({
    url: '/admin/login',
    data
  })
}
export const loginDr = (data: loginParams) => {
  return hyRequest.post({
    url: '/admin/login',
    data
  })
}
