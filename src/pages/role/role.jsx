import React, { Component, useState } from 'react'
import { Form, Card, Button, Table, message, Modal, Input } from 'antd'
import { roleList, addRole, addRolePower } from '../../api/index'
import RoleTree from './roleTree'

//
export default class Role extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choose: true,
      columns: [
        {
          title: '角色名称',
          dataIndex: 'RoleName',
          render: text => <a>{text}</a>
        },
        {
          title: '创建时间',
          dataIndex: 'CreateTime'
        },
        {
          title: '授权时间',
          dataIndex: 'AuthorizeTime'
        },
        {
          title: '授权人',
          dataIndex: 'AuthorizePerson'
        }
      ],
      data: [],
      M1visible: false,
      M2visible: false
    }
  }

  async componentWillMount () {
    let rolelist = await roleList()
    console.log(rolelist.data.data)

    rolelist = rolelist.data.data.map((e, i) => {
      return {
        RoleName: e.name,
        CreateTime: e.create_time,
        AuthorizeTime: e.auth_time,
        AuthorizePerson: e.auth_name,
        menus: e.menus,
        _id: e._id,
        key: i
      }
    })
    console.log(rolelist)
    this.setState({
      data: rolelist
    })
  }

  onChange = async (selectedRowKeys, selectedRows) => {
    window.change = selectedRows[0]
  }

  getCheckboxProps = record => ({
    //   这里使用键值对设置radio的属性
  })

  setRolePower () {
    if (typeof window.change === 'undefined') {
      message.error('请选择角色')
    } else {
      //   console.log(window.change)
      this.setState({
        M2visible: true
      })
    }
  }

  reAddRole = () => {
    this.setState({
      M1visible: true
    })
  }

  handleCancel = e => {
    this.setState({
      M1visible: false,
      M2visible: false
    },()=>{
        delete window.change
    })
  }

  OkAddRole = async () => {
    let roleName = document.querySelector('#AddRole').value
    if (roleName === '') {
      message.error('请输入')
    } else {
      await addRole({ roleName: roleName })
    }
  }

  OkSetRole = async () => {
    await addRolePower(window.updata)
    window.location.reload()
  }

  render () {
    const MyRadio = () => {
      const [selectionType] = useState('radio')
      return (
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              onChange: this.onChange,
              getCheckboxProps: this.getCheckboxProps
            }}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true
            }}
          />
        </div>
      )
    }

    return (
      <div className='role'>
        <Card>
          <Form>
            <Button
              type='primary'
              size='middle'
              style={{ margin: '10px' }}
              onClick={this.reAddRole}
            >
              创建角色
            </Button>
            <Modal
              title='创建角色'
              visible={this.state.M1visible}
              onOk={this.OkAddRole}
              onCancel={this.handleCancel}
            >
              <div>
                <Input id='AddRole'></Input>
              </div>
            </Modal>
            <Button
              type='primary'
              size='middle'
              onClick={() => this.setRolePower()}
              style={{ margin: '10px' }}
            >
              设置角色权限
            </Button>
            <Modal
              title='设置角色权限'
              visible={this.state.M2visible}
              onOk={this.OkSetRole}
              onCancel={this.handleCancel}
            >
              <div>
                <RoleTree data={this.state.M2visible}></RoleTree>
              </div>
            </Modal>
            <Form.Item>
              <MyRadio></MyRadio>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
