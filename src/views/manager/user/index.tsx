import React, { memo } from 'react'
import Style from './index.module.scss'
import SearchForm from '../components/SearchForm'
import searchConfig from './constant/searchConfig'
const DoctorUser: React.FC = () => {
  return <div className={Style.container}>
    <SearchForm searchConfig={searchConfig}></SearchForm>
  </div>
}
export default DoctorUser
