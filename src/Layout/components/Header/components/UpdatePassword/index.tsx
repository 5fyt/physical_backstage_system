import React, { memo, Ref, useImperativeHandle, useState, useRef } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { updatePassword } from '@/services/api/login'

type FieldType = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
interface ModalProps {
  innerRef: Ref<{ showModal: () => void }>
}

const UpdatePassword: React.FC<ModalProps> = (props: ModalProps) => {
  const [visible, setVisible] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const formRef = useRef<any>()
  //将子组件上的方法暴露给父组件，类型于Vue中defineExpose({})
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))

  const handleOk = () => {
    formRef.current?.validateFields().then((value: FieldType) => {
      console.log(value)
      const { oldPassword, newPassword, confirmPassword } = value
      if (newPassword !== confirmPassword) {
        messageApi.error('两次密码输入不一致请重新输入')
      } else {
        updatePassword({ oldPassword, newPassword }).then((res) => {
          if (res.code === 200) {
            messageApi.success('修改密码成功')
            setVisible(false)
          } else {
            messageApi.error('修改失败')
          }
        })
      }
    })
  }
  const showModal = () => {
    setVisible(true)
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="修改密码"
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          ref={formRef}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="原密码"
            name="oldPassword"
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
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="新密码"
            name="newPassword"
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
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="确定密码"
            name="confirmPassword"
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
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default memo(UpdatePassword)
