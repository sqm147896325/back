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
    var pattern = /^[-_a-zA-Z0-9]{4,16}$/
    if (event.target.type === 'text') {
      if (pattern.test(event.target.value)) {
        this.setState({
          usernameCheck: true
        })
      } else {
        this.setState({
          usernameCheck: false
        })
        console.log('用户名不匹配')
      }
    } else if (event.target.type === 'password') {
      if (pattern.test(event.target.value)) {
        this.setState({
          passwordCheck: true
        })
      } else {
        this.setState({
          passwordCheck: false
        })
        console.log('密码不匹配')
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
          <form onSubmit={this.handleSubmit}>
            <div>用户登录</div>
            <input
              type='text'
              name='username'
              placeholder='请输入用户名'
              onChange={this.handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='请输入密码'
              onChange={this.handleChange}
            />
            <button>登录</button>
          </form>
        </main>
      </div>
    )
  }
}
