let axios = require('axios')

export default function ajax (url, data = {}, type = 'get') {
    if(type=="get"){
        return axios.get(url,{
            params:data
        })
    }else if(type=="post"){
        return axios.get(url,data)
    }else{
        console.log('发送get或post请求')
    }
}
