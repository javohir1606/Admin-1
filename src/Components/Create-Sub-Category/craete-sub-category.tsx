import { RcFile } from "antd/es/upload";
import { SubCategoryForm } from "../Sub-Category-Form";
import { Form, message } from "antd";
import { useCreateSub } from "../../Service/Mutation/useCreateSub";
import { useNavigate } from "react-router-dom";
export const CraeteSubCategory = () => {
  const [form] = Form.useForm();
  const { mutate } = useCreateSub();
  const navigate = useNavigate();

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
        navigate("/app/sub-category-list");
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
