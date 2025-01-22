import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const useDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["brand"] });
    },
  });
};
