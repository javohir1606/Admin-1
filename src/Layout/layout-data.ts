import React from "react";
import {
  FileAddOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
  HddOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface LayoutType {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >;
  key: string;
}

export const layoutData: LayoutType[] = [
  {
    label: "Banner",
    key: "/app/banner",
    icon: FolderOpenOutlined,
  },
  {
    label: "Category List",
    key: "/app/category",
    icon: HddOutlined,
  },
  {
    label: "Sub Category",
    key: "/app/sub-category",
    icon: FileAddOutlined,
  },
  {
    label: "Brand list",
    key: "/app/brand",
    icon: FileImageOutlined,
  },
  {
    label: "Prodact",
    key: "/app/prodact",
    icon: TagOutlined,
  },
];
