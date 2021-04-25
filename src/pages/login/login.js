import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.less";
import logo from "./images/logo.png";

const Item = Form.Item; //不能写在import之前
// const onFinish = (values) => {
//   console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };
/*
登录路由组件
*/
export default class Login extends Component {
  handleSubmit = (values) => {
    const name = this.formRef.current.getFieldValue("password");
    console.log("pass", name);
    console.log("ths", this.formRef.current.getFieldsValue());
  };

  formRef = React.createRef();

  /* 
    对密码进行自定义验证
  */
  validatePwd = (rule, value, callback) => {
    // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
    //value = value.trim();
    if (!value) {
      callback("密码必须输入");
    } else if (value.length < 4) {
      callback("密码不能小于4位");
    } else if (value.length > 12) {
      callback("密码不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是英文、数字或下划线组成");
    } else {
      callback(); // 验证通过
    }
  };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            className="login-form"
            onFinish={this.handleSubmit}
            ref={this.formRef}
          >
            <Item
              name="username"
              rules={[
                // 声明式验证: 使用插件已定义好的规则进行验证
                // 1).必须输入
                // 2). 必须大于等于4位
                // 3). 必须小于等于12位
                // 4). 必须是英文、数字或下划线组成
                { required: true, whitespace: true, message: "请输入用户名" },
                { min: 4, message: "用户名不能小于4位" },
                { max: 12, message: "用户名不能大于12位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    style={{ color: "rgb(0,0,0,.25)", marginRight: "5px" }}
                  />
                }
                placeholder="用户名"
              />
            </Item>
            <Item name="password" rules={[{ validator: this.validatePwd }]}>
              <Input
                prefix={
                  <LockOutlined
                    style={{ color: "rgb(0,0,0,.25)", marginRight: "5px" }}
                  />
                }
                placeholder="密码"
                type="password"
              />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
*/
