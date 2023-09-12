import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd'

const { Header, Content } = Layout
const Container: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
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
          minHeight: '600px'
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
  )
}
export default memo(Container)
