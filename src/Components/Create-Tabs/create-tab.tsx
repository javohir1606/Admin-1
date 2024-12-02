import { Tabs } from "antd";
// import { CreateCategory } from "../Create-category";
import { CraeteSubCategory } from "../Create-Sub-Category/craete-sub-category";
import { TabPropsTypes } from "../../Types/data-types";
import { nanoid } from "nanoid";
import { CreateCategory } from "../Create-category";

export const CreateTabCategory = () => {
  const items: TabPropsTypes[] = [
    {
      key: nanoid(),
      label: "Tab 1",
      children: <CreateCategory />,
    },
    {
      key: nanoid(),
      label: "Tab 2",
      children: <CraeteSubCategory />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};
