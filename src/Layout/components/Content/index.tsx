import React, { memo, useState, useEffect, useRef } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Layout, theme, Breadcrumb } from 'antd'
import Style from './index.module.scss'
import menuList, { MenuOption } from '@/Layout/constant'
const { Header, Content } = Layout
const Container: React.FC = () => {
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const ref = useRef<any>([])
  const [heightView, setHeightView] = useState(0)
  //计算内容区高度
  const caculateHeight = () => {
    const clientHeight = document.documentElement.clientHeight - 48 - 53
    setHeightView(clientHeight)
  }
  /**
   *
   * @param menuList
   * @param newArr
   * @returns 一个新的数组对象,包含了三个二级菜单和父级菜单的所有项
   */
  const transBreadcrumbItems = (menuList: MenuOption[], newArr: any[] = []) => {
    menuList.forEach((item: MenuOption) => {
      const items = [{ key: item.path, title: item.title }]
      if (item?.children) {
        const itemChildren: any[] = []
        item.children.forEach((item: MenuOption) => {
          const objItem = {
            key: item.path,
            title: <Link to={item.path}>{item.title}</Link>
          }
          itemChildren.push(objItem)
        })
        newArr.push(...items, ...itemChildren)
      }
    })

    return newArr
  }

  useEffect(() => {
    caculateHeight()
  }, [])
  useEffect(() => {
    const newMenu = menuList.slice(1)
    const BreadcrumbItems = transBreadcrumbItems(newMenu)
    //筛选出父菜单项和路由对应的子菜单项
    const newItem = BreadcrumbItems.filter(
      (item) => item.key === pathname || item.key === pathname.split('/')[1]
    )
    ref.current = newItem
  }, [pathname])
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
          >
            <Breadcrumb items={ref.current} className={Style.Breadcrumb} />
          </Header>
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
