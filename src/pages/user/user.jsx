import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
import { userList, addUser, deleteUser , updateUser } from '../../api/index'
import UserAdd from './userAdd'
import UserUpdata from './userUpdata'

//
export default class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      columns: [],
      addVisible: false,
      updataVisible: false
    }
  }
  delete = async e => {
    await deleteUser({ userId: e.userid })
    window.location.reload()
  }

  addShow = () => {
    this.setState({
      addVisible: true
    })
  }

  updataShow = e => {
    this.setState({
      updataVisible: true
    })
  }

  updata = e => {
      console.log(e);
    this.updataShow(e)
    this.setState({
      choose: {
        username: e.username,
        phone: e.phone,
        email: e.email,
        roleMsg: e.roleMsg,
        roleid: e.roleid,
        _id:e.userid
      }
    })
  }

  handleOk = async e => {
    //添加的确定函数
    let addData = {
      username: e.user.username,
      password: e.user.password,
      phone: e.user.phone,
      email: e.user.email,
      role_id: e.user.role_id.value
    }
    await addUser(addData)
    this.setState({
      addVisible: false
    })
    window.location.reload()
  }

  updataOk = async e => {
    let demo = await updateUser({...e,_id:this.state.choose._id})
    console.log(demo);
    this.setState({
      updataVisible: false
    })
  }

  handleCancel = e => {
    this.setState({
      addVisible: false,
      updataVisible: false
    })
  }

  async componentWillMount () {
    let userlist = await userList()
    let rolelist = userlist.data.data.roles.map((e, i) => {
      return { id: e._id, name: e.name }
    })
    userlist = userlist.data.data.users
    userlist = userlist.map((e, i) => {
      let rolemsg = []
      rolelist.forEach(ele => {
        if (e.role_id === ele.id) {
          rolemsg[i] = ele.name
        }
      })
      return {
        Key: i,
        username: e.username,
        email: e.email,
        phone: e.phone,
        create_time: e.create_time,
        roleMsg: rolemsg[i],
        roleid: e.role_id,
        userid: e._id
      }
    })

    this.setState({
      dataSource: userlist,
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          key: 'create_time'
        },
        {
          title: '所属角色',
          dataIndex: 'roleMsg',
          key: 'roleMsg'
        },
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          render: (e, i) => {
            return (
              <div>
                <Button
                  type='link'
                  size='small'
                  onClick={() => {
                    this.updata(i)
                  }}
                >
                  修改
                </Button>
                <Button
                  type='link'
                  size='small'
                  onClick={() => {
                    this.delete(i)
                  }}
                >
                  删除
                </Button>
              </div>
            )
          }
        }
      ]
    })
  }

  render () {
    return (
      <div>
        <Button type='primary' style={{ margin: 10 }} onClick={this.addShow}>
          创建用户
        </Button>
        <Card>
          <Table
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          ></Table>
        </Card>
        <UserAdd
          addVisible={this.state.addVisible}
          formOk={this.handleOk}
          formCancel={this.handleCancel}
        ></UserAdd>
        <UserUpdata
          updataVisible={this.state.updataVisible}
          formOk={this.updataOk}
          formCancel={this.handleCancel}
          username={this.state.choose?.username}
          phone={this.state.choose?.phone}
          email={this.state.choose?.email}
          role={{
            label: this.state.choose?.roleMsg,
            value: this.state.choose?.roleid
          }}
        ></UserUpdata>
      </div>
    )
  }
}
