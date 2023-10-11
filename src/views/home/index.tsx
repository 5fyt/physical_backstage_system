import React, { memo } from 'react'
import Style from './index.module.scss'
import img from '../../assets/home/banner.png'

const Home: React.FC = () => {
  return (
    <>
      <div className={Style.home}>
        <div className="left">
          <h2>神州大健康体检系统</h2>
          <div className="desc">
            <p>医疗健康&nbsp;&nbsp;模式创新</p>
            <p>汇集名医&nbsp;&nbsp;让诊疗更简单</p>
          </div>
          <div className="bottom">
            <div className="remark_container">
              <div className="ball blue">1</div>
              <div className="remark">先进的技术</div>
            </div>
            <div className="remark_container">
              <div className="ball red">2</div>
              <div className="remark">强大的团队</div>
            </div>
            <div className="remark_container">
              <div className="ball green">3</div>
              <div className="remark">丰富的经验</div>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={img} className="banner" />
        </div>
      </div>
    </>
  )
}
export default memo(Home)
