import React, { Component } from 'react'
import { Select } from 'antd'
import { reqAddProduces, reqCategorys } from '../../api/index'

export default class ProductEditSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      change: true,
      children: '',
      defaultValue: ''
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
  }

  changeSelect = async e => {
    window.onechange = e.key
    let categoryiList = await reqCategorys(e.key)
    if (categoryiList.data.data.length !== 0) {
      let List = categoryiList.data.data
      List = List.map(e => {
        console.log(e._id)
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
        defaultValue: e.label
      })
    }
  }

  changeSeleChildren = async e =>{
    window.twochange = e.key
  }

  render () {
    return (
      <div>
        <Select
          defaultValue={this.state.defaultValue}
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
          defaultValue=''
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
