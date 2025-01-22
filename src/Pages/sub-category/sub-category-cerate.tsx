import React from "react";
import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { usePostCategory } from "../category/service/mutate/usePostCategory";
import { SubCategoryForm } from "../../components/sab-category-form";
import { AttributeForm } from "../../components/atrebute-form";
import { useAtrebutPost } from "../../hooks/useAtrebutPost";
import { useNavigate } from "react-router-dom";

interface AtrebutData {
  attr_list: {
    category: number[];
    title: string;
    values: string[];
  }[];
}

export const SubCategoryCreate: React.FC = () => {
  const { mutate } = usePostCategory();
  const [subId, setSubID] = React.useState<number>(0);
  const [activeKey, setActiveKey] = React.useState("1"); // controlled state for active tab
  const { mutate: mutateAtrebut } = useAtrebutPost();
  const navigate = useNavigate();

  const submitCategory = (values: {
    title: string;
    image: RcFile | null;
    parent: number;
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("parent", String(values.parent));
    if (values.image) {
      formData.append("image", values.image);
    }

    mutate(formData, {
      onSuccess: (res) => {
        setSubID(res.data.id);
        message.success("Subcategory added successfully!");
        setActiveKey("2"); // Switch to tab 2 after success
      },
      onError: () => {
        message.error("Failed to add subcategory!");
      },
    });
  };

  const submitAtrebut = (data: any) => {
    const formattedData: AtrebutData = {
      attr_list: data.attributes.map((item: any) => ({
        title: item.name,
        values: item.list?.map((subItem: any) => subItem.first) || [],
        category: [subId],
      })),
    };
    mutateAtrebut(formattedData, {
      onSuccess: () => {
        message.success("Attributes added successfully!");
        navigate("/app/sub-category");
      },
      onError: (res) => {
        message.error(res.message);
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Sub Category",
      children: <SubCategoryForm onFinish={submitCategory} />,
    },
    {
      key: "2",
      label: "Attribute",
      children: <AttributeForm onFinish={submitAtrebut} />,
    },
  ];

  return (
    <div style={{ width: "50%" }}>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={items}
      />
    </div>
  );
};
