import hyRequest from '..'

import type { loginParams, passwordParams, photoParams } from '../types/login'
/**
 * 运营端登入
 * @param data
 * @returns
 */
export const login = (data: loginParams, type: string) => {
  return hyRequest.post({
    url: `/${type}/login`,
    data
  })
}

/**
 *退出登入
 * @returns
 */
export const loginOut = (type: string) => {
  return hyRequest.post({
    url: `/${type}/logout`
  })
}

/**
 * 更改密码
 * @param data
 * @returns
 */
export const updatePassword = (data: passwordParams, type: string) => {
  return hyRequest.post({
    url: `/${type}/change-password`,
    data
  })
}
/**
 * 更换头像
 * @param data
 * @returns
 */
export const updatePhoto = (data: photoParams, type: string) => {
  return hyRequest.post({
    url: `/${type}/confirm-photo`,
    data
  })
}
