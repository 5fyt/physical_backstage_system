import React, { memo, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import Style from './index.module.scss'
import { SearchType, objType } from '../../user/constant/searchConfig'

const SearchForm: React.FC<SearchType<objType>> = ({ searchConfig }) => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Form
        style={searchConfig.style}
        layout={searchConfig.layout}
        wrapperCol={searchConfig.wrapperCol}
        labelCol={searchConfig.labelCol}
      >
        <div className={Style.search}>
          {searchConfig.searchList.map((item, key) => {
            return (
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
              <Button>重置</Button>
              <Button type="primary">查询</Button>
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
