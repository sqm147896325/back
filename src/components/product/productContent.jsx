import React, { Component } from 'react'
import { Form, Button, Input, Select, Card } from 'antd'
import './productContent.css'

export default class ProductContent extends Component {
  render () {
    return (
      <div className='product-content'>
        <hr />
        <div className='card'>
          <Card
            title='Default size card'
            extra={<a href='#'>More</a>}
            style={{ width: '100%' }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    )
  }
}
