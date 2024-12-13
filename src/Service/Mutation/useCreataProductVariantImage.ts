import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreataProductVariantImage = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/product_variant_image/", data).then((res) => res.data),
  });
};
