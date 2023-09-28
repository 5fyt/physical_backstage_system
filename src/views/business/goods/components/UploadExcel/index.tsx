import React, { memo, useState, Ref, useImperativeHandle, useRef } from 'react'
import { Modal, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { getExUrl } from '@/services/api/goods'

interface ModalProps {
  innerRef: Ref<{ showModal: (value: any) => void }>
  loadList: () => void
}

const UploadExcel: React.FC<ModalProps> = ({ innerRef, loadList }) => {
  const [loading, setLoading] = useState(false)
  const [record, setRecord] = useState<any>(null)
  const [hasExcel, setHasExcel] = useState(false)
  const [open, setOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList]
    if (info.file.status === 'done') {
      const { code, message:messages } = info.file.response
      if (code === 200) {
        message.success(`${info.file.name} 上传成功`)
        loadList()
        setHasExcel(true)
      } else {
        message.error(messages)
      }
    }
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2)

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }

  const props = {
    action: 'http://127.0.0.1/goods/upload-excel',
    data: {
      id: record?.id
    },
    headers: {
      token: localStorage.getItem('token') as string
    },
    onChange: handleChange
  }
  useImperativeHandle(innerRef, () => ({
    showModal
  }))

  const showModal = (value: any) => {
    console.log(value)
    setRecord(value)
    setHasExcel(value.hasExcel)
    setFileList([])
    setOpen(true)
  }

  const loadHandle = async () => {
    setLoading(true)
    const { data } = await getExUrl(record?.id)
    console.log(data)
    const a = document.createElement('a')
    a.href = data
    a.click()
    setLoading(false)
    setTimeout(() => {
      setOpen(false)
      loadList()
      setFileList([])
    }, 1000)
  }
  const handleCancel = () => {
    setOpen(false)
    setFileList([])
  }

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={hasExcel ? false : true}
            loading={loading}
            onClick={loadHandle}
          >
            下载
          </Button>,
          <Button key="link" type="primary" onClick={handleCancel}>
            取消
          </Button>
        ]}
      >
        <p>
          请您选择【上传】或者【下载】体检内容文档？如果未上传体检内容文档，则体检套餐将无法上架。
        </p>
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
    </>
  )
}
export default memo(UploadExcel)
