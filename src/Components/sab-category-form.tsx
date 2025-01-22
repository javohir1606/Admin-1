import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload, UploadFile } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useCatalogGet } from "../pages/category/service/mutate/useCatalogGet";

export interface SubCategoryFormProps {
  onFinish?: (values: {
    title: string;
    image: RcFile | null;
    parent: number;
    id?: string | number;
  }) => void;
  data?: {
    title?: string;
    image?: string;
    parent?: { id: number; title: string };
    id: string | number;
  };
}

export const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  onFinish,
  data,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const { data: fetchedCategories, isLoading } = useCatalogGet();

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories.results);
    }
  }, [fetchedCategories]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        parent: data.parent,
        image: data.image
          ? [
              {
                uid: "-1",
                name: "uploaded-image.png",
                status: "done",
                url: data.image,
              },
            ]
          : [],
      });
    }
  }, [data, form]);

  const handleSubmit = (values: any) => {
    if (onFinish) {
      onFinish({
        title: values.title,
        image: values.image ? values.image[0].originFileObj : null,
        parent: values.parent,
      });
    }
  };

  const defaultFileList: UploadFile<any>[] = [
    {
      uid: "-1",
      status: "done",
      url: `${data?.image}`,
      name: "uploaded-image.png",
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
      initialValues={{
        parent: data?.parent
          ? { value: data.parent.id, label: data.parent.title }
          : undefined,
        title: data?.title ?? undefined,
      }}
    >
      <Form.Item
        label="Parent Category"
        name="parent"
        rules={[
          { required: true, message: "Please select a parent category!" },
        ]}
      >
        <Select
          placeholder={
            isLoading ? "Loading categories..." : "Select a parent category"
          }
          loading={isLoading}
          style={{ width: "100%" }}
          options={
            isLoading
              ? []
              : categories.map((category) => ({
                  value: category.id,
                  label: category.title,
                }))
          }
        />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Enter category title" />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          accept="image/*"
          maxCount={1}
          defaultFileList={defaultFileList}
        >
          <Button>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
