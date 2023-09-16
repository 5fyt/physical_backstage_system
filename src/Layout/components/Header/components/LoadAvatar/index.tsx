import React, { memo, Ref, useImperativeHandle, useState, useRef } from 'react'
import { Modal, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { updatePhoto } from '@/services/api/login'
import { useAppDispatch } from '@/stores'
import { updateAavatar } from '@/stores/module/login'
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
  //将子组件上的方法暴露给父组件，类型于Vue中defineExpose({})
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))

  const handleOk = async () => {
    dispatch(updateAavatar({ path })).then(() => {
      messageApi.success('修改头像成功')
      setVisible(false)
      setImageUrl('')
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
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
      const { data } = info.file.response
      setPath(data)
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
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://127.0.0.1/file/upload-photo"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
    </>
  )
}
export default memo(LoadAvatar)
