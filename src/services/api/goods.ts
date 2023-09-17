import hyRequest from '..'

/**
 * 搜索商品类型option
 * @returns
 */
export const getTypes = () => {
  return hyRequest.get({
    url: '/goods/type'
  })
}
