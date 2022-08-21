import { Button, Result } from 'antd'
import React from 'react'

function NotFound() {
  return (
    <>
      <Result
        status="404"
        style={{
          height: '100%',
          background: '#fff',
        }}
        title="Hello World"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    </>
  )
}

export default NotFound