import React, { memo, useState } from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import Style from './index.module.scss'
import logo from '../assets/front/index/logo.png'
const { Header, Content, Footer, Sider } = Layout


const items: MenuProps['items'] = [
  UserOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined
].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`
      }
    })
  }
})
const LayContainer: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      <Layout>
        <Header
          style={{
            padding: '0 10px',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            height: '48px'
          }}
        >
          <div className={Style.logo}>
            <img src={logo} alt="" className={Style.lg} />
            <h2>
              <a href="">Big Health</a>
            </h2>
          </div>
        </Header>
        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,

              background: colorBgContainer
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={210}
          >
            <Menu
              defaultOpenKeys={['sub1']}
              mode="inline"
              defaultSelectedKeys={['4']}
              items={items}
            />
            <div
              className={collapsed ? Style.closeBtn : Style.closeActive}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <MenuUnfoldOutlined style={{ fontSize: '16px' }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: '16px' }} />
              )}
            </div>
          </Sider>

          <Layout
            className="site-layout"
            style={{ marginLeft: collapsed ? '80px' : '210px' }}
          >
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                marginTop: '48px'
              }}
            />
            <Content style={{ margin: '34px 16px 0', overflow: 'initial' }}>
              <div
                style={{
                  padding: 24,
                  textAlign: 'center',
                  background: colorBgContainer
                }}
              >
                <p>long content</p>
                {
                  // indicates very long content
                  Array.from({ length: 100 }, (_, index) => (
                    <React.Fragment key={index}>
                      {index % 20 === 0 && index ? 'more' : '...'}
                      <br />
                    </React.Fragment>
                  ))
                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default memo(LayContainer)
