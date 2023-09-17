import { FormLayout } from 'antd/es/form/Form'

export type objType = {
  type:string
  prop: string
  label: string
  tooltip?: string
  style?: object
  show?: boolean
}

export interface SearchType<T> {
  setSearchInfo: (value: any) => void
  searchConfig: {
    layout: FormLayout
    wrapperCol: object
    labelCol: object
    style: object
    key?: any
    searchList: T[]
  }
}
interface searchType<T> {
  layout: FormLayout
  wrapperCol: object
  labelCol: object
  style: object
  searchList: T[]
}
const searchConfig: searchType<objType> = {
  labelCol: { span: 8, offset: 10 },
  wrapperCol: { span: 18, offset: 10 },
  layout: 'horizontal',
  style: { minWidth: 600, marginRight: '10px' },
  searchList: [
    {
      type:'input',
      label: '套餐名称',
      prop: 'name',
      tooltip: '这是搜索的唯一标识'
    },
    {
      type:'input',
      label: '套餐编号',
      prop: 'code'
    },
  ]
}
export default searchConfig
