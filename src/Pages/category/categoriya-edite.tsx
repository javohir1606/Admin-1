import React from "react";
import { message, Tabs } from "antd";
import type { TabsProps, UploadFile } from "antd";
import { CategoryForm } from "../../components/category-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryPut } from "./service/mutate/useCategoryPut";
import { RcFile } from "antd/es/upload";
import { useCategoryId } from "./service/mutate/useCategoryId";

export const CategoriyaEdite: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useCategoryId(id);
  const { mutate } = useCategoryPut();
  const navigate = useNavigate();

  const editCategory = (values: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("parent", "");
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Category added successfully!");
          navigate("/app/category");
        },
        onError: (err) => {
          message.error("Failed to add category!");
          console.log(err);
        },
      }
    );
  };
  const defaultFileList: UploadFile[] = data?.image
    ? [
        {
          uid: "-1",
          name: `${data?.title}`,
          status: "done",
          url: `${data?.image?.file}`,
        },
      ]
    : [];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Category",
      children: (
        <CategoryForm
          data={data}
          onFinish={editCategory}
          isLoading={isLoading}
          defaultFileList={defaultFileList}
        />
      ),
    },
    {
      key: "2",
      label: "Sub Category",
      children: "Content of Tab Pane 2",
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ width: "50%" }}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
