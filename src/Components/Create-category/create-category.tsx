import { useCreateData } from "../../Service/Mutation/useCreateData";
import { ReusableForm } from "../Form";
import { RcFile } from "antd/es/upload";
import { message, Form } from "antd";
export const CreateCategory = () => {
  const { mutate } = useCreateData();
  const [form] = Form.useForm();
  const submit = (values: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();

    formData.append("title", values.title);

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
      },
      onError: (error) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  return (
    <>
      <ReusableForm submit={submit} form={form} />
    </>
  );
};
