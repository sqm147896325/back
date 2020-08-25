"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var _antd = require("antd");

var axios = require('axios');

function ajax(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
  return new Promise(function (resolve, reject) {
    //   创建Promise让请求的错误直接在此抛出
    var Promise;

    if (type === 'get') {
      Promise = axios.get(url, {
        params: data
      });
    } else {
      Promise = axios.post(url, data);
    }

    Promise.then(function (response) {
      resolve(response);
    })["catch"](function (error) {
      _antd.message.error('请求出错了：' + error.message);
    });
  });
}