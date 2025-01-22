import React from "react";
import { Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";

interface ReusableFormProps {
  onSubmit: (values: {
    title: string;
    description?: string;
    image?: { file: RcFile };
  }) => void;
  initialValues?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const BannerForm: React.FC<ReusableFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={(values) => {
        const formData = {
          title: values.title,
          description: values.description,
          image: fileList[0]?.originFileObj
            ? { file: fileList[0].originFileObj }
            : undefined,
        };
        onSubmit(formData);
      }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { max: 255, message: "Description cannot exceed 255 characters." },
        ]}
      >
        <Input.TextArea placeholder="Enter description (optional)" />
      </Form.Item>

      <Form.Item label="Image" name="image">
        {initialValues?.image && !fileList.length ? (
          <Image
            src={initialValues.image}
            width={100}
            height={100}
            alt="Uploaded Preview"
            style={{ objectFit: "cover" }}
          />
        ) : null}

        <Upload
          name="image"
          listType="picture-card"
          maxCount={1}
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
