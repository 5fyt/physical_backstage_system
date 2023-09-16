import React, { memo, Ref, useImperativeHandle, useState, useRef } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { updatePassword } from '@/services/api/login'
import { addUser } from '@/services/api/admin'

type FieldType = {
  username: string
  password: string
  name: string
}

interface ModalProps {
  innerRef: Ref<{ showModal: () => void }>
  searchInfo: () => void
}

const AddUser: React.FC<ModalProps> = (props: ModalProps) => {
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
      const type = localStorage.getItem('type') as string
      addUser({ ...value }, type).then((res) => {
        if (res.code === 200) {
          messageApi.success('添加成功')
          props.searchInfo()
          formRef.current?.resetFields()
        } else {
          messageApi.error('添加失败')
        }
      })
    })
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }
  const showModal = () => {
    setVisible(true)
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="添加用户"
        centered
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          ref={formRef}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              },
              {
                pattern: /^[0-9a-zA-z]{6,15}$/,
                message: '用户名格式错误'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
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
export default memo(AddUser)
