import { CategoryList } from "../Pages/Category-list";
import { SubCategoryList } from "../Pages/Sub-Category-List/sub-cotegory-list";
import React from "react";
import { nanoid } from "nanoid";
import { BrandList } from "../Pages/Brand-List";
import { Product } from "../Pages/Product";
// import { CreateCategory } from "../Components/Create-category";
import { CreateTabCategory } from "../Components/Create-Tabs";
import { EditCategory } from "../Components/Edit-Category";

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
    component: EditCategory,
    path: "/app/edit-category/:id",
  },
];
