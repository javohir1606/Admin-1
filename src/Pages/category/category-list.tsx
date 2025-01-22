import React from "react";
import { Table, message, Button, Popconfirm, Image } from "antd";
import type { TableColumnsType } from "antd";
import { useCatalogGet } from "./service/mutate/useCatalogGet";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryDelete } from "./service/mutate/useCategoryDelete";

interface Category {
  id: number;
  title: string;
  image: string;
  children: Category[];
}

const columns = (
  onDelete: (id: number) => void
): TableColumnsType<Category> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: string) =>
      image ? (
        <Image
          src={image}
          alt="category"
          style={{ width: 100, height: 80, objectFit: "cover" }}
        />
      ) : (
        <span>No Image</span>
      ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <Link to={`/app/create-category-edite/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
        <Popconfirm
          title="Yaxshilab o'ylab kuring birat o'chirilsinmi?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => onDelete(record.id)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
  },
];

export const CategoryList: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useCatalogGet();
  const navigate = useNavigate();
  const { mutate } = useCategoryDelete();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Category deleted successfully!");
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete category";
        message.error(errorMessage);
      },
    });
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load categories";
    message.error(errorMessage);
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => navigate("/app/create-category")}
      >
        Create
      </Button>
      <Table<Category>
        columns={columns(handleDelete)}
        dataSource={data?.results || []}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
