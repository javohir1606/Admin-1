import { useCreateData } from "../../Service/Mutation/useCreateData";
import { ReusableForm } from "../Form";
import { RcFile } from "antd/es/upload";
import { message, Form } from "antd";
import { useNavigate } from "react-router-dom";
export const CreateCategory = () => {
  const { mutate } = useCreateData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const submit = (values: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();

    formData.append("title", values.title);

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        navigate("/app");
        form.resetFields();
      },
      onError: (error) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  return (
    <>
      <div
        style={{ width: "400px", border: "2px solid black", padding: "20px" }}
      >
        <ReusableForm submit={submit} form={form} />
      </div>
    </>
  );
};
