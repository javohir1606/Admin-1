import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePostCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/category/", data).then((res) => res.data),
  });
};
