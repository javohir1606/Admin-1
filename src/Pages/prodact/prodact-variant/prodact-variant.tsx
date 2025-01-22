import {
  Button,
  Image,
  message,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useProductVariantDelete } from "../mutate/useProductVariantDelete";
import { useProdactVariantGet } from "../mutate/useProdactVariantGet";

interface ProdactData {
  id: number;
  title: string;
  image: string | null;
}

export const ProdactVariant = () => {
  const { id, category } = useParams();
  const { data, isLoading, isError, error } = useProdactVariantGet();
  console.log("data", data);
  const prodactId = data?.results?.map((item: any) => item);

  const filterID = prodactId?.filter(
    (item: any) => item.product === Number(id)
  );

  const { mutate } = useProductVariantDelete(id as string | number);
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
            alt="brand"
            style={{ width: 100, height: 80, objectFit: "cover" }}
          />
        ) : (
          <span>Rasm yo'q !</span>
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
          <Link to={`/app/product-variant/edit/${record.id}/${category}`}>
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

  const dataSource = filterID?.map((prodact: ProdactData) => ({
    key: prodact?.id,
    ...prodact,
  }));
  return (
    <>
      <div style={{ width: "100%", overflowY: "scroll", height: "80vh" }}>
        <Link to={`/app/product-variant/create/${id}/${category}`}>
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
    </>
  );
};
