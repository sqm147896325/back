import React, { Component } from 'react'
import { PageHeader, Input, Button, InputNumber, Form, Select } from 'antd'
import { reqAddProduces, reqCategorys } from '../../../api/index.js'
import PicturesWall from '../../../components/pictures/pictures.jsx'
import ProductEditSelect from '../../../components/product/productEditSelect.jsx'

const { TextArea } = Input

//这个是详情信息组件路由

export default class ProductDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      desc: '',
      price: '',
      imgs: '',
      detail: '',
      defaultValue:'',
      scddefaultValue:''
    }
  }

  async componentWillMount () {
    if (typeof window.nowProduct === 'undefined') {
      window.location.href = window.location.origin + '/product'
    } else {
      this.setState({
        name: window.nowProduct.name,
        desc: window.nowProduct.desc,
        price: window.nowProduct.price,
        imgs: window.nowProduct.imgs,
        detail: window.nowProduct.detail
      })
      let categoryiList = await reqCategorys(0)
      let List = categoryiList.data.data
      let options = List.map(e => {
        return { label: e.name, value: e._id }
      })
      this.setState({
        options
      })
      if (typeof window.nowProduct !== 'undefined') {
        let categoryiList = await reqCategorys(window.nowProduct.pCategoryId)
        let List = categoryiList.data.data
        List = List.map(e => {
          return { label: e.name, value: e._id }
        })
        this.setState({
          children: List,
          change: false
        })
        this.setState({
          defaultValue: { value: window.nowProduct.pCategoryId },
          scddefaultValue: { value: window.nowProduct.categoryId }
        })
      }
    }
  }

  render () {
    let Detaillist = () => {
      return (
        <Form id='jx' onFinish={this.onSubmit}>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Button type='default'>名称</Button>
            <Input
              style={{ width: '240px' }}
              className='detailEdit'
              value={this.state.name}
              disabled
            ></Input>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Button type='default'>描述</Button>
            <Input
              style={{ width: '240px' }}
              className='detailEdit'
              value={this.state.desc}
              disabled
            ></Input>
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Button type='default'>价格</Button>
            <InputNumber
              style={{ width: '240px' }}
              className='detailEdit'
              value={this.state.price}
              disabled
            />
          </div>
          <div style={{ height: '50px', margin: '0 30px' }}>
            <Button type='default'>分类</Button>
            <Select
              defaultValue={this.state.defaultValue}
              value={this.state.defaultValue}
              options={this.state.options}
              style={{
                width: '120px',
                border: '1px #ddd solid'
              }}
              disabled
              labelInValue={true}
            ></Select>
            <Select
              defaultValue={this.state.scddefaultValue}
              value={this.state.scddefaultValue}
              options={this.state.children}
              onChange={this.changeSeleChildren}
              style={{
                width: '120px',
                border: '1px #ddd solid'
              }}
              disabled
              labelInValue={true}
            ></Select>
          </div>
          <div style={{ margin: '0 30px' }}>
            <PicturesWall
              className='detailEdit'
              value={this.state.imgs}
            ></PicturesWall>
          </div>

          <div style={{ margin: '0 30px' }}>
            <TextArea
              className='detailEdit'
              rows={4}
              style={{ width: '460px' }}
              value={this.state.detail}
              disabled
            ></TextArea>
          </div>
          <div
            className='option'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px'
            }}
          ></div>
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
