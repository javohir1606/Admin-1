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
import { Banner } from "../Pages/Banner";
import { CreateBrand } from "../Components/Create-Brand";
import { BrandListEdit } from "../Components/Brand-List";
import { BannerCreate } from "../Components/Banner-Create/banner-create";
import { BannerEdit } from "../Components/BannerEdit";
import { CreateProducts } from "../Components/Create-Products";
import { ProductEdit } from "../Components/Product-Edit";

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
    component: Banner,
    path: "/app/banner",
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
  {
    id: nanoid(),
    component: BrandListEdit,
    path: "/app/brand-list-edit/:id",
  },
  {
    id: nanoid(),
    component: CreateBrand,
    path: "/app/brand-list/create-brand",
  },
  {
    id: nanoid(),
    component: BannerCreate,
    path: "/app/banner/create",
  },
  {
    id: nanoid(),
    component: BannerEdit,
    path: "/app/banner/edit/:id",
  },
  {
    id: nanoid(),
    component: CreateProducts,
    path: "/app/product/create",
  },
  {
    id: nanoid(),
    component: ProductEdit,
    path: "/app/product/edit/:id",
  },
];
