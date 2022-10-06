import { Breadcrumb, Layout, Menu } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { Outlet } from "react-router";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const menu = (
  <Menu
    items={[
      {
        label: <Link to="/">Sign In</Link>,
        key: "0",
      },
      {
        label: <Link to="/signup">Sign Up</Link>,
        key: "1",
      },
    ]}
  />
);

const Navbar = (props) => {
  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            height: "48px",
            lineHeight: "0",
            backgroundColor: "#0F0E0E",
          }}
        >
          <Row
            align="middle"
            gutter={20}
            justify="end"
            style={{ height: "48px", backgroundColor: "#0F0E0E" }}
          >
            <Col>
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col></Col>
          </Row>
        </Header>

        {props.children}
      </Layout>
      <Outlet />
    </>
  );
};

export default Navbar;
