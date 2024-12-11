import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBannerEdit = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: any & number) =>
      request.patch(`/banner/${id}/`, data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["banner"] });
    },
  });
};
