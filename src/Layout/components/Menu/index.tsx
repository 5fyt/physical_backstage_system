import React, { useEffect, useState } from 'react'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  InboxOutlined,
  GoldOutlined,
  FunnelPlotOutlined,
  FileOutlined,
  CheckOutlined,
  ReadOutlined,
  RadiusSettingOutlined,
  HourglassOutlined,
  FileProtectOutlined,
  InteractionOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout, theme } from 'antd'
import Style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/stores'
import { collapse, updateCollapsed } from '@/stores/module/menu'
import { useLocation, useNavigate, useMatch } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]

const { Sider } = Layout
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('首页', '/dashboard', <DashboardOutlined />),
  getItem('业务管理', 'business', <MailOutlined />, [
    getItem('体检套餐', '/business/goods', <InboxOutlined />),
    getItem('促销规则', '/business/rules', <InteractionOutlined />),
    getItem('客户档案', '/business/customer', <FileProtectOutlined />),
    getItem('订单管理', '/business/order', <FunnelPlotOutlined />)
  ]),
  getItem('体检管理', 'physical', <AppstoreOutlined />, [
    getItem('体检预约', '/physical/reserve', <HourglassOutlined />),
    getItem('体检签到', '/physical/checkIn', <CheckOutlined />),
    getItem('预约设置', '/physical/settings', <RadiusSettingOutlined />),
    getItem('医生检查', '/physical/examine', <ReadOutlined />),
    getItem('检查报告', '/physical/report', <FileOutlined />)
  ]),
  getItem('系统设置', 'settings', <SettingOutlined />, [
    getItem('人员限流', '/seetings/limiting', <GoldOutlined />)
  ])
]

const SiderLeft: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const dispatch = useAppDispatch()
  const collapsedApp = useAppSelector(collapse)
  const [activeMenu, setActiveMenu] = useState<string[]>([])
  const openKey = JSON.parse(localStorage.getItem('openKeys') as string)
  const [openKeys, setOpenKeys] = useState<string[]>(openKey ? openKey : [])

  //当手动输入路由路由表发生变化时，将路由对应的sub展开，其他的隐藏
  useEffect(() => {
    const path = pathname.split('/')
    if (path.length > 2) {
      localStorage.setItem('openKeys', JSON.stringify([path[1]]))
      setOpenKeys([path[1]])
    } else {
      setOpenKeys([])
      localStorage.setItem('openKeys', JSON.stringify([]))
    }
    setActiveMenu([pathname])
  }, [pathname])
  //当点击SubItem时需要展开菜单，如果点击第二个subItem需要同时展开两个，如果在点击MenuItem，就需要将上一个SubItems收缩
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    //获取点击的subKey
    if (openKeys.length === 0 || openKeys.length === 1) {
      localStorage.setItem('openKeys', JSON.stringify(openKeys))
      setOpenKeys(openKeys)
    } else {
      localStorage.setItem('openKeys', JSON.stringify(openKeys))
      setOpenKeys(openKeys)
    }
  }
  const toPage = ({ key }: { key: string }) => {
    if (key) {
      //分割路由 /business/goods ['','business','goods'],
      //如果当前路由和subItem key匹配就将openKey赋值为当前路由对应的sub,其他的隐藏
      const splitKey = key.split('/')
      if (splitKey.length > 2) {
        const openKey = JSON.parse(localStorage.getItem('openKeys') as string)
        const latestOpenKey = openKey[openKey.length - 1]
        if (latestOpenKey.includes(splitKey[1])) {
          localStorage.setItem('openKeys', JSON.stringify([splitKey[1]]))
          setOpenKeys([openKey[1]])
        }
      }
    }
    navigate(key)
  }

  return (
    <>
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
        collapsed={collapsedApp}
        width={210}
      >
        <Menu
          mode="inline"
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={activeMenu}
          onClick={toPage}
          items={items}
        />
        <div
          className={collapsedApp ? Style.closeBtn : Style.closeActive}
          onClick={() => dispatch(updateCollapsed(!collapsedApp))}
        >
          {collapsedApp ? (
            <MenuUnfoldOutlined style={{ fontSize: '16px' }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: '16px' }} />
          )}
        </div>
      </Sider>
    </>
  )
}

export default SiderLeft
