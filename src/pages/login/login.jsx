import React, { Component } from 'react'
import './login.less'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usernameCheck: false,
      passwordCheck: false
    }
  }

  handleSubmit = event => {
    // 监听提交
    if (
      this.state.usernameCheck === true &&
      this.state.passwordCheck === true
    ) {
      let formdata = {
        [event.target[0].name]: event.target[0].value,
        [event.target[1].name]: event.target[1].value
      }
      console.log(formdata)
    } else {
      event.preventDefault()
      // event.preventDefault() 阻止默认事件
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
    return (
      <div className='login'>
        <nav>
          <div>登录界面</div>
        </nav>
        <main>
          <form onSubmit={this.handleSubmit} autocomplete="off">
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
