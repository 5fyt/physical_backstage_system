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
  const itemRef = useRef<any>([])
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
  const transBreadcrumbItems = (
    menuList: MenuOption[],
    newArr: any[] = [],
    type: string
  ) => {
    menuList.forEach((item: MenuOption) => {
      const items = [{ key: item.path, title: item.title }]
      if (item?.children) {
        const itemChildren: any[] = []
        item.children.forEach((item: MenuOption) => {
          let objItem
          if (type === 'bread') {
            objItem = {
              key: item.path,
              title: <Link to={item.path}>{item.title}</Link>
            }
          } else {
            objItem = {
              key: item.path,
              title: item.title
            }
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
    const BreadcrumbItems = transBreadcrumbItems(newMenu, [], 'bread')
    //筛选出父菜单项和路由对应的子菜单项
    const newItem = BreadcrumbItems.filter(
      (item) => item.key === pathname || item.key === pathname.split('/')[1]
    )
    ref.current = newItem
    //筛选出子菜单title
    itemRef.current = transBreadcrumbItems(newMenu, [], 'title').filter(
      (item) => item.key === pathname || item.key === pathname.split('/')[1]
    )[1]
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
              className={Style.contect}
              style={{
                background: colorBgContainer
              }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
        </>
      ) : (
        <>
          <div
            style={{
              background: colorBgContainer
            }}
            className={Style.bread_header}
          >
            <Breadcrumb items={ref.current} className={Style.Breadcrumb} />
            <h2>{itemRef.current.title}</h2>
          </div>
          <Content
            style={{
              overflow: 'initial',
              minHeight: `${heightView - 112}px`
            }}
          >
            <div
              className={Style.contect}

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
