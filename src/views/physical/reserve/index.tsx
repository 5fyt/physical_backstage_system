import React, { memo, useState } from 'react'
import Style from './index.module.scss'
import SearchForm from '@/views/business/goods/components/SearchForm'
const Reserve: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState(null)
  return (
    <div className={Style.container}>
      <SearchForm setSearchInfo={(value) => setSearchInfo(value)}></SearchForm>
      <div style={{ marginTop: '40px' }}>sssssssss</div>
    </div>
  )
}
export default memo(Reserve)
