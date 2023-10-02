import hyRequest from '..'
import {
  Type,
  updateParams,
  addParams,
  statusParams,
  UploadType,
  UpdateType
} from '../types/goods'
import { deleteParams } from '../types/user'

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
 * 搜索商套餐分类option
 * @returns
 */
export const getSorts = () => {
  return hyRequest.get({
    url: '/goods/sort'
  })
}
/**
 * 折扣列表
 * @returns
 */
export const discountList = () => {
  return hyRequest.get({
    url: '/discount/list'
  })
}
/**
 * 获取套餐详细数据
 * @param id
 * @returns
 */
export const getGoodsInfo = (id: string) => {
  return hyRequest.get({
    url: `/goods/${id}`
  })
}
/**
 * 搜索商品数据
 * @param data 默认从第一页开始，页数十条
 * @returns
 */
export const searchGoods = (data = { page: 1, size: 10 }) => {
  return hyRequest.post({
    url: '/goods/admin/search',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
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
 * 更新商品上架状态
 * @param data
 * @returns
 */
export const changeStatus = (data: statusParams) => {
  return hyRequest.post({
    url: '/goods/change-status',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 *删除表格，批量删除或删除单个
 * @param data
 * @returns
 */
export const deleteGoods = (data: deleteParams) => {
  return hyRequest.post({
    url: '/goods/delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
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
/**
 * 上传excel文档
 * @param data  file,id
 * @returns
 */
export const uploadExl = (data: UploadType) => {
  return hyRequest.post({
    url: '/goods/upload-excel',

    data
  })
}
/**
 * 获取excel文档url
 * @param id
 * @returns
 */
export const getExUrl = (id: string) => {
  return hyRequest.get({
    url: `/goods/excel-url/${id}`
  })
}
/**
 *更新excel文档
 * @param data
 * @returns
 */
export const updateExcel = (data: UpdateType) => {
  return hyRequest.post({
    url: '/goods/update-excel',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 上传excel
 * @param data
 * @returns
 */
export const loadExcel = (data: UploadType) => {
  return hyRequest.post({
    url: '/goods/apply-upload-excel',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
/**
 * 上传套餐图片
 * @param data
 * @returns
 */
export const loadPhoto = (data: UploadType) => {
  return hyRequest.post({
    url: '/goods/apply-upload-photo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
