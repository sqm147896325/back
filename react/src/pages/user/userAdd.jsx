import React, { Component } from 'react'
import { Input, Form, Select, Card, Modal, Button } from 'antd'
import { userList } from '../../api/index'

export default class UserAdd extends Component {
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

  render () {
    return (
      <Modal
        title='添加用户'
        visible={this.props.addVisible}
        footer={null}
        onCancel={this.props.formCancel}
      >
        <Form onFinish={this.props.formOk}>
          <Card>
            <Form.Item
              name={['user', 'username']}
              label='用户名'
              rules={[{ required: true }]}
            >
              <Input autocomplete='off'></Input>
            </Form.Item>
            <Form.Item
              name={['user', 'password']}
              label='密码'
              rules={[{ required: true }]}
            >
            <Input autocomplete='off'></Input>
            </Form.Item>
            <Form.Item name={['user', 'phone']} label='电话' rules={[]}>
            <Input autocomplete='off'></Input>
            </Form.Item>
            <Form.Item name={['user', 'email']} label='邮箱' rules={[]}>
            <Input autocomplete='off'></Input>
            </Form.Item>
            <Form.Item
              name={['user', 'role_id']}
              label='角色'
              rules={[{ required: true }]}
            >
              <Select options={this.state.option} labelInValue></Select>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                id='submit'
                type='primary'
                style={{ margin: 10 }}
              >
                添加
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
