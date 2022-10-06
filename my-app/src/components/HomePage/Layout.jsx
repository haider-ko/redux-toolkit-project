import { Anchor, Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import Signup from "../Sign-up";
import "../HomePage/Layout.css";
import LoginForm from "../LoginPage/Login-Page";
import { AnchorLinkProps } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image } from "antd";
const { Header, Content, Footer } = Layout;

const Homepage = () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Link>SIGN IN</Link>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </Menu>
    </Header>
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <div className="site-layout-content">
        <Signup />
      </div>
    </Content>
  </Layout>
);

export default Homepage;
