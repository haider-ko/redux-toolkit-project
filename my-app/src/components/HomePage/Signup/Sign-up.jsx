import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";

import { useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import "../Signup/Sign-up.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/counter/userSlice";
import { Outlet } from "react-router-dom";
import { signUp } from "../../../features/counter/userSlice";
const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
      offset: 2,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 8,
    },
  },
};

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const users = useSelector(selectUser);

  var navigate = useNavigate();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  var userData;
  // SignUp function
  async function signupFunction() {
    await form.validateFields();

    dispatch(
      signUp({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
    );

    navigate("/login");
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <Title
        level={2}
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginLeft: "588px",
          paddingBottom: "30px",
          padding: "10px",
        }}
      >
        Sign Up
      </Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ width: "110pc" }}
        scrollToFirstError
      >
        <Form.Item
          label="First Name"
          validateStatus="Danger"
          placeholder="Name"
          value={firstname}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
              type: "",
            },
          ]}
        >
          <Input className="inputfield" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          value={lastname}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input className="inputfield" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="inputfield" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className="inputfield" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="inputfield" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input className="inputfield" addonBefore={prefixSelector} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={signupFunction}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Outlet />
    </>
  );
};

export default Signup;
