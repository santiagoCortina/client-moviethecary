import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupWs } from "../../services/auth-ws";
import { Form, Input, Button } from "antd";

export default function Signup({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data, status, errorMessage } = await signupWs(values);
      if (status) {
        authenticate(data.user);
        navigate("/feed");
      } else {
        setError(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <br></br>
      <br></br>
      <div>
        <h1>Sign Up</h1>
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 6,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 9,
                span: 6,
              }}
            >
              {error && (
                <div className="error-block">
                  <p>There was a problem with your Sign Up process:</p>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
