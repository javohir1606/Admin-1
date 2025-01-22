import React from "react";
import { message } from "antd";
import { useBannerPost } from "./mutate/useBannerPost";
import { RcFile } from "antd/es/upload";
import { BannerForm } from "../../components/banner-form";
import { useNavigate } from "react-router-dom";

export const BannerCreate: React.FC = () => {
  const { mutate } = useBannerPost();
  const navigate = useNavigate();

  const handleSubmit = (values: {
    title: string;
    description?: string;
    image?: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Banner created successfully!");
        navigate("/app/banner");
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <div>
      <h2>Create Banner</h2>
      <BannerForm onSubmit={handleSubmit} />
    </div>
  );
};
