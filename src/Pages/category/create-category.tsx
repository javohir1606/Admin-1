import React, { useState } from "react";
import { Tabs, message } from "antd";
import { usePostCategory } from "./service/mutate/usePostCategory";
import { RcFile } from "antd/es/upload/interface";
import { CategoryForm } from "../../components/category-form";
import { useCreateSubCategory } from "./service/mutate/useCreateSubCategory";
import { useNavigate } from "react-router-dom";

export const CreateCategory: React.FC = () => {
  const { mutate } = usePostCategory();
  const { mutate: subMutate } = useCreateSubCategory();
  const [activeKey, setActiveKey] = useState("1");
  const [parent, setParent] = useState<number | null>(null);
  const navigate = useNavigate();

  const submitCategory = (values: {
    title: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("parent", String(parent));

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        setActiveKey("2");
        navigate("/app/category");
      },
      onError: () => {
        message.error("Failed to add category!");
      },
    });
  };

  const handleCategorySubmit = (values: {
    title: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }

    subMutate(formData, {
      onSuccess: (parent) => {
        setParent(parent.data.id);
        message.success("Category added successfully!");
        setActiveKey("2");
      },
      onError: () => {
        message.error("Failed to add category!");
      },
    });
  };

  const handleSubCategorySubmit = (values: {
    title: string;
    image: { file: RcFile };
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }

    message.success("Sub Category submitted successfully!");
  };

  const handleTabChange = (key: string) => {
    if (
      (key === "2" && activeKey === "1") ||
      (key === "1" && activeKey === "2")
    ) {
      message.warning("Please complete the Category form before proceeding!");
      return;
    }
    setActiveKey(key);
  };

  const items = [
    {
      key: "1",
      label: "Category",
      children: <CategoryForm onFinish={handleCategorySubmit} />,
    },
    {
      key: "2",
      label: "Sub Category",
      children: (
        <CategoryForm onFinish={submitCategory || handleSubCategorySubmit} />
      ),
    },
  ];

  return (
    <div style={{ width: "50%" }}>
      <Tabs activeKey={activeKey} onChange={handleTabChange} items={items} />
    </div>
  );
};
