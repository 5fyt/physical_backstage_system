import React from 'react'

import { Space } from 'antd'
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'

import { useAppSelector } from '@/stores'
type titleType={
  title:string
}
const Title: React.FC<titleType> = ({title}) => {
  const show = useAppSelector((state) => state.goods.show)
  return (
    <div>
      <span style={{ float: 'left' }}>{title}</span>
      <Space>
        {show && (
          <>
            <VerticalAlignBottomOutlined style={{ color: '#329dff' }} />
            <VerticalAlignTopOutlined style={{ color: '#329dff' }} />
          </>
        )}
      </Space>
    </div>
  )
}
export default Title
