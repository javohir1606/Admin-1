import { message } from "antd";
import { useCreateBrand } from "../../Service/Mutation/useCreateBrand";
import { RcFile } from "antd/es/upload";
import { Form } from "antd";

import { useNavigate } from "react-router-dom";
import { BrandDataForm } from "../Brand-Form";
export const CreateBrand = () => {
  const { mutate } = useCreateBrand();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const submit = (values: { title: string; image: { file: RcFile } }) => {
    console.log("valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees", values);

    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    console.log("formData", formData);

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        navigate("/app/brand-list");
      },
      onError: (error) => {
        console.log(error);
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  console.log('render');
  
  return (
    <>
      <BrandDataForm formForCreate={form} submit={submit} />
    </>
  );
};
