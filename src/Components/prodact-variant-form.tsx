import { Form, InputNumber, Switch, Button, Select, Input } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useCategoryId } from "../pages/category/service/mutate/useCategoryId";

interface ProductVariantFormProps {
  onFinish: (values: {
    attributeValue: string[];
    quantity: number;
    isNew: boolean;
    isAvailable: boolean;
    title: string;
    price: number;
    description: string;
  }) => void;
  isLoading: boolean;
  isError: boolean;
  error: any;
  initialValues?: {
    attributeValue?: string[];
    quantity?: number;
    isNew?: boolean;
    isAvailable?: boolean;
    title?: string;
    price?: number;
    description?: string;
  };
}

export const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  onFinish,
  isLoading,
  isError,
  error,
  initialValues,
}) => {
  const { category } = useParams<{ category: string }>();
  const { data } = useCategoryId(category);

  const options =
    data?.attributes?.flatMap((attribute: any) =>
      attribute.values.map((value: any) => ({
        value: value.id,
        label: value.value,
      }))
    ) || [];

  return (
    <div style={{ width: "50%" }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <Form.Item
          name="attributeValue"
          label="Attribute Value"
          rules={[
            { required: true, message: "Please select an attribute value!" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder={isLoading ? "Loading..." : "Select an attribute value"}
            loading={isLoading}
            options={options}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter the quantity!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item name="isNew" valuePropName="checked" label="Is New">
            <Switch />
          </Form.Item>

          <Form.Item
            name="isAvailable"
            valuePropName="checked"
            label="Is Available"
          >
            <Switch />
          </Form.Item>
        </div>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>

        {isError && <p style={{ color: "red" }}>Error: {error?.message}</p>}
      </Form>
    </div>
  );
};
