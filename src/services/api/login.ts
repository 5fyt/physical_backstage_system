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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

/**
 *退出登入
 * @returns
 */
export const loginOut = (type: string) => {
  return hyRequest.post({
    url: `/${type}/logout`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
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
    url: `/${type}/update-photo`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 上传头像
 * @param data formData 表单数据
 * @param type
 * @returns
 */
export const loadPhoto = (data: any, type: string) => {
  return hyRequest.post({
    url: `${type}/apply-upload-photo`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
