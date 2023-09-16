import hyRequest from '..'

/**
 *
 * @param data  当前页，返回页数
 * @returns
 */
export const searchAdmin = (data = { page: 1, size: 6 }) => {
  return hyRequest.post({
    url: '/admin/search',
    data
  })
}
