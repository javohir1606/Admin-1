import { useCreateData } from "../../Service/Mutation/useCreateData";
import { ReusableForm } from "../Form";
import { RcFile } from "antd/es/upload";
import { message, Form } from "antd";
import React from "react";

interface CategoryProps {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateCategory: React.FC<CategoryProps> = ({ setActive }) => {
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
        setActive("2");
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
