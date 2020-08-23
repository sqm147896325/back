"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var axios = require('axios');

function ajax(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';

  if (type == "get") {
    return axios.get(url, {
      params: data
    });
  } else if (type == "post") {
    return axios.get(url, data);
  } else {
    console.log('发送get或post请求');
  }
}