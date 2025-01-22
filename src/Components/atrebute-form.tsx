import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

interface AttributeFormProps {
  onFinish: (values: {
    items: { name: string; list: { first: string }[] }[];
  }) => void;
  data?: {
    id: number;
    title: string;
    category: number[];
    category_title: [
      {
        title: string;
      }
    ];
    values: [
      {
        id: number;
        value: string;
      }
    ];
  };
}

export const AttributeForm: React.FC<AttributeFormProps> = ({
  onFinish,
  data,
}) => {
  const [form] = Form.useForm();

  const initialValues = data
    ? {
        items: data?.values.map((item) => ({
          name: data.category_title[0]?.title || "",
          list: item.value ? [{ first: item.value }] : [],
        })),
      }
    : { items: [{}] };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_forms_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Form.Item
                  name={[field.name, "name"]}
                  rules={[{ required: true, message: "Please input a title!" }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item>
                  <Form.List name={[field.name, "list"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space
                            key={subField.key}
                            align="baseline"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Form.Item
                              noStyle
                              name={[subField.name, "first"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input a value!",
                                },
                              ]}
                            >
                              <Input placeholder="Value" />
                            </Form.Item>

                            <CloseOutlined
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => subOpt.remove(subField.name)}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
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
