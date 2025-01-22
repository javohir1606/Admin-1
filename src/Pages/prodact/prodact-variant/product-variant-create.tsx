import { message } from "antd";
import { ProductVariantForm } from "../../../components/prodact-variant-form";
import { useProdactVariantPost } from "../mutate/useProdactVariantPost";
import { useParams } from "react-router-dom";

export const ProductVariantCreate = () => {
  const { mutate, isError, error } = useProdactVariantPost();
  const { id } = useParams();

  const onFinish = (values: any) => {
    const payload = {
      is_available: values.isAvailable,
      other_detail: values.description,
      price: values.price,
      price_with_discount: values.priceWithDiscount,
      quantity: values.quantity,
      title: values.title,
      images: null,
      product: Number(id),
      attribute_value: values.attributeValue,
    };
    mutate(payload, {
      onSuccess: () => {
        message.success("Product variant created successfully!");
      },
      onError: () => {
        message.error("Failed to create product variant.");
      },
    });
  };

  return (
    <div style={{ width: "100%", overflowY: "scroll", height: "70vh" }}>
      <ProductVariantForm
        onFinish={onFinish}
        isLoading={false}
        isError={isError}
        error={error}
      />
    </div>
  );
};
