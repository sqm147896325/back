import React from 'react'
import {Button} from 'antd'
// {}内为该模块的一个属性
// 开发完成一般按需打包
import 'antd/dist/antd.css'
// 导入样式文件

export default class extends React.Component {
  render () {
    return (
        <div>
        <Button type="primary">123</Button>
        </div>
    )
  }
}
