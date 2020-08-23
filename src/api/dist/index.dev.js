"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqLogin = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 使自定义api模块对应后台接口，用index.js做统一封装。
省去其他不必要的参数如api路径，做到简化调用 */
// 在json文件中定义proxy以解决端口不匹配的问题
// 分别暴露(多个export)与整体暴露(一个export)都可，下面使用分别暴露,调用时一般解构即写大括号
var reqLogin = function reqLogin(username, password) {
  return (0, _ajax["default"])('./login', {
    username: username,
    password: password
  }, 'post');
}; // 箭头函数不写大括号自动return


exports.reqLogin = reqLogin;