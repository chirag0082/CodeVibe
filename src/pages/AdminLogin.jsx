import React, { useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/slice/adminSlice";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const loginApi = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          userName: values.username,
          password: values.password,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      const data = response.data;
      dispatch(login(data.data));
      <Alert message="Success Tips" type="success" showIcon />;
      form.resetFields();
      return data;
    } catch (error) {
      console.log("error::: ", error);
      throw error;
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await loginApi(values);
      setSuccessMessage(result.message);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title="Admin Login"
        style={{
          width: 400,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            style={{ marginBottom: 16 }}
          />
        )}
        {successMessage && (
          <Alert
            message="Login Success"
            description={successMessage}
            type="success"
            showIcon
            icon={<ExclamationCircleOutlined />}
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              autoComplete=""
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
