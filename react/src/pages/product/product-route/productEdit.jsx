import React, { Component } from 'react'
import { PageHeader, Input, Button, InputNumber, Form } from 'antd'
import { reqAddProduces } from '../../../api/index.js'
import PicturesWall from '../../../components/pictures/pictures.jsx'
import ProductEditSelect from '../../../components/product/productEditSelect.jsx'

const { TextArea } = Input

export default class ProductEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  onSubmit = values => {
    let firstele = window.twochange
    let secondele = window.onechange
    values.product.categoryId = firstele || 0
    values.product.pCategoryId = secondele || 0
    reqAddProduces(values.product)
    window.location.href = window.location.origin + '/product'
  }

  componentWillMount(){
    window.nowProduct = undefined
  }

  render () {
    let Detaillist = () => {
      return (
        <Form id='jx' onFinish={this.onSubmit}>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'name']}
              label='名称'
              rules={[{ required: true, type: 'string' }]}
              style={{ margin: '0' }}
            >
              <Input style={{ width: '240px' }} className='detailEdit'></Input>
            </Form.Item>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'desc']}
              label='描述'
              rules={[{ required: true, type: 'string' }]}
              style={{ margin: '0' }}
            >
              <Input style={{ width: '240px' }} className='detailEdit'></Input>
            </Form.Item>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Form.Item
              name={['product', 'price']}
              label='价格'
              rules={[{ required: true, type: 'number', min: 0, max: 99999 }]}
              style={{ margin: '0' }}
            >
              <InputNumber style={{ width: '240px' }} className='detailEdit' />
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
            <Form.Item
              name={['product', 'detail']}
              label='详情'
              rules={[{ required: false, type: 'string', min: 0, max: 99999 }]}
              style={{ margin: '0' }}
            >
              <TextArea
                className='detailEdit'
                rows={4}
                style={{ width: '460px' }}
              ></TextArea>
            </Form.Item>
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
                添加
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
          subTitle='添加页'
        ></PageHeader>
        <Detaillist></Detaillist>
      </div>
    )
  }
}
