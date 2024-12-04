import { Form, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useCreateSub } from "../../Service/Mutation/useCreateSub";
import { useNavigate } from "react-router-dom";
import { ReusableForm } from "../Form";
import { useGetData } from "../../Service/Query/useGetData";

export const CategorySubCreate = () => {
  const [form] = Form.useForm();
  const { mutate } = useCreateSub();
  const navigate = useNavigate();
  const { data: categoryData } = useGetData();

  const submit = (values: {
    title: string;
    image: { file: RcFile };
    parent: string;
  }) => {
    const formData = new FormData();
    values.parent = categoryData?.id;
    console.log("parent", values.parent);

    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    formData.append("parent", values.parent);

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        navigate("/app");
      },
      onError: (error) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  return <ReusableForm submit={submit} />;
};
