import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useBannerPut = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: number | undefined }) =>
      request.put(`/banner/${id}/`, data).then((res) => res.data),
    onError: (res) => {
      console.log(res);
    },
  });
};
