import React, { lazy } from 'react'

const Login = lazy(() => import('@/views/login/index'))
const Layout = lazy(() => import('@/Layout/index'))
const Home = lazy(() => import('@/views/home/index'))
const NotFound = lazy(() => import('@/views/404/404'))
export interface RouteConfig {
  path: string
  element: React.ReactNode
  auth: boolean
  children?: RouteConfig[]
  redirect?: string
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Layout />,
    auth: true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        element: <Home />,
        auth: true
      }
    ]
  },
  {
    path: '/404',
    element: <NotFound />,
    auth: true
  },
  {
    path: '/login',
    element: <Login />,
    auth: false
  }
]
export default routes
