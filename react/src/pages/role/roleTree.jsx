import React, { Component, useState } from 'react'
import { Tree, Input } from 'antd'

export default class RoleTree extends Component {
  constructor (props) {
    super(props)
    this.state = {
        
    }
  }

  componentWillMount () {
    let menusArr = window.change.menus
      .toString()
      .replace(/'/g, '')
      .split(' ')
    menusArr = menusArr.filter(e => {
      if (e === '/' || e === '/charts') {
        return false
      } else {
        return true
      }
    })
    this.setState({
      CheckedKeys: menusArr
    })
  }

  async componentWillReceiveProps (nextprop) {
      console.log(nextprop);
    let menusArr = window.change.menus
      .toString()
      .replace(/'/g, '')
      .split(' ')
    menusArr = menusArr.filter(e => {
      if (e === '/' || e === '/charts') {
        return false
      } else {
        return true
      }
    })
    this.setState({
      CheckedKeys: menusArr
    })
  }

  render () {
    const treeData = [
      {
        title: '根',
        key: '/',

        children: [
          {
            title: '主页',
            key: '/home'
          },
          {
            title: '商品类别设置',
            key: '/category'
          },
          {
            title: '商品设置',
            key: '/product'
          },
          {
            title: '用户设置',
            key: '/user'
          },
          {
            title: '角色设置',
            key: '/role'
          },
          {
            title: '图表',
            key: '/charts',
            children: [
              { title: '/charts/bar', key: '/charts/bar' },
              { title: '/charts/pie', key: '/charts/pie' },
              { title: '/charts/line', key: '/charts/line' }
            ]
          }
        ]
      }
    ]

    const onCheck = (checkedKeys, info) => {
      let check = [...info.halfCheckedKeys, ...checkedKeys]
      let updata = {
        menus: "'" + check.join("' '") + "'",
        auth_name: window.username,
        name: window.change.RoleName,
        _id: window.change._id
      }
      window.updata = updata
      this.setState({
        CheckedKeys:checkedKeys
      })
    }
    return (
      <div>
        <div style={{ margin: 5 }}>
          选择的角色：{' '}
          <Input
            size='middle'
            value={window.change.RoleName}
            disabled={true}
            style={{ width: '150px' }}
          ></Input>
        </div>
        <Tree
          checkable
          defaultExpandedKeys={['/']}
          //   defaultSelectedKeys={['/','/product']}
          selectable={false}
          checkedKeys={this.state.CheckedKeys}
          onCheck={onCheck}
          treeData={treeData}
        />
      </div>
    )
  }
}
