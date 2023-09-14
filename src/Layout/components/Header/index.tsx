import React, { memo, useRef, useState } from 'react'
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  EditOutlined,
  CloudUploadOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import {
  Layout,
  Input,
  Badge,
  Space,
  Avatar,
  Dropdown,
  message,
  Modal
} from 'antd'
import type { MenuProps } from 'antd'
import Style from './index.module.scss'
import logo from '@/assets/front/index/logo (2).png'
import { useAppDispatch, useAppSelector } from '@/stores'
import { photo, Name, logoutOp } from '@/stores/module/login'
import UpdatePassword from './components/UpdatePassword'
const style = { color: '#fff', fontSize: '16px' }
const { Header } = Layout

interface ModalProps {
  showModal: () => void
}
const HeaderNav: React.FC = () => {
  const dispatch = useAppDispatch()
  const pswRef = useRef<ModalProps>(null)
  const loadRef = useRef<ModalProps>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [showInput, setShowInput] = useState(false)
  const avatar = useAppSelector(photo)
  const username = useAppSelector(Name)
  
  const items: MenuProps['items'] = [
    {
      label: '修改密码',
      icon: <EditOutlined />,
      key: '1',
      onClick:() => pswRef.current?.showModal()
    },
    {
      label: '上传头像',
      icon: <CloudUploadOutlined />,
      key: '2'
    },
    { type: 'divider' },
    {
      label: '退出登入',
      icon: <LogoutOutlined />,
      key: '3',
      onClick: () => logout()
    }
  ]
  const logout = async () => {
    try {
      Modal.confirm({
        title: '温馨提示 🧡',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认退出登录？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          await dispatch(logoutOp)
          messageApi.success('退出登入')
        }
      })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      {contextHolder}
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
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <div className="user"> {username} </div>
                </Dropdown>
              </Space>
            </div>
          </Space>
        </Header>
      </div>
      <UpdatePassword innerRef={pswRef}></UpdatePassword>
    </>
  )
}
export default memo(HeaderNav)
