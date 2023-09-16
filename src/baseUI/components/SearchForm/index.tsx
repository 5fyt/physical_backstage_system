import React, { memo, useRef, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import Style from './index.module.scss'
import { SearchType, objType } from '../../constant/searchConfig'

const SearchForm: React.FC<SearchType<objType>> = ({
  setSearchInfo,
  searchConfig
}) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<any>()
  //重置表单
  const resetBtn = () => {
    formRef.current?.resetFields()
  }
  //查询数据
  const queryInfo = () => {
    setLoading(true)
    formRef.current?.validateFields().then((value: any) => {
      setSearchInfo(value)
      setLoading(false)
    })
  }
  return (
    <>
      <Form
        ref={formRef}
        style={searchConfig.style}
        layout={searchConfig.layout}
        wrapperCol={searchConfig.wrapperCol}
        labelCol={searchConfig.labelCol}
      >
        <div className={Style.search}>
          {searchConfig.searchList.map((item, key) => {
            return (
              //防止遍历时，找不到key唯一标识，但又可以做到不增加div
              <React.Fragment key={key}>
                {!visible ? (
                  !item.show && (
                    <div className="input">
                      <Form.Item
                        label={item.label}
                        name={item.prop}
                        tooltip={item.tooltip}
                        style={item.style}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  )
                ) : (
                  <div className="input">
                    <Form.Item
                      label={item.label}
                      name={item.prop}
                      tooltip={item.tooltip}
                      style={item.style}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                )}
              </React.Fragment>
            )
          })}
          <div className="input">
            <div className="btn">
              <Button onClick={resetBtn}>重置</Button>
              <Button type="primary" onClick={queryInfo} loading={loading}>
                查询
              </Button>
              <div className="show" onClick={() => setVisible(!visible)}>
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
