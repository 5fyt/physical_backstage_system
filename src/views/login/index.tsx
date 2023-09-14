import React, { memo, useEffect, useRef, useState } from 'react'
import Styles from './index.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  LoginForm,
  ProFormText,
  ProFormRadio
} from '@ant-design/pro-components'
import logo from '@/assets/login/logo.png'
import bigLogo from '@/assets/login/big.png'
import { loginParams, FormParams } from '@/services/types/login'

import { operationLogin, selectLogin, doctorLogin } from '@/stores/module/login'
import { message, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/stores'
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
  const dispatch = useAppDispatch()
  const code = useAppSelector(selectLogin)
  const [messageApi, contextHolder] = message.useMessage()
  const ref = useRef(code)
  useEffect(() => {
    ref.current = code
  }, [code])
  const navigate = useNavigate()
  const [LoginState, setLoginState] = useState('')
  const submitHandle = async (value: FormParams) => {
    console.log(value)
    try {
      const { type, ...otherValue } = value
      type && type === 'doctor'
        ? localStorage.setItem('type', type)
        : localStorage.setItem('type', 'operation')
      type === 'operation'
        ? await dispatch(operationLogin(otherValue))
        : await dispatch(doctorLogin(otherValue))

      if (ref?.current === 200) {
        const defaultLoginSuccessMessage = '登录成功！'
        await messageApi
          .open({
            type: 'loading',
            content: '正在登入',
            duration: 0.5
          })
          .then(() => messageApi.success(defaultLoginSuccessMessage, 1))
          .then(() => {
            setLoginState('ok')
            navigate('/')
          })
      } else {
        const defaultLoginFailureMessage = '登录失败，请重试！'
        await messageApi.error(defaultLoginFailureMessage)
        setLoginState('error')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {contextHolder}
      {LoginState === 'error' && (
        <LoginMessage content={'错误的用户名和密码'} />
      )}
      <div className={Styles.page}>
        <div className={Styles.container}>
          <div className={Styles.left}>
            <img src={logo} className={Styles.logo} />
            <img src={bigLogo} className={Styles.big} />
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
                await submitHandle(value as FormParams)
              }}
            >
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
                  <ProFormRadio.Group
                    name="type"
                    radioType="button"
                    fieldProps={{ value: 'operation' }}
                    options={[
                      {
                        label: '医生端',
                        value: 'doctor'
                      },
                      {
                        label: '运营端',
                        value: 'operation'
                      }
                    ]}
                  />
                </>
              }
            </LoginForm>
          </div>
        </div>
      </div>
    </>
  )
}
export default memo(Login)
