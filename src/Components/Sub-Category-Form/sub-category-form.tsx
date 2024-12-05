import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, Select } from "antd";
import React from "react";
import { Datas, FormDataType } from "../../Types/data-types";
import { useGetData } from "../../Service/Query/useGetData";

export const SubCategoryForm: React.FC<FormDataType> = ({
  submit,
  form,
  data,
}) => {
  const { data: parentTitle } = useGetData();

  return (
    <>
      <Form
        layout="vertical"
        initialValues={{ ...data }}
        onFinish={submit}
        form={form}
      >
        <Form.Item
          label={"Parent"}
          name={"parent"}
          rules={[{ required: true, message: "parent kiriting" }]}
          // initialValue={parentTitle?.results?.[0]?.title}
        >
          <Select>
            {parentTitle?.results?.map((item: Datas) => (
              <Select.Option key={item.id}>{item.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
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
            listType="picture"
            beforeUpload={() => false}
            accept="image"
            maxCount={1}
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
    </>
  );
};
