import { Form, message, UploadFile } from "antd";
import { useEditProduct } from "../../Service/Mutation/useEditProduct";
import { ProductForm } from "../Product-Form";
import { useNavigate, useParams } from "react-router-dom";
import { FormDatas } from "../../Types/data-types";
import { useGetSingleProduct } from "../../Service/Query/useGetSingleProduct";

export const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: SingleProduct, isLoading } = useGetSingleProduct(Number(id));
  const { mutate } = useEditProduct(Number(id));
  const [form] = Form.useForm();

  const ProductEditSubmit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("is_available", data.is_available);
    formData.append("is_new", data.is_new);
    if (data?.image?.file) {
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/product");
      },
      onError: (err) => {
        message.error("error");
        console.log(err);
      },
    });
  };
  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      status: "done",
      url: `${SingleProduct?.image}`,
    },
  ];
  const initialValues = {
    title: SingleProduct?.title,
    is_available: SingleProduct?.is_available,
    is_new: SingleProduct?.is_new,
    image: SingleProduct?.image,
    price: SingleProduct?.price,
    category: SingleProduct?.category,
  };
  return (
    <>
      <ProductForm
        submit={ProductEditSubmit}
        data={initialValues}
        defaultFileList={defaultFileList}
        isLoading={isLoading}
        formForCreate={form}
      />
    </>
  );
};
