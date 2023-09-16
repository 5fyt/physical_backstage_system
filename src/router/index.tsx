import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import lazyLoad from './utils/lazyLoad'
import { RouteConfig } from './interface'
import BusinessRouter from './modules/business'
import PhysicalRouter from './modules/physical'
import UserRouter from './modules/user'
const RoutesArray = [BusinessRouter, PhysicalRouter, UserRouter]
const routes: RouteConfig[] = [
  {
    path: '/',
    element: lazyLoad(lazy(() => import('@/Layout/index'))),
    auth: true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        element: lazyLoad(lazy(() => import('@/views/home/index'))),
        auth: true
      }
    ]
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/views/login/index'))),
    auth: false
  },
  ...RoutesArray,
  {
    path: '*',
    element: lazyLoad(lazy(() => import('@/views/404/404'))),
    auth: true
  }
]
export default routes
