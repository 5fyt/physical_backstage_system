import React, { memo, Ref, useImperativeHandle, useState, useRef } from 'react'
import { Modal, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useAppDispatch } from '@/stores'
import { updateAavatar } from '@/stores/module/login'
import axios from 'axios'
import { loadPhoto } from '@/services/api/login'
interface ModalProps {
  innerRef: Ref<{ showModal: () => void }>
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传jepg和png格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过2M')
  }
  return isJpgOrPng && isLt2M
}
const LoadAvatar: React.FC<ModalProps> = (props: ModalProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const [path, setPath] = useState('')
  const headers = {
    token: localStorage.getItem('token') as string,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  //将子组件上的方法暴露给父组件，类型于Vue中defineExpose({})
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))

  const handleOk = async () => {
    dispatch(updateAavatar({ path })).then((res) => {
      if (res.payload.code === 200) {
        messageApi.success('修改头像成功')
        setVisible(false)
        setImageUrl('')
      } else {
        messageApi.error('服务器网络走丢了')
      }
    })
  }
  const showModal = () => {
    setVisible(true)
  }
  const cancel = () => {
    setVisible(false)
    setImageUrl('')
  }
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadFile = async (file: any) => {
    const formData = new FormData()
    console.log(formData)
    formData.append('suffix', 'jpg')
    const type = localStorage.getItem('type') as string
    const { code, data } = await loadPhoto(formData, type)
    if (code === 200) {
      setPath(data.path)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <>
      {contextHolder}
      <Modal title="上传头像" open={visible} onOk={handleOk} onCancel={cancel}>
        <Upload
          listType="picture-card"
          showUploadList={false}
          headers={headers}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          customRequest={uploadFile}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
    </>
  )
}
export default memo(LoadAvatar)
