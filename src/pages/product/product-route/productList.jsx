import React, { Component } from 'react'
import ProductNav from '../../../components/product/productNav'
import ProductContent from '../../../components/product/productContent'

// 这个是Product主页面路由组件

export default class ProductList extends Component {
  constructor(props){
    super(props)
    this.state = ({
    })
  }

  searchUpdata = (productlist)=>{
    this.setState({
      searchList:productlist
    })
    this.setState({
      searchList:productlist
    })
    this.setState({
      searchList:productlist
    })
  }

  render () {
    return (
      <div>
        <ProductNav parent={this.searchUpdata}></ProductNav>
        <ProductContent searchUpdata={this.state.searchList} ></ProductContent>
      </div>
    )
  }
}