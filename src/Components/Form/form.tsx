import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { FormDataType } from "../../Types/data-types";
export const ReusableForm: React.FC<FormDataType> = ({
  submit,
  data,
  isLoading,
  defaultFileList,
  formForCreate,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title || "",
        description: data.description || "",
        image: data.image
          ? { uid: "-1", url: data.image, status: "done" }
          : null,
      });
      setFileList(
        data.image
          ? [
              {
                uid: "-1",
                status: "done",
                url: data.image,
              },
            ]
          : []
      );
    }
  }, [form, data]);

  return (
    <>
      {!isLoading && (
        <Form
          // initialValues={initialValues}
          layout="vertical"
          onFinish={submit}
          form={data && data?.image ? form : formForCreate}
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
              listType="picture-card"
              beforeUpload={() => false}
              accept="image/*"
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              defaultFileList={defaultFileList && defaultFileList}
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
