import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { useBannerId } from "./mutate/useBannerId";
import { useBannerPut } from "./mutate/useBannerPut";
import { BannerForm } from "../../components/banner-form";

export const BannerEdit: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading } = useBannerId(id);
  const { mutate } = useBannerPut();
  const navigate = useNavigate();
  const handleEditSubmit = (values: {
    title: string;
    description?: string;
    image?: { file: File };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(
      { id: Number(id), data: formData },
      {
        onSuccess: () => {
          message.success("Banner updated successfully!");
          navigate("/app/banner");
        },
        onError: (error) => {
          message.error(error.message);
        },
      }
    );
  };

  if (isLoading) {
    return <Spin tip="Loading banner details..." />;
  }

  if (!data) {
    return <div>Banner not found</div>;
  }

  return (
    <div>
      <h2>Edit Banner</h2>
      <BannerForm onSubmit={handleEditSubmit} initialValues={data} />
    </div>
  );
};
