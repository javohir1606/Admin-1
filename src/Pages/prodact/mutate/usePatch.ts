import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const usePut = () => {
  return useMutation({
    mutationFn: ({ data, id }: any) => {
      return request.put(`/product/${id}/`, data).then((res) => res.data);
    },
    onSuccess: () => {},
  });
};
