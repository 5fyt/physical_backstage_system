import hyRequest from '..'

import type { loginParams, passwordParams, photoParams } from '../types/login'
export const loginOp = (data: loginParams) => {
  return hyRequest.post({
    url: '/admin/login',
    data
  })
}
/**
 * 运营端登入
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
export const updatePassword = (data: passwordParams) => {
  return hyRequest.post({
    url: '/admin/change-password',
    data
  })
}
/**
 * 运营端更换头像
 * @param data
 * @returns
 */
export const updatePhoto = (data: photoParams) => {
  return hyRequest.post({
    url: '/admin/change-photo',
    data
  })
}
