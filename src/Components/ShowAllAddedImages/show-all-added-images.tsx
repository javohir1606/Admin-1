import { Flex, Image } from "antd";
import { uesGetProductVariants } from "../../Service/Query/uesGetProductVariants";
import { useParams } from "react-router-dom";

export const ShowAllAddedImages = () => {
  const { data } = uesGetProductVariants();
  const param = useParams();
  const id = param.productId;
  const hello = data?.results?.map((item: number) => item);
  const idImages = hello?.filter(
    (item: number | any) => item.id === Number(id)
  );
  console.log("id images", idImages);

  return (
    <>
      <Flex gap={"20px"} justify="center">
        {idImages?.map((item: any) =>
          item.images?.map((item2: any) => (
            <Image
              style={{ maxWidth: "200px", height: "200px" }}
              key={item2.image_id}
              src={item2.image}
              alt="#"
            />
          ))
        )}
      </Flex>
    </>
  );
};
