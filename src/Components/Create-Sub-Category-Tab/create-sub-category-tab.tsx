import { Form, message, Tabs } from "antd";
import {
  AttributeValuesType,
  AttrValue,
  TabPropsTypes,
} from "../../Types/data-types";
import React from "react";
import { AttributeForm } from "../Create-Attribute";
import { useCreateSub } from "../../Service/Mutation/useCreateSub";
import { SubCategoryForm } from "../Sub-Category-Form";
import { RcFile } from "antd/es/upload";
import { useCreateAttribute } from "../../Service/Mutation/useCreateAttribute";
import { useNavigate } from "react-router-dom";
export const CreateSubTabCategory = () => {
  const [active, setActive] = React.useState<string>("1");

  const handleTabChange = (key: string) => {
    if ((key === "2" && active === "1") || (key === "1" && active === "2")) {
      message.warning("Please complete the Category form before proceeding!");
      return;
    }
    setActive(key);
  };
  const [form] = Form.useForm();
  const { mutate, data: createSub } = useCreateSub();
  const { mutate: Attribute } = useCreateAttribute();
  const submit = (values: {
    title: string;
    image: { file: RcFile };
    parent: string;
  }) => {
    const data = new FormData();
    data.append("title", values.title);
    if (values.image) {
      data.append("image", values.image.file);
    }
    data.append("parent", values.parent);
    mutate(data, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        setActive("2");
      },
      onError: (error) => {
        console.log(error);
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };
  const id = createSub?.id;
  const navigate = useNavigate();
  const AttributeValueSubmit = (data: AttributeValuesType) => {
    console.log(data);

    const formattedData = {
      attr_list: data?.attributes?.map((item: AttrValue) => ({
        category: [id],
        title: item?.title,
        values:
          item?.values?.map((value: string | number | any) => value?.value) ||
          [],
      })),
    };

    Attribute(formattedData, {
      onSuccess: () => {
        message.success("attribute added successfully");
        navigate("/app/sub-category-list");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const items: TabPropsTypes[] = [
    {
      key: "1",
      label: "Sub Category",
      children: <SubCategoryForm submit={submit} form={form} />,
    },
    {
      key: "2",
      label: "Attribute",
      children: <AttributeForm submit={AttributeValueSubmit} form={form} />,
    },
  ];
  return <Tabs activeKey={active} items={items} onChange={handleTabChange} />;
};
