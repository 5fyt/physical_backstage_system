import { Alert } from 'antd'
import React from 'react'
const AlertMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type="error"
    showIcon
    closable
  />
)
export default AlertMessage
