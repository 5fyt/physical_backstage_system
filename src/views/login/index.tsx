import React, { memo } from 'react'
import Styles from './index.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import logo from '@/assets/login/logo.png'
import bigLogo from '@/assets/login/big.png'
const Login: React.FC = () => {
  return (
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
