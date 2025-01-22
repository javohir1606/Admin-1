import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

interface BrandFormProps {
  initialValues?: { title: string; image?: { file: RcFile } };
  onSubmit: (values: { title: string; image?: { file: RcFile } }) => void;
  editMode?: boolean;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  initialValues,
  onSubmit,
  editMode,
}) => {
  return (
    <div style={{ width: "50%" }}>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input the title!" },
            { max: 256, message: "Title cannot exceed 256 characters." },
            { min: 1, message: "Title must be at least 1 character." },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload
            name="image"
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
