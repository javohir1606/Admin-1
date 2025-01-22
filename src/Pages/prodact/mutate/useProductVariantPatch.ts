import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";
import { message } from "antd";

export const useProductVariantPatch = (id: string) => {
  return useMutation({
    mutationFn: ({ data }: any) => {
      console.log(data);

      return request
        .put(`/product_variant/${id}/`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["prodact-variant"] });
      message.success("Product updated successfully");
    },
  });
};
