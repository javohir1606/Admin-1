import { Button, Flex, message, Table, Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { columnType, Datas } from "../../Types/data-types";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../../Service/Query/useGetProducts";
import { useDeleteProducts } from "../../Service/Mutation/useDeleteProducts";

export const Product = () => {
  const { data } = useGetProducts();
  console.log(data);

  const { data: hero } = useGetProducts();
  console.log(hero);

  // const Herooo = hero?.results.map((item: any) => item.category);

  // const categoryId = data?.results;
  // console.log("asddas", categoryId);

  // const IDID = categoryId?.filter((item) => item.category === Herooo);
  // console.log("IDID", IDID);
  // Specific ID you're looking for
  // Specific ID you're looking for

  const dataSource = data?.results.map((item: Datas) => {
    return {
      key: item.id,
      id: item.id,
      category: item.category,
      img: item.image,
      title: item.title,
    };
  });

  const { mutate } = useDeleteProducts();

  const client = useQueryClient();
  const DeleteCategory = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["get-data"] });
      },
      onError: (error) => {
        console.log(error);

        message.error("error");
      },
    });
  };

  const columns: columnType[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "40px",
    },
    {
      title: "Image",
      dataIndex: "img",
      align: "center",
      key: "image",
      render: (image: string) => (
        <div style={{ textAlign: "center" }}>
          <Image
            style={{
              width: "70px",
            }}
            src={image}
            alt="#"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (title: string) => (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{title}</h3>
        </div>
      ),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "action",
      align: "center",
      width: "25%",
      render: (_: any, record: Datas) => (
        console.log("record", record),
        (
          <Flex gap={"20px"} justify="center">
            <div>
              <Link to={`/app/product/edit/${record.id}`}>
                <Button type="primary" style={{ backgroundColor: "#f1cf0f" }}>
                  Edit
                </Button>
              </Link>
            </div>
            <div>
              <Popconfirm
                onConfirm={() => {
                  return DeleteCategory(record.id);
                }}
                cancelText={"No"}
                okText={"Yes"}
                title={"Do you wish to continue with past date?"}
              >
                <Button type="primary" style={{ backgroundColor: "red" }}>
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <div>
              <Link
                to={`/app/product/variants/${record.id}/${record.category}`}
              >
                <Button type="primary">Variants</Button>
              </Link>
            </div>
            <div>
              <Button type="primary" style={{ backgroundColor: "green" }}>
                Category
              </Button>
            </div>
          </Flex>
        )
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={"/app/product/create"}>
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="large"
        // pagination={false}
      />
    </>
  );
};
