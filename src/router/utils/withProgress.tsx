import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import hoistNonReactStatic from 'hoist-non-react-statics'
export const WithProgress = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const NewComponent: React.FC<P> = (props) => {
    useEffect(() => {
      NProgress.start()
      setTimeout(() => {
        NProgress.done()
      }, 500)
    }, [])

    return <WrappedComponent {...props} />
  }
  // 拷贝「包装组件」的静态方法到「新组件」
  hoistNonReactStatic(NewComponent, WrappedComponent)
  return NewComponent
}

export const connectRoute = (WrappedComponent: React.ComponentType) => {


  const NewComponent: React.FC = (props) => {
    // shouldComponentUpdate(nextProps) {
    //   return nextProps.location !== this.props.location;
    // }
    return <WrappedComponent {...props}></WrappedComponent>
  }
  return NewComponent
 
}
