import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const uesGetProductVariants = () => {
  return useQuery({
    queryKey: ["product-variants"],
    queryFn: () => request.get("/product_variant/").then((res) => res.data),
  });
};
