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
import axios from 'axios'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import {
  discountList,
  getGoodsInfo,
  getSorts,
  loadPhoto
} from '@/services/api/goods'
import { transReserve, transResults } from '@/utils/transData'
import { useAppDispatch } from '@/stores'
import { createGoodsAsync, updateGoodsAsync } from '@/stores/module/goods'

interface ModalProps {
  innerRef: Ref<{ showModal: (value?: any) => void }>
  loadList: () => void
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

const AddGoods: React.FC<ModalProps> = (props: ModalProps) => {
  const [open, setOpen] = useState(false)
  const [suffix, setSuffix] = useState('')
  const [options, setOptions] = useState([])
  const [sortOp, setSortOp] = useState([])
  const [tags, setTags] = useState<string[]>([])
  const [item, setItem] = useState([{}])
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState('')
  const [imageUrl, setImageUrl] = useState<string>()
  const formRef = useRef<any>()
  const idRef = useRef<string>('')
  const imageFile=useRef<any>()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
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
  //获取套餐分类列表
  const getSortList = async () => {
    try {
      const { data } = await getSorts()
      const sortOption = data?.sorts.map((item: any) => {
        return { label: item.name, value: item.sort }
      })
      setSortOp(sortOption)
    } catch (err) {
      console.error(err)
    }
  }
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp'
    const type = file.type.split('/')[1]
    setSuffix(type)
    if (!isJpgOrPng) {
      message.error('你只能上传jepg,png,webp格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2M')
    }
    return isJpgOrPng && isLt2M
  }
  //上传商品更改回调
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        imageFile.current=info.file.originFileObj
        setImageUrl(url)
      })
    }
  }
  const uploadFile = async (file: any) => {
    const dataObj = {
      suffix
    }
    const { code, data } = await loadPhoto(dataObj)
    const url = data?.url
    axios.put(url, imageFile.current)
    if (code === 200) {
      setPath(data.path)
    }
  }
  //打开弹出层
  const showModal = async (value: any) => {
    if (typeof value === 'string') {
      console.log(value)
      idRef.current = value
      const { data } = await getGoodsInfo(value)
      const {
        image,
        tag,
        name,
        code,
        description,
        originalPrice,
        currentPrice,
        discountId,
        sort,
        type,
        ...other
      } = data
      const { result, num } = transReserve(other)
      form.setFieldsValue({
        name,
        code,
        description,
        originalPrice,
        currentPrice,
        discountId,
        type,
        sort,
        ...result
      })
      setImageUrl(image)
      setPath(image)
      setTags(tag)
      for (let i = 0; i < num - 1; i++) {
        setItem((pre) => [...pre, {}])
      }
    } else {
      idRef.current = ''
    }
    setOpen(true)
  }
  //提交表单
  const handleOk = () => {
    formRef.current?.validateFields().then((value: any) => {
      console.log(value)
      const {
        name,
        code,
        currentPrice,
        originalPrice,
        description,
        discountId,
        sort,
        tag,
        type,
        ...otherValue
      } = value
      const other = transResults(otherValue)

      if (idRef.current) {
        const data = {
          id: idRef.current,
          name,
          code,
          currentPrice,
          originalPrice,
          description,
          discountId,
          sort,
          type,
          image: path,
          tag: tags,
          ...other
        }
        dispatch(updateGoodsAsync(data)).then((res) => {
          if (res.payload.code === 200) {
            message.success('修改成功')
            props.loadList()
            formRef.current?.resetFields()
            setOpen(false)
          } else {
            message.error(res.payload.message)
          }
        })
      } else {
        const data = {
          name,
          code,
          currentPrice,
          originalPrice,
          description,
          discountId,
          sort,
          type,
          image: path,
          tag: tags,
          ...other
        }
        dispatch(createGoodsAsync(data)).then((res) => {
          if (res.payload.code === 200) {
            message.success('添加成功')
            props.loadList()
            formRef.current?.resetFields()
            setOpen(false)
          }
        })
      }
    })
  }
  //取消弹窗
  const handleCancel = () => {
    setOpen(false)
    formRef.current?.resetFields()
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
    if (item.length !== 1) {
      const newItem = item.splice(id, 1)
      setItem(newItem)
    }
  }
  useEffect(() => {
    getDisList()
    getSortList()
  }, [])

  return (
    <>
      <Modal
        title={idRef.current ? '修改' : '新增'}
        open={open}
        width={750}
        forceRender
        onCancel={handleCancel}
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
          autoComplete="off"
          ref={formRef}
          form={form}
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
              { pattern: /^[0-9A-Z]{6,12}$/, message: '套餐编号格式错误' }
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
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
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
              options={sortOp}
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
                        <Input placeholder="体检项目"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item name={index + '_description'}>
                        <Input placeholder="体检内容"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <span>
                        {
                          <DeleteOutlined
                            onClick={() => deleteProject(index)}
                            style={{
                              fontSize: '18px',
                              color: '#1790ff',
                              marginTop: '7px'
                            }}
                          />
                        }
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
