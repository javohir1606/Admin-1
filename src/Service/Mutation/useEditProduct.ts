import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useEditProduct = (id: number) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      request.patch(`/product/${id}/`, data).then((res) => {
        res.data;
      }),
    onSuccess: (_, id) => {
      client.invalidateQueries({ queryKey: ["product"] });
      client.invalidateQueries({ queryKey: ["single-product", id] });
    },
  });
};
