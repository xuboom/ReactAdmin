/*
进行local数据存储管理工具模块
*/
import store from "store";
const USER_KEY = "user_key";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  /*
  保存user
  */
  saveUser(user) {
    //localStorage.setItem(USER_KEY,Json.stringfy(user))
    store.set(USER_KEY, user);
  },
  /*
  读取user
  */
  getUser() {
    //return Json.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {};
  },
  /*
  删除user
  */
  removeUser() {
    //localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY);
  },
};
