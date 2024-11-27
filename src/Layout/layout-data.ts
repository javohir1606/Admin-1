import { nanoid } from "nanoid";
import {
  //   UserOutlined,
  //   UserAddOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  SkinOutlined,
} from "@ant-design/icons";

export const data = [
  {
    id: nanoid(),
    label: "Category-List",
    icon: DatabaseOutlined,
    path: "/app",
  },
  {
    id: nanoid(),
    label: "Sub-Category-List",
    icon: ClusterOutlined,
    path: "/app/sub-category-list",
  },
  {
    id: nanoid(),
    label: "Brand-List",
    icon: SkinOutlined,
    path: "/app/brand-list",
  },
  {
    id: nanoid(),
    label: "Product",
    icon: ShoppingOutlined,
    path: "/app/product",
  },
];
