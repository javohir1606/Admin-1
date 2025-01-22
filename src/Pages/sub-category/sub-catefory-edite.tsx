import React from "react";
import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { RcFile } from "antd/es/upload";
import { useCategoryId } from "../category/service/mutate/useCategoryId";
import { SubCategoryForm } from "../../components/sab-category-form";
import { useCategoryPach } from "../category/service/mutate/useCategoryPach";
import { useAtrebutePatch } from "../../hooks/useAtrebutePatch";
import { AttributeEditeForm } from "../../components/atrebut -edite-form";

export const SubCategoryEdite: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useCategoryId(id);
  const { mutate } = useCategoryPach();
  const { mutate: mutateAttribute } = useAtrebutePatch();
  const navigate = useNavigate();
  // console.log(data);

  const editSub = (values: {
    title: string;
    image: RcFile | null;
    parent: number;
  }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image);
    }
    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Sub-category updated successfully!");
          navigate("/app/sub-category");
        },
        onError: (err) => {
          message.error("Failed to update sub-category!");
          console.error(err);
        },
      }
    );
  };

  const attributes = data?.attributes?.map(
    (attribute: {
      id: number;
      title: string;
      values: { id: number; value: string }[];
    }) => ({
      id: attribute.id,
      name: attribute.title,
      list: attribute.values.map((value) => ({
        id: value.id,
        first: value.value,
      })),
    })
  );

  const editAttributes = (values: {
    items: {
      name: string;
      id?: number | null;
      list: { first: string; id?: number | null }[];
    }[];
  }) => {
    const AttributeId = data?.attributes?.map((item: any) => item.id);
    const valueId = data?.attributes?.map((item: any) =>
      item.values.map((subItem: any) => subItem.id)
    );
    console.log("valie", data.id);
    const processedAttributes = {
      category_id: data.id,
      attributes: values.items.map((item, index) => ({
        attribute_id: AttributeId[index] ?? null,
        title: item.name,
        values: item.list.map((subItem, subIndex) => ({
          value_id: valueId[index]?.[subIndex] ?? null,
          value: subItem.first,
        })),
      })),
    };
    mutateAttribute(
      {
        data: processedAttributes,
      },
      {
        onSuccess: () => {
          navigate("/app/sub-category");
          message.success("Attributes updated successfully!");
        },
        onError: (err) => {
          message.error("Failed to update attributes!");
          console.error(err);
        },
      }
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Sub Category",
      children: (
        <SubCategoryForm
          data={{
            id: data?.id,
            title: data?.title,
            image: data?.image,
            parent: data?.parent,
          }}
          onFinish={editSub}
        />
      ),
    },
    {
      key: "2",
      label: "Attributes",
      children: (
        <AttributeEditeForm data={attributes} onFinish={editAttributes} />
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ width: "50%" }}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
