import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/product/", data).then((res) => res.data),
  });
};
