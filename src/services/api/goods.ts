import hyRequest from '..'
import { Type, updateParams, addParams } from '../types/goods'

/**
 * 搜索商品类型option
 * @returns
 */
export const getTypes = () => {
  return hyRequest.get({
    url: '/goods/type'
  })
}
/**
 * 搜索商品数据
 * @param data 默认从第一页开始，页数十条
 * @returns
 */
export const searchGoods = (data = { page: 1, size: 10 }) => {
  return hyRequest.post({
    url: '/goods/search',
    data
  })
}
/**
 * 更新表格
 * @param data 更新数据
 * @returns
 */
export const updateGoods = (data: updateParams<Type>) => {
  return hyRequest.post({
    url: '/goods/update',
    data
  })
}
/**
 *删除表格，批量删除或删除单个
 * @param data
 * @returns
 */
export const deleteGoods = (data: string[]) => {
  return hyRequest.post({
    url: '/goods/delete',
    data
  })
}
/**
 *创建表格
 * @param data
 * @returns
 */
export const addGoods = (data: addParams<Type>) => {
  return hyRequest.post({
    url: '/goods/create',
    data
  })
}
