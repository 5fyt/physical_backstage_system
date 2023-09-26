import React, { memo, useEffect, useState, useRef } from 'react'
import { Table, Space, Switch, Button, message } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import Style from '../styles/list.module.scss'
import { useAppDispatch, useAppSelector } from '@/stores'
import { pageIndex, pageSize, updatePage } from '@/stores/module/goods'
import { results, totalCount } from '@/stores/module/goods'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { changeStatus, deleteGoods } from '@/services/api/goods'
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
  show: boolean
  sz: SizeType
  loadList: (value?: any) => void
}

const List: React.FC<Iprop> = ({ checkKeys, show, loadList, sz }) => {
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
                <Button type="primary" ghost>
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
      render: (text, record) => {
        return (
          <>
            <Switch
              onClick={(value) => switchHandle(value, record)}
             
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  //列选项数组
  const [columns, setColumns] = useState(defaultColumns)

  const size = useAppSelector(pageSize)
  const page = useAppSelector(pageIndex)
  const total = useAppSelector(totalCount)
  const data = useAppSelector(results)
  const dispatch = useAppDispatch()
  //表格与设置按钮交互
  useEffect(() => {
    if (checkKeys.length === 0 && show) {
      setColumns(defaultColumns)
    } else if (checkKeys.length > 0 && !show) {
      const newColumns = columns.filter((item) => checkKeys.includes(item.key))
      setColumns(newColumns)
    } else if (checkKeys.length === 0 && !show) {
      setColumns([])
    } else {
      setColumns(defaultColumns)
    }
  }, [checkKeys, show])
  //操作表格数据
  const preView = (record: any) => {
    console.log('fff')
    console.log(record)
  }
  const updateData = (record: any) => {
    console.log(record)
  }
  //更改上架下架状态
  const switchHandle = async (value: boolean, record: any) => {
    try {
      const { id } = record
      const data = {
        id,
        status: value ? 1 : 2
      }
      await changeStatus(data)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteList = async (ids: string[]) => {
    try {
      const res = await deleteGoods({ ids })
      if (res.code === 200) {
        message.success('删除成功')
        loadList()
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  //删除套餐
  const deleteData = (record: any) => {
    const { id } = record
    deleteList([id])
  }
  //批量删除套餐
  const deleteMore = () => {
    deleteList(selectedRowKeys as string[])
  }
  //监听表格选中项
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    console.log(selectedRows)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  //表格选中配置项
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0
  //表格监听变化
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const { current, pageSize } = pagination
    dispatch(updatePage({ current, pageSize }))
    loadList({ page: current, size: pageSize })
    // console.log('params', pagination, filters, sorter, extra)
  }
  //取消选中
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
        size={sz}
        pagination={{
          pageSize: size,
          total: total,
          current: page,
          pageSizeOptions: [10, 20, 30],
          showSizeChanger: true
        }}
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
            <Button type="primary" ghost onClick={deleteMore}>
              批量删除
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(List)
