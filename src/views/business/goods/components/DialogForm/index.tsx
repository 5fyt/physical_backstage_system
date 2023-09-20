import React, { memo, useState, Ref, useImperativeHandle } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload
} from 'antd'
interface ModalProps {
  innerRef: Ref<{ showModal: () => void }>
}
const { RangePicker } = DatePicker
const { TextArea } = Input

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const AddGoods: React.FC<ModalProps> = (props: ModalProps) => {
  const [open, setOpen] = useState(false)
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))
  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {}

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <>
      <Modal title="新增" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="套餐名称"
            name="name"
            rules={[{ required: true, message: '套餐名字不为空' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="套餐名称"
            name="code"
            rules={[
              { required: true, message: '套餐名字不为空' },
              { pattern: /^[0-9A_Z]$/, message: '套餐名称格式错误' }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="简介信息" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="套餐原价"
            name="originalPrice"
            rules={[
              { required: true, message: '金额不能为空' },
              { pattern: /^\d+(\.\d{2}$)/, message: '金额需要精确到两位小数点' }
            ]}
          >
            <Input prefix="￥" suffix="RMB" />
          
          </Form.Item>
          <Form.Item
            label="套餐现价"
            name="currentPrice"
            rules={[
              { required: true, message: '金额不能为空' },
              { pattern: /^\d+(\.\d{2}$)/, message: '金额需要精确到两位小数点' }
            ]}
          >
            <Input prefix="￥" suffix="RMB" />

          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TreeSelect">
            <TreeSelect
              treeData={[
                {
                  title: 'Light',
                  value: 'light',
                  children: [{ title: 'Bamboo', value: 'bamboo' }]
                }
              ]}
            />
          </Form.Item>
          <Form.Item label="Cascader">
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou'
                    }
                  ]
                }
              ]}
            />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="RangePicker">
            <RangePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="TextArea">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
          <Form.Item label="Slider">
            <Slider />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default memo(AddGoods)
