import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBrandEdit = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) =>
      request.patch(`/brand/${id}/`, data).then((res) => res.data),
    onSuccess: (_, id) => {
      client.invalidateQueries({ queryKey: ["brand"] });
      client.invalidateQueries({ queryKey: ["single-brand-data", id] });
    },
  });
};
