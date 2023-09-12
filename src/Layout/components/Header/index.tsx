import React, { memo } from 'react'

import { Layout } from 'antd'
import Style from './index.module.scss'
import logo from '@/assets/front/index/logo.png'

const { Header } = Layout
const HeaderNav: React.FC = () => {
  return (
    <>
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
    </>
  )
}
export default memo(HeaderNav)
