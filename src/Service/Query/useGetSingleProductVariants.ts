import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSingleProductVariants = (id: number) => {
  return useQuery({
    queryKey: ["single-product-variants", id],
    queryFn: () =>
      request.get(`/product_variant/${id}/`).then((res) => res.data),
  });
};
