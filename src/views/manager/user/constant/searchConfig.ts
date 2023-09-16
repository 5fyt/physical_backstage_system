import { FormLayout } from 'antd/es/form/Form'

export type objType = {
  prop: string
  label: string
  tooltip?: string
  style?: object
  show?:boolean
}

export interface SearchType<T> {
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
  labelCol: { span: 8, offest: 10 },
  wrapperCol: { span: 18, offest: 10 },
  layout: 'horizontal',
  style: { minWidth: 600, marginRight: '10px' },
  searchList: [
    {
      label: '姓名',
      prop: 'name',
      tooltip: '这是搜索的唯一标识'
    },
    
  ]
}
export default searchConfig
