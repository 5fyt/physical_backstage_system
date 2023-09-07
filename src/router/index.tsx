import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// const Login = lazy(() => import('@/views/login/index'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  // {
  //   path: '/login',
  //   element: <Login />
  // }
]
export default routes
