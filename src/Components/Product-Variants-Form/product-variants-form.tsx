import { Button, Form, Input, Select, Switch } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { FormDataType } from "../../Types/data-types";
import { useParams } from "react-router-dom";
import { useGetProducts } from "../../Service/Query/useGetProducts";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const ProductVariantsForm: React.FC<FormDataType> = ({
  submit,
  data,
  isLoading,
  formForCreate,
}) => {
  const [form] = Form.useForm();

  const { id } = useParams();

  const { data: hero } = useGetProducts();

  const { Option } = Select;
  const heroCategory = hero?.results.find(
    (item: any) => item.id === Number(id)
  )?.category;

  const { data: singleData } = useGetSingleData(heroCategory);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title || "",
        price: data.price || "",
        is_new: data.is_new || "",
        category: data.category || "",
        is_available: data.is_available || "",
      });
    }
  }, [form, data]);

  const [editorState, setEditorState] = useState<string>("");

  const quillRef = useRef(null);

  const handleEditorChange = (value: string) => {
    setEditorState(value);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

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
            label={"Attribute Value"}
            name={"attribute_value"}
            rules={[{ required: true, message: "parent kiriting" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Attributes"
              optionLabelProp="label"
            >
              {singleData?.attributes?.map((item: any) => (
                <React.Fragment key={item.id}>
                  <Option key={item.id} disabled>
                    {item.title}
                  </Option>
                  {item.values.map((item2: any) => (
                    <Option
                      value={item2.id.toString()}
                      label={item2.value}
                      key={item2.id}
                    >
                      {item2.value}
                    </Option>
                  ))}
                </React.Fragment>
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
            label={"Quantity"}
            name={"quantity"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input placeholder="quantity" />
          </Form.Item>
          <Form.Item
            label={"Price"}
            name={"price"}
            rules={[{ required: true, message: "price kiriting" }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="other_detail"
            label="Description"
            rules={[
              { required: true, message: "Please provide a description!" },
            ]}
          >
            <ReactQuill
              style={{ height: "300px", marginBottom: "50px" }}
              ref={quillRef}
              value={editorState}
              onChange={handleEditorChange}
              modules={{
                toolbar: toolbarOptions,
              }}
            />
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
