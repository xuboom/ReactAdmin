/*
能发送异步ajax请求的异步函数模块
封装axios库
函数返回值是promise对象
*/
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    //执行异步ajax请求
    if (method === "GET") {
      //发送GET请求
      promise = axios.get(url, {
        //配置对象
        params: data, //指定请求参数
      });
    } else {
      //发送POST请求
      promise = axios.post(url, data);
    }
    //成功，调用resolve(value)
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("请求出错" + error.message);
      });
    //失败，不调用reject(reason),提示异常信息
  });
}
