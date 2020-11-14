import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
// 引入自定义模块需要加./
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//一上来就读取本地中储存的user——统一的读
memoryUtils.user = storageUtils.getUser()
ReactDom.render(<App />,document.getElementById('root'))