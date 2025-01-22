import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Upload,
  message,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useCatalogGet } from "../pages/category/service/mutate/useCatalogGet";

interface ReusableFormProps {
  initialValues?: {
    title?: string;
    image?: string | { file: RcFile };
    price?: string;
    is_available?: boolean;
    is_new?: boolean;
    category?: string;
  };
  onSubmit: (formData: FormData) => void;
}

export const ProductForm: React.FC<ReusableFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const { data, isLoading, error } = useCatalogGet();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (data) {
      setCategories(data.results);
    }
    if (error) {
      message.error("Failed to fetch categories!");
    }
  }, [data, error]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      if (!values.title) {
        message.error("Title is required.");
        return;
      }

      if (!values.price) {
        message.error("Price is required.");
        return;
      }

      if (!values.category) {
        message.error("Category is required.");
        return;
      }

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj!);
      }
      formData.append("title", values.title);
      formData.append("price", values.price.toString());
      formData.append("category", values.category.toString());
      formData.append("is_available", values.is_available ? "true" : "false");
      formData.append("is_new", values.is_new ? "true" : "false");

      onSubmit(formData);
      message.success("Form submitted successfully!");
    } catch (error) {
      message.error("Failed to submit the form!");
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            placeholder={
              isLoading ? "Loading categories..." : "Select a category"
            }
            loading={isLoading}
            options={categories.map((category) => ({
              value: category.id,
              label: category.title,
            }))}
          />
        </Form.Item>
        <div style={{ display: "flex", gap: "38px" }}>
          <Form.Item label="Is New" name="is_new" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Is Available"
            name="is_available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input the title!" },
            { max: 256, message: "Title cannot exceed 256 characters!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          style={{ display: "flex", flexDirection: "column" }}
          label="Image"
          name="image"
          valuePropName="file"
        >
          {initialValues?.image && !fileList.length ? (
            <Image
              src={initialValues.image.toString()}
              width={100}
              height={100}
              alt="Uploaded Preview"
              style={{ objectFit: "cover" }}
            />
          ) : null}
          <Upload
            style={{ width: "100%" }}
            accept="image/*"
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
            onChange={handleChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}></Button>
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
