import { message, Tabs } from "antd";
import { TabPropsTypes } from "../../Types/data-types";
import React from "react";
import { CraeteSubCategory } from "../Create-Sub-Category/craete-sub-category";
import { CreateAttribute } from "../Create-Attribute";
export const CreateSubTabCategory = () => {
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
      label: "Sub Category",
      children: <CraeteSubCategory setActive={setActive} />,
    },
    {
      key: "2",
      label: "Attribute",
      children: <CreateAttribute />,
    },
  ];
  return <Tabs activeKey={active} items={items} onChange={handleTabChange} />;
};
