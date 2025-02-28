import { RcFile } from "antd/es/upload";
import React from "react";

export interface getDataType {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: {
    id: number;
    title: string;
    image: string;
    parent?: {
      image: string;
    };
  }[];
}
export interface CreateData {
  title: string;
  image: string;
}

export interface FormDataType {
  submit?: (values: any) => void;
  data?: object | any;
  formForCreate?: any;
  isLoading?: boolean;
  defaultFileList?: any;
}
export interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: number;
  address: string;
}

export interface Datas {
  key: number;
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string | number;
  parent?: string | any;
}
export interface columnType {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  align?: any;
  fontWeight?: any;
  render?: any;
}
export interface TabPropsTypes {
  key: string;
  label: string;
  children?: React.FC | any;
  disabled?: boolean;
}
export interface FormDatas {
  parent?: string | any;
  title?: string | Blob | any;
  description?: string | any;
  image?: { file: RcFile };
  is_new?: boolean | undefined | any;
  is_available?: boolean | undefined | any;
  category?: number | undefined | any;
  price?: number | string | any;
}

export interface AttrValue {
  category?: number[];
  key?: number;
  id?: number;
  title: string;
  values: string[];
}

export interface AttributeTypeValues {
  title?: string;
  value?: string[];
  category_id?: number;
  attribute_id?: number;
  attributes?: [];
}

interface Value {
  value: string;
}

interface Attribute {
  title: string;
  values: Value[];
}

export interface FormValues {
  attr_list: Attribute[];
}

export interface qwerty {
  title: string;
  image: RcFile | null | any;
}
export interface AttributeValuesType {
  title?: string;
  values?: {
    value?: string;
    value_id?: number;
  }[];
  category_id?: number;
  attribute_id?: number;
  attributes?: string[] | any;
}
export interface BrandFormType {
  submit?: (values: any) => void;
  data?: object | any;
  formForCreate?: any;
  isLoading?: boolean;
  defaultFileList?: any;
  BooleanImage?: boolean;
}

// export interface CreateProductType {
//   values
// }
