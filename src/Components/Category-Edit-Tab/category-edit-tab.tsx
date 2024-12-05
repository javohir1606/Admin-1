import { Button, Flex, Image, Popconfirm, Table, Tabs } from "antd";
import { ReusableForm } from "../Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditCategory } from "../../Service/Mutation/useEditCategory";
import { useGetSingleData } from "../../Service/Query/useGetSingleData";
import { columnType, Datas, FormDatas } from "../../Types/data-types";
import { message, UploadFile } from "antd";
import { useGetData } from "../../Service/Query/useGetData";
import { useDeleteData } from "../../Service/Mutation/useDeleteData";
import { useQueryClient } from "@tanstack/react-query";

export const CategoryEditTab = () => {
  const { id } = useParams();
  const { data: singleData, isLoading } = useGetSingleData(id);
  const { mutate } = useEditCategory();
  const navigate = useNavigate();
  const submit = (data: FormDatas) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Edited successfully");
          navigate("/app");
        },
        onError: (err) => {
          message.error("You might miss to edit something ");
          console.log(err);
        },
      }
    );
  };
  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      status: "done",
      url: `${singleData?.image}`,
    },
  ];
  const { data } = useGetData();
  const { mutate: Delete } = useDeleteData();
  const client = useQueryClient();

  const dataSource = data?.results
    ?.filter((item: Datas) => item.id === Number(id))
    .flatMap(
      (item: Datas | any) =>
        item?.children?.map((item2: Datas) => ({
          key: item2.id,
          id: item2.id,
          img: item2.image,
          title: item2.title,
        })) || []
    );

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
        <Flex gap={"20px"} justify="center">
          <div>
            <Link to={`/app/edit-category/${record.id}`}>
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

  const DeleteCategory = (id: number) => {
    Delete(id, {
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

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Edit Category",
            children: (
              <ReusableForm
                submit={submit}
                data={singleData}
                isLoading={isLoading}
                defaultFileList={defaultFileList}
              />
            ),
          },
          {
            key: "2",
            label: "Edit Sub Category",
            children: (
              <>
                <Table dataSource={dataSource} columns={columns} />
              </>
            ),
          },
        ]}
      ></Tabs>
    </>
  );
};
