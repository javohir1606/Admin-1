import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import React, { useEffect } from "react";

import { FormDataType } from "../../Types/data-types";
export const ReusableForm: React.FC<FormDataType> = ({
  submit,
  data,
  isLoading,
  defaultFileList,
  formForCreate,
}) => {
  const [form] = Form.useForm();
  // const initialValues = {
  //   title: data?.title || "",
  //   image: data?.image ? { url: data.image.url } : null,
  // };

  useEffect(() => {
    if (data && data.image) {
      form.setFieldsValue({
        title: data.title || "",
        image: data.image
          ? { uid: "-1", url: data.image, status: "done" }
          : null,
      });
    }
  }, [data, form]);

  return (
    <>
      {!isLoading && (
        <Form
          layout="vertical"
          // initialValues={initialValues}
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

// // //
// /* -------------------------------------------------------------------------- */

// /* -------------------------------------------------------------------------- */
