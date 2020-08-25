// 这里是local存储工具模块
//可是使用store库来管理localStorage但是这里没有使用
const USER_KEY = 'user_key'
export default {
    //保存user
    saveUser (user){
        localStorage.setItem(USER_KEY,JSON.stringify(user))
    },
    // 读取user
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        // 解析user_key，但是有可能user_key没有传值，所以此时解析空对象
    },
    // 删除user
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }
}