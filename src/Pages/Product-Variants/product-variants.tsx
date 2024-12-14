import { Button, Flex, message, Table, Popconfirm } from "antd";
import { Link, useParams } from "react-router-dom";
import { columnType, Datas } from "../../Types/data-types";
import { useQueryClient } from "@tanstack/react-query";
import { uesGetProductVariants } from "../../Service/Query/uesGetProductVariants";
import { useProductVariantsDelete } from "../../Service/Mutation/useProductVariantsDelete";
import { ProductVariantSearch } from "../../Components/Product-Variant-Search/product-variant-search";
export const ProductVariants = () => {
  const { id } = useParams();

  const qwerty = id;

  const { data: reeeeeeeeeeeee } = uesGetProductVariants();
  const Variantsss = reeeeeeeeeeeee?.results?.map((item: number) => item);

  const IDID = Variantsss?.filter(
    (item: number | any) => item.product === Number(id)
  );

  const SearchProductVariantId = IDID?.map((item: Datas) => item.id);
  const dataSource = IDID?.map((item: Datas) => {
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
    };
  });

  const { mutate } = useProductVariantsDelete();

  const client = useQueryClient();
  const DeleteCategory = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["product-variants"] });
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
      render: (_: any, record: any) => (
        <Link to={`/app/product/variants/${qwerty}/${record.id}/images`}>
          <Button variant="solid" type="primary">
            Show Added Images
          </Button>
        </Link>
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
            <Link to={`/app/product/variants/${qwerty}/${record.id}`}>
              <Button type="primary" style={{ backgroundColor: "#f1cf0f" }}>
                Add image
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
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex>
        <div style={{ marginBottom: "20px" }}>
          <Link to={`/app/product/variants/${id}/create`}>
            <Button type="primary">Create</Button>
          </Link>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            width: "600px",
          }}
        >
          <ProductVariantSearch
            SearchProductVariantId={SearchProductVariantId}
            SearchID={qwerty}
          />
        </div>
      </Flex>
      <Table dataSource={dataSource} columns={columns} bordered size="large" />
    </>
  );
};
