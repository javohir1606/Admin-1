import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import React, { useEffect } from "react";
import { BrandFormType } from "../../Types/data-types";
import TextArea from "antd/es/input/TextArea";

export const BannerForm: React.FC<BrandFormType> = ({
  submit,
  formForCreate,
  isLoading,
  data,
  defaultFileList,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.image) {
      form.setFieldsValue({
        title: data.title || "",
        description: data.description || "",
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
            label={"Description"}
            name={"description"}
            rules={[{ required: true, message: "description  kiriting" }]}
          >
            {/* <Input placeholder="Title" /> */}
            <TextArea rows={6} />
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
          <Button htmlType="submit" type="default">
            Send
          </Button>
        </Form>
      )}
    </>
  );
};
