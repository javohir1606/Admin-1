import { Button, Form, Input, Select, Switch } from "antd";
import React, { useEffect } from "react";
import { FormDataType } from "../../Types/data-types";
// import { useGetData } from "../../Service/Query/useGetData";
import { useParams } from "react-router-dom";
import { useGetProducts } from "../../Service/Query/useGetProducts";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";

export const ProductVariantsForm: React.FC<FormDataType> = ({
  submit,
  data,
  isLoading,
  formForCreate,
}) => {
  const [form] = Form.useForm();
  // const { data: SubData } = useGetData();
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
