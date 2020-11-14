import React, { Component } from 'react'
import { PageHeader, Input, Button, InputNumber, Form, Select } from 'antd'
import { reqUpdate } from '../../../api/index.js'
import PicturesWall from '../../../components/pictures/pictures.jsx'
import ProductEditSelect from '../../../components/product/productEditSelect.jsx'

//这个是更新信息组件路由

const { TextArea } = Input

export default class ProductUpdata extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      desc: '',
      price: '',
      imgs: '',
      detail: ''
    }
  }

  onSubmit = async values => {
    let firstele
    let secondele
    if (typeof window.nowProduct !== 'undefined') {
      if (typeof window.onechange !== 'undefined') {
        firstele = window.onechange
      } else {
        firstele = window.nowProduct.pCategoryId
      }
      if (typeof window.onechange !== 'undefined') {
        secondele = window.twochange
      } else {
        secondele = window.nowProduct.categoryId
      }
    } else {
      firstele = window.onechange
      secondele = window.twochange
    }
    values.product.categoryId = secondele || 0
    values.product.pCategoryId = firstele || 0
    values.product._id = window.nowProduct._id || 0
    values.product.detail = document.querySelector('#textarea').value
    await reqUpdate(values.product)
    window.location.href = window.location.origin + '/product'
  }

  componentWillMount () {
    if (typeof window.nowProduct === 'undefined') {
      window.location.href = window.location.origin + '/product'
    } else {
      this.setState({
        name: window.nowProduct.name,
        desc: window.nowProduct.desc,
        price: window.nowProduct.price,
        imgs: window.nowProduct.imgs,
        detail: window.nowProduct.detail,
        _id: window.nowProduct._id
      })
    }
  }

  render () {
    let Detaillist = () => {
      return (
        <Form id='jx' onFinish={this.onSubmit}>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'name']}
              label='名称'
              rules={[{ type: 'string' }]}
              style={{ margin: '0' }}
            >
              <Input
                style={{ width: '240px' }}
                className='detailEdit'
                defaultValue={this.state.name}
              ></Input>
            </Form.Item>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'desc']}
              label='描述'
              rules={[{ type: 'string' }]}
              style={{ margin: '0' }}
            >
              <Input
                style={{ width: '240px' }}
                className='detailEdit'
                defaultValue={this.state.desc}
              ></Input>
            </Form.Item>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'price']}
              label='价格'
              rules={[{ type: 'number', min: 0, max: 99999 }]}
              style={{ margin: '0' }}
            >
              <InputNumber
                style={{ width: '240px' }}
                className='detailEdit'
                defaultValue={this.state.price}
              />
            </Form.Item>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'categoryId']}
              label='分类'
              rules={[{ required: false, type: 'string' }]}
              style={{ margin: '0' }}
            >
              <ProductEditSelect></ProductEditSelect>
            </Form.Item>
          </div>
          <div style={{ margin: '0 30px' }}>
            <Form.Item
              name={['product', 'imgs']}
              label='图片'
              rules={[{ required: false, type: 'any', min: 0, max: 99999 }]}
              style={{ margin: '0' }}
            >
              <PicturesWall className='detailEdit'></PicturesWall>
            </Form.Item>
          </div>

          <div style={{ margin: '0 30px' }}>
            <span style={{ position: 'relative', top: '-90px' }}>详情 ：</span>
            <Input.TextArea
              className='detailEdit'
              rows={4}
              style={{ width: '460px' }}
              defaultValue={this.state.detail}
              id='textarea'
            ></Input.TextArea>
          </div>
          <div
            className='option'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px'
            }}
          >
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                更新
              </Button>
            </Form.Item>
          </div>
        </Form>
      )
    }

    return (
      <div>
        <PageHeader
          className='site-page-header'
          onBack={() => window.history.go(-1)}
          title='商品'
          subTitle='详情页'
        ></PageHeader>
        <Detaillist></Detaillist>
      </div>
    )
  }
}
