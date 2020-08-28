import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav/LeftNav'
import MyHeader from '../../components/my-header/MyHeader'
import './admin.css'

import Home from '../home/home'
import Category from '../category/category'
import User from '../user/user'
import Role from '../role/role'
import Product from '../product/product'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Header, Sider, Content } = Layout

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nowroute: this.props.history.location
    }
    this.props.history.listen(route => {
      this.setState({
        nowroute: route
      })
    })
  }

  componentDidMount () {
    this.setState({
      nowroute: this.props.history.location
    })
  }
  

  render () {
    const user = memoryUtils.user
    if (!user || !user._id) {
      //如果内存中没有user即没有登录
      return <Redirect to='/login' />
    }
    return (
      // <div>
      //   <div>Hello {user.username}</div>
      // </div>
      // Layout必须放在最外层
      <Layout className='Layout'>
        <Sider className='left-nav'>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header
            style={{ height: '80px', backgroundColor: '#fff', padding: '0' }}
          >
            <MyHeader nowroute={this.state.nowroute}></MyHeader>
          </Header>
          <Content style={{ margin: '20px', backgroundColor: '#fff' }}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </Content>
          <footer>底部</footer>
        </Layout>
      </Layout>
    )
  }
}
