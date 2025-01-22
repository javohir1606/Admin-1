import {
  Button,
  Image,
  message,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { Link } from "react-router-dom";
import { useGet } from "./mutate/useGet";
import { useDelete } from "./mutate/useDelete";

interface ProdactData {
  id: number;
  title: string;
  image: string | null;
  category: number[];
}

export const Prodact = () => {
  const { data, isLoading, isError, error } = useGet();
  const { mutate } = useDelete();

  const columns: TableColumnsType<ProdactData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string | null) =>
        image ? (
          <Image
            src={image}
            alt="product"
            style={{ width: 100, height: 80, objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Change",
      key: "change",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to={`/app/prodact-edit/${record.id}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <Link to={`/app/product-variant/${record.id}/${record.category}`}>
            <Button>Variants</Button>
          </Link>
          <Link to={`/app/sub-category-edite/${record.category}`}>
            <Button>Category</Button>
          </Link>
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Product deleted successfully!");
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to delete the product.";
        message.error(errorMessage);
      },
    });
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load products.";
    return <p>{errorMessage}</p>;
  }

  const dataSource = data?.results?.map((product: ProdactData) => ({
    key: product.id,
    ...product,
  }));

  return (
    <div style={{ width: "100%", overflowY: "scroll", height: "80vh" }}>
      <Link to="/app/prodact-create">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Create
        </Button>
      </Link>
      <div style={{ marginTop: 16 }}>
        <Table<ProdactData>
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};
