import { RouteConfig } from '../interface'
import lazyLoad from '../utils/lazyLoad'
import { lazy } from 'react'
const PhysicalRouter: RouteConfig = {
  path: '/physical',
  element: lazyLoad(lazy(() => import('@/Layout/index'))),
  auth: true,
  children: [
    {
      path: 'reserve',
      element: lazyLoad(lazy(() => import('@/views/physical/reserve'))),
      auth: true
    }
  ]
}
export default PhysicalRouter
