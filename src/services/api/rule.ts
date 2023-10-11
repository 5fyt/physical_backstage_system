import hyRequest from '..'
import type { searchParams, updateParams, createParams } from '../types/rule'
/**
 * 搜索折扣列表
 * @param data
 * @returns
 */
export const searchDiscount = (data: searchParams) => {
  return hyRequest.post({
    url: '/discount/search',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 更新折扣
 * @param data
 * @returns
 */
export const updateDiscount = (data: updateParams) => {
  return hyRequest.post({
    url: '/discount/update',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 创建折扣
 */
export const createDiscount = (data: createParams) => {
  return hyRequest.post({
    url: '/discount/create',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
