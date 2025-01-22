import {
  Button,
  Image,
  message,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { useGet } from "./mutate/useGet";
import { Link } from "react-router-dom";
import { useDelete } from "./mutate/useDelete";

interface BrandData {
  id: number;
  title: string;
  image: string | null;
}

export const Brand = () => {
  const { data, isLoading, isError, error } = useGet();
  const { mutate } = useDelete();
  const columns: TableColumnsType<BrandData> = [
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
            alt="brand"
            style={{ width: 100, height: 80, objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Change",
      key: "change",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/app/brand-edite/${record.id}`}>
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
        message.success("Brand deleted successfully!");
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete brand.";
        message.error(errorMessage);
      },
    });
  };

  if (isLoading) {
    return <p>Loading banners...</p>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load brand.";
    return <p>{errorMessage}</p>;
  }

  const dataSource = data?.results.map((brand: BrandData) => ({
    key: brand.id,
    ...brand,
  }));
  return (
    <>
      <div style={{ overflowY: "scroll", height: "80vh" }}>
        <Link to="/app/brand-create">
          <Button type="primary" style={{ marginBottom: 16 }}>
            Create
          </Button>
        </Link>
        <div style={{ marginTop: 16 }}>
          <Table<BrandData>
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
