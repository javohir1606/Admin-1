import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const useProductVariantDelete = (id: string | number) => {
  return useMutation({
    mutationFn: ({ data }: any) => {
      return request
        .delete(`/product_variant/${id}/`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["prodact-variant"] });
    },
  });
};
