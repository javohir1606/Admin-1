import { message, Tabs } from "antd";
import { TabPropsTypes } from "../../Types/data-types";
import { CreateCategory } from "../Create-category";
import React from "react";
import { CategorySubCreate } from "../Category-Sub-Create";

export const CreateTabCategory = () => {
  const [active, setActive] = React.useState<string>("1");
  const handleTabChange = (key: string) => {
    if ((key === "2" && active === "1") || (key === "1" && active === "2")) {
      message.warning("Please complete the Category form before proceeding!");
      return;
    }
    setActive(key);
  };

  const items: TabPropsTypes[] = [
    {
      key: "1",
      label: "Category",
      children: <CreateCategory setActive={setActive} />,
    },
    {
      key: "2",
      label: "Sub Category",
      children: <CategorySubCreate />,
    },
  ];
  return <Tabs activeKey={active} items={items} onChange={handleTabChange} />;
};
