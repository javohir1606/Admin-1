import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useVariantImgsPost = () => {
  return useMutation({
    mutationFn: (data: any) =>
      request.post("/product_variant_image/", data).then((res) => res.data),
  });
};
