import { ProductForm } from "../../components/proadact-form";
import { usePost } from "./mutate/usePost";

export const ProdactCreate = () => {
  const { mutate } = usePost();

  const handleCreate = (formData: FormData) => {
    mutate(formData);
  };

  return (
    <div style={{ width: "100%" }}>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};
