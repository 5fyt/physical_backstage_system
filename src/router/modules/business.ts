import { RouteConfig } from '../interface'
import lazyLoad from '../utils/lazyLoad'
import { lazy } from 'react'
const BusinessRouter: RouteConfig = {
  path: '/business',
  element: lazyLoad(lazy(() => import('@/Layout/index'))),
  auth: true,
  children: [
    {
      path: 'goods',
      element: lazyLoad(lazy(() => import('@/views/business/goods'))),
      auth: true
    },
    {
      path: 'rules',
      element: lazyLoad(lazy(() => import('@/views/business/rules'))),
      auth: true
    }
  ]
}
export default BusinessRouter
