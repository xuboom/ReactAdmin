import React, { Component } from "react";
import { Card, Table, Space, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqCatogory, reqAddCatogory, reqUpdateCatogory } from "../../api";
/*
商品分类路由
*/

const data = [
  {
    parentId: "0",
    _id: "5fed9c2acc325b1aceb36202",
    name: "彩电",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9c31cc325b1aceb36203",
    name: "空调",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9c37cc325b1aceb36204",
    name: "冰箱",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9c3ecc325b1aceb36205",
    name: "交通工具",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9c43cc325b1aceb36206",
    name: "菜品",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9ec7cc325b1aceb36207",
    name: "后悔了6",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9ed8cc325b1aceb36208",
    name: "电子产品",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9ee6cc325b1aceb36209",
    name: "卡夫卡",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9f60cc325b1aceb3620a",
    name: "dfsg",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9fb8cc325b1aceb3620b",
    name: "sgll",
    __v: 0,
  },
  {
    parentId: "0",
    _id: "5fed9ffacc325b1aceb3620c",
    name: "被子",
    __v: 0,
  },
];

export default class Category extends Component {
  state = {
    categorys: [],
  };

  initColumns = () => {
    return [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        width: 300,
        title: "操作",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </Space>
        ),
      },
    ];
  };

  getCategory = async () => {
    const result = await reqCatogory("0");
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({
        categorys: categorys,
      });
    } else {
      message.error("获取失败");
    }
  };

  columns = this.initColumns();

  componentDidMount() {
    this.getCategory();
  }

  render() {
    const title = "一级分类列表";

    const { categorys } = this.state;

    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          columns={this.columns}
          dataSource={categorys}
          bordered
          rowKey="_id"
        />
      </Card>
    );
  }
}
