import React, { Component } from 'react'
import { Select } from 'antd'
import { reqAddProduces, reqCategorys } from '../../api/index'

export default class ProductEditSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      change: true,
      children: ''
    }
  }

  componentWillMount = async () => {
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
        change: false,
      })
      this.setState({
        defaultValue: { value: window.nowProduct.pCategoryId },
        scddefaultValue: { value: window.nowProduct.categoryId }
      })
    }
  }

  changeSelect = async e => {
    window.onechange = e.key
    let categoryiList = await reqCategorys(e.key)
    if (categoryiList.data.data.length !== 0) {
      let List = categoryiList.data.data
      List = List.map(e => {
        return { label: e.name, value: e._id }
      })
      this.setState({
        children: List,
        change: false,
        defaultValue: e
      })
    } else {
      this.setState({
        children: '',
        change: true,
        defaultValue: { label: e.label, value: e.value }
      })
    }
  }

  changeSeleChildren = async e => {
    if (typeof window.nowProduct === 'undefined') {
      window.twochange = e.key
    } else {
      window.twochange = e.key
      this.setState({
        scddefaultValue: { label: e.label, value: e.key }
      })
    }
  }

  render () {
    return (
      <div>
        <Select
          defaultValue={this.state.defaultValue}
          value={this.state.defaultValue}
          options={this.state.options}
          onChange={this.changeSelect}
          style={{
            width: '120px',
            border: '1px #ddd solid',
            marginLeft: '5px'
          }}
          bordered={false}
          className='select'
          labelInValue={true}
        ></Select>
        <Select
          options={this.state.children}
          defaultValue={this.state.scddefaultValue}
          value={this.state.scddefaultValue}
          onChange={this.changeSeleChildren}
          style={{
            width: '120px',
            border: '1px #ddd solid',
            marginLeft: '5px'
          }}
          disabled={this.state.change}
          bordered={false}
          className='select'
          labelInValue={true}
        ></Select>
      </div>
    )
  }
}
