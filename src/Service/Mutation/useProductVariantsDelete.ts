import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useProductVariantsDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product_variant/${id}/`).then((res) => res.data),
  });
};
