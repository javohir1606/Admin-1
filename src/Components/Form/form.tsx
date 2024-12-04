import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import React from "react";
import { FormDataType } from "../../Types/data-types";
export const ReusableForm: React.FC<FormDataType> = ({
  submit,
  form,
  data,
  isLoading,
  defaultFileList,
}) => {
  return (
    <>
      {!isLoading && (
        <Form
          layout="vertical"
          initialValues={{ ...data }}
          onFinish={submit}
          form={form}
        >
          <Form.Item
            label={"Title"}
            name={"title"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label={"img"}
            name={"image"}
            valuePropName="file"
            rules={[{ required: true, message: "img kiriting" }]}
          >
            <Upload
              style={{ width: "500px" }}
              listType="picture"
              beforeUpload={() => false}
              accept="image"
              maxCount={1}
              defaultFileList={defaultFileList}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
