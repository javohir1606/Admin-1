import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const usePut = () => {
  return useMutation({
    mutationFn: ({ data, id }: any) => {
      return request.put(`/brand/${id}/`, data).then((res) => res.data);
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["brand"] });
    },
  });
};
