import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useEditCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: any) =>
      request.put(`/category/${id}/`, data).then((res) => res.data),
  });
};
