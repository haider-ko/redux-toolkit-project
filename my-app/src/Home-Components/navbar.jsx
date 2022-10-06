import { Layout, Menu } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import Sidebar from "../Home-Components/sidebar";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const menu = (
  <Menu
    items={[
      {
        label: <Link to="/">Sign Out</Link>,
        key: "0",
      },
    ]}
  />
);

const NavbarHome = (props) => (
  <>
    <Layout className="layout">
      <Header style={{ height: "48px", lineHeight: "0" }}>
        <Row
          align="middle"
          gutter={20}
          justify="end"
          style={{ height: "48px" }}
        >
          <Col>
            <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
              {props.name}
            </Typography.Title>
          </Col>
          <Col>
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </Layout>

    <Sidebar employees={props.employees} name={props.name} />
  </>
);

export default NavbarHome;
