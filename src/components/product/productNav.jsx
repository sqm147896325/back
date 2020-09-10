import React, { Component } from 'react'
import { Form, Button, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import './productNav.css'

export default class ProductNav extends Component {
  render () {
    return (
      <div className='product-nav'>
        <div className='left'>
          <Form className='form'>
            <Select className='myselect' demo='myselect'></Select>
            <Input className='myinput'></Input>
            <Button type='primary' className='mybutton'>
              搜索
            </Button>
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
