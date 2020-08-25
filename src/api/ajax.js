import { message } from 'antd'

let axios = require('axios')

export default function ajax (url, data = {}, type = 'get') {
  return new Promise((resolve, reject) => {
    //   创建Promise让请求的错误直接在此抛出
    let Promise
    if (type === 'get') {
      Promise = axios.get(url, {
        params: data
      })
    } else {
      Promise = axios.post(url, data)
    }
    Promise.then(response => {
      resolve(response)
    }).catch(error => {
      message.error('请求出错了：' + error.message)
    })
  })
}
