import { useParams } from "react-router-dom";
import { useGetId } from "./mutate/useGetId";
import { ProductForm } from "../../components/proadact-form";
import { usePut } from "./mutate/usePatch";
import { message } from "antd";

export const ProdactEdite: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetId(id);
  const { mutate } = usePut();

  const handleFormSubmit = (formData: FormData) => {
    mutate(
      { id: id, data: formData },
      {
        onSuccess: () => {
          message.success("Product updated successfully!");
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: "100%", overflowY: "scroll", height: "80vh" }}>
      {data && (
        <ProductForm
          initialValues={{
            title: data.title || "",
            image: data.image ? { file: data.image } : undefined,
            price: data.price || "",
            is_available: data.is_available || false,
            is_new: data.is_new || false,
            category: data.category || "",
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
