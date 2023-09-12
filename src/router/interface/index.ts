import React from 'react'
export interface RouteConfig {
  path: string
  element: React.ReactNode
  auth: boolean
  children?: RouteConfig[]
  redirect?: string
}
