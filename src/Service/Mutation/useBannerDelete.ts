import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBannerDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/banner/${id}/`).then((res) => res.data),
  });
};
