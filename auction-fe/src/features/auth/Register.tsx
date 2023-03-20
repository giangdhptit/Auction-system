import {
  LockOutlined,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Row, Upload } from "antd";
import { useRegisterMutation } from "./auth.api";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../model/user";

const mapState = (state: RootState) => ({
  user: state.auth.user,
});
type Props = {
  user: User | null;
};
const Register = ({ user }: Props) => {
  const [register, { isLoading }] = useRegisterMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/" />;
  }
  const dateFormat = "DD/MM/YYYY";
  return (
    <div>
      <Row justify="center" align="middle">
        <div className="login-form d-flex flex-direction-column w-500 p-32 bg-white border-radius-md mt-32">
          <h3 className="fw-700 fs-50 lh-29 text-deep-blue-100 mb-32 text-center">
            Register
          </h3>
          {hasErrors && (
            <div className="fs-14 lh-20 fw-400 p-5 bg-gray-20 border-radius-sm text-red-100 mb-16">
              Register failed.
            </div>
          )}
          <Form
            layout="vertical"
            requiredMark={false}
            validateTrigger={false}
            onFinish={async (values) => {
              try {
                const dob = values.dob._i;
                const imageUser = values.imageUser.file.originFileObj;
                const userRegister = { ...values, dob, imageUser };
                await register(userRegister).unwrap();
                navigate("/login");
              } catch (error) {
                setHasErrors(true);
                console.log(error);
              }
            }}
            autoComplete="off"
          >
            <Row className="d-flex justify-space-between">
              <Form.Item
                label="Username"
                name="username"
                className="mb-16 fw-500"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="username"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="mb-16 fw-500"
                validateTrigger={false}
                rules={[{ required: true }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="password"
                />
              </Form.Item>
            </Row>
            <Form.Item
              label="Name"
              name="name"
              className="mb-16 fw-500"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="mb-16 fw-500"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              className="mb-16 fw-500"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="address"
              />
            </Form.Item>
            <Form.Item
              label="Date Of Birth"
              name="dob"
              className="mb-16 fw-500"
              rules={[{ required: true }]}
            >
              <DatePicker format={dateFormat} className="w100p" />
            </Form.Item>
            <Form.Item
              label="Balance"
              name="balance"
              className="mb-16 fw-500"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="balance"
              />
            </Form.Item>
            <Form.Item
              name="imageUser"
              label="Avatar User"
              valuePropName="formList"
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Avatar User</Button>
              </Upload>
            </Form.Item>
            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                className="px-50"
                loading={isLoading}
              >
                Register
              </Button>
            </Form.Item>
            <Row justify="center" align="middle">
              <div>
                <span className="fs-14 lh-20 text-gray-100 fw-500">
                  Do you already have an account?
                </span>
                <Link
                  to="/register"
                  className="fs-14 lh-20 text-blue-100 fw-400 text-decoration-underline"
                >
                  Login
                </Link>
              </div>
            </Row>
          </Form>
        </div>
      </Row>
    </div>
  );
};

export default connect(mapState, {})(Register);
