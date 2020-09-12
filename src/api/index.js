/* 使自定义api模块对应后台接口，用index.js做统一封装。
省去其他不必要的参数如api路径，做到简化调用 */

// 在json文件中定义proxy以解决端口不匹配的问题

import ajax from './ajax'

const BASE = ''

// 分别暴露(多个export)与整体暴露(一个export)都可，下面使用分别暴露,调用时一般解构即写大括号
export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'post')
// 箭头函数不写大括号自动return
export const reqAddUser = user => ajax(BASE + '/manage/user/add', user, 'post')

//获取一级/二级分类的列表
export const reqCategorys = parentId =>
  ajax(BASE + '/manage/category/list', { parentId })
// 不指定类型使用形参默认值，这里为get

export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'post')

export const reqUpdateCategory = (categoryName, categoryId) =>
  ajax(BASE + '/manage/category/update', { categoryName, categoryId }, 'post')

export const reqProduces = (pageNum, pageSize) =>
  ajax(BASE + '/manage/product/list', { pageNum, pageSize })

export const reqAddProduces = async AddProduces => {
  /*
AddProduces包括
{categoryId,
pCategoryId,
name,
price,
desc,
status,
imgs,
detail}
*/
AddProduces.status = 0
// 0代表未上架
console.log(AddProduces)
  let demo = await ajax(BASE + '/manage/product/add', AddProduces, 'post')
  console.log(demo)
}


export const reqUpdateState = (reqUpdateState) =>
  ajax(BASE + '/manage/product/updateStatus', reqUpdateState, 'post')
