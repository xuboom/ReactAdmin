import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.less";
import logo from "../../assets/images/logo.png";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router";
//const Item = Form.Item; //不能写在import之前

/*
登录路由组件
*/
export default class Login extends Component {
  formRef = React.createRef();

  handleSubmit = (values) => {
    this.formRef.current
      .validateFields()
      .then(async (values) => {
        //请求登录
        const { username, password } = values;
        const result = await reqLogin(username, password);
        //console.log("请求成功", response.data);
        if (result.status === 0) {
          //登录成功
          message.success("登录成功");
          const user = result.data;
          memoryUtils.user = user;
          storageUtils.saveUser(user);
          this.props.history.replace("/");
        } else {
          //登录失败
          message.error(result.msg);
        }
        // .then((response) => {
        //   console.log("success", response.data);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      })
      .catch((err) => {
        console.log("检验失败");
      });
  };

  /* 
    对密码进行自定义验证
  */
  validatePwd = (rule, value) => {
    //(rule,value,callback)
    // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
    //value = value.trim();
    if (!value) {
      return Promise.reject("密码必须输入");
      //callback("密码必须输入");
    } else if (value.length < 4) {
      return Promise.reject("密码不能小于4位");
      //callback("密码不能小于4位");
    } else if (value.length > 12) {
      return Promise.reject("密码不能大于12位");
      //callback("密码不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject("密码必须是英文、数字或下划线组成");
      //callback("密码必须是英文、数字或下划线组成");
    } else {
      return Promise.resolve();
      //callback(); // 验证通过
    }
  };

  render() {
    //判断用户是否登录
    if (memoryUtils.user && memoryUtils.user._id) {
      return <Redirect to="/" />;
    }
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
            <Form.Item
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
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: this.validatePwd }]}
            >
              <Input
                prefix={
                  <LockOutlined
                    style={{ color: "rgb(0,0,0,.25)", marginRight: "5px" }}
                  />
                }
                placeholder="密码"
                type="password"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
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
