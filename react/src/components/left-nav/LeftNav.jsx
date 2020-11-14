import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons'

const { SubMenu } = Menu

export default class LeftNav extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    let user = JSON.parse(localStorage.user_key)
    if (user.username === 'admin') {
      this.setState({
        menus:['/home','/category','/product','/user','/role','/charts/bar','/charts/line','/charts/pie']
      })
    } else {
      let menus = user.role.menus
        .toString()
        .replace(/'/g, '')
        .split(' ')
      console.log(menus)
      this.setState({
        menus
      })
    }
  }

  render () {
    return (
      <div className='left-nav'>
        <header className='left-nav-header'>
          <h1>管理后台</h1>
        </header>
        <div>
          {/* 这里是直接配置的，推荐使用config.js将菜单存入数组，并导入该文件进行动态渲染
        内层配置使用递归调用
        */}
          <Menu
            // defaultSelectedKeys={['1']}
            // 默认选中的菜单为1
            // defaultOpenKeys={['sub1']}
            // 默认打开的菜单为sub1
            mode='inline'
            theme='dark'
            // inlineCollapsed={this.state.collapsed}
            // 结合state控制收缩这里不使用
          >
            {/* 路由 to的路径不要加 . 否则会在原有的基础上跳转 */}
            <Menu.Item
              key='1'
              icon={<PieChartOutlined />}
              style={{
                display:
                  this.state.menus.indexOf('/home') > -1 ? 'block' : 'none'
              }}
            >
              <Link to='/home'>
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key='sub1'
              icon={<MailOutlined />}
              title='商品'
              style={{
                display:
                  this.state.menus.indexOf('/category') > -1 ||
                  this.state.menus.indexOf('/product') > -1
                    ? 'block'
                    : 'none'
              }}
            >
              <Menu.Item
                key='2'
                style={{
                  display:
                    this.state.menus.indexOf('/category') > -1
                      ? 'block'
                      : 'none'
                }}
              >
                <Link to='/category'>
                  <span>品类管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key='3'
                style={{
                  display:
                    this.state.menus.indexOf('/product') > -1 ? 'block' : 'none'
                }}
              >
                <Link to='/product'>
                  <span>商品管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key='4'
              icon={<DesktopOutlined />}
              style={{
                display:
                  this.state.menus.indexOf('/user') > -1 ? 'block' : 'none'
              }}
            >
              <Link to='/user'>
                <span>用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key='5'
              icon={<ContainerOutlined />}
              style={{
                display:
                  this.state.menus.indexOf('/role') > -1 ? 'block' : 'none'
              }}
            >
              <Link to='/role'>
                <span>角色管理</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key='sub2'
              icon={<AppstoreOutlined />}
              title='图形图表'
              style={{
                display:
                  this.state.menus.indexOf('/charts/bar') > -1 ||
                  this.state.menus.indexOf('/charts/line') > -1 ||
                  this.state.menus.indexOf('/charts/pie') > -1
                    ? 'block'
                    : 'none'
              }}
            >
              <Menu.Item
                key='6'
                style={{
                  display:
                    this.state.menus.indexOf('/charts/bar') > -1
                      ? 'block'
                      : 'none'
                }}
              >
                <Link to='/charts/bar'>
                  <span>柱形图</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key='7'
                style={{
                  display:
                    this.state.menus.indexOf('/charts/line') > -1
                      ? 'block'
                      : 'none'
                }}
              >
                <Link to='/charts/line'>
                  <span>折线图</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key='8'
                style={{
                  display:
                    this.state.menus.indexOf('/charts/pie') > -1
                      ? 'block'
                      : 'none'
                }}
              >
                <Link to='/charts/pie'>
                  <span>饼形图</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}
