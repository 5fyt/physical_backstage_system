import React, { memo, useState } from 'react'
import Style from './index.module.scss'
import SearchForm from '@/baseUI/components/SearchForm'
const Goods: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState(null)
  return (
    <div className={Style.container}>
      <div className="searchContainer">
        <SearchForm
          setSearchInfo={(value) => setSearchInfo(value)}
        ></SearchForm>
      </div>

      <div style={{ marginTop: '100px' }}>sssssssss</div>
    </div>
  )
}
export default memo(Goods)
