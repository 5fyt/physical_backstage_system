import React, { memo } from 'react'
import Styles from './index.module.scss'
const NotFound: React.FC = () => {
  return (
    <div className={Styles.notFound}>
      <div className={Styles.title}>哎呀，你的网页走丢了</div>
    </div>
  )
}
export default memo(NotFound)
