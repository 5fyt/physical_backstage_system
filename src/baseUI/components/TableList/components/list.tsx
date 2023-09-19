import React, { memo, useEffect, useState } from 'react'
import { Table, Space, Switch, Button } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import Style from '../components/styles/list.module.scss'
interface DataType {
  key: React.Key
  name: string
  code: string
  currentPrice: string
  originalPrice: string
  discount: string
  salesVolume: number
  type: string
  status: number
  hasExcel: boolean
}
type Iprop = {
  checkKeys: any[]
}
const defaultColumns: ColumnsType<DataType> = [
  {
    title: '套餐名字',
    key: '1',
    dataIndex: 'name',
    render: (text) => {
      return (
        <>
          <span style={{ color: '#2997fe' }}>{text}</span>
        </>
      )
    }
  },
  {
    title: '套餐编号',
    key: '2',
    dataIndex: 'code'
  },
  {
    title: '现价',
    key: '3',
    dataIndex: 'currentPrice',
    render: (text) => {
      return (
        <>
          <span>￥{text}</span>
        </>
      )
    },
    sorter: {
      compare: (a, b) => Number(a.currentPrice) - Number(b.currentPrice)
    }
  },
  {
    key: '4',
    title: '原价',
    dataIndex: 'originalPrice',
    render: (text) => {
      return (
        <>
          <span>￥{text}</span>
        </>
      )
    },
    sorter: {
      compare: (a, b) => Number(a.originalPrice) - Number(b.originalPrice)
    }
  },
  {
    key: '5',
    title: '促销方案',
    dataIndex: 'discount'
  },
  {
    key: '6',
    title: '销量',
    dataIndex: 'salesVolume',
    sorter: {
      compare: (a, b) => a.salesVolume - b.salesVolume
    }
  },
  {
    key: '7',
    title: '类型',
    dataIndex: 'type'
  },
  {
    key: '8',
    title: '体检内容',
    dataIndex: 'hasExcel',
    render: (text) => {
      return (
        <>
          <span>
            {text ? (
              <Button type="primary" ghost>
                有文档
              </Button>
            ) : (
              <Button type="dashed" ghost>
                无文档
              </Button>
            )}
          </span>
        </>
      )
    }
  },
  {
    key: '9',
    title: '状态',
    dataIndex: 'status',
    render: (text) => {
      return (
        <>
          <Switch
            style={{ backgroundColor: '#13ce66' }}
            checkedChildren={text == 1 ? '上架' : '下架'}
            unCheckedChildren={text == 1 ? '下架' : '上架'}
            defaultChecked
          />
        </>
      )
    }
  },
  {
    key: '10',
    title: '操作',
    dataIndex: 'action',
    render: (_, record) => (
      <Space>
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => preView(record)}
        >
          预览
        </span>
        <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => updateData(record)}
        >
          修改
        </span>
        <span
          style={{ color: '#ff4d4f', cursor: 'pointer' }}
          onClick={() => deleteData(record)}
        >
          删除
        </span>
      </Space>
    )
  }
]
const data: DataType[] = [
  {
    key: '1',
    name: 'aaa',
    code: 'djkslds',
    currentPrice: '99.0',
    originalPrice: '93.2',
    discount: '打七折',
    salesVolume: 100,
    type: '父母体检',
    status: 1,
    hasExcel: true
  },
  {
    key: '2',
    name: 'bbb',
    code: 'djkslds',
    currentPrice: '99.0',
    originalPrice: '93.2',
    discount: '打七折',
    salesVolume: 100,
    type: '父母体检',
    status: 1,
    hasExcel: true
  },
  {
    key: '3',
    name: 'ccc',
    code: 'djkslds',
    currentPrice: '91.0',
    originalPrice: '99.2',
    discount: '打七折',
    salesVolume: 200,
    type: '父母体检',
    status: 1,
    hasExcel: true
  },
  {
    key: '4',
    name: 'sss',
    code: 'djkslds',
    currentPrice: '91.0',
    originalPrice: '95.2',
    discount: '打七折',
    salesVolume: 300,
    type: '父母体检',
    status: 1,
    hasExcel: true
  }
]

const preView = (record: any) => {
  console.log('fff')
  console.log(record)
}
const updateData = (record: any) => {
  console.log(record)
}
const deleteData = (record: any) => {
  console.log(record)
}
const List: React.FC<Iprop> = ({ checkKeys }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  //列选项数组
  const [columns, setColumns] = useState(defaultColumns)
  useEffect(() => {
    console.log(checkKeys)
    if (checkKeys.length > 0) {
      const newColumns = columns.filter((item) => checkKeys.includes(item.key))
      setColumns(newColumns)
    }
  }, [checkKeys])
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    console.log(selectedRows)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const cancelHandle = () => {
    setSelectedRowKeys([])
  }
  return (
    <div className={Style.content}>
      {hasSelected && (
        <div className="tips">
          <div className="title">
            <span>
              {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
            </span>
          </div>
          <div className="cancel">
            <span onClick={cancelHandle}>取消选择</span>
          </div>
        </div>
      )}

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
      {hasSelected && (
        <div className="footer_bar">
          <div className="left">
            {hasSelected ? (
              <>
                <div>
                  已选择
                  <span style={{ color: '#1e93ff' }}>
                    &nbsp;{selectedRowKeys.length} &nbsp;
                  </span>
                  项
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            <Button type="primary" ghost>
              批量删除
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(List)
