import { message } from "antd";
import { useProductVariantsCreate } from "../../Service/Mutation/useProductVariantsCreate";
import { ProductVariantsForm } from "../Product-Variants-Form";
import { useNavigate, useParams } from "react-router-dom";

export const ProductVariantsCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useProductVariantsCreate();
  const ProductVariantsCreate = (values: {
    title: string;
    price: string;
    product: string | any;
    attribute_value: (number | string)[] | any;
    is_available: boolean | undefined | any;
    is_new: boolean | undefined | any;
    quantity: string | number | any;
    images: null;
    other_detail: string;
  }) => {
    const formattedPrice = parseFloat(values.price).toFixed(2);
    const payload = {
      is_available: values.is_available,
      other_detail: values.other_detail,
      price: formattedPrice,
      quantity: values.quantity,
      title: values.title,
      images: null,
      product: Number(id),
      attribute_value: values.attribute_value,
    };

    mutate(payload, {
      onSuccess: () => {
        message.success("success");
        navigate(`/app/product/variants/${id}`);
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
      },
    });
  };
  return (
    <>
      <ProductVariantsForm submit={ProductVariantsCreate} />
    </>
  );
};
