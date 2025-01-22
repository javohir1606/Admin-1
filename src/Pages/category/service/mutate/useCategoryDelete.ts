import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/client";

export const useCategoryDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["catalog"] });
    },
  });
};
