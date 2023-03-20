import {LockOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {Button, Form, Input, Row} from "antd";
import {connect} from "react-redux";
import {RootState} from "../../store";
import {User} from "../../model/user";
import {useAdminLoginMutation} from "./admin.api";


const mapState = (state: RootState) => ({
    user: state.authAdmin.user,
});
type Props = {
    user: User|null;
};
const AdminLogin = ({user}: Props) => {
    const [loginAdmin, {isLoading}] = useAdminLoginMutation();
    const [hasErrors,setHasErrors]=useState(false);
    if (user?.role==="admin") {
        return <Navigate to="/admin/home"/>;
    }
    return (
        <div>
            <Row justify="center" align="middle">
                <div className="login-form d-flex flex-direction-column w-500 p-32 bg-white border-radius-md mt-32">
                    <h3 className="fw-700 fs-50 lh-29 text-deep-blue-100 mb-32 text-center">
                        Admin Login
                    </h3>
                    {hasErrors && (
                        <div className="fs-14 lh-20 fw-400 p-5 bg-gray-20 border-radius-sm text-red-100 mb-16">
                            The email address or password is incorrect.
                        </div>
                    )}
                    <Form
                        layout="vertical"
                        requiredMark={false}
                        validateTrigger={false}
                        onFinish={async (values) => {
                            try {
                                await loginAdmin(values).unwrap();
                            } catch (error) {
                                setHasErrors(true);
                                console.log(error);
                            }
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            className="mb-16 fw-500"
                            rules={[{required: true}]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            className="mb-32 fw-500"
                            validateTrigger={false}
                            rules={[{required: true}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                placeholder="password"
                            />
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                className="px-50"
                                loading={isLoading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Row>

        </div>
    );
};

export default connect(mapState, {})(AdminLogin);
