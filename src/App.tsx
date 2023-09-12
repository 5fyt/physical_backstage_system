import React, { Suspense } from 'react'
import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'

import routers from '@/router/index'
import AuthRoute from '@/router/utils/authRouter'
import type { RouteConfig } from '@/router/interface/index'
import { WithProgress } from './router/utils/withProgress'

const App = () => {
  // 处理我们的routers
  const RouteAuthFun = (routeList: RouteConfig[]) => {
    return routeList.map(
      (item: {
        path: string
        auth: boolean
        element: ReactNode
        children?: any
      }) => {
        return (
          <Route
            path={item.path}
            element={
              <AuthRoute auth={item.auth} key={item.path}>
                {item.element}
              </AuthRoute>
            }
            key={item.path}
          >
            {/* 递归调用，因为可能存在多级的路由 */}
            {item?.children && RouteAuthFun(item.children)}
          </Route>
        )
      }
    )
  }
  return (
    <div className="app">
      <Suspense>
        <Routes>{RouteAuthFun(routers)}</Routes>
      </Suspense>
    </div>
  )
}

export default WithProgress(App)
