import { message } from "antd";
import { useCreateProduct } from "../../Service/Mutation/useCreateProduct";
import { ProductForm } from "../Product-Form";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
export const CreateProducts = () => {
  const { mutate } = useCreateProduct();
  const navigate = useNavigate();

  const CreateProductSubmit = (values: {
    title: string;
    price: string;
    image: { file: RcFile };
    category: string;
    is_available?: boolean | undefined | any;
    is_new?: boolean | undefined | any;
  }) => {
    const formData = new FormData();
    const formattedPrice = parseFloat(values.price).toFixed(2);
    formData.append("title", values.title);
    formData.append("price", formattedPrice);
    formData.append("category", values.category);
    formData.append("is_available", values.is_available);
    formData.append("is_new", values.is_new);
    if (values?.image.file) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/product/");
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
      },
    });
  };
  return (
    <>
      <ProductForm submit={CreateProductSubmit} />
    </>
  );
};
