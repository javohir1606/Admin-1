import React from "react";
import { nanoid } from "nanoid";
import { Home } from "../pages/home/home";
import { CategoryList } from "../pages/category/category-list";
import { CreateCategory } from "../pages/category/create-category";
import { SubCategory } from "../pages/sub-category/sub-category";
import { CategoriyaEdite } from "../pages/category/categoriya-edite";
import { SubCategoryCreate } from "../pages/sub-category/sub-category-cerate";
import { SubCategoryEdite } from "../pages/sub-category/sub-catefory-edite";
import { AtrebutEdite } from "../components/atrebut-edite";
import { Banner } from "../pages/banner/banner";
import { BannerCreate } from "../pages/banner/banner-create";
import { BannerEdit } from "../pages/banner/banner-edite";
import { Brand } from "../pages/brand/brand-list";
import { BrandCreate } from "../pages/brand/brand-create";
import { Prodact } from "../pages/prodact/prodact-list";
import { ProdactCreate } from "../pages/prodact/prodact-create";
import { ProdactEdite } from "../pages/prodact/prodact-edite";
import { BrandEdite } from "../pages/brand/brand-edite";
import { ProdactVariant } from "../pages/prodact/prodact-variant/prodact-variant";
import { VariantEdit } from "../pages/prodact/prodact-variant/variant-edit";
import { VariantList } from "../pages/prodact/prodact-variant/variant-list";

interface RouterType {
  component: React.FC;
  path?: string;
  id: string;
}

export const mainRoutes: RouterType[] = [
  {
    component: Home,
    id: nanoid(),
  },
  {
    component: CategoryList,
    id: nanoid(),
    path: "category",
  },
  {
    component: CreateCategory,
    id: nanoid(),
    path: "create-category",
  },
  {
    component: CategoriyaEdite,
    id: nanoid(),
    path: "create-category-edite/:id",
  },
  {
    component: SubCategory,
    id: nanoid(),
    path: "sub-category",
  },
  {
    component: SubCategoryCreate,
    id: nanoid(),
    path: "sub-category-crete",
  },
  {
    component: SubCategoryEdite,
    id: nanoid(),
    path: "sub-category-edite/:id",
  },
  {
    component: AtrebutEdite,
    id: nanoid(),
    path: "atrebut-edite/:id",
  },
  {
    component: Banner,
    id: nanoid(),
    path: "banner",
  },
  {
    component: BannerCreate,
    id: nanoid(),
    path: "create-banner",
  },
  {
    component: BannerEdit,
    id: nanoid(),
    path: "create-banner-edite/:id",
  },
  {
    component: Brand,
    id: nanoid(),
    path: "brand",
  },
  {
    component: BrandCreate,
    id: nanoid(),
    path: "brand-create",
  },
  {
    component: BrandEdite,
    id: nanoid(),
    path: "brand-edite/:id",
  },
  {
    component: Prodact,
    id: nanoid(),
    path: "prodact",
  },
  {
    component: ProdactCreate,
    id: nanoid(),
    path: "prodact-create",
  },
  {
    component: ProdactEdite,
    id: nanoid(),
    path: "prodact-edit/:id",
  },
  {
    component: ProdactVariant,
    id: nanoid(),
    path: "product-variant/:id/:category",
  },
  {
    component: VariantList,
    id: nanoid(),
    path: "product-variant/create/:id/:category",
  },
  {
    component: VariantEdit,
    id: nanoid(),
    path: "product-variant/edit/:id/:category",
  },
];
