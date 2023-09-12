import React, { useEffect, useState } from 'react'
import {

  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import * as Icons from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Layout, theme } from 'antd'
import Style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/stores'
import { collapse, updateCollapsed } from '@/stores/module/menu'
import { useLocation, useNavigate, useMatch } from 'react-router-dom'
import { MenuOption } from '../../constant/index'
import menuList from '../../constant/index'
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

const customIcons: { [key: string]: any } = Icons
const addIcon = (name: string) => {
  return React.createElement(customIcons[name])
}
// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
const deepLoopFloat = (menuList: MenuOption[], newArr: MenuItem[] = []) => {
  menuList.forEach((item: MenuOption) => {
    // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
    if (!item?.children?.length) {
      return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
    } else {
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children)
        )
      )
    }
  })
  return newArr
}
const items: MenuItem[] =deepLoopFloat(menuList)
const SiderLeft: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const collapsedApp = useAppSelector(collapse)
  const [activeMenu, setActiveMenu] = useState<string[]>([])
  const openKey = JSON.parse(localStorage.getItem('openKeys') as string)
  const [openKeys, setOpenKeys] = useState<string[]>(openKey ? openKey : [])
  //当手动输入路由路由表发生变化时，将路由对应的sub展开，其他的隐藏

  useEffect(() => {
    // 直接监听路由变化
    if (pathname.split('/').length > 2) {
      const timer = setTimeout(() => {
        localStorage.setItem('Keys', JSON.stringify([pathname.split('/')[1]]))
        setOpenKeys((prev) => [pathname.split('/')[1]])
        setActiveMenu([pathname])
      }, 100)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        localStorage.setItem('Keys', JSON.stringify(['physical']))
        setOpenKeys(['physical'])
        setActiveMenu([pathname])
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [pathname])
  //切换收缩按钮时，需要将原来的菜单面板展开
  useEffect(() => {
    if (!collapsedApp) {
      setOpenKeys(openKey)
    }
  }, [collapsedApp])
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
      //如果当前路由和subItem key匹配就将openKey赋值为当前路由对应的sub,其他的隐藏,如果跳转页面为首页默认展开体检管理
      const splitKey = key.split('/')
      if (splitKey.length > 2) {
        const openKey = JSON.parse(localStorage.getItem('openKeys') as string)
        const flag = openKey.some((item: string) => item === splitKey[1])
        if (flag) {
          localStorage.setItem('openKeys', JSON.stringify([splitKey[1]]))
          setOpenKeys([splitKey[1]])
        }
      } else {
        localStorage.setItem('openKeys', JSON.stringify(['physical']))
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
          onClick={() =>
            dispatch(
              updateCollapsed({ collapsedApp: !collapsedApp, path: pathname })
            )
          }
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
