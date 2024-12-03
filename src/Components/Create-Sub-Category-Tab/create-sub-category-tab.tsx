import { Tabs } from "antd";
import { TabPropsTypes } from "../../Types/data-types";
import { nanoid } from "nanoid";
import { CraeteSubCategory } from "../Create-Sub-Category/craete-sub-category";
export const CreateSubTabCategory = () => {
  const items: TabPropsTypes[] = [
    {
      key: nanoid(),
      label: "Tab 1",
      children: <CraeteSubCategory />,
    },
    {
      key: nanoid(),
      label: "Tab 2",
      children: "lorem1",
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};
