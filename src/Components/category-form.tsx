import React, { useEffect } from "react";
import { Button, Form, Image, Input, Upload } from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

export interface CategoryFormProps {
  onFinish: (values: { title: string; image: { file: RcFile } }) => void;
  initialValues?: { title?: string; image?: { file: RcFile } };
  data?: { title?: string; image?: { file: RcFile } & string };
  defaultFileList?: UploadFile[] | any;
  isLoading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onFinish,
  initialValues,
  defaultFileList,
  isLoading,
  data,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: data?.title,
      image: data?.image
        ? [
            {
              uid: "-1",
              name: "uploaded-image.png",
              status: "done",
              url: data?.image.file,
            },
          ]
        : [],
    });
  }, [data, form]);
  const handleSubmit = (values: any) => {
    if (onFinish) {
      onFinish({
        title: values?.title,
        image: values?.image ? values.image : null,
      });
    }
  };
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <>
      {!isLoading && (
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: 20,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
              style={{ marginBottom: 16 }}
            >
              <Input
                placeholder="Enter category title"
                style={{
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              initialValue={defaultFileList}
              valuePropName="file"
              rules={[{ required: true, message: "Please upload an image!" }]}
              style={{ marginBottom: 16 }}
            >
              {data?.image && !fileList.length ? (
                <Image
                  src={data?.image}
                  width={100}
                  height={100}
                  alt="Uploaded Preview"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
              <Upload
                style={{ width: "100%" }}
                name="image"
                beforeUpload={() => false}
                listType="picture-card"
                accept="image/*"
                maxCount={1}
                onChange={handleChange}
              >
                <Button>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
