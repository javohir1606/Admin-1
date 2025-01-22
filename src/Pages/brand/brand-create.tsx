import React from "react";
import { usePost } from "./mutate/usePost";
import { BrandForm } from "../../components/brand-form";
import { RcFile } from "antd/es/upload";

export const BrandCreate: React.FC = () => {
  const { mutate } = usePost();

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

  return <BrandForm onSubmit={handleSubmit} />;
};
