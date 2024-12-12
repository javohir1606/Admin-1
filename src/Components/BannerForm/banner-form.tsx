import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { BrandFormType } from "../../Types/data-types";
import TextArea from "antd/es/input/TextArea";

export const BannerForm: React.FC<BrandFormType> = ({
  submit,
  formForCreate,
  isLoading,
  data,
  BooleanImage,
  defaultFileList,
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
  }, [data]);

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
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              defaultFileList={BooleanImage ? defaultFileList : []}
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
