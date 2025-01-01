import {
  ExclamationCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Store/slice/adminSlice";
import useApiRequest from "../utils/useApiRequest";

const AdminLogin = () => {
  const { loading, error, makeRequest } = useApiRequest();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const loginApi = async (values) => {
    try {
      const response = await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/login`,
        data: {
          userName: values.username,
          password: values.password,
        },
      });

      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      const { data } = response;

      dispatch(login(data));
      form.resetFields();
      navigate("/admin/dashboard");
      return response;
    } catch (error) {
      console.error("error::: ", error);
      throw error;
    }
  };

  const onFinish = async (values) => {
    try {
      const result = await loginApi(values);
      message.success(result.message);
    } catch (err) {
      console.error("err::: ", err);
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
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
