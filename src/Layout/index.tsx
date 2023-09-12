import React, { memo, useState, ReactNode } from 'react'

import SiderLeft from './components/Menu'
import HeaderNav from './components/Header/index'
import FooterBar from './components/Footer/index'
import Container from './components/Content/index'
import { Layout } from 'antd'
import { useAppSelector } from '@/stores'
import { collapse } from '@/stores/module/menu'
import style from './index.module.scss'

const LayContainer: React.FC = () => {
  const collapsedApp = useAppSelector(collapse)

  return (
    <>
      <Layout>
        <HeaderNav></HeaderNav>
        <Layout hasSider>
          <SiderLeft></SiderLeft>
          <Layout
            className="site-layout"
            style={{ marginLeft: collapsedApp ? '80px' : '210px' }}
          >
            <Container></Container>
            <FooterBar></FooterBar>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default memo(LayContainer)
