import React, { Component, useState } from 'react'
import {
  Form,
  Button,
  Input,
  Select,
  Card,
  Table,
  InputNumber,
} from 'antd'
import './productContent.css'
import { reqProduces } from '../../api/index'

export default class ProductContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productlist: [],
      listdata: []
    }
  }

  async componentWillMount () {
    let req = await reqProduces(1, 5)
    this.setState({
      productlist: req.data.data.list
    })

    let listdata = []
    this.state.productlist.forEach(i => {
      listdata.push({
        name: i.name,
        describe: i.detail,
        price: i.price,
        state: i.status
      })
    })

    this.setState({
      listdata: listdata
    })
  }

  render () {
    const originData = this.state.listdata

    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      )
    }

    const EditableTable = () => {
      const [form] = Form.useForm()
      const [data] = useState(originData)
      const [editingKey] = useState('')

      const isEditing = record => record.key === editingKey

      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          width: '20%',
          editable: true
        },
        {
          title: '商品描述',
          dataIndex: 'describe',
          width: '50%',
          editable: true
        },
        {
          title: '价格',
          dataIndex: 'price',
          width: '10%',
          editable: true
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: '10%',
          editable: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: () => {
            return (
              <div>
                <Button type='link' size='small'>详情</Button>
                <Button type='link' size='small'>修改</Button>
              </div>
            )
          }
        }
      ]
      const mergedColumns = columns.map(col => {
        if (!col.editable) {
          return col
        }

        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record)
          })
        }
      })
      return (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName='editable-row'
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true
            }}
          />
        </Form>
      )
    }

    return (
      <EditableTable>
        <EditableCell></EditableCell>
      </EditableTable>
    )
  }
}
