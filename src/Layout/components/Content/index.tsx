import React, { memo, useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'

const { Header, Content } = Layout
const breadcrumbNameMap: Record<string, string>[] = [{
  '/business/goods': '体检套餐',
  '/business/rules': '促销规则',
  '/business/customer': '客户档案',
  '/business/order': '订单管理',
 
}];

const Container: React.FC = () => {
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const [heightView, setHeightView] = useState(0)
  const caculateHeight = () => {
    const clientHeight = document.documentElement.clientHeight - 48 - 53
    setHeightView(clientHeight)
  }
  useEffect(() => {
    caculateHeight()
  }, [])
  useEffect(() => {})
  //浏览器改变尺寸时
  window.onresize = () => {
    caculateHeight()
  }
  return (
    <>
      {pathname === '/dashboard' ? (
        <>
          <Content
            style={{
              margin: '34px 16px 0',
              overflow: 'initial',
              minHeight: `${heightView}px`
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer
              }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
        </>
      ) : (
        <>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              marginTop: '48px'
            }}
          />
          <Content
            style={{
              margin: '34px 16px 0',
              overflow: 'initial',
              minHeight: `${heightView - 112}px`
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer
              }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
        </>
      )}
    </>
  )
}
export default memo(Container)
