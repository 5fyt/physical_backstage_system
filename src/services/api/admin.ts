import hyRequest from '..'
import { addParams, deleteParams } from '../types/user'

/**
 *
 * @param data  当前页，返回页数
 * @returns
 */
export const searchUser = (data = { page: 1, size: 6 }, type: string) => {
  return hyRequest.post({
    url: `/${type}/search`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 添加用户
 * @param data
 * @param type
 * @returns
 */
export const addUser = (data: addParams, type: string) => {
  return hyRequest.post({
    url: `/${type}/create`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

/**
 *删除用户
 * @param data
 * @param type
 * @returns
 */
export const deleteUser = (data: deleteParams, type: string) => {
  return hyRequest.post({
    url: `/${type}/delete`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
