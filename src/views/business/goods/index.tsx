import React, { memo, useState } from 'react'
import Style from './index.module.scss'
import SearchForm from '@/baseUI/components/SearchForm'
import TableList from '@/baseUI/components/TableList'
const Goods: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState<any>(null)
  return (
    <div className={Style.container}>
      <div className="searchContainer">
        <SearchForm
          setSearchInfo={(value) => setSearchInfo(value)}
        ></SearchForm>
      </div>
      <TableList searchInfo={searchInfo}></TableList>
    </div>
  )
}
export default memo(Goods)
