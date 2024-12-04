import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { data } from "./layout-data";
import { Link, Navigate, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import Cookies from "js-cookie";

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const item = data.map((item) => {
    return {
      key: item.id,
      label: <Link to={item.path}>{item.label}</Link>,
      icon: React.createElement(item.icon),
    };
  });
  const Key: string | any = item.length > 0 ? item[0].key : "";
  const token = Cookies.get("Token");
  if (!token) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <Layout>
      <Sider
        width={400}
        trigger={null}
        // style={{ overflowY: "hidden" }}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={Key}
          style={{ height: "100vh" }}
          items={item}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "block",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
