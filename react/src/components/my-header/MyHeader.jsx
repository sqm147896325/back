import React, { Component } from 'react'
import './index.css'
import dateUtils from '../../utils/dateUtils'
import { Modal, Button } from 'antd'
import storageUtils from '../../utils/storageUtils'

export default class MyHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: dateUtils.getdate(),
      visible: false,
      username: ''
    }
  }

  componentWillMount () {
    this.setState({
      username: JSON.parse(localStorage.getItem('user_key')).username
    },()=>{
      window.username = this.state.username
    })
    // 获取本地存储中的登录信息
    this.dateInterval = setInterval(() => {
      this.setState({ date: dateUtils.getdate()})
    }, 1000)
    // 时间定时器
  }
  componentWillUnmount () {
    clearInterval(this.dateInterval)
    //   退出登录的时候(取消挂载)清除定时器
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    // console.log(e)   确定退出
    this.setState({
      visible: false
    })
    storageUtils.removeUser('user_key')
    window.location.replace('/')
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  render () {
    return (
      <div className='my-header'>
        <div className='header-top'>
          <span>欢迎,{this.state.username}</span> &nbsp;
          <a href='javascirpt:'>
            <Button type='primary' danger onClick={this.showModal} size='small'>
              退出
            </Button>
            <Modal
              title='退出登录'
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>是否退出登录状态</p>
            </Modal>
          </a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{this.props.nowroute.pathname}</div>
          <div className='header-bottom-right'>
            <span>{this.state.date}</span>
            {/* 时间这种动态渲染的应该单独拎出来作为一个组件，避免渲染次数过高导致效率过低 */}
            <img src='' alt='天气img' />
            <span>天气信息</span>
          </div>
        </div>
      </div>
    )
  }
}
