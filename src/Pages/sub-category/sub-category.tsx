import React from "react";
import { Table, Button, Popconfirm, message, Image } from "antd";
import type { TableColumnsType } from "antd";
import { useGetSubCategory } from "./mutate/useGetSubCategory";
import { Link } from "react-router-dom";
import { useSubCategoryDelete } from "./mutate/useSubCategoryDelete";

interface DataType {
  key: React.Key;
  id: number;
  title: string;
  image: string;
  parent: {
    id: number;
    title: string;
  };
  children: null;
  attributes: {
    id: number;
    title: string;
    category: number[];
    category_title: {
      title: string;
    }[];
    values: {
      id: number;
      value: string;
    }[];
  };
}

export const SubCategory: React.FC = () => {
  const { data } = useGetSubCategory();
  const { mutate: deleteSubCategory } = useSubCategoryDelete();

  const handleDelete = (id: number) => {
    deleteSubCategory(id, {
      onSuccess: () => {
        message.success("Sub-category deleted successfully!");
      },
      onError: () => {
        message.error("Failed to delete sub-category. Please try again.");
      },
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Img",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <Image
          src={text}
          alt="SubCategory"
          style={{ width: 100, height: 80, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/app/sub-category-edite/${record.id}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this sub-category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const dataSource: DataType[] =
    data?.results.map((item: any) => ({
      key: item.id,
      id: item.id,
      image: item.image,
      title: item.title,
      change: "Edit",
    })) || [];

  return (
    <div style={{ height: "80vh", overflowY: "scroll" }}>
      <div style={{ marginBottom: 16 }}>
        <Link to={"/app/sub-category-crete"}>
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        size="middle"
      />
    </div>
  );
};
