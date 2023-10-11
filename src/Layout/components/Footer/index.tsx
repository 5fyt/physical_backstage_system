import React, { memo, useEffect, useState } from 'react'

import { Layout } from 'antd'
import { useLocation } from 'react-router-dom'

const { Footer } = Layout
const FooterBar: React.FC = () => {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (pathname === '/dashboard'||pathname==='/manage/admin') {
      setShow(true)
    }
  }, [pathname])

  return (
    <>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#f0f2f5 ',
          paddingBottom: show ? '' : '100px'
        }}
      >
        Big Health ©2023 Created by FPH.
      </Footer>
    </>
  )
}
export default memo(FooterBar)
