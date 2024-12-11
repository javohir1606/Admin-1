import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useBannerEdit = () => {
  return useMutation({
    mutationFn: ({ data, id }: any & number) =>
      request.patch(`/banner/${id}/`, data).then((res) => res.data),
  });
};
