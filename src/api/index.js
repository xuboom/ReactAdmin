/*
包含应用中所有接口请求函数的模块
返回值promise
*/

//import jsonp from "jsonp";
import ajax from "./ajax";
import fetchJsonp from "fetch-jsonp";

const BASE_URL = "http://120.55.193.14:5000/";
//登录接口
// export function reqLogin(username,password){
//   return ajax('',{username,password},'POST')
// }
export const reqLogin = (username, password) =>
  ajax(BASE_URL + "login", { username, password }, "POST");

//添加用户
export const reqAddUser = (user) =>
  ajax(BASE_URL + "manage/user/add", user, "POST");

//获取天气
export const reqWeather = (location) => {
  location = 110100;
  const url =
    // eslint-disable-next-line no-template-curly-in-string
    `http://api.map.baidu.com/weather/v1/?district_id=${location}&data_type=all&ak=MrTsMxcwa2GZLkuRsMHT0mHDQZulpkkI`;

  try {
    let getText = async () => {
      let promise = await fetchJsonp(url, {
        jsonpCallbackFunction: "portraitCallBack",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let dataS = promise.json();
      dataS.then((data) => {
        console.log(data);
      });
    };
    getText();
  } catch (error) {
    console.log(`错误为${error}`);
  }

  // return new Promise((resolve, reject) => {
  //   jsonp(url, { mode: "no-cors" }, (err, data) => {
  //     if (!err) {
  //       resolve(data);
  //     } else {
  //       reject(err);
  //     }
  //   });
  // });
};
//reqWeather(110100);

//获取一级、二级分类列表
export const reqCatogory = (parentId) =>
  ajax(BASE_URL + "manage/category/list", { parentId });
//添加分类
export const reqAddCatogory = (categoryName, parentId) =>
  ajax(BASE_URL + "manage/category/add", { categoryName, parentId }, "POST");
//更新分类
export const reqUpdateCatogory = ({ categoryName, categoryId }) =>
  ajax(
    BASE_URL + "manage/category/update",
    { categoryName, categoryId },
    "POST"
  );
