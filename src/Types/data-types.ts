export interface getDataType {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: {
    id: number;
    title: string;
    image: string;
    // children?: string;
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
  submit: (values: any) => void;
  form: any;
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
}
export interface columnType {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  align?: any;
  fontWeight?: any;
  //   render?: (image?: string | undefined) => React.ReactNode;
  render?: any;
}
