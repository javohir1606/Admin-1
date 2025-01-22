import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const usePost = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/brand/", data).then((res) => res.data);
    },
  });
};
