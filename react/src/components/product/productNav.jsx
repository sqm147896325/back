import React, { Component } from 'react'
import { Form, Button, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import './productNav.css'
import { reqSearch } from '../../api/index'

const { Option } = Select

export default class ProductNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      demo: 1
    }
  }

  onSubmit = async e => {
    let search = await reqSearch({
      pageNum: 1,
      pageSize: 9999,
      [e.selectKind]: e.selectKey
    })
    this.props.parent(search)
  }

  render () {
    return (
      <div className='product-nav'>
        <div className='left'>
          <Form className='form' onFinish={this.onSubmit}>
            <Form.Item name='selectKind' rules={[{ required: true }]}>
              <Select className='myselect' demo='myselect'>
                <Option value='productName'>productName</Option>
                <Option value='productDesc'>productDesc</Option>
              </Select>
            </Form.Item>
            <Form.Item name='selectKey' rules={[{ required: true }]}>
              <Input className='myinput'></Input>
            </Form.Item>
            <Form.Item>
              <Button type='primary' className='mybutton' htmlType='submit'>
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='right'>
          <Link to='/product/edit'>
            <Button type='primary' className='right-button'>
              添加
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
