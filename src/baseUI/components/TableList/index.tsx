import React, { memo, useEffect, useState } from 'react'
import Style from './index.module.scss'
import { Button, Dropdown, Space, Popover, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import {
  PlusOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Content from './components/Setting'
import List from './components/List'
import { useAppDispatch, useAppSelector } from '@/stores'
import { pageIndex, pageSize, searchGoodsAsync } from '@/stores/module/goods'
import { SizeType } from 'antd/es/config-provider/SizeContext'
//点击复选框触发
/**
 * 设置表格，当默认状态显示的是表格对应的父树节点，且独占一行，父节点前面icon自定义，父节点后面有固定在列首和列尾两个icon图标
 * 当点击固定列首icon图标，将点击这项添加到固定左侧父节点中的子节点，该子节点和父节点失去前面的icon图标，该子节点后面的固定列首图标变成不固定图标和固定在列尾，剩余的父节点被添加进不固定的父节点中的子节点，子节点保留前面的icon图标
 * 当点击固定列尾icon图标，将点击这项添加到固定右侧父节点中的子节点，该子节点和父节点失去前面的icon图标，该子节点后面的固定列尾图标变成固定在列首和不固定图标，剩余的父节点被添加进不固定的父节点中的子节点，子节点保留前面的icon图标
 * 当固定列首或列为出现两个子节点，又将直接的子节点前面icon显示出来(未实现)
 *
 */

type Iprop = {
  searchInfo: {
    name?: string
    code?: string
    type?: number
  }
}

const options = [
  { label: '已上架', value: 1 },
  { label: '已下架', value: 2 }
]
const TableList: React.FC<Iprop> = ({ searchInfo }) => {
  const items: MenuProps['items'] = [
    {
      label: <div>默认</div>,
      key: '0',
      onClick: () => setSz('large')
    },
    {
      label: <div>中等</div>,
      key: '1',
      onClick: () => setSz('middle')
    },
    {
      label: <div>紧凑</div>,
      key: '3',
      onClick: () => setSz('small')
    }
  ]
  const size = useAppSelector(pageSize)
  const page = useAppSelector(pageIndex)

  const dispatch = useAppDispatch()
  const [value, setValue] = useState(1)
  const [sz, setSz] = useState<SizeType>('middle')
  //list 传过来的值
  const [checkKeys, setCheckKeys] = useState<string[]>([])
  const [show, setShow] = useState(true)
  const getKeys = (value: string[]) => {
    setCheckKeys(value)
  }
  const showChecked = (value: boolean) => {
    setShow(value)
  }
  //获取表格数据
  const loadList = async (info?: any) => {
    const data = {
      page,
      size
    }
    await dispatch(searchGoodsAsync({ ...data, ...info }))
  }
  useEffect(() => {
    loadList(searchInfo)
  }, [searchInfo])

  //切换radio查询数据
  const onChangeHandle = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value)
    const data = {
      status: value
    }
    loadList({ ...data, ...searchInfo })
  }

  return (
    <div className={Style.table}>
      <div className="operation">
        <div className="left">查询套餐</div>
        <div className="right">
          <Space size={'middle'}>
            <Radio.Group
              options={options}
              onChange={onChangeHandle}
              value={value}
              optionType="button"
            />
            <div className="add">
              <Button type="primary" icon={<PlusOutlined />}>
                新建
              </Button>
            </div>
            <div className="refresh">
              <ReloadOutlined style={{ fontSize: '16px' }} onClick={()=>loadList()} />
            </div>
            <div className="updateWidth">
              <Dropdown
                menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <ColumnHeightOutlined
                      style={{ fontSize: '16px', color: '#000' }}
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div className="settings">
              <Popover
                content={
                  <Content
                    updateCheckKeys={getKeys}
                    showCheck={showChecked}
                  ></Content>
                }
                trigger="click"
                placement="bottomRight"
                align={{
                  offset: [12, 18]
                }}
              >
                <SettingOutlined style={{ fontSize: '16px' }} />
              </Popover>
            </div>
          </Space>
        </div>
      </div>
      <div className="list">
        <List
          checkKeys={checkKeys}
          show={show}
          loadList={(value) => loadList(value)}
          sz={sz}
        ></List>
      </div>
    </div>
  )
}
export default memo(TableList)
