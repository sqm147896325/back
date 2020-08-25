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
  render () {
    return (
      <div className='left-nav'>
        <header className='left-nav-header'>
          <h2>管理后台</h2>
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
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              <Link to='./home'>
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
              <Menu.Item key='2'>
                <Link to='./category'>
                  <span>品类管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='3'>
                <Link to='./product'>
                  <span>商品管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='4' icon={<DesktopOutlined />}>
              <Link to='./user'>
                <span>用户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='5' icon={<ContainerOutlined />}>
              <Link to='./role'>
                <span>角色管理</span>
              </Link>
            </Menu.Item>
            <SubMenu key='sub2' icon={<AppstoreOutlined />} title='图形图表'>
              <Menu.Item key='6'>
                <Link to='./charts/bar'>
                  <span>柱形图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='7'>
                <Link to='./charts/line'>
                  <span>折线图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='8'>
                <Link to='./charts/pie'>
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
