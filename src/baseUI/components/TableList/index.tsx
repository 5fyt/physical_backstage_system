import React, { ReactNode, memo, useEffect, useState, useRef } from 'react'
import Style from './index.module.scss'
import { Button, Dropdown, Space, Popover, Checkbox, Tree } from 'antd'
import {
  PlusOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import { useAppDispatch, useAppSelector } from '@/stores'
import { setShow } from '@/stores/module/goods'
//判断是否是全选
const onCheckAllChange = () => {}
//点击复选框触发
const onCheck = () => {}
const onSelect = () => {}
// const x = 3
// const y = 2
// const z = 1
// const defaultData: DataNode[] = []

// const generateData = (
//   _level: number,
//   _preKey?: React.Key,
//   _tns?: DataNode[]
// ) => {
//   const preKey = _preKey || '0'
//   const tns = _tns || defaultData

//   const children: React.Key[] = []
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`
//     tns.push({ title: key, key })
//     //tns=[{title:'0-0',key:'0-0'},{title:'0-1',key:'0-1'},{title:'0-2',key:'0-2'}]

//     if (i < y) {
//       children.push(key) //children=['0-0, 0-1']

//     }
//   }
//   if (_level < 0) {
//     return tns
//   }
//   const level = _level - 1
//   children.forEach((key, index) => {
//     tns[index].children = [] // tns=[{title:'0-0',key:'0-0',children:[]},{title:'0-1',key:'0-1',children:[]},{title:'0-2',key:'0-2',children:[]}]
//     return generateData(level, key, tns[index].children)
//   })
// }
// generateData(z)
// console.log(defaultData)
/**
 * 设置表格，当默认状态显示的是表格对应的父树节点，且独占一行，父节点前面icon自定义，父节点后面有固定在列首和列尾两个icon图标
 * 当点击固定列首icon图标，将点击这项添加到固定左侧父节点中的子节点，该子节点和父节点失去前面的icon图标，该子节点后面的固定列首图标变成不固定图标和固定在列尾，剩余的父节点被添加进不固定的父节点中的子节点，子节点保留前面的icon图标
 * 当点击固定列尾icon图标，将点击这项添加到固定右侧父节点中的子节点，该子节点和父节点失去前面的icon图标，该子节点后面的固定列尾图标变成固定在列首和不固定图标，剩余的父节点被添加进不固定的父节点中的子节点，子节点保留前面的icon图标
 * 当固定列首或列为出现两个子节点，又将直接的子节点前面icon显示出来
 *
 */

const content = () => {
  const show = useAppSelector((state) => state.goods.show)
  console.log(show)
  const showRef = useRef<any>()
  showRef.current = show
  const dispatch = useAppDispatch()
  const eleRef = useRef<any>()
  useEffect(() => {
    const ele = document.querySelector(
      '.ant-tree-treenode.ant-tree-treenode-switcher-close'
    )
    eleRef.current = ele
    eleRef.current?.addEventListener('mouseenter', function () {
      dispatch(setShow(true))
    })
    eleRef.current?.addEventListener('mouseleave', function () {
      dispatch(setShow(false))
    })
  }, [])

  const defaultData: DataNode[] = [
    {
      title: (
        <div>
          <span style={{ marginRight: '15px' }}>规则名称</span>
          <Space>
            {showRef.current && (
              <>
                <VerticalAlignBottomOutlined style={{ color: '#329dff' }} />
                <VerticalAlignTopOutlined style={{ color: '#329dff' }} />
              </>
            )}
          </Space>
        </div>
      ),
      key: '1'
    },
    {
      title: '描述',
      key: '2'
    },
    {
      title: '服务调用次数',
      key: '3'
    },
    {
      title: '状态',
      key: '4'
    },
    {
      title: '上次调用时间',
      key: '5'
    }
  ]
  const [gData, setGData] = useState(defaultData)
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info)
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  }

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info)
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback)
        }
      }
    }
    const data = [...gData]

    // Find dragObject
    let dragObj: DataNode
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj)
      })
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar: DataNode[] = []
      let i: number
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!)
      } else {
        ar.splice(i! + 1, 0, dragObj!)
      }
    }
    setGData(data)
  }
  return (
    <>
      <div className="setting_top">
        <Checkbox onChange={onCheckAllChange} style={{ borderRadius: '0' }}>
          列展示
        </Checkbox>
        <a href="#">重置</a>
      </div>
      <div className="setting_bottom">
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          draggable
          blockNode
          checkable
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          treeData={gData}
        />
      </div>
    </>
  )
}

const items: MenuProps['items'] = [
  {
    label: <div>默认</div>,
    key: '0'
  },
  {
    label: <div>中等</div>,
    key: '1'
  },
  {
    label: <div>紧凑</div>,
    key: '3'
  }
]
const TableList: React.FC = () => {
  return (
    <div className={Style.table}>
      <div className="operation">
        <div className="left">查询套餐</div>
        <div className="right">
          <Space size={'middle'}>
            <div className="add">
              <Button type="primary" icon={<PlusOutlined />}>
                新建
              </Button>
            </div>
            <div className="refresh">
              <ReloadOutlined style={{ fontSize: '16px' }} />
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
                content={content}
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
    </div>
  )
}
export default memo(TableList)
