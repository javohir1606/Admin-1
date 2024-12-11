import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSingleProduct = (id: number) => {
  return useQuery({
    queryKey: ["single-product", id],
    queryFn: () => request.get(`/product/${id}/`).then((res) => res.data),
  });
};
