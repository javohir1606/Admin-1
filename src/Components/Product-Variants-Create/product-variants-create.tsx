import { message } from "antd";
import { useProductVariantsCreate } from "../../Service/Mutation/useProductVariantsCreate";
import { ProductVariantsForm } from "../Product-Variants-Form";
import { useParams } from "react-router-dom";

export const ProductVariantsCreate = () => {
  const { id } = useParams();
  console.log("sdf", id);

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
  }) => {
    const formData = new FormData();
    const ProductId: number | any = Number(id);
    const formattedPrice = parseFloat(values.price).toFixed(2);
    // const AttributeNumber: number | any = Number(values.attribute_value);

    // formData.append("images", imageCreate);
    if (values.images === null) {
        formData.append("images", "null");  // Or formData.append("images", JSON.stringify([])); for empty array
      } else {
        formData.append("images", JSON.stringify(values.images));
      }
    formData.append("product", ProductId);
    formData.append("title", values.title);
    formData.append("quantity", values.quantity);
    formData.append("is_new", values.is_new);
    formData.append("price", formattedPrice);
    formData.append("is_available", values.is_available);
    formData.append("attribute_value", values.attribute_value);

    mutate(formData, {
      onSuccess: () => {
        message.success("success");
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
