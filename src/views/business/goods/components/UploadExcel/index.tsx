import React, { memo, useState, Ref, useImperativeHandle, useRef } from 'react'
import { Modal, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps, RcFile } from 'antd/es/upload/interface'
import { getExUrl, loadExcel, updateExcel } from '@/services/api/goods'
import axios from 'axios'
interface ModalProps {
  innerRef: Ref<{ showModal: (value: any) => void }>
  loadList: () => void
}

const UploadExcel: React.FC<ModalProps> = ({ innerRef, loadList }) => {
  const [loading, setLoading] = useState(false)
  const [record, setRecord] = useState<any>(null)
  const [path, setPath] = useState('')
  const [hasExcel, setHasExcel] = useState(false)
  const [open, setOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const excelRef = useRef<any>()
  const handleChange: UploadProps['onChange'] = async (info) => {
    let newFileList = [...info.fileList]
    excelRef.current = info.file.originFileObj
    setLoading(false)

    setTimeout(() => {
      info.file.status = 'done'
    })

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
  const uploadFile = async (option: any) => {
    const { file, onSuccess, onProgress } = option
    onProgress({ percent: 50 })
    setTimeout(() => {
      onProgress({ percent: 100 })
    }, 100)
    const dataObj = {
      id: record.id,
      suffix: 'xlsx'
    }

    const { data } = await loadExcel(dataObj)

    const url = data?.url
    await axios.put(url, excelRef.current)
    const fileData = {
      id: record?.id,
      path: path
    }
    setPath(data.path)
    const { code } = await updateExcel(fileData)
    if (code === 200) {
      loadList()
      setHasExcel(true)
      message.success(`${file.name}文件上传成功`)
    }
  }
  const props = {
    customRequest: uploadFile,
    onChange: handleChange
  }
  useImperativeHandle(innerRef, () => ({
    showModal
  }))

  const showModal = (value: any) => {
    setRecord(value)
    setHasExcel(value.hasExcel)
    setFileList([])
    setOpen(true)
  }

  const loadHandle = async () => {
    setLoading(true)
    const { data } = await getExUrl(record?.id)

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
