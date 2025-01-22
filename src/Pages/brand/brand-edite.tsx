import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetId } from "./mutate/useGetId";
import { usePut } from "./mutate/usePut";
import { BrandForm } from "../../components/brand-form";
import { RcFile } from "antd/es/upload";

export const BrandEdite = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetId(id);
  const { mutate } = usePut();

  const [initialValues, setInitialValues] = useState<
    { title: string; image?: { file: RcFile } } | undefined
  >(undefined);

  useEffect(() => {
    if (data) {
      setInitialValues({
        title: data.title,
        image: data.image ? { file: data.image } : undefined,
      });
    }
  }, [data]);

  const handleSubmit = (values: {
    title: string;
    image?: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values?.image.file);
    }

    mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrandForm initialValues={initialValues} onSubmit={handleSubmit} editMode />
  );
};
