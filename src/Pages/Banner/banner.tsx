import React from "react";
import { Button, Image, Table, Popconfirm, message } from "antd";
import type { TableColumnsType } from "antd";
import { useBannerGet } from "./mutate/useBannerGet";
import { Link } from "react-router-dom";
import { useBannerDelete } from "./mutate/useBannerDelete";

interface BannerData {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  image: string | null;
  description: string | null;
}

export const Banner: React.FC = () => {
  const { data, isLoading, isError, error } = useBannerGet();
  const { mutate } = useBannerDelete();
  const columns: TableColumnsType<BannerData> = [
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
      render: (image: string | null) =>
        image ? (
          <Image
            src={image}
            alt="banner"
            style={{ width: 100, height: 80, objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string | null) => text || <span>No Description</span>,
    },
    {
      title: "Change",
      key: "change",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/app/create-banner-edite/${record.id}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this banner?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Banner deleted successfully!");
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete banner.";
        message.error(errorMessage);
      },
    });
  };

  if (isLoading) {
    return <p>Loading banners...</p>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load banners.";
    return <p>{errorMessage}</p>;
  }

  const dataSource = data?.results.map((banner: BannerData) => ({
    key: banner.id,
    ...banner,
  }));

  return (
    <>
      <div style={{ overflowY: "scroll", height: "80vh" }}>
        <Link to="/app/create-banner">
          <Button type="primary" style={{ marginBottom: 16 }}>
            Create
          </Button>
        </Link>
        <div style={{ marginTop: 16 }}>
          <Table<BannerData>
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            size="middle"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
};
