import React, { Component } from 'react'
import ProductNav from '../../../components/product/productNav'
import ProductContent from '../../../components/product/productContent'

export default class ProductList extends Component {
  render () {
    return (
      <div>
        <ProductNav></ProductNav>
        <ProductContent></ProductContent>
      </div>
    )
  }
}