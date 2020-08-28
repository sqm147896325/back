import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { reqCategorys, reqAddCategory , reqUpdateCategory } from '../../api/index'
import './category.css'

//
export default class Category extends Component {
  state = {
    categorys: [], //一级分类列表
    subCategorys: [], //二级分类列表
    loading: false,
    parentId: '0',
    parentName: '',
    showStatus: 0, // 0 都不显示 1 显示添加 2 显示更新
    upid:'0'
  }

  //   初始化Table的分类
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        // 不要加dataIndex
        width: 320,
        render: category => (
          // render回调传参，传入的是它本身
          <span>
            <Button onClick={this.showUpdateModal} value={category._id}>修改分类</Button>
            {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
            {this.state.parentId === '0' ? (
              <Button onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </Button>
            ) : null}
          </span>
        )
      }
    ]
  }

  showSubCategorys = category => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        // console.log(this.state.parentId)     输出对应的id
        this.getCategorys()
      }
    )
  }

  showCategorys () {
    this.setState({ parentId: '0', parentName: '', subCategorys: [] }, () => {
      this.getCategorys()
    })
  }

  showAddModal = () => {
    this.setState({
      showStatus: 1
    })
  }

  showUpdateModal = (e) => {
    
    this.setState({
      showStatus: 2,
      upid : e.target.parentElement.value
    })
  }

  addHandleOk = e => {
    let addId = document.getElementsByClassName('form-add')[0].value
    let addName = document.getElementsByClassName('form-add')[1].value
    reqAddCategory(addName, addId)
    this.setState({
      showStatus: 0
    })
    this.getCategorys()
  }

  updateHandleOk = e => {
    let update = document.getElementsByClassName('form-update')[0].value
    reqUpdateCategory(update,this.state.upid)
    this.setState({
      showStatus: 0
    })
    this.getCategorys()
  }

  handleCancel = e => {
    this.setState({
      showStatus: 0
    })
  }

  getCategorys = async parentId => {
    this.setState({
      loading: true
    })
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({
      loading: false
    })
    if (result.data.status === 0) {
      const categorys = result.data.data
      if (this.state.parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      console.log(result)
      message.error('获取列表失败')
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    //获取一级列表
    this.getCategorys()
  }

  render () {
    const { categorys, subCategorys, parentId, parentName } = this.state

    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <Button onClick={() => this.showCategorys()}>一级分类列表</Button>
          &nbsp; ~ &nbsp; ~ &nbsp; ~ &nbsp;
          <span>{parentName}</span>
        </span>
      )

    return (
      <div className='category'>
        <Card
          type='inner'
          title={title}
          extra={
            <Button size='middle' type='primary' onClick={this.showAddModal}>
              添加
            </Button>
          }
        >
          <Table
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            bordered={true}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
            loading={this.state.loading}
          />
          <Modal
            title='添加分类'
            visible={this.state.showStatus === 1}
            onOk={this.addHandleOk}
            onCancel={this.handleCancel}
          >
            <select name='' id='' className='form-add'>
              <option value='0'>一级分类列表</option>
              {categorys.map((e, i) => {
                return (
                  <option value={e._id} key={i}>
                    {e.name}
                  </option>
                )
              })}
            </select>
            <br />
            <input type='text' name='' id='' className='form-add' />
          </Modal>
          <Modal
            title='更新分类'
            visible={this.state.showStatus === 2}
            onOk={this.updateHandleOk}
            onCancel={this.handleCancel}
          >
            <input type='text' name='' id='' className='form-update' />
          </Modal>
        </Card>
      </div>
    )
  }
}
