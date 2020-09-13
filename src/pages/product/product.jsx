import React , { Component } from 'react'
import { Route , Switch ,Redirect } from 'react-router-dom'
import productList from './product-route/productList'
import productEdit from './product-route/productEdit'
import ProductDetails from './product-route/ProductDetails'
import ProductUpdata from './product-route/ProductUpdata'

// 
export default class Product extends Component{
    render(){
        return(
            <div>
                <Switch>
                <Route path="/product" component={productList} exact></Route>
                {/* 子路由与父路由并用不要忘记 exact 精确匹配 */}
                <Route path="/product/edit" component={productEdit}></Route>
                <Route path="/product/details" component={ProductDetails}></Route>
                <Route path="/product/updata" component={ProductUpdata}></Route>
                </Switch>
            </div>
        )
    }
}