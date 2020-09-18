import React, { Component } from 'react'
import { Input, Form, Select, Card, Modal, Button } from 'antd'
import { userList } from '../../api/index'

export default class UserUpdata extends Component {
  constructor (props) {
    super(props)
    this.state = {
      option: []
    }
  }

  async componentWillMount () {
    let userlist = await userList()
    userlist = userlist.data.data.roles
    userlist = userlist.map(e => {
      return { label: e.name, value: e._id }
    })
    this.setState({
      option: userlist
    })
  }

  handleChangeusername = event => {
    this.setState({ username: event.target.value })
  }

  handleChangephone = event => {
    this.setState({ phone: event.target.value })
  }

  handleChangeemail = event => {
    this.setState({ email: event.target.value })
  }

  handleChangerole = event => {
    this.setState({ role: event })
  }

  updata = e => {
    let updata
    if (typeof e.user.password !== 'undefined') {
      let password = e.user.password
      updata = {
        username: this.state.username,
        phone: this.state.phone,
        email: this.state.email,
        role_id: this.state.role.value,
        password: password
      }
    } else {
      console.log('密码为空')
      updata = {
        username: this.state.username,
        phone: this.state.phone,
        email: this.state.email,
        role_id: this.state.role.value
      }
    }
    console.log(updata);
    this.props.formOk(updata)
  }

  async componentWillReceiveProps (next) {
    await this.setState({
      username: next.username,
      phone: next.phone,
      email: next.email,
      role: next.role
    })
  }

  render () {
    return (
      <Modal
        title='更新用户'
        visible={this.props.updataVisible}
        footer={null}
        onCancel={this.props.formCancel}
      >
        <Form onFinish={this.updata}>
          <Card>
            <Form.Item name={['user', 'username']} label='用户名'>
              {console.log('')}
              <Input
                defaultValue={this.state.username}
                value={this.state.username}
                onChange={this.handleChangeusername}
              ></Input>
            </Form.Item>
            <Form.Item name={['user', 'password']} label='密码(不显示)'>
              <Input></Input>
            </Form.Item>
            <Form.Item name={['user', 'phone']} label='电话' rules={[]}>
              {console.log('')}
              <Input
                value={this.state.phone}
                onChange={this.handleChangephone}
              ></Input>
            </Form.Item>
            <Form.Item name={['user', 'email']} label='邮箱' rules={[]}>
              {console.log('')}
              <Input
                value={this.state.email}
                onChange={this.handleChangeemail}
              ></Input>
            </Form.Item>
            <Form.Item name={['user', 'role_id']} label='角色'>
              {console.log('')}
              <Select
                options={this.state.option}
                labelInValue
                value={this.state.role}
                onChange={this.handleChangerole}
              ></Select>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                id='submit'
                type='primary'
                style={{ margin: 10 }}
              >
                修改
              </Button>
              <Button
                onClick={this.props.formCancel}
                type='ghost'
                danger
                style={{ margin: 10 }}
              >
                取消
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    )
  }
}
