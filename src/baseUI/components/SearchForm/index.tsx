import React, { memo, useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import Style from './index.module.scss'
import type { SelectProps } from 'antd'
import { getTypes } from '@/services/api/goods'
type searchType = {
  setSearchInfo: (value: any) => void
}
const SearchForm: React.FC<searchType> = ({ setSearchInfo }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<SelectProps['options']>([])
  // const options = useRef<SelectProps['options'] | undefined>([])
  const optionRef = useRef<SelectProps['options'] | undefined>([])
  const formRef = useRef<any>()
  //重置表单
  const resetBtn = () => {
    formRef.current?.resetFields()
    setSearchInfo(null)
  }
  //查询数据
  const queryInfo = () => {
    setLoading(true)
    formRef.current?.validateFields().then((value: any) => {
      console.log(value)
      setSearchInfo(value)
      setTimeout(() => {
        setLoading(false)
      }, 300)
    })
  }
  const clickHandle = () => {
    setVisible(!visible)
    setShow(!show)
  }
  const handleChange = (value: any) => {
    console.log(value)
  }
  const getOptions = async () => {
    try {
      const { data } = await getTypes()
      if (data.types.length > 0) {
        setOptions((pre) => [...data.types])
      }
    } catch (err) {
      console.log(err)
    }
  }
  const transOptions = (newArr: any[] = []) => {
    options?.forEach((item) => {
      const obj = { label: item.name, value: item.type }
      newArr.push(obj)
    })
    return newArr
  }
  useEffect(() => {
    getOptions()
    const optionItem = transOptions()
    optionRef.current = optionItem
  }, [])

  return (
    <>
      <Form
        ref={formRef}
        style={{ minWidth: '800px' }}
        layout={'horizontal'}
        wrapperCol={{ span: 14 }}
        labelCol={{ span: 8 }}
      >
        <div className={Style.search}>
          {!visible ? (
            show && (
              <>
                <div className="input">
                  <Form.Item label="套餐名称" name="name" tooltip="商品套餐">
                    <Input />
                  </Form.Item>
                </div>
                <div className="input">
                  <Form.Item label="套餐编号" name="code">
                    <Input />
                  </Form.Item>
                </div>
              </>
            )
          ) : (
            <>
              <div className="input">
                <Form.Item label="套餐名称" name="name" tooltip="商品套餐">
                  <Input />
                </Form.Item>
              </div>
              <div className="input">
                <Form.Item label="套餐编号" name="code">
                  <Input />
                </Form.Item>
              </div>
              <div className="input">
                <Form.Item
                  label="商品类别"
                  name="type"
                  style={{ paddingLeft: '5px' }}
                >
                  <Select
                    style={{ width: 237 }}
                    onChange={handleChange}
                    options={optionRef.current}
                  />
                </Form.Item>
              </div>
            </>
          )}

          <div className="input">
            <div className="btn">
              <Button onClick={resetBtn}>重置</Button>
              <Button type="primary" onClick={queryInfo} loading={loading}>
                查询
              </Button>
              <div className="show" onClick={clickHandle}>
                {visible ? (
                  <>
                    <span>
                      收起
                      <span className="icon">
                        <UpOutlined style={{ color: '#1890ff' }} />
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      展开
                      <span className="icon">
                        <DownOutlined style={{ color: '#1890ff' }} />
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}
export default memo(SearchForm)
