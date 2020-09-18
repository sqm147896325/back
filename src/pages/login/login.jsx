import React, { Component } from 'react'
import './login.less'
import { reqLogin } from '../../api/index'
import { message } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usernameCheck: false,
      passwordCheck: false
    }
  }

  handleSubmit = async event => {
    // 监听提交
    event.preventDefault()
    // event.preventDefault() 阻止默认事件
    if (
      this.state.usernameCheck === true &&
      this.state.passwordCheck === true
    ) {
      let req = await reqLogin(event.target[0].value, event.target[1].value)
      // req.data.data.role.menus = ['/']  menus存储权限,但是初始的admin没有设置权限
      let user = req.data.data
      try {
        message.success('登录成功:' + user.username)
        memoryUtils.user = user
        //保存用户属性到内存工具模块
        storageUtils.saveUser(user)
        // 将user存入local中
        this.props.history.replace('/')
        // replace直接替换页面，不可回退
      } catch (error) {
        message.error('登录失败:' + req.data.msg)
      }
    } else {
      message.error('格式不正确')
    }
  }

  handleChange = event => {
    // 监听输入框的变化
    var pattern = /^[-_a-zA-Z0-9]{4,16}$/
    if (event.target.type === 'text') {
      if (pattern.test(event.target.value)) {
        // 验证正确执行
        this.setState({
          usernameCheck: true
        })
        event.target.nextElementSibling.style.visibility = 'hidden'
      } else {
        // 验证错误执行
        this.setState({
          usernameCheck: false
        })
        event.target.nextElementSibling.style.visibility = 'visible'
      }
    } else if (event.target.type === 'password') {
      if (pattern.test(event.target.value)) {
        this.setState({
          passwordCheck: true
        })
        event.target.nextElementSibling.style.visibility = 'hidden'
      } else {
        this.setState({
          passwordCheck: false
        })
        event.target.nextElementSibling.style.visibility = 'visible'
      }
    } else {
      console.log('err')
    }
  }

  render () {
    // 如果用户已经登录则跳转到用户界面
    const user = memoryUtils.user
    if(user._id){
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='login'>
        <nav>
          <div>登录界面</div>
        </nav>
        <main>
          <form onSubmit={this.handleSubmit} autocomplete='off'>
            <div className='title'>用户登录</div>
            <input
              type='text'
              name='username'
              placeholder='请输入用户名'
              onChange={this.handleChange}
            />
            <div className='tips' style={{ visibility: 'hidden' }}>
              4到16位,字母数字下划线，减号
            </div>
            <input
              type='password'
              name='password'
              placeholder='请输入密码'
              onChange={this.handleChange}
            />
            <div className='tips' style={{ visibility: 'hidden' }}>
              4到16位,字母数字下划线，减号
            </div>
            <button>登录</button>
          </form>
        </main>
      </div>
    )
  }
}
