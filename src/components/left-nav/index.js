import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.less";

import { Menu } from "antd";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
/*
左侧导航组件
*/
class LeftNav extends Component {
  /*
  根据menuList生产标签数组
  */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;

    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        const itemlist = item.children.find((citem) => citem.key === path);
        if (itemlist) {
          this.openkey = item.key;
        }

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  menuNodes = this.getMenuNodes(menuList);

  render() {
    //得到当前请求路由路径

    const path = this.props.location.pathname;
    const openkey = this.openkey;

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openkey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

/*
高阶组件
包装非路由组件，返回新组件
传递3个属性：history location match
*/
export default withRouter(LeftNav);
