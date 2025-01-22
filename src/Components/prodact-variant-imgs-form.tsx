import React from "react";
import { Form, Upload, Button, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

interface VariantImageFormProps {
  data: any;
  onFinish: (values: any) => void;
}
export const ProdactVariantImgsForm: React.FC<VariantImageFormProps> = ({
  //   data,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (!values.image) {
      message.error("Please upload an image.");
      return;
    }
    onFinish(values);
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="image"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e?.fileList}
          rules={[{ required: true, message: "Image is required" }]}
        >
          <Upload
            name="image"
            listType="picture-card"
            beforeUpload={() => false}
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
