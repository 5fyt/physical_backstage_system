import React, { memo, useState } from 'react'
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Input, Badge, Space, Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import Style from './index.module.scss'
import logo from '@/assets/front/index/logo (2).png'
import { useAppSelector } from '@/stores'
import { photo, Name } from '@/stores/module/login'
const style = { color: '#fff', fontSize: '16px' }
const { Header } = Layout
const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(key)
}

const items: MenuProps['items'] = [
  {
    label: '修改密码',
    key: '1'
  },
  {
    label: '上传头像',
    key: '2'
  },
  { type: 'divider' },
  {
    label: '退出登入',
    key: '3'
  }
]
const HeaderNav: React.FC = () => {
  const [showInput, setShowInput] = useState(false)
  const avatar = useAppSelector(photo)
  const username = useAppSelector(Name)

  return (
    <>
      <div className={Style.header}>
        <Header>
          <div className="header_left">
            <div className="logo">
              <img src={logo} alt="" className="lg" />
              <h2>
                <a href="">Big Health BackStage</a>
              </h2>
            </div>
          </div>

          <div style={{ flex: '1 1 0%' }}></div>
          <Space size={26}>
            <div className="search_active">
              <div className="searchIcon">
                <SearchOutlined
                  style={{
                    fontSize: '16px',
                    color: '#ffffff',
                    padding: '15px 14px',
                    marginTop: '-8px'
                  }}
                  onClick={() => setShowInput(!showInput)}
                />
              </div>
              {showInput && (
                <div className="searchInput">
                  <Input placeholder="站内搜索" />
                </div>
              )}
            </div>
            <div className="question">
              <QuestionCircleOutlined style={style} />
            </div>
            <div className="message">
              <Badge count={11} size="small" offset={[4, -1]}>
                <BellOutlined style={style} />
              </Badge>
            </div>
            <div className="photo">
              <Space size={10}>
                <Avatar
                  size={26}
                  src={avatar}
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
                <Dropdown menu={{ items, onClick }} placement="bottomLeft">
                  <div className="user"> {username} </div>
                </Dropdown>
              </Space>
            </div>
          </Space>
        </Header>
      </div>
    </>
  )
}
export default memo(HeaderNav)
