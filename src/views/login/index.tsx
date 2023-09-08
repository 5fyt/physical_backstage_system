import React, { memo, useEffect, useState } from 'react'
import Styles from './index.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import logo from '@/assets/login/logo.png'
import bigLogo from '@/assets/login/big.png'
import { loginParams } from '@/services/types/login'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { loginAsync, selectLogin } from '@/stores/module/login'
import { message, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/stores'
const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type="error"
    showIcon
  />
)
const Login: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const code = useAppSelector(selectLogin)
  const navigate = useNavigate()
  const [LoginState, setLoginState] = useState('')
  // const location = useLocation()
  const submitHandle = async (value: loginParams) => {
    await dispatch(loginAsync(value))
    try {
      if (code === 200) {
        const defaultLoginSuccessMessage = '登录成功！'
        message.success(defaultLoginSuccessMessage)

        setLoginState('ok')
        navigate('/')
      } else {
        const defaultLoginFailureMessage = '登录失败，请重试！'
        message.error(defaultLoginFailureMessage)
        setLoginState('error')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.left}>
          <img src={logo} className={Styles.logo} />
          <img src={bigLogo} className={Styles.big} />
          <span>{code}</span>
        </div>
        <div className={Styles.right}>
          <LoginForm
            subTitle={
              <div className={Styles.title_container}>
                <h2>神州大健康体检系统</h2>
                <span>v1.0</span>
              </div>
            }
            onFinish={async (value: loginParams) => {
              await submitHandle(value as loginParams)
            }}
          >
            {LoginState === 'error' && (
              <LoginMessage content={'错误的用户名和密码'} />
            )}
            {
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!'
                    },
                    {
                      pattern: /^[0-9a-zA-z]{4,10}$/,
                      message: '用户名格式错误'
                    }
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />
                  }}
                  placeholder={'密码: ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！'
                    },
                    {
                      pattern: /^[0-9a-zA-z]{6,15}$/,
                      message: '用户名格式错误'
                    }
                  ]}
                />
              </>
            }
          </LoginForm>
        </div>
      </div>
    </div>
  )
}
export default memo(Login)
