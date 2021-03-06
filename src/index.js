//入口文件
import React from "react";
import ReactDOM from "react-dom"; //渲染

import "./index.css";
import App from "./App";

//将APP组件标签渲染到index页面的root div上
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
