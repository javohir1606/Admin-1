import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, UploadFile, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Datas, FormDataType } from "../../Types/data-types";
import { useGetSubCategory } from "../../Service/Query/useGetSubCategory";
export const ProductForm: React.FC<FormDataType> = ({
  submit,
  data,
  isLoading,
  defaultFileList,
  formForCreate,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: SubData } = useGetSubCategory();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title || "",
        price: data.price || "",
        is_new: data.is_new || "",
        category: data.category || "",
        is_available: data.is_available || "",
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
          initialValues={{
            is_new: false,
            is_available: false,
          }}
          layout="vertical"
          onFinish={submit}
          form={data && data?.image ? form : formForCreate}
        >
          <Form.Item
            label={"Category"}
            name={"category"}
            rules={[{ required: true, message: "parent kiriting" }]}
          >
            <Select placeholder="Parent Category">
              {SubData?.results?.map((item: Datas) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.title}
                </Select.Option>
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
            label={"Is_available"}
            valuePropName="checked"
            name={"is_available"}
          >
            <Switch />
          </Form.Item>

          <Form.Item valuePropName="checked" label={"is_new"} name={"is_new"}>
            <Switch />
          </Form.Item>

          <Form.Item
            label={"Price"}
            name={"price"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input placeholder="Price" />
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
