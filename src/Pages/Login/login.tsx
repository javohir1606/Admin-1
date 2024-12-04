import { Button, Flex, Form, Input, message } from "antd";
import { useLogin } from "../../Service/Mutation/useLogin";
import Cookies from "js-cookie";
import { useLoginType } from "../../Service/Mutation/useLoginType";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const submit = (data: useLoginType) => {
    mutate(data, {
      onSuccess: (res) => {
        Cookies.set("Token", res.token);
        message.success("welcome");
        navigate("/app", { replace: true });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <>
      <Flex justify="center" style={{ marginTop: "100px" }}>
        <Form
          onFinish={submit}
          style={{
            width: "500px",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "15px",
          }}
        >
          <div style={{ marginBottom: "70px" }}>
            <Form.Item
              style={{ marginBottom: "20px", display: "block" }}
              layout="vertical"
              label={"Phone_Number"}
              name={"phone_number"}
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input
                autoComplete="off"
                placeholder="Phone Number"
                size="large"
                style={{ padding: "15px" }}
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "70px" }}>
            <Form.Item
              style={{ display: "block" }}
              layout="vertical"
              label="Password"
              name={"password"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                autoComplete="off"
                size="large"
                style={{ padding: "15px", marginBottom: "200px" }}
              />
            </Form.Item>
          </div>
          <Form.Item style={{ textAlign: "right", margin: "0" }}>
            <Button
              style={{ padding: "20px" }}
              htmlType="submit"
              type="primary"
              variant="outlined"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};
