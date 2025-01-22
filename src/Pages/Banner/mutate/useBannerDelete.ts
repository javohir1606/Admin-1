import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { client } from "../../../config/client";

export const useBannerDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/banner/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["banner"] });
    },
  });
};
