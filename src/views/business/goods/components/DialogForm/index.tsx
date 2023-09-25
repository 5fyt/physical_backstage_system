import React, {
  memo,
  useState,
  Ref,
  useImperativeHandle,
  useEffect,
  useRef
} from 'react'
import {
  message,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
  Button,
  Modal,
  Tag,
  Space
} from 'antd'
import {
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { discountList } from '@/services/api/goods'

interface ModalProps {
  innerRef: Ref<{ showModal: () => void }>
}
const { TextArea } = Input

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp'
  if (!isJpgOrPng) {
    message.error('你只能上传jepg,png,webp格式的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过2M')
  }
  return isJpgOrPng && isLt2M
}
const AddGoods: React.FC<ModalProps> = (props: ModalProps) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [tags, setTags] = useState<string[]>([])
  const [item, setItem] = useState([{}])
  const [loading, setLoading] = useState(false)
  const formRef = useRef<any>()
  const [path, setPath] = useState('')

  const [imageUrl, setImageUrl] = useState<string>()
  const headers = {
    token: localStorage.getItem('token') as string
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  useImperativeHandle(props.innerRef, () => ({
    showModal
  }))
  //获取打折列表
  const getDisList = async () => {
    try {
      const { data } = await discountList()
      const disOption = data?.discounts.map((item: any) => {
        return { label: item.name, value: item.id }
      })
      setOptions(disOption)
    } catch (err) {
      console.error(err)
    }
  }
  //上传商品更改回调
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
  //打开弹出层
  const showModal = () => {
    setOpen(true)
  }
  //提交表单
  const handleOk = () => {
    formRef.current?.validateFields().then((value: any) => {
      console.log(value)
    })
  }
  //取消弹窗
  const handleCancel = () => {
    setOpen(false)
    setImageUrl('')
  }
  //生成tag标签数组
  const enterTag = (e: any) => {
    const { value } = e.target

    setTags((pre) => [...pre, value])
  }
  const addProject = () => {
    setItem((pre) => [...pre, {}])
  }
  const deleteProject = (id: number) => {
    const newItem = item.filter((item, index) => id !== index)
    setItem(newItem)
  }
  useEffect(() => {
    getDisList()
  }, [])
  return (
    <>
      <Modal
        title="新增"

        open={open}
        width={750}
        footer={[
          <Button key="add" onClick={addProject}>
            添加项目
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
          <Button key="link" type="primary" onClick={handleCancel}>
            取消
          </Button>
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          ref={formRef}
          style={{ minWidth: 600 }}
        >
          <Form.Item
            label="套餐名称"
            name="name"
            rules={[{ required: true, message: '套餐名字不为空' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="套餐编码"
            name="code"
            rules={[
              { required: true, message: '套餐编号不为空' },
              { pattern: /^[0-9A_Z]\d{4,10}$/, message: '套餐编号格式错误' }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="简介信息" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="套餐原价"
            name="originalPrice"
            rules={[
              { required: true, message: '金额不能为空' },
              { pattern: /^\d+(\.\d{2}$)/, message: '金额需要精确到两位小数点' }
            ]}
          >
            <Input
              prefix="￥"
              suffix="RMB"
              placeholder="输入原价"
              style={{ width: '50%' }}
            />
          </Form.Item>

          <Form.Item
            name="currentPrice"
            label="套餐现价"
            rules={[
              { required: true, message: '金额不能为空' },
              {
                pattern: /^\d+(\.\d{2}$)/,
                message: '金额需要精确到两位小数点'
              }
            ]}
          >
            <Input
              prefix="￥"
              suffix="RMB"
              placeholder="输入现价"
              style={{ width: '50%' }}
            />
          </Form.Item>

          <Form.Item label="折扣列表" name="discountId">
            <Select
              options={options}
              placeholder="选择折扣信息"
              style={{ width: '68%' }}
            ></Select>
          </Form.Item>

          <Form.Item
            label="商品图片"
            rules={[{ required: true, message: '图片不能为空' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="http://127.0.0.1/goods/upload-photo"
              headers={headers}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
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
          </Form.Item>
          <Form.Item label="商品类别" name="type">
            <Select
              placeholder="检查类别"
              style={{ width: '68%' }}
              options={[
                { label: '父母体检', value: 1 },
                { label: '入职体检', value: 2 },
                { label: '职场白领', value: 3 },
                { label: '个人高端', value: 4 },
                { label: '中青年体检', value: 5 }
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            label="特征标签"
            style={{ marginBottom: tags.length > 0 ? '-18px' : '0px' }}
          >
            <Row gutter={4}>
              <Col span={12}>
                <Form.Item name="tag">
                  <Input style={{ width: '90%' }} onPressEnter={enterTag} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <span>提示：输入标签后按回车键</span>
              </Col>
            </Row>
          </Form.Item>

          {tags.length > 0 &&
            tags.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Space
                    size={[0, 8]}
                    wrap
                    style={{
                      marginLeft: index === 0 ? '115px' : '',
                      overflow: tags.length > 0 ? '' : 'hidden'
                    }}
                  >
                    <Tag
                      color="success"
                      closable
                      style={{ marginBottom: '5px' }}
                    >
                      {item}
                    </Tag>
                  </Space>
                </React.Fragment>
              )
            })}

          <Form.Item label="展示区" name="sort">
            <Select
              placeholder="选择展示区"
              style={{ width: '50%' }}
              options={[
                { label: '活动专区', value: 1 },
                { label: '热卖套餐', value: 2 },
                { label: '新品推荐', value: 3 },
                { label: '孝敬父母', value: 4 },
                { label: '白领精英', value: 5 }
              ]}
            ></Select>
          </Form.Item>

          <Form.Item label="体检内容">
            <Row gutter={4}>
              {item.map((one, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col span={6}>
                      <Form.Item name={index + '_type'}>
                        <Select
                          placeholder="检查类别"
                          options={[
                            { label: '科室检查', value: 1 },
                            { label: '实验室检查', value: 2 },
                            { label: '医技检查', value: 3 },
                            { label: '其他检查', value: 4 }
                          ]}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item name={index + '_name'}>
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item name={index + '_description'}>
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <span>
                        {index !== 0 && (
                          <DeleteOutlined
                            onClick={() => deleteProject(index)}
                            style={{
                              fontSize: '18px',
                              color: '#1790ff',
                              marginTop: '7px'
                            }}
                          />
                        )}
                      </span>
                    </Col>
                  </React.Fragment>
                )
              })}
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default memo(AddGoods)
