import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/client";

export const useCategoryPut = () => {
  return useMutation({
    mutationFn: ({ data, id }: any) => {
      return request.put(`/category/${id}/`, data).then((res) => res.data);
    },
    onSuccess: (_, id) => {
      client.refetchQueries({ queryKey: ["catalog", id] });
      client.refetchQueries({ queryKey: ["catalogs", id] });
    },
  });
};
