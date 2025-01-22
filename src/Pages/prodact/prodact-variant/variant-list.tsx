import React from "react";
import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import { ProductVariantCreate } from "./product-variant-create";
import { useParams } from "react-router-dom";
import { useProdactVariantId } from "../mutate/useProdactVariantId";
import { useVariantImgsPost } from "../mutate/useVariantImgsPost";
import { ProdactVariantImgsForm } from "../../../components/prodact-variant-imgs-form";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Create Variant",
    children: <ProductVariantCreate />,
  },
  {
    key: "2",
    label: "Variant Image",
    children: "Content of Tab Pane 2",
  },
];

export const VariantList: React.FC = () => {
  const { id } = useParams();
  const { data } = useProdactVariantId(id);
  const { mutate } = useVariantImgsPost();

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    values.product_variant = Number(id);
    formData.append("product_variant", values.product_variant);

    mutate(formData, {
      onSuccess: () => {
        message.success("Product variant updated successfully!");
      },
      onError: () => {
        message.error("Failed to update product variant.");
      },
    });
  };

  const tabItems = items.map((item) => {
    if (item.key === "2") {
      return {
        ...item,
        children: <ProdactVariantImgsForm data={data} onFinish={onFinish} />,
      };
    }
    return item;
  });

  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
    </div>
  );
};
