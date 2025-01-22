import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

interface AttributeFormProps {
  onFinish: (values: {
    items: { name: string; list: { first: string }[] }[];
  }) => void;
  data?: { name: string; list: { first: string }[] }[];
}

export const AttributeEditeForm: React.FC<AttributeFormProps> = ({
  onFinish,
  data,
}) => {
  const [form] = Form.useForm();

  const initialValues = data
    ? { items: data.map((item) => ({ name: item.name, list: item.list })) }
    : { items: [{}] };

  return (
    <Form
      form={form}
      name="attribute_form"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fields.map((field) => (
              <Card
                key={field.key}
                title={`Attribute ${field.name + 1}`}
                size="small"
                extra={
                  <CloseOutlined
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Form.Item
                  name={[field.name, "name"]}
                  rules={[{ required: true, message: "Please input a name!" }]}
                >
                  <Input placeholder="Attribute Name" />
                </Form.Item>

                <Form.List name={[field.name, "list"]}>
                  {(subFields, subOpt) => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {subFields.map((subField) => (
                        <Space key={subField.key} align="baseline">
                          <Form.Item
                            name={[subField.name, "first"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input a value!",
                              },
                            ]}
                          >
                            <Input placeholder="Attribute Value" />
                          </Form.Item>
                          <CloseOutlined
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => subOpt.remove(subField.name)}
                          />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>
                        + Add Value
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Attribute
            </Button>
          </div>
        )}
      </Form.List>
      <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
        Submit
      </Button>
    </Form>
  );
};
