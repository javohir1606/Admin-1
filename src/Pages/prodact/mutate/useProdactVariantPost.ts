import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const useProdactVariantPost = () => {
  return useMutation({
    mutationFn: (data: any) =>
      request.post("/product_variant/", data).then((res) => res.data),
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["prodact-variant"] });
    },
  });
};
