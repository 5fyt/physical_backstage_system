import React, { memo } from 'react'

import { Layout } from 'antd'

const { Footer } = Layout
const FooterBar: React.FC = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#f0f2f5 ',
          paddingBottom: '100px'
        }}
      >
        Big Health ©2023 Created by FPH.
      </Footer>
    </>
  )
}
export default memo(FooterBar)
