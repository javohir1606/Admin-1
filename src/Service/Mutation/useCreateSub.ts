import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreateSub = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post(`/category/`, data).then((res) => res.data.data),
  });
};
