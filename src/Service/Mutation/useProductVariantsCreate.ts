import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useProductVariantsCreate = () => {
  return useMutation({
    mutationFn: (data: any) =>
      request.post(`/product_variant/`, data).then((res) => res.data.data),
  });
};
