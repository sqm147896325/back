import React, { Component } from 'react'
import { PageHeader, Card, Input, Button, InputNumber, Form } from 'antd'
import { reqAddProduces } from '../../../api/index.js'
import PicturesWall from '../../../components/pictures/pictures.jsx'

const { TextArea } = Input

export default class ProductEdit extends Component {
  setDetail = e => {
    let detailEdit = document.querySelectorAll('.detailEdit')
    let editArr = []
    detailEdit.forEach((e, i) => {
      editArr.push(e.value)
    })
    reqAddProduces(editArr)
  }

  render () {
    let listname = ['名称', '描述', '价格', '分类', '图片', '详情']
    let Detaillist = () => {
      return listname.map((element, index) => {
        if (index === 2) {
          return (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 'bold', padding: '0 20px' }}>
                  {element}
                </h3>
                &nbsp; &nbsp;
                <h4 style={{ color: '#666' }}>
                  <Form>
                    <Form.Item
                      name={['product', 'Price']}
                      rules={[
                        {
                          type: 'number',
                          min: 0,
                          max: 99
                        }
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Form>
                </h4>
              </div>
            </Card>
          )
        }
        if (index === 4) {
          return (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 'bold', padding: '0 20px' }}>
                  {element}
                </h3>
                &nbsp; &nbsp;
                <h4 style={{ color: '#666' }}>
                  <PicturesWall></PicturesWall>
                </h4>
              </div>
            </Card>
          )
        }
        if (index === 5) {
          return (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 'bold', padding: '0 20px' }}>
                  {element}
                </h3>
                &nbsp; &nbsp;
                <h4 style={{ color: '#666' }}>
                  <TextArea
                    className='detailEdit'
                    rows={4}
                    style={{ width: '460px' }}
                  ></TextArea>
                </h4>
              </div>
            </Card>
          )
        }
        return (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', padding: '0 20px' }}>
                {element}
              </h3>
              &nbsp; &nbsp;
              <h4 style={{ color: '#666' }}>
                <Input
                  className='detailEdit'
                  style={{ width: '460px' }}
                ></Input>
              </h4>
            </div>
          </Card>
        )
      })
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
        <div
          className='option'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px'
          }}
        >
          <Button type='primary' onClick={this.setDetail}>
            添加
          </Button>
        </div>
      </div>
    )
  }
}
