import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Card, List } from "antd";
import React from "react";
import { Col, Row } from "antd";
import "../LoginPage/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Space, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/userSlice";
const { Title } = Typography;

const LoginForm = () => {
  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [form] = Form.useForm();

  const users = useSelector(selectUser);

  var navigate = useNavigate();

  async function signinfunction() {
    await form.validateFields();
    // when email is found
    if (users) {
      if (users.email === loginemail) {
        if (users.password === loginpassword) {
          message
            .loading("Action in progress..", 1)
            .then(() => message.success("Login success", 2.5));

          navigate("/home");
        } else {
          message.error("Login failed. Wrong password");
        }
      } else {
        message.error("No user found");
      }
    } else {
      // when email is not found
      message.warning("No user found");
    }
  }

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row
        justify="center"
        align="center"
        gutter={24}
        padding="200px"
        className="body"
        style={{
          backgroundColor: "rgb(108 11 15)",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Col span={15}>
          <Space
            direction="vertical"
            size="middle"
            gutter={30}
            style={{
              display: "flex",
              justify: "center",
              paddingTop: "20px",
            }}
          >
            <Card
              size="small"
              className="ant-card ant-card-bordered ant-card-small"
              style={{
                marginTop: "80px",
                backgroundColor: "#ffffff",
                marginLeft: "200px",
                width: "400px",
                borderRadius: "20px",
              }}
            >
              <Row style={{ padding: "30px" }} gutter={[10, 100]}>
                <Col span={14} offset={4}>
                  <Title
                    level={3}
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                      paddingBottom: "5px",
                    }}
                  >
                    Welcome, Login to Continue
                  </Title>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      value={loginemail}
                      onChange={(e) => {
                        setloginEmail(e.target.value);
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      value={loginpassword}
                      onChange={(e) => {
                        setloginpassword(e.target.value);
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        shape="round"
                        onClick={signinfunction}
                        style={{ marginRight: "5px" }}
                      >
                        Log in
                      </Button>
                      Or <Link to="/signup">register now!</Link>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default LoginForm;
