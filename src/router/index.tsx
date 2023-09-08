import React, { lazy } from 'react'

import { Navigate } from 'react-router-dom'
const Login = lazy(() => import('@/views/login/index'))
const Home = lazy(() => import('@/views/home/index'))
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
    element: <Navigate to="/home" />,
    auth: true
  },
  {
    path: '/home',
    element: <Home />,
    auth: true
  },
  {
    path: '/login',
    element: <Login />,
    auth: false
  }
]
export default routes
