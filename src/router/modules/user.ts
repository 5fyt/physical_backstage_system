import { RouteConfig } from '../interface'
import lazyLoad from '../utils/lazyLoad'
import { lazy } from 'react'
const UserRouter: RouteConfig = {
  path: '/manage',
  element: lazyLoad(lazy(() => import('@/Layout/index'))),
  auth: true,
  children: [
    {
      path: 'user',
      element: lazyLoad(lazy(() => import('@/views/manager/user'))),
      auth: true
    }
  ]
}
export default UserRouter
