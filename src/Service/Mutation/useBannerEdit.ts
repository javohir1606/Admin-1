import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBannerEdit = (id: number | undefined) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      request.patch(`/banner/${id}/`, data).then((res) => res.data),
    onSuccess: (_, id) => {
      client.invalidateQueries({ queryKey: ["banner"] });
      client.invalidateQueries({ queryKey: ["single-banner", id] });
    },
  });
};
