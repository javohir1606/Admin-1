import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.post("/brand/", data).then((res) => res.data),
  });
};
