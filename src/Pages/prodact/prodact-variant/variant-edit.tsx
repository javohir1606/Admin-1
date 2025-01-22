import { useParams } from "react-router-dom";
import { useProductVariantPatch } from "../mutate/useProductVariantPatch";
import { useProdactVariantId } from "../mutate/useProdactVariantId";
import { message } from "antd";
import { ProductVariantForm } from "../../../components/prodact-variant-form";

export const VariantEdit = () => {
  const { id } = useParams();
  const { mutate, isError, error } = useProductVariantPatch(id as string);
  const { data, isLoading: isFetching } = useProdactVariantId(id);

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
    console.log(payload);

    mutate(payload, {
      onSuccess: () => {
        message.success("Product variant updated successfully!");
      },
      onError: () => {
        message.error("Failed to update product variant.");
      },
    });
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data found!</p>;
  }
  return (
    <div>
      <ProductVariantForm
        onFinish={onFinish}
        isLoading={false}
        isError={isError}
        error={error}
        initialValues={{
          attributeValue: data.attribute_value,
          quantity: data.quantity,
          isAvailable: data.is_available,
          title: data.title,
          price: data.price,
          description: data.other_detail,
          isNew: data.is_new,
        }}
      />
    </div>
  );
};
