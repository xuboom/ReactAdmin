import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "antd";
import { reqWeather } from "../../api";

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import MyHeader from "../../components/header";
import Home from "../home/home";
import Category from "../product/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
/*
后台管理路由组件
*/
const { Footer, Sider, Content } = Layout;
const location = 110100;
export default class Admin extends Component {
  test = reqWeather(location);
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      //当前没有登录 自动跳转登录页面 render中实现跳转
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <MyHeader>Header</MyHeader>
          <Content style={{ margin: 20, backgroundColor: "white" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product/category" component={Category} />
              <Route path="/product/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ color: "rgba(0, 0, 0, 0.5)", textAlign: "center" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
