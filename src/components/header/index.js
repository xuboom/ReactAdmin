import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

import "./index.less";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button";
/*
头部组件
*/
class MyHeader extends Component {
  getTitle = () => {
    let title;
    const path = this.props.location.pathname;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const flag = item.children.find((cItem) => cItem.key === path);
        if (flag) {
          title = flag.title;
        }
      }
    });
    return title;
  };

  logOut = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确认退出?",
      onOk: () => {
        console.log("OK");
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
    });
  };

  render() {
    const title = this.getTitle();

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎</span>
          <LinkButton href="" onClick={this.logOut}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>2021-4-16 20:03</span>
            <img alt="" src="" />
            <span>sun</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MyHeader);
