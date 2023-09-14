import hyRequest from '..'

import type { loginParams ,passwordParams} from '../types/login'
export const loginOp = (data: loginParams) => {
  return hyRequest.post({
    url: '/admin/login',
    data
  })
}
/**
 * 医生端登入
 * @param data
 * @returns
 */
export const loginDr = (data: loginParams) => {
  return hyRequest.post({
    url: '/admin/login',
    data
  })
}

export const loginOutOp = () => {
  return hyRequest.post({
    url: '/admin/logout'
  })
}
export const updatePassword=(data:passwordParams)=>{
  return hyRequest.post({
    url:'/admin/change-password',
    data
  })
}
