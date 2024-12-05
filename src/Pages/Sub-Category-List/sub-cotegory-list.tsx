import { columnType, Datas } from "../../Types/data-types";
import { Image, Button, Popconfirm, Table, Flex, message } from "antd";
import { Link } from "react-router-dom";
import { useGetSubCategory } from "../../Service/Query/useGetSubCategory";
import { useDeleteData } from "../../Service/Mutation/useDeleteData";
import { useQueryClient } from "@tanstack/react-query";

export const SubCategoryList = () => {
  const { data } = useGetSubCategory();

  
  const { mutate } = useDeleteData();
  const client = useQueryClient();
  const dataSource = data?.results.map((item: Datas) => {
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item?.title,
      parent: item.parent?.title,
    };
  });
  const DeleteCategory = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["get-sub-category"] });
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
      title: "Parent",
      dataIndex: "parent",
      align: "center",
      key: "parent",
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
        <Flex gap={"20px"} justify="center">
          <div>
            <Link to={`/app/sub-edit-category/${record.id}`}>
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
              <Button
                // onClick={() => DeleteCategory(record.id)}
                type="primary"
                style={{ backgroundColor: "red" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={"/app/sub-category-list/create-sub-category"}>
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
