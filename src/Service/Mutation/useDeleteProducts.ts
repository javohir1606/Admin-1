import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useDeleteProducts = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
