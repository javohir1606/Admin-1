import { RcFile } from "antd/es/upload";
import { SubCategoryForm } from "../Sub-Category-Form";
import { Form, message } from "antd";
import { useCreateSub } from "../../Service/Mutation/useCreateSub";
import React from "react";
interface SubCategoryProps {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export const CraeteSubCategory: React.FC<SubCategoryProps> = ({
  setActive,
}) => {
  const [form] = Form.useForm();
  const { mutate } = useCreateSub();

  const submit = (values: {
    title: string;
    image: { file: RcFile };
    parent: string;
  }) => {
    const data = new FormData();
    data.append("title", values.title);
    if (values.image) {
      data.append("image", values.image.file);
    }
    data.append("parent", values.parent);
    mutate(data, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        setActive("2");
      },
      onError: (error) => {
        console.log(error);
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };
  return (
    <>
      <SubCategoryForm submit={submit} form={form} />
    </>
  );
};
