import { CategoryList } from "../Pages/Category-list";
import { SubCategoryList } from "../Pages/Sub-Category-List/sub-cotegory-list";
import React from "react";
import { nanoid } from "nanoid";
import { BrandList } from "../Pages/Brand-List";
import { Product } from "../Pages/Product";
import { CreateTabCategory } from "../Components/Create-Tabs";
import { CreateSubTabCategory } from "../Components/Create-Sub-Category-Tab";
import { CategoryEditTab } from "../Components/Category-Edit-Tab";
import { SubEditTab } from "../Components/Sub-Edit-Tab";

interface RouteType {
  component: React.FC;
  id: string;
  path?: string;
}

export const RoutersData: RouteType[] = [
  {
    id: nanoid(),
    component: CategoryList,
  },
  {
    id: nanoid(),
    component: SubCategoryList,
    path: "/app/sub-category-list",
  },
  {
    id: nanoid(),
    component: BrandList,
    path: "/app/brand-list",
  },
  {
    id: nanoid(),
    component: Product,
    path: "/app/product",
  },
  {
    id: nanoid(),
    component: CreateTabCategory,
    path: "/app/create-category",
  },
  {
    id: nanoid(),
    component: CategoryEditTab,
    path: "/app/edit-category/:id",
  },
  {
    id: nanoid(),
    component: CreateSubTabCategory,
    path: "/app/sub-category-list/create-sub-category",
  },
  {
    id: nanoid(),
    component: SubEditTab,
    path: "/app/sub-edit-category/:id",
  },
];
