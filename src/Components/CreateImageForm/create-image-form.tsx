import { Button, Form, Upload } from "antd";
import { FormDataType } from "../../Types/data-types";
import { UploadOutlined } from "@ant-design/icons";

export const CreateImageForm: React.FC<FormDataType> = ({
  submit,
  defaultFileList,
}) => {
  return (
    <Form onFinish={submit}>
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
          defaultFileList={defaultFileList && defaultFileList}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item>
      <Button htmlType="submit" type="default">
        Send
      </Button>
    </Form>
  );
};
