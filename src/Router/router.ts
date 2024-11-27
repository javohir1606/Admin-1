import { CategoryList } from "../Pages/Category-list";
import { SubCategoryList } from "../Pages/Sub-Category-List/sub-cotegory-list";
import React from "react";
import { nanoid } from "nanoid";
import { BrandList } from "../Pages/Brand-List";
import { Product } from "../Pages/Product";

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
];
