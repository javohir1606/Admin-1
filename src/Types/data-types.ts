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
  form?: any;
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
  title: string;
  image?: { file: RcFile };
}

export interface AttrValue {
  category?: number[];
  key?: number;
  id?: number;
  title: string;
  values: string[];
}

export interface AttributeValuesType {
  title: string;
  value: string[];
  attributes?: string | any;
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
