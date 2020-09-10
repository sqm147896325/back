"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqProduces = exports.reqUpdateCategory = exports.reqAddCategory = exports.reqCategorys = exports.reqAddUser = exports.reqLogin = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 使自定义api模块对应后台接口，用index.js做统一封装。
省去其他不必要的参数如api路径，做到简化调用 */
// 在json文件中定义proxy以解决端口不匹配的问题
var BASE = ''; // 分别暴露(多个export)与整体暴露(一个export)都可，下面使用分别暴露,调用时一般解构即写大括号

var reqLogin = function reqLogin(username, password) {
  return (0, _ajax["default"])(BASE + '/login', {
    username: username,
    password: password
  }, 'post');
}; // 箭头函数不写大括号自动return


exports.reqLogin = reqLogin;

var reqAddUser = function reqAddUser(user) {
  return (0, _ajax["default"])(BASE + '/manage/user/add', user, 'post');
}; //获取一级/二级分类的列表


exports.reqAddUser = reqAddUser;

var reqCategorys = function reqCategorys(parentId) {
  return (0, _ajax["default"])(BASE + '/manage/category/list', {
    parentId: parentId
  });
}; // 不指定类型使用形参默认值，这里为get


exports.reqCategorys = reqCategorys;

var reqAddCategory = function reqAddCategory(categoryName, parentId) {
  return (0, _ajax["default"])(BASE + '/manage/category/add', {
    categoryName: categoryName,
    parentId: parentId
  }, 'post');
};

exports.reqAddCategory = reqAddCategory;

var reqUpdateCategory = function reqUpdateCategory(categoryName, categoryId) {
  return (0, _ajax["default"])(BASE + '/manage/category/update', {
    categoryName: categoryName,
    categoryId: categoryId
  }, 'post');
};

exports.reqUpdateCategory = reqUpdateCategory;

var reqProduces = function reqProduces(parentId) {
  return (0, _ajax["default"])(BASE + '/manage/product/list', {
    parentId: parentId
  });
};

exports.reqProduces = reqProduces;