import React, { memo, useState, useRef, useEffect } from 'react'

import Style from './index.module.scss'
import { Avatar, List, Button, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '@/stores'
import { results, searchDoctorAsync, totalCount } from '@/stores/module/admin'
const { Search } = Input
const data = Array.from({ length: 23 }).map((_, i) => ({
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: 'Ant Design',
  content: { label: '入职时间', value: '2002-09-12' }
}))

const DoctorUser: React.FC = () => {
  const total = useAppSelector(totalCount)
  const dataList = useAppSelector(results)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(3)
  const dispatch = useAppDispatch()
  const loadList = async () => {
    const data = {
      page,
      size
    }
    await dispatch(searchDoctorAsync(data))
  }
  useEffect(() => {
    loadList()
  }, [])
  //搜索列表
  const onSearch = (value: any) => {
    console.log(value)
  }
  //删除列表
  const deleteUser = (item: any) => {
    console.log(item)
  }
  const changeHandle = (value: number) => {
    console.log(value)
  }
  return (
    <div className={Style.container}>
      <div className="list_title">
        <div className="title">
          <h3>用户列表</h3>
        </div>
        <div className="searchInput">
          <Button type="primary" className="btn">
            新增用户
          </Button>
          <Search placeholder="请输入姓名" onSearch={onSearch} enterButton />
        </div>
      </div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        pagination={{
          onChange: changeHandle,
          pageSize: size,
          total: 23,
          current: page,
          pageSizeOptions: [3, 6, 12],
          showSizeChanger: true
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit" onClick={() => deleteUser(item)}>
                删除
              </a>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<div>{item.title}</div>}
              description={item.title}
            />
            <div className="content">
              <span>{item.content.label}</span>
              <p>{item.content.value}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
export default memo(DoctorUser)
